import Esa20240910, * as $Esa20240910 from "@alicloud/esa20240910";
import * as $OpenApi from "@alicloud/openapi-client";
import Credential from "@alicloud/credentials";
import fs from "fs";
import path from "path";
import JSZip from "jszip";
import FormData from "form-data";
import https from "https";

function createClient() {
  const credential = new Credential.default();
  const config = new $OpenApi.Config({
    credential,
    endpoint: "esa.cn-hangzhou.aliyuncs.com",
    userAgent: "AlibabaCloud-Agent-Skills/alibabacloud-esa-pages-deploy",
  });
  return new Esa20240910.default(config);
}

const ROUTINE_CODE = fs.readFileSync("scripts/routine.js", "utf-8");

function uploadToOSS(ossConfig, fileBuffer) {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append("key", ossConfig.key);
    formData.append("OSSAccessKeyId", ossConfig.OSSAccessKeyId);
    formData.append("policy", ossConfig.policy);
    formData.append("signature", ossConfig.signature);
    if (ossConfig.XOssSecurityToken) {
      formData.append("x-oss-security-token", ossConfig.XOssSecurityToken);
    }
    formData.append("file", fileBuffer, { filename: "code.zip", contentType: "application/zip" });

    const url = new URL(ossConfig.url);
    const options = {
      hostname: url.hostname,
      port: url.port || 443,
      path: url.pathname,
      method: "POST",
      headers: formData.getHeaders(),
    };

    const req = https.request(options, (res) => {
      let body = "";
      res.on("data", (chunk) => (body += chunk));
      res.on("end", () => {
        if (res.statusCode === 200 || res.statusCode === 204) {
          resolve(body);
        } else {
          reject(new Error(`OSS upload failed: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on("error", reject);
    formData.pipe(req);
  });
}

async function main() {
  const args = process.argv.slice(2);
  const routineName = args[0] || "transparent-background-tool";
  const siteDir = args[1] || ".";

  const folderPath = path.resolve(siteDir);
  console.log(`Deploying "${folderPath}" as routine "${routineName}"\n`);

  // Collect static files
  const excludeFiles = ["package.json", "package-lock.json", "setup-esa-dns.log"];
  const excludeDirs = ["node_modules", "scripts", ".git"];
  const excludeExts = [".log", ".tmp", ".bak"];
  const staticFiles = [];

  function collectFiles(dir, relPath = "") {
    const items = fs.readdirSync(dir);
    for (const item of items) {
      const fullPath = path.join(dir, item);
      const rel = relPath ? path.join(relPath, item) : item;
      const stat = fs.statSync(fullPath);
      if (stat.isDirectory()) {
        if (!excludeDirs.includes(item)) collectFiles(fullPath, rel);
      } else {
        if (excludeFiles.includes(item)) continue;
        if (excludeExts.some((ext) => item.toLowerCase().endsWith(ext))) continue;
        staticFiles.push({ fullPath, rel });
      }
    }
  }

  collectFiles(folderPath);
  console.log(`Found ${staticFiles.length} static file(s):`);
  for (const f of staticFiles) {
    console.log(`  - ${f.rel} (${(fs.statSync(f.fullPath).size / 1024).toFixed(2)} KB)`);
  }

  // Build zip: routine/index.js + assets/*
  console.log("\nPackaging...");
  const zip = new JSZip();
  zip.folder("routine").file("index.js", ROUTINE_CODE);
  const assetsFolder = zip.folder("assets");
  for (const f of staticFiles) {
    const content = fs.readFileSync(f.fullPath);
    const relParts = f.rel.split(path.sep);
    let folder = assetsFolder;
    for (let i = 0; i < relParts.length - 1; i++) folder = folder.folder(relParts[i]);
    folder.file(relParts[relParts.length - 1], content);
  }
  const zipBuffer = await zip.generateAsync({ type: "nodebuffer" });
  console.log(`Package size: ${(zipBuffer.length / 1024).toFixed(2)} KB`);

  const client = createClient();

  // Step 1: Create routine (skip if exists)
  console.log(`\n[1/5] Creating routine: ${routineName}`);
  try {
    await client.createRoutine(
      new $Esa20240910.CreateRoutineRequest({
        name: routineName,
        description: "Transparent Background Tool - ESA Pages",
        hasAssets: true,
      })
    );
    console.log("  Routine created.");
  } catch (e) {
    if (e.code === "RoutineNameAlreadyExists" || e.code === "RoutineAlreadyExist") {
      console.log("  Routine already exists, will update.");
    } else if (e.code === "Throttling.Api") {
      console.log("  Rate limited, retrying...");
      await new Promise((r) => setTimeout(r, 2000));
    } else {
      throw e;
    }
  }

  // Step 2: Get OSS upload config
  console.log("\n[2/5] Requesting upload credentials...");
  const createVersionResp = await client.createRoutineWithAssetsCodeVersion(
    new $Esa20240910.CreateRoutineWithAssetsCodeVersionRequest({
      name: routineName,
      codeDescription: "Static site deployment",
    })
  );
  const codeVersion = createVersionResp.body?.codeVersion;
  const ossConfig = createVersionResp.body?.ossPostConfig;
  console.log(`  Code version: ${codeVersion}`);
  console.log(`  OSS URL: ${ossConfig?.url}`);

  // Step 3: Upload zip to OSS
  console.log("\n[3/5] Uploading package to OSS...");
  await uploadToOSS(ossConfig, zipBuffer);
  console.log("  Upload complete.");

  // Step 4: Wait for build
  console.log("\n[4/5] Waiting for build to complete...");
  let buildReady = false;
  for (let i = 0; i < 40; i++) {
    await new Promise((r) => setTimeout(r, 3000));
    try {
      const listResp = await client.listRoutineCodeVersions(
        new $Esa20240910.ListRoutineCodeVersionsRequest({
          name: routineName,
          pageNumber: 1,
          pageSize: 5,
        })
      );
      const versions = listResp.body?.codeVersions || [];
      const target = versions.find((v) => v.codeVersion === codeVersion);
      if (target) {
        console.log(`  [${i + 1}] Status: ${target.status}`);
        if (target.status === "Available" || target.status === "Ready") {
          buildReady = true;
          break;
        }
        if (target.status === "Failed" || target.status === "BuildFail") {
          throw new Error(`Build failed: ${target.status}`);
        }
      } else {
        console.log(`  [${i + 1}] Version not found yet, still building...`);
      }
    } catch (e) {
      if (e.message?.includes("Build failed")) throw e;
      console.log(`  [${i + 1}] Checking...`);
    }
  }
  if (!buildReady) {
    console.log("  Build still in progress, proceeding with publish...");
  }

  // Step 5: Publish to production
  console.log("\n[5/5] Publishing to production...");
  await client.publishRoutineCodeVersion(
    new $Esa20240910.PublishRoutineCodeVersionRequest({
      name: routineName,
      codeVersion: codeVersion,
      env: "production",
    })
  );
  console.log("  Published.");

  // Wait for deployment
  console.log("\nWaiting for deployment to take effect...");
  await new Promise((r) => setTimeout(r, 10000));

  // Get routine info and access token
  const info = await client.getRoutine(
    new $Esa20240910.GetRoutineRequest({ name: routineName })
  );
  const tokenResp = await client.getRoutineAccessToken(
    new $Esa20240910.GetRoutineAccessTokenRequest({ name: routineName })
  );

  const domain = info.body?.defaultRelatedRecord;
  const token = tokenResp.body?.accessToken;
  const accessUrl = `https://${domain}?esa_er_token=${token}`;

  console.log("\n" + "=".repeat(60));
  console.log("✅ Deployment successful!");
  console.log("=".repeat(60));
  console.log(`Routine Name: ${routineName}`);
  console.log(`Domain:       ${domain}`);
  console.log(`Access URL:   ${accessUrl}`);
  console.log("=".repeat(60));
  console.log("\n⚠️  Access token valid for 1 hour.");
}

main().catch((e) => {
  console.error("\n❌ Deployment failed:");
  console.error(e.message || e);
  if (e.data) console.error("Response:", JSON.stringify(e.data, null, 2));
  if (e.statusCode) console.error("HTTP Status:", e.statusCode);
  if (e.code) console.error("Error Code:", e.code);
  process.exit(1);
});
