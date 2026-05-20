import ChartCard from "@/components/card/chartCard";
import PersonaCard from "@/components/card/personaCard";
import { MOCK_PERSONA_DATA, MOCK_CHART_DATA } from "@/constants/mockData";

interface Props {
  params: Promise<{ nickname: string }>;
}

interface GithubRawData {
  avatar_url: string;
  name: string;
  login: string;
  followers: number;
}

async function getGithubProfile(nickname: string): Promise<GithubRawData> {
  const IS_MOCK = true;
  if (IS_MOCK) {
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
  const rawData = await getGithubProfile(nickname);
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
          chartData={MOCK_CHART_DATA}
        />
      </div>
    </div>
  );
}
