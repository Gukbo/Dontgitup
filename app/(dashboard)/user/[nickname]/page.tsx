import ChartCard from "@/components/card/chartCard";
import PersonaCard from "@/components/card/personaCard";
import { MOCK_PERSONA_DATA, MOCK_CHART_DATA } from "@/constants/mockData";
import {
  fetchGithubLanguages,
  transformLanguageData,
} from "@/service/githubService";

interface Props {
  params: Promise<{ nickname: string }>;
}

interface GithubRawData {
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
}

// 🎛️ [대장 스위치] true: 무조건 가짜 데이터만 사용 (API 호출 0회) / false: 진짜 실시간 깃허브 데이터 연동!
const IS_MOCK = true;

// 👤 프로필을 가져오는 전담 함수 (IS_MOCK을 인자로 받도록 수정)
async function getGithubProfile(
  nickname: string,
  isMock: boolean,
): Promise<GithubRawData> {
  if (isMock) {
    return {
      login: nickname,
      name: "Neum_Dev",
      avatar_url: "/mock_img.png",
      followers: 128,
    };
  }

  const res = await fetch(`https://api.github.com/users/${nickname}`, {
    headers: {
      Accept: "application/vnd.github+json",
      "X-GitHub-Api-Version": "2026-03-10",
    },
  });
  if (!res.ok) throw new Error("Failed to fetch Github profile");
  return res.json();
}

export default async function DashboardPage({ params }: Props) {
  const { nickname } = await params;

  // 1️⃣ [차트 데이터 스위치 제어]
  let languageData;

  if (IS_MOCK) {
    // 스위치가 켜져 있으면 깃허브 함수(fetch) 근처에도 안 가고 바로 가짜 데이터 주입!
    languageData = MOCK_CHART_DATA;
  } else {
    // 개발이 끝나고 배포할 때(false)만 진짜 서버로 출발!
    const rawGqlData = await fetchGithubLanguages(nickname);
    languageData = transformLanguageData(rawGqlData);
  }

  // 2️⃣ [프로필 데이터 가져오기] 대장 스위치 상태를 전달합니다.
  const rawData = await getGithubProfile(nickname, IS_MOCK);

  const personaData = {
    ...MOCK_PERSONA_DATA,
    id: rawData.login,
    name: rawData.name || rawData.login,
    profileImageUrl: rawData.avatar_url,
    followersCount: rawData.followers,
  };

  return (
    <div className="w-full h-full max-w-7xl mx-auto p-6">
      <div className="w-[95%] h-[92%] grid grid-cols-12 grid-rows-11 gap-4">
        <PersonaCard
          className="col-span-3 row-span-11 col-start-1 row-start-1"
          data={personaData}
        />
        <ChartCard
          className="col-span-5 row-span-5 col-start-4 row-start-2"
          chartData={languageData} // 👈 걸러진 데이터 주입!
        />
      </div>
    </div>
  );
}
