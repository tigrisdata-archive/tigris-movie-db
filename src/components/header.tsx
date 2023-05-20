import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <div className="z-10 w-full items-center justify-between text-xl font-bold lg:flex">
      <div className="text-2xl xl:text-3xl">
        <Link href="/">🎥 Tigris Movie Database</Link>
      </div>
      <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        <Link
          className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
          href="https://www.tigrisdata.com.com?utm_source=create-next-app&utm_medium=github-repo&utm_campaign=tigris-movie-db"
          target="_blank"
          rel="noopener noreferrer"
        >
          By{" "}
          <Image
            src="/tigris.svg"
            alt="Tigris Logo"
            className="dark:invert"
            width={100}
            height={24}
            priority
          />
        </Link>
      </div>
    </div>
  );
}
