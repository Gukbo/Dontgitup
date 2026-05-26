import { PersonaInfo } from "@/types/user";
import { LanguageData } from "@/types/user";

export const MOCK_PERSONA_DATA: PersonaInfo = {
  id: "Gukbo",
  name: "Neum_Dev",
  profileImageUrl: "/mock_img.png",
  followersCount: 128,
  commitsCount: 1234,
  tier: "Gold IV",
  badges: ["🔥 100일 연속 커밋", "👑 리액트 장인", "🚀 넛지 마스터"],
};

export const MOCK_CHART_DATA: LanguageData[] = [
  { name: "TypeScript", value: 145230, color: "#3178C6" }, // 깃허브 공식 TS 블루
  { name: "JavaScript", value: 65321, color: "#F1E05A" }, // 깃허브 공식 JS 옐로우
  { name: "HTML", value: 18420, color: "#E34C26" }, // 깃허브 공식 HTML 오렌지
  { name: "CSS", value: 12100, color: "#563D7C" }, // 깃허브 공식 CSS 퍼플
];
