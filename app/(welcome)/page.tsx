import SearchBar from "@/components/search/searchBar";

export default function Home() {
  return (
    <div className="w-full h-screen max-w-7xl mx-auto p-6 flex items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-4">
        <p className="text-white text-7xl font-game">
          dont<span className="text-primary">git</span>up
        </p>
        <p className="text-white font-game text-xl">
          Commit More, Unlock Your Badges
        </p>
        <SearchBar sizeClassName="w-96" />
        <div className="flex flex-col items-center text-center mt-10">
          <div className="flex flex-row items-center justify-center gap-8">
            <p className="text-white font-game text-xl">github</p>
            <p className="text-white font-game text-xl">velog</p>
          </div>
          <p className="text-white font-game text-xl">
            Copyright 2026. dontgitup All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
