import GuestUSer from '@/components/auth/guest-user';

export default function LoginHome() {
  return (
    <div className="z-50 flex items-center justify-center">
      <div className="z-50 mx-auto flex">
        <div className="z-50 flex flex-col gap-10">
          <GuestUSer />
        </div>
      </div>
    </div>
  );
}
