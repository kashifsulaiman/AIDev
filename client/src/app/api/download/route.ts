import { NextResponse } from 'next/server';
import archiver from 'archiver';
import { join } from 'path';
import { PassThrough } from 'stream';
import fs from 'fs';

export async function GET() {
  // Paths for the project and temporary Next.js structure
  const projectPath = join(process.cwd(), 'src/app/project');
  const tempPath = join(process.cwd(), 'temp/nextjs-project');

  // Ensure the project folder exists
  if (!fs.existsSync(projectPath)) {
    console.error('Project folder does not exist:', projectPath);
    return new Response('Project folder not found', { status: 404 });
  }

  // Create a minimal Next.js structure dynamically
  createNextJsStructure(tempPath, projectPath);

  const passThroughStream = new PassThrough();
  const archive = archiver('zip', { zlib: { level: 9 } });

  archive.on('error', (err) => {
    console.error('Archiver error:', err);
    passThroughStream.end();
  });

  archive.pipe(passThroughStream);

  // Add the Next.js structure to the ZIP
  archive.directory(tempPath, false);

  archive.finalize();

  return new Response(passThroughStream, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="nextjs-project.zip"',
    },
  });
}

/**
 * Create a Next.js project structure with the given project content.
 */
function createNextJsStructure(basePath: string, projectPath: string) {
  // Clean up any existing temporary folder
  if (fs.existsSync(basePath)) {
    fs.rmSync(basePath, { recursive: true, force: true });
  }

  // Create base directories
  const folders = ['pages', 'public'];
  folders.forEach((folder) => {
    const folderPath = join(basePath, folder);
    fs.mkdirSync(folderPath, { recursive: true });
  });

  // Create `package.json`
  const packageJson = {
    name: 'nextjs-project',
    version: '0.1.0',
    private: true,
    scripts: {
      dev: 'next dev',
      build: 'next build',
      start: 'next start',
    },
    dependencies: {
      next: 'latest',
      react: 'latest',
      'react-dom': 'latest',
    },
  };
  fs.writeFileSync(join(basePath, 'package.json'), JSON.stringify(packageJson, null, 2));

  // Create `next.config.js`
  const nextConfig = `module.exports = {};`;
  fs.writeFileSync(join(basePath, 'next.config.js'), nextConfig);

  // Copy `app/project/page.tsx` to `pages/index.tsx`
  const indexPagePath = join(projectPath, 'page.tsx');
  if (fs.existsSync(indexPagePath)) {
    const destIndexPagePath = join(basePath, 'pages/index.tsx');
    fs.copyFileSync(indexPagePath, destIndexPagePath);
  }

  // Copy `app/project/ContactUs/page.tsx` to `pages/ContactUs/index.tsx`
  const contactUsPagePath = join(projectPath, 'ContactUs/page.tsx');
  if (fs.existsSync(contactUsPagePath)) {
    const destContactUsFolder = join(basePath, 'pages/ContactUs');
    fs.mkdirSync(destContactUsFolder, { recursive: true });

    const destContactUsPagePath = join(destContactUsFolder, 'index.tsx');
    fs.copyFileSync(contactUsPagePath, destContactUsPagePath);
  }
}
