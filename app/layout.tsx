import "./globals.css";
import Navbar from "./components/layout/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <Navbar />

        {/* 각 페이지(page.tsx)의 내용이 들어가는 자리 */}
        <main>{children}</main>
      </body>
    </html>
  );
}
