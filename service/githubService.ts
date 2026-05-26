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

export async function fetchGithubLanguages(nickname: string) {
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

import { LanguageData } from "@/types/user";

// 🎯 깃허브의 복잡한 데이터를 파이 차트용 규격(LanguageData[])으로 압축하는 가공기
export function transformLanguageData(rawGqlData: any): LanguageData[] {
  // 1. 만약 유저가 없거나 레포지토리가 비어있으면 안전하게 빈 배열 리턴!
  const repoNodes = rawGqlData?.data?.user?.repositories?.nodes;
  if (!repoNodes) return [];

  // 2. 언어별로 용량을 누적해서 저장할 임시 바구니를 만듭니다.
  // 구조 예시: { "TypeScript": { value: 30000, color: "#3178C6" } }
  const languageMap: Record<string, { value: number; color: string }> = {};

  // 3. 레포지토리 배열을 하나씩 돌면서 깊숙이 숨겨진 언어 데이터를 긁어모읍니다. (중첩 반복문)
  repoNodes.forEach((repo: any) => {
    const edges = repo?.languages?.edges;
    if (!edges) return;

    edges.forEach((edge: any) => {
      const { size } = edge;
      const { name, color } = edge.node;

      // 4. [핵심] 바구니에 이미 이 언어가 들어있다면 용량만 더해주고, 없으면 새로 박아넣기!
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

  // 5. 예쁘게 모인 바구니(객체)를 파이 차트가 원하는 형태인 배열([])로 변환합니다.
  // 객체의 key(언어 이름)를 가지고 map을 돌려 [{ name, value, color }] 형태로 정렬!
  const formattedData: LanguageData[] = Object.keys(languageMap).map(
    (name) => ({
      name,
      value: languageMap[name].value,
      color: languageMap[name].color,
    }),
  );

  // 6. [디테일] 차트 조각이 너무 많으면 더러우니, 코드 용량이 큰 순서대로 줄을 세워줍니다.
  return formattedData.sort((a, b) => b.value - a.value);
}
