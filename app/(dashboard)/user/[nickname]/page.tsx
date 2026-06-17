import ChartCard from "@/components/card/chartCard";
import PersonaCard from "@/components/card/personaCard";
import { MOCK_PERSONA_DATA, MOCK_CHART_DATA } from "@/constants/mockData";
import {
  fetchGithubLanguages,
  transformLanguageData,
  getGithubProfile,
} from "@/service/githubService";

// import 해오기 추후 수정 예정

interface Props {
  params: Promise<{ nickname: string }>;
  // params정보를 사용할 때 작성 
}

const IS_MOCK = true; // true : 가짜 데이터 , false : 진짜 데이터

export default async function DashboardPage({ params }: Props) {
  const { nickname } = await params;

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
