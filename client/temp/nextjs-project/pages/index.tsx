'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

function Page() {
  const currentPath = usePathname(); // Get the current path
  const basePath = currentPath.startsWith('/project') ? '/project' : '';
  return (
    <div>
      <h1>Sample Project</h1>

      <Link href={`${basePath}/ContactUs`}>
        <button>ContactUs</button>
      </Link>
    </div>
  );
}

export default Page;
