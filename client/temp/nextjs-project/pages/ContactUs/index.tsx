'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Page() {
  const currentPath = usePathname(); // Get the current path

  // Dynamically determine the base path
  const basePath = currentPath.startsWith('/project') ? '/project' : '';

  return (
    <div>
      <h1>Contact Us Page</h1>
      <Link href={`${basePath}/`}>
        <button>Back</button>
      </Link>
    </div>
  );
}
