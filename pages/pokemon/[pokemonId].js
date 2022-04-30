import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import styles from "../../styles/Pokemon.module.css"

export default function Pokemon() {
	const [pokemonData, setPokemonData] = React.useState(null);
	const router = useRouter();
	const id = router.query.pokemonId;

	const myLoader = () => {
		return `https://cdn.traction.one/pokedex/pokemon/${id}.png`;
	};

	React.useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setPokemonData(data);
			});
	}, [id]);

	return (
		<div className={styles.pokemon_container}>
			<h1 className={styles.pokemon_title}>{pokemonData?.name}</h1>
			<Image
				loader={myLoader}
				src={`https://cdn.traction.one/pokedex/pokemon/${id}.png`}
				width="200"
				height="200"
				alt={pokemonData?.name}
			/>
			<div>
				<h3>Número:</h3>
				<p>#{pokemonData?.id}</p>
			</div>
			<div>
				<h3>Tipo:</h3>
				<div className={styles.types_container}>
					{pokemonData?.types.map((item, index) => (
						<span
							key={index}
							className={`${styles.type} ${styles["type_" + item.type.name]}`}
						>
							{item.type.name}
						</span>
					))}
				</div>
			</div>
			<div className={styles.data_container} >
				<div className={styles.data_height}>
					<h4>Altura:</h4>
					<p>{pokemonData?.height * 10}cm</p>
				</div>
				<div className={styles.data_weight}>
					<h4>Peso:</h4>
					<p>{pokemonData?.weight / 10}kg</p>
				</div>
			</div>
		</div>
	);
}
