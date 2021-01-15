import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { POKEMON_URI } from "../contants";

interface Props {}

const getPokemonByName = async (searchTerm: string) => {
  const response = await fetch(POKEMON_URI + `/pokemon/${searchTerm}`);
  const data = await response.json();

  return data;
};

const Search: React.FC<Props> = (): JSX.Element => {
  const [searchTerm, setSearchTerm] = useState("");
  const { data, refetch, isError, isLoading } = useQuery(
    ["searchedPokemons", searchTerm],
    () => getPokemonByName(searchTerm),
    { enabled: false, retry: false }
  );

  useEffect(() => {
    let id: NodeJS.Timeout;
    if (searchTerm) {
      id = setTimeout(() => {
        refetch();
      }, 1000);
    }
    return () => clearTimeout(id);
  }, [searchTerm, refetch]);

  return (
    <div className="flex p-4 min-h-screen bg-gray-50">
      <div className="flex flex-col mt-5 items-center w-4/6 bg-white m-auto p-10 rounded-3xl border-blue-200 border-solid border-2 shadow-2xl">
        <h2 className="font-medium text-2xl text-gray-600 w-auto text-center mb-5">
          Search for your favourite pokemon
        </h2>
        <h2 className="font-medium text-2xl text-gray-600 w-auto text-center mb-10 underline">
          <Link to="/">Or click to see them all</Link>
        </h2>
        <input
          type="text"
          onChange={(e) => setSearchTerm(e.target.value)}
          value={searchTerm}
          name="searchTerm"
          className="p-4 mb-4 rounded-3xl border-blue-200 border-solid border-2 shadow-lg w-2/3 outline-none"
        />
        <div className="container">{JSON.stringify(data, null, 1)}</div>
        {isError && <p className="text-3xl mt-10">Cannot find your pokemon</p>}
        {!!!searchTerm && (
          <p className="text-3xl mt-10">Place your search term</p>
        )}
        {isLoading && <p className="text-3xl mt-10">Loading...</p>}
      </div>
    </div>
  );
};

export default Search;
