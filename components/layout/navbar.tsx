import SearchBar from "@/components/search/searchBar";
import Link from "next/link";

export default function Navbar() {
  return (
    <div className="w-full bg-mainbg flex justify-center shrink-0">
      <nav className="max-w-360 w-full mx-auto h-22.5 flex items-center justify-between px-10 text-primary font-game">
        <Link href="/" className="inline-block text-white text-4xl">
          dont<span className="text-primary">git</span>up
        </Link>
        <SearchBar />
        <ul className="flex space-x-6">
          <li>Light</li>
          <li>Language</li>
          <li>Menu</li>
        </ul>
      </nav>
    </div>
  );
}
