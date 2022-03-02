import React from "react";
import Layout from "../components/Layout";
import Link from "next/Link";

export default function pokemon({ pokeman }) {

  return <Layout title={pokeman.name}>
    <h1 className="text-4xl mb-2 text-center capitalize">{pokeman.name}</h1>
    <img className="mx-auto" src={pokeman.image} alt={pokeman.name}/>
    <p><span className="font-bold mr-2">Weight: </span>{pokeman.weight}</p>
    <p><span className="font-bold mr-2">Height: </span>{pokeman.height}</p>
  </Layout>;
}

export async function getServerSideProps({ query }) {
  const id = query.id;
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
    const pokeman = await res.json();
    const paddedIndex = ("00" + id).slice(-3);
    const image = `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${paddedIndex}.png`;
    pokeman.image = image;
    return {
      props: { pokeman },
    };
  } catch {
    console.error(err);
  }
}
