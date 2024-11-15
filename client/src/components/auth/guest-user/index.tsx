'use client';

import { useRouter } from 'next/navigation';
import { CButton } from '@/common/button';
import GenericImage from '@/common/GenericImage';

const GuestUSer = () => {
  const router = useRouter();

  const guestCredentials = {
    email: process.env.NEXT_PUBLIC_GUEST_EMAIL ?? '',
    password: process.env.NEXT_PUBLIC_GUEST_PASSWORD ?? '',
    rememberMe: false,
  };

  const handleGuestLogin = async () => {
    try {
      const { email, password } = guestCredentials;

      console.log('Signing in as guest:', email, password);

      router.push('/main');
    } catch (error) {
      console.error('Guest login failed:', error);
    }
  };

  return (
    <div className="flex flex-col justify-between rounded-2xl bg-white p-5 sm:m-0 sm:min-w-[534px] sm:p-[50px]">
      <div className="Scroller-Class max-h-[72vh] overflow-y-auto scrollbar-hide">
        <div className="flex flex-col items-center justify-center gap-3 py-12">
          <GenericImage
            className="w-[9rem] object-cover shadow-lg"
            alt="logo"
            src="https://dc3yp5a9dizw2.cloudfront.net/images/aidev-logo.svg"
          />
          <GenericImage
            className="w-full object-cover lg:w-[150px]"
            alt="logo"
            src="https://dc3yp5a9dizw2.cloudfront.net/images/Avatar.png"
          />
          <p className="text-center font-Jakarta text-base font-semibold text-black sm:text-lg">
            Guest
          </p>
        </div>
        <CButton
          variant="primary"
          colorPrimary
          label="Continue with Guest"
          className="h-12 w-full text-sm font-semibold sm:text-base"
          onClick={handleGuestLogin}
        />
      </div>
    </div>
  );
};

export default GuestUSer;
