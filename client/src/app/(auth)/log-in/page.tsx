import Login from '@/components/auth/login';

export default function LoginHome() {
  return (
    <div className="z-50 flex items-center justify-center p-4 xl:p-0">
      <div className="z-50 mx-auto flex">
        <div className="z-50 flex flex-col gap-10">
          <Login />
        </div>
      </div>
    </div>
  );
}
