'use client';
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const isMobile = /iPhone|Android|Windows Phone|BB10|BlackBerry|Tizen|KaiOS/i.test(navigator.userAgent);
  console.log(isMobile);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {isMobile}
      <Link
        href={"/table?page=0"}
        className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30"
      >
        Check out the table
      </Link>
    </main>
  );
}
