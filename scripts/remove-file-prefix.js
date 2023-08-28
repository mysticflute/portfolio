#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// This script removes a specified prefix from all files in a given directory.

// Usage: remove-file-prefix.js path/to/dir prefix

const directory = process.argv[2];
const prefix = process.argv[3];

if (!directory) {
  console.error(
    'Error: The first argument should be the path to the directory.'
  );
  process.exit(1);
}

if (!fs.existsSync(directory)) {
  console.error(`Error: The path "${directory}" does not exist.`);
  process.exit(1);
}

if (!fs.statSync(directory).isDirectory()) {
  console.error(`Error: The path "${directory}" is not a directory.`);
  process.exit(1);
}

if (!prefix) {
  console.error('Error: The second argument should be the prefix to remove.');
  process.exit(1);
}

let counter = 0;
const files = fs.readdirSync(directory);
files.forEach(name => {
  if (name.startsWith(prefix)) {
    const newName = name.slice(prefix.length);
    const oldPath = path.join(directory, name);
    const newPath = path.join(directory, newName);

    console.log(`${name} > ${newName}`);

    if (newName === '') {
      console.error(`Error: "${oldPath}" is blank after the prefix, skipping!`);
    } else if (fs.existsSync(newPath)) {
      console.error(`Error: "${newPath}" already exists, skipping!`);
    } else {
      fs.renameSync(oldPath, newPath);
      counter += 1;
    }
  }
});

console.log(`\nrenamed ${counter} file(s).`);
