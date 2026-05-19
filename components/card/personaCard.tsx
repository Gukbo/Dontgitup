"use client";

import Image from "next/image";
import { PersonaInfo } from "@/types/search";

interface PersonaCardProps {
  className?: string;
  data: PersonaInfo;
}

export default function PersonaCard({ className, data }: PersonaCardProps) {
  return (
    <div
      className={`relative w-full h-full grid grid-rows-[1fr_9fr] ${className}`}
    >
      <div className="relative h-full w-full"></div>
      <div className="relative border-2 border-magenta rounded-3xl flex flex-col">
        <div className="absolute -top-18 left-1/2 -translate-x-1/2 z-20">
          <div className="relative w-36 h-36 rounded-full border-4 border-magenta bg-white shadow-xl overflow-hidden">
            <Image
              src={data.profileImageUrl}
              alt={data.name}
              fill
              priority
              sizes="96px"
              className="object-cover"
            />
          </div>
        </div>
        <div className="flex-3 pt-20 flex flex-col items-center gap-2">
          <p className="text-white font-game">
            {data.name} <span className="text-gray-400 text-sm">{data.id}</span>
          </p>
          <p className="text-white text-sm font-game ">
            followers : {data.followersCount.toLocaleString()}
          </p>
          <p className="text-white text-sm font-game">
            총 커밋 수 : {data.commitsCount.toLocaleString()}
          </p>
          <p className="text-white font-game">{data.tier}</p>
          <p className="text-white font-game pt-4">badge Collection</p>
        </div>
        <div className="flex-7 p-6">
          <div className="w-full h-full border border-white/5 rounded-xl bg-cardbg"></div>
        </div>
      </div>
    </div>
  );
}
