export interface Song {
  id: number;
  title: string;
  lyrics: string;
  index: number;
}

export interface SongsData {
  nomes: string[];
  letras: string[];
}

export type RootStackParamList = {
  index: undefined;
  'song/[id]': { song: Song };
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}