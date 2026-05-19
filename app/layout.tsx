import "./globals.css";
import Navbar from "../components/layout/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-mainbg">
        <div className="flex flex-col h-screen overflow-hidden ">
          <Navbar />
          <main className="flex-1 w-full overflow-hidden">{children}</main>
        </div>
      </body>
    </html>
  );
}
