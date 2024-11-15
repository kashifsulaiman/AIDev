import SignUpLayout from '@/components/auth/signup';

export default function SignUpHome() {
  return (
    <div className="z-50 m-[0_10px] flex w-full items-center justify-center sm:w-auto">
      <div className="z-50 m-[0_10px] mx-auto flex w-full sm:w-auto">
        <div className="z-50 m-[0_10px] flex w-full flex-col gap-10 sm:w-auto">
          <SignUpLayout />
        </div>
      </div>
    </div>
  );
}
