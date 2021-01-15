import React from "react";
import { Link } from "react-router-dom";

interface Props {
  pokemon: { name: string };
}

const PokemonLink: React.FC<Props> = ({ pokemon }): JSX.Element => {
  return (
    <p className="w-2/3 font-normal mt-8 p-4 border-blue-200 border-solid border-2 shadow-xl rounded-xl text-xl pointer text-center">
      <Link to={`/pokemon/${pokemon.name}`}>{pokemon.name}</Link>
    </p>
  );
};

export default PokemonLink;
