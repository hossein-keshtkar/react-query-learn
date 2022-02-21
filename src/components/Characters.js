import { useQuery } from "react-query";
import React, { useState } from "react";
import Character from "./Character";
import "./characters.css";

export default function Characters() {
  const [page, setPage] = useState(1);
  const fetchCharacters = async ({ queryKey }) => {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character?page=${queryKey[1]}`
    );
    // console.log(queryKey);
    return response.json();
  };

  const { data, status, isPreviousData } = useQuery(
    ["characters", page],
    fetchCharacters,
    {
      keepPreviousData: true,
    }
  );
  // console.log(data);
  console.log(isPreviousData);

  if (status === "loading") {
    return <div className="characters">Loading...</div>;
  }

  if (status === "error") {
    return <div className="characters">Error</div>;
  }

  return (
    <div className="display">
      {data.results.map((character) => (
        <Character key={character.id} character={character}>
          {character.name}
        </Character>
      ))}
      <div>
        <button
          disabled={page === 1}
          onClick={() => setPage((page) => page - 1)}
        >
          Previous
        </button>
        <button
          disabled={isPreviousData && data.info.next === null}
          onClick={() => setPage((page) => page + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}
