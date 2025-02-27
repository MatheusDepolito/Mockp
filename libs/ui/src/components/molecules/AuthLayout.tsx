'use client';
import { IconArrowBack } from '@tabler/icons-react';
import Link from 'next/link';
import { ReactNode } from 'react';
import { GoogleButton } from './GoogleButton';

export interface IAuthLayoutProps {
  children: ReactNode;
  title: string;
}

export const AuthLayout = ({ title, children }: IAuthLayoutProps) => {
  return (
    <div className="relative h-[calc(100vh-4rem)]  ">
      <div className=" flex flex-col justify-center items-center absolute top-0 bg-black/20 backdrop-blur-sm bottom-0  ">
        <div className="p-4 text-black ">
          <div className="w-full max-w-lg mx-auto ">
            <h1 className="flex items-center gap-2 mb-2 text-2xl">
              <div>{title}</div>
            </h1>
            {children}
            <div className="mt-4 text-sm text-gray-300">
              <div className="flex flex-col items-center mb-4">
                <div className="mb-1 text-xs">Or, continue with</div>
                <GoogleButton />
              </div>
              <Link href="/" className="flex items-center gap-2">
                <IconArrowBack className="w-4 h-4" /> Back to home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
