#!/usr/bin/env node

import pkg from "execa";
const { execa } = pkg;
import path from "path";

const repoUrl = "https://github.com/JoshFerge/scaffold.git";
const projectName = process.argv[2] || "my-new-project";
async function main() {
  console.log(`Creating new project: ${projectName}`);

  try {
    // Clone the repository
    await execa("git", ["clone", repoUrl, projectName]);

    // Remove the .git folder to disassociate from the original repo
    await execa("rm", ["-rf", path.join(projectName, ".git")]);

    console.log(`Project created successfully in ./${projectName}`);
    console.log("To get started, run:");
    console.log(`  cd ${projectName}`);
    console.log("  npm install");
  } catch (error) {
    console.error("An error occurred:", error.message);
  }
}

main();
