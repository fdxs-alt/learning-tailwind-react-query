import React, { useRef } from "react";
import { useInfiniteQuery } from "react-query";
import { Link } from "react-router-dom";
import PokemonLink from "../components/PokemonLink";
import { POKEMON_URI } from "../contants";

interface Props {}

const fetchPokemons = async ({ pageParam = 0 }) => {
  const response = await fetch(POKEMON_URI + `/pokemon?offset=${pageParam}`);
  const data = await response.json();

  return data;
};

type PokemonData = {
  results: {
    name: string;
  }[];
};

const Main: React.FC<Props> = (): JSX.Element => {
  const pageRef = useRef(0);
  const {
    status,
    data,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<PokemonData>("pokemons", fetchPokemons, {
    getNextPageParam: (_, __) => {
      pageRef.current += 20;
      return pageRef.current;
    },
  });

  return (
    <div className="flex p-4 min-h-screen bg-gray-50">
      <div className="flex flex-col mt-5 justify-center items-center w-4/6 bg-white m-auto p-10 rounded-3xl border-blue-200 border-solid border-2 shadow-2xl ">
        <h2 className="font-medium text-2xl text-gray-600 w-auto text-center mb-5">
          Find for your favourite among all pokemons
        </h2>
        <h2 className="font-medium text-2xl text-gray-600 w-auto text-center mb-5 underline">
          <Link to={`/search`}>Or click to search for it!</Link>
        </h2>
        <h2 className="font-medium text-2xl text-gray-600 w-auto text-center mb-10">
          Click one to see JSON
        </h2>
        {status === "error" && (
          <p className="font-medium text-xl p-4 text-center text-red-500 w-auto">
            Error occured during ferching...
          </p>
        )}

        {status === "success" && data && (
          <>
            {data.pages.map((group, i) => (
              <React.Fragment key={i}>
                {group.results.map((pokemon, i) => (
                  <PokemonLink key={i} pokemon={pokemon} />
                ))}
              </React.Fragment>
            ))}
          </>
        )}
        {(status === "loading" || isFetchingNextPage) && (
          <p className="font-medium text-xl p-4 text-center italic w-auto">
            Loading...
          </p>
        )}
        <button
          onClick={() => fetchNextPage()}
          className={`mt-9 p-4 shadow-2xl rounded-xl disabled:opacity-50 text-xl bg-blue-600 text-white outline-none`}
          disabled={status === "loading"}
        >
          Get more pokes!
        </button>
      </div>
    </div>
  );
};

export default Main;
