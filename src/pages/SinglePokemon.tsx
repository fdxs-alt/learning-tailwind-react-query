import React from "react";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import { POKEMON_URI } from "../contants";

interface Props {}

const fetchSinglePokemon = async (name: string) => {
  const res = await fetch(POKEMON_URI + `/pokemon/${name}/`);
  const data = await res.json();

  return data;
};

const SinglePokemon: React.FC<Props> = (): JSX.Element => {
  const { pokemonID } = useParams<{ pokemonID: string }>();
  const { data } = useQuery(["pokemon", pokemonID], () =>
    fetchSinglePokemon(pokemonID)
  );
  return <div>{data && JSON.stringify(data, null, 2)}</div>;
};

export default SinglePokemon;
