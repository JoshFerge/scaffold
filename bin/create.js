#!/usr/bin/env node

import { exec } from "child_process";
import { promisify } from "util";
import path from "path";
import fs from "fs/promises";

const execAsync = promisify(exec);

const repoUrl = "git@github.com:JoshFerge/scaffold.git";
const projectName = process.argv[2] || "my-new-project";

async function main() {
  console.log(`Creating new project: ${projectName}`);

  try {
    // Clone the repository
    await execAsync(`git clone ${repoUrl} ${projectName}`);

    // Remove the .git folder to disassociate from the original repo
    await execAsync(`rm -rf ${path.join(projectName, ".git")}`);

    // Replace "scaffold" with projectName in package.json
    const packageJsonPath = path.join(projectName, "package.json");
    let packageJson = await fs.readFile(packageJsonPath, "utf-8");
    packageJson = packageJson.replace(/scaffold/g, projectName);
    await fs.writeFile(packageJsonPath, packageJson);

    // Generate a random AUTH_SECRET and update wrangler.toml
    const wranglerTomlPath = path.join(projectName, "wrangler.toml");
    let wranglerToml = await fs.readFile(wranglerTomlPath, "utf-8");
    const authSecret = (
      await execAsync("openssl rand -base64 32")
    ).stdout.trim();
    wranglerToml = wranglerToml.replace(
      /AUTH_SECRET="<REPLACE_ME>"/,
      `AUTH_SECRET="${authSecret}"`
    );
    await fs.writeFile(wranglerTomlPath, wranglerToml);

    console.log(`Project created successfully in ./${projectName}`);
    console.log("To get started, run:");
    console.log(`  cd ${projectName}`);
    console.log("  npm install");
    console.log(`  npx wrangler d1 create ${projectName}-db`);
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
