import fs from 'fs';

import { NextResponse } from 'next/server';

import path from 'path';
import crypto from 'crypto';

// H// Helper function to generate unique IDs (you can use any UUID library here)

// Define a type for file objects

interface FileDetail {
  id: string;

  name: string;

  parentId: string;

  type: number; // 0 for file

  depth: number;

  content: string; // File content as a string
}

// Define a type for directory objects

interface DirectoryStructure {
  id: string;

  name: string;

  parentId: string;

  type: number; // 1 for directory

  depth: number;

  dirs: DirectoryStructure[];

  files: FileDetail[];
}

const generateId = () => crypto.randomBytes(16).toString('hex');
const getDirectoryContent = (
  dirPath: any,

  depth = 0,

  parentId = '0'
): DirectoryStructure => {
  const files = fs.readdirSync(dirPath);

  const directoryStructure: DirectoryStructure = {
    id: generateId(),

    name: path.basename(dirPath),

    parentId: parentId,

    type: 1, // 1 for directory

    depth: depth,

    dirs: [],

    files: [],
  };

  files.forEach((file) => {
    const fullPath = path.join(dirPath, file);

    const stats = fs.statSync(fullPath);

    if (stats.isDirectory()) {
      // Recursively get content of subdirectory

      const subDirContent = getDirectoryContent(
        fullPath,

        depth + 1,

        directoryStructure.id
      );

      directoryStructure.dirs.push(subDirContent);
    } else {
      // Add file details

      const fileContent = fs.readFileSync(fullPath, 'utf-8'); // Read file content

      const fileDetail = {
        id: generateId(),

        name: file,

        parentId: directoryStructure.id,

        type: 0, // 0 for file

        depth: depth + 1,

        content: fileContent,
      };

      directoryStructure.files.push(fileDetail);
    }
  });

  return directoryStructure;
};

export async function GET(request: any, response: any) {
  const { name: projectName } = response.params;

  console.log(projectName, 'projectName');

  // Path to the 'template' directory outside the src folder

  const directoryPath = path.join(process.cwd(), 'outputs', projectName);

  console.log(directoryPath);

  if (!fs.existsSync(directoryPath)) {
    console.log('Directory not found');

    return NextResponse.json({ error: 'Directory not found' });
  }

  const directoryContent = getDirectoryContent(directoryPath);

  const resp = {
    id: '0',

    name: 'root',

    type: 1,

    depth: 0,

    dirs: directoryContent.dirs,

    files: directoryContent.files, // Assuming no files at the root level
  };

  try {
    return NextResponse.json({
      status: 'success',

      message: 'fetched prompts successfully',

      data: resp,
    });
  } catch (error) {
    return NextResponse.json({
      status: 'fail',

      message: 'Something went wrong',

      data: error,
    });
  }
}
