export interface Song {
  id: number
  title: string
  lyrics: string
  index: number
}

export interface SongWithSnippet extends Song {
  matchSnippet?: string
}

export interface SongsData {
  nomes: string[]
  letras: string[]
}

export type RootStackParamList = {
  '(tabs)': undefined
  'song/[id]': { song: string; id: string }
}

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
