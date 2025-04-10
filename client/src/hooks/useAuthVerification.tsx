import { useQuery } from './useQuery';
import { usePathname } from 'next/navigation';
import { ApiUrl } from '@/constants/apiUrl';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { StoreModel } from '@/redux/model';
import { useStoreActions } from 'easy-peasy';

export const useAuthVerification = () => {
  const pathName = usePathname();
  const jwtToken = Cookies.get('jwtToken');
  const userAction = useStoreActions<StoreModel>((actions) => actions.userObj.add);

  const { data, isLoading } = useQuery<any>({
    queryKey: [pathName],

    url: ApiUrl?.VERIFY_TOKEN,

    showToast: true,
    enabled: !!jwtToken,
  });
  useEffect(() => {
    if (isLoading) return;
    if (data) {
      userAction(data);
    } else {
      Cookies.remove('jwtToken');
    }
  }, [data, isLoading])
};
