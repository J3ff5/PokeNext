import React from "react";
import styles from "../styles/Home.module.css";
import Image from "next/image";

import Card from "../components/Card";

const maxPokemons = 151;

export default function Home() {
	const [pokemons, setPokemons] = React.useState([]);
	const getPokemons = React.useCallback(async () => {
		const api = "https://pokeapi.co/api/v2/pokemon/";

		const res = await fetch(`${api}?limit=${maxPokemons}/`);
		const data = await res.json();

		data.results.forEach((item, index) => {
			item.id = index + 1
		});

		setPokemons(data.results);
	}, []);

	React.useEffect(() => {
		getPokemons();
	}, [getPokemons]);

	return (
		<>
			<div className={styles.title_container}>
				<h1 className={styles.title}>
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
				{pokemons.map((pokemon) => (
					<Card key={pokemon.id} pokemon={pokemon} />
				))}
			</div>
		</>
	);
}
