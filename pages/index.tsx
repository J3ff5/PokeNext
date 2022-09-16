import React, { useCallback } from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import Card from "../components/Card";
import { Pagination } from "@mui/material";
import { IResponseGetPokemons } from "../utils/interfaces";
import { getLastElementInURL } from "../utils/utils";

const maxPokemons = process.env.NEXT_PUBLIC_MAXPOKEMONS;

export default function Home() {
	const [pokemons, setPokemons] = React.useState([]);
	const [currentPage, setCurrentPage] = React.useState(1);

	const getPokemons = React.useCallback(async () => {
		const res = await fetch(
      `${process.env.NEXT_PUBLIC_POKEMON}?offset=${(currentPage-1)*Number(maxPokemons)}&limit=${maxPokemons}/`
    );
    
		const data: IResponseGetPokemons = await res.json();

		data.results.forEach((item, index) => {
			item.id = Number(getLastElementInURL(item.url))
		});

		setPokemons((data as any).results);
	}, [currentPage]);

  const handleShowPokemons = React.useCallback(() => {
    return (
      pokemons?.map((pokemon: any) => (
        <>
          <Card key={pokemon.id} pokemon={pokemon} />
        </>
      ))
    )
  }, [pokemons]);

	React.useEffect(() => {
		getPokemons();
	}, [currentPage]);

	return (
    <>
      {/* <>
        {console.log({pokemons})}
      </> */}
      <div className={styles.title_container}>
        <h1
          className={styles.title}
          style={{
            textShadow: "5px 5px 20.575px",
          }}
        >
          Poke<span>Next</span>
        </h1>
        <Image
          src="/images/pokeball.png"
          alt="pokeball"
          width="50"
          height="50"
        />
      </div>
      <div className={styles.pokemon_container}>
        {handleShowPokemons()}
      </div>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Pagination
          count={Number(
            (1154 / Number(process.env.NEXT_PUBLIC_MAXPOKEMONS)).toFixed(0)
          )}
          page={currentPage}
          onChange={(event: React.ChangeEvent<unknown>, value: number) => {
            setCurrentPage(value);
          }}
        />
        {/* <>
          {console.log('*****************')}
        </> */}
      </div>
    </>
  );
}
