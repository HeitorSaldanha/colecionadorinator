export enum JerseyType {
  HOME = "home",
  AWAY = "away",
  TRAINING = "training",
  SPECIAL = "special",
}

export type TJersey = {
  id: number;
  team: string;
  season: string;
  type: JerseyType;
  playerName?: string;
  playerNumber?: string;
  image: string;
  value: number;
};
