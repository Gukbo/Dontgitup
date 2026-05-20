export interface PersonaInfo {
  profileImageUrl: string;
  name: string;
  id: string;
  followersCount: number;
  commitsCount: number;
  tier: DeveloperTier;
  badges: string[];
}

export type DeveloperTier =
  | "Bronze IV"
  | "Bronze III"
  | "Bronze II"
  | "Bronze I"
  | "Silver IV"
  | "Silver III"
  | "Silver II"
  | "Silver I"
  | "Gold IV"
  | "Gold III"
  | "Gold II"
  | "Gold I"
  | "Platinum IV"
  | "Platinum III"
  | "Platinum II"
  | "Platinum I"
  | "Diamond IV"
  | "Diamond III"
  | "Diamond II"
  | "Diamond I"
  | "Master"
  | "Grandmaster"
  | "Challenger";
