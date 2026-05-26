import { LanguageData } from "@/types/user";

// 1️⃣ [추가] 깃허브 GraphQL이 뱉어주는 Raw 데이터의 명확한 이름표(Interface) 정의
interface LanguageEdge {
  size: number;
  node: {
    name: string;
    color: string | null; // 색상은 null로 들어올 수도 있습니다.
  };
}

interface RepositoryNode {
  languages?: {
    edges?: LanguageEdge[];
  };
}

// fetchGithubLanguages의 리턴 타입을 보장하기 위한 가장 바깥쪽 껍데기 타입
interface GithubGqlResponse {
  data?: {
    user?: {
      repositories?: {
        nodes?: RepositoryNode[];
      };
    };
  };
}

const GET_USER_LANGUAGES_QUERY = `
  query GetUserLanguages($nickname: String!) {
    user(login: $nickname) {
      repositories(first: 100, ownerAffiliations: OWNER, isFork: false) {
        nodes {
          languages(first: 10, orderBy: { field: SIZE, direction: DESC }) {
            edges {
              size
              node {
                name
                color
              }
            }
          }
        }
      }
    }
  }
`;

// 2️⃣ 함수의 리턴 타입을 Promise<GithubGqlResponse>로 지정하여 안전성을 높입니다.
export async function fetchGithubLanguages(
  nickname: string,
): Promise<GithubGqlResponse> {
  const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

  if (!GITHUB_TOKEN) {
    throw new Error("환경 변수에 GITHUB_TOKEN이 설정되지 않았습니다.");
  }

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${GITHUB_TOKEN}`,
    },
    body: JSON.stringify({
      query: GET_USER_LANGUAGES_QUERY,
      variables: { nickname },
    }),
    next: { revalidate: 3600 },
  });

  if (!response.ok) {
    throw new Error("깃허브에서 데이터를 가져오는 데 실패했습니다.");
  }

  return response.json();
}

// 🎯 3️⃣ [수정] 매개변수와 내부에 있던 모든 any를 지우고 새로 만든 타입을 매핑합니다!
export function transformLanguageData(
  rawGqlData: GithubGqlResponse,
): LanguageData[] {
  // 옵셔널 체이닝 덕분에 rawGqlData가 어떤 상태든 안전하게 노드를 추출합니다.
  const repoNodes = rawGqlData?.data?.user?.repositories?.nodes;
  if (!repoNodes) return [];

  // 언어별로 용량을 누적해서 저장할 임시 바구니
  const languageMap: Record<string, { value: number; color: string }> = {};

  // 💡 (repo: any) 대신 명확한 타입(RepositoryNode) 지정!
  repoNodes.forEach((repo: RepositoryNode) => {
    const edges = repo?.languages?.edges;
    if (!edges) return;

    // 💡 (edge: any) 대신 명확한 타입(LanguageEdge) 지정!
    edges.forEach((edge: LanguageEdge) => {
      const { size } = edge;
      const { name, color } = edge.node;

      if (languageMap[name]) {
        languageMap[name].value += size;
      } else {
        languageMap[name] = {
          value: size,
          color: color || "#CCCCCC", // 색상이 없는 희귀 언어는 회색 처리
        };
      }
    });
  });

  // 예쁘게 모인 바구니(객체)를 파이 차트용 배열([])로 변환
  const formattedData: LanguageData[] = Object.keys(languageMap).map(
    (name) => ({
      name,
      value: languageMap[name].value,
      color: languageMap[name].color,
    }),
  );

  // 코드 용량이 큰 순서대로 정렬
  return formattedData.sort((a, b) => b.value - a.value);
}
