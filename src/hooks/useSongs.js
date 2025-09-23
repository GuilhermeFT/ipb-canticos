import { useState, useEffect } from 'react';
import songsData from '../data/canticos.json';

export const useSongs = () => {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      // Process the JSON data to create song objects
      const { nomes, letras } = songsData;
      const songList = nomes.map((nome, index) => ({
        id: index + 1,
        title: nome,
        lyrics: letras[index],
        index: index + 1,
      }));

      setSongs(songList);
      setFilteredSongs(songList);
    } catch (error) {
      console.error('Error loading songs:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredSongs(songs);
    } else {
      const filtered = songs.filter(song =>
        song.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredSongs(filtered);
    }
  }, [searchQuery, songs]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return {
    songs: filteredSongs,
    searchQuery,
    handleSearch,
    loading,
    totalSongs: songs.length,
  };
};