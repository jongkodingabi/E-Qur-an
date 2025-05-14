import { useState, useEffect } from "react";
import SurahList from "./SurahList";
import SearchBar from "../SearchBar";
import type { Surah } from "../../types/Surah";

function SurahContainer() {
  const [surahs, setSurahs] = useState<Surah[]>([]);
  const [filteredSurahs, setFilteredSurahs] = useState<Surah[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchSurahs = async () => {
      try {
        const response = await fetch("https://equran.id/api/v2/surat");
        if (!response.ok) {
          throw new Error("Failed to fetch surahs");
        }
        const data = await response.json();
        setSurahs(data.data);
        setFilteredSurahs(data.data);
        setIsLoading(false);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Unknown error");
        setIsLoading(false);
      }
    };

    fetchSurahs();
  }, []);

  // Filter surahs based on search query
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredSurahs(surahs);
    } else {
      const filtered = surahs.filter((surah) => {
        const searchLower = searchQuery.toLowerCase();
        return (
          surah.namaLatin.toLowerCase().includes(searchLower) ||
          surah.arti.toLowerCase().includes(searchLower) ||
          surah.nama.toLowerCase().includes(searchLower)
        );
      });
      setFilteredSurahs(filtered);
    }
  }, [searchQuery, surahs]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  if (isLoading) {
    return <p className="px-5 py-4">Loading...</p>;
  }

  if (error) {
    return <p className="px-5 py-4 text-red-500">{error}</p>;
  }

  return (
    <>
      <SearchBar value={searchQuery} onChange={handleSearchChange} />
      <SurahList surahs={filteredSurahs} />
      {filteredSurahs.length === 0 && (
        <p className="text-center text-subtle py-4">No surahs found</p>
      )}
    </>
  );
}

export default SurahContainer;
