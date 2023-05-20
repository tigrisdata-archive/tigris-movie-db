import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Tigris Movie Database",
  description: "An example of using a reasonably dataset of movies with Tigris",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="flex sm:w-12/12 xl:w-10/12 m-auto min-h-screen flex-col items-center justify-between p-6 xl:p-24">
          {children}
        </main>
      </body>
    </html>
  );
}
