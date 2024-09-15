export enum JerseyType {
  HOME = 'home',
  AWAY = 'away',
  THIRD = 'third',
  SPECIAL = 'special',
}

export type Ijersey = {
  id: string;
  team: string;
  type: JerseyType;
  number: string;
  player: string;
  season: string;
  imageUrl: string;
};
