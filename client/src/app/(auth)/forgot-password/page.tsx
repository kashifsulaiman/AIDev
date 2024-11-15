import PasswordLayout from '@/components/auth/forgot-password';

export default function LoginHome() {
  return (
    <div className="z-50 m-[0_10px] flex items-center justify-center sm:m-0">
      <div className="z-50 m-[0_10px] mx-auto flex sm:m-0">
        <div className="z-50 m-[0_10px] flex flex-col gap-10 sm:m-0">
          <PasswordLayout />
        </div>
      </div>
    </div>
  );
}
