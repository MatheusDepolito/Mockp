'use client';
import { IconSearch } from '@tabler/icons-react';
import Link from 'next/link';

export default function Home() {
  return (
    <main className="h-[calc(100vh-4rem)] ">
      <div className="absolute top-16 bottom-0 left-0 right-0"></div>
      <div className="flex flex-col items-start space-y-2 font-black text-8xl">
        <div className="z-10 inline-block px-3 mt-2">Need</div>{' '}
        <div className="z-10 inline-block w-full max-w-md px-3 ">parking?</div>
        <Link
          href="/search"
          className="z-10 flex items-center gap-2 px-3 py-2 text-xl font-medium text-black underline underline-offset-4 "
        >
          <IconSearch /> Search now
        </Link>
      </div>
    </main>
  );
}
