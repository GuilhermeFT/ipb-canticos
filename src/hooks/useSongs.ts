import { useState, useEffect, useCallback } from 'react'
import { Song, SongsData } from '../types'

// Import JSON data
const songsData: SongsData = require('../../assets/data/canticos.json')

export const useSongs = () => {
  const [songs, setSongs] = useState<Song[]>([])
  const [filteredSongs, setFilteredSongs] = useState<Song[]>([])
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const { nomes, letras } = songsData
    const songList: Song[] = nomes.map((nome, index) => ({
      id: index + 1,
      title: nome,
      lyrics: letras[index],
      index: index + 1,
    }))

    setSongs(songList)
    setFilteredSongs(songList)

    setLoading(false)
  }, [])

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs)
    } else {
      const filtered = songs.filter((song) =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredSongs(filtered)
    }
  }, [searchQuery, songs])

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query)
  }, [])

  return {
    songs: filteredSongs,
    searchQuery,
    handleSearch,
    loading,
    totalSongs: songs.length,
  }
}
