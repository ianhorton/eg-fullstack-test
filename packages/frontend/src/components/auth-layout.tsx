import { PropsWithChildren } from 'react';

export default function AuthLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-full flex-col items-center bg-slate-50 sm:justify-center">
      <div className="m-2 w-96 p-2 sm:m-8 sm:rounded-lg sm:border sm:border-gray-300 sm:bg-slate-100 sm:p-8">
        <main>{children}</main>
      </div>
    </div>
  );
}
