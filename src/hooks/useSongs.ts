import { useState, useEffect, useCallback, useMemo } from 'react'
import { Song, SongWithSnippet, SongsData } from '../types'

const songsData: SongsData = require('../../assets/data/canticos.json')

const extractSnippet = (lyrics: string, query: string): string | undefined => {
  const lowerQuery = query.toLowerCase()
  const lines = lyrics.split('\n')
  const matchingLine = lines.find((line) =>
    line.toLowerCase().includes(lowerQuery)
  )
  if (!matchingLine) return undefined
  const trimmed = matchingLine.trim()
  return trimmed.length > 60 ? trimmed.slice(0, 57) + '...' : trimmed
}

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [filteredSongs, setFilteredSongs] = useState<SongWithSnippet[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [selectedLetter, setSelectedLetter] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const { nomes, letras } = songsData
    const songList: Song[] = nomes.map((nome, index) => ({
      id: index + 1,
      title: nome,
      lyrics: letras[index] ?? '',
      index: index + 1,
    }))
    setSongs(songList)
    setFilteredSongs(songList)
    setLoading(false)
  }, [])

  const availableLetters = useMemo<string[]>(() => {
    const letters = new Set(
      songs
        .map((s) => s.title[0]?.toUpperCase() ?? '')
        .filter((l) => l.length > 0)
    )
    return Array.from(letters).sort()
  }, [songs])

  useEffect(() => {
    const query = searchQuery.trim().toLowerCase()
    const letter = selectedLetter

    if (!query && !letter) {
      setFilteredSongs(songs)
      return
    }

    const result: SongWithSnippet[] = []

    for (const song of songs) {
      if (letter && song.title[0]?.toUpperCase() !== letter) continue

      if (!query) {
        result.push(song)
        continue
      }

      if (song.title.toLowerCase().includes(query)) {
        result.push(song)
        continue
      }

      if (song.lyrics.toLowerCase().includes(query)) {
        const snippet = extractSnippet(song.lyrics, query)
        result.push({ ...song, matchSnippet: snippet })
      }
    }

    setFilteredSongs(result)
  }, [searchQuery, selectedLetter, songs])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
    setSelectedLetter('')
  }, [])

  const handleLetterSelect = useCallback((letter: string) => {
    setSelectedLetter((prev) => (prev === letter ? '' : letter))
    setSearchQuery('')
  }, [])

  return {
    songs: filteredSongs,
    searchQuery,
    handleSearch,
    selectedLetter,
    handleLetterSelect,
    availableLetters,
    loading,
    totalSongs: songs.length,
  }
}
