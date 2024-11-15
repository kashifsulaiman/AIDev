import { useQuery } from './useQuery';
import { usePathname } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';

export const useAuthVerification = () => {
  const pathName = usePathname();

  useQuery<any>({
    queryKey: [pathName],

    url: ApiUrl?.VERIFY_TOKEN,

    showToast: true,
  });
};
