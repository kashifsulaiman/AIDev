import { useEffect, useRef } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import Cookies from 'js-cookie';
import { showToaster } from '@/components/Toaster';

export const useGoogleAuth = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const token = searchParams.get('authToken');
  const hasRun = useRef(false);
  const router = useRouter();
 
  useEffect(() => {
    if (hasRun.current) return; // Prevent re-running the logic if already executed
    if (pathname.endsWith('main') && token) {
      hasRun.current = true;
      Cookies.set('jwtToken', token);
      const current = new URLSearchParams(searchParams.toString());
      current.delete('authToken');
      router.push(`${pathname}${current.toString() ? `?${current}` : ''}`);
      showToaster(`Logged in with Google successfully!`, 'success');
    }
  }, [token]);


};
