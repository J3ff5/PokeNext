import Image from "next/image";
import Link from "next/link";
import React from "react";

import styles from "../styles/Card.module.css"

export default function Card({ pokemon }) {
	const myLoader = () => {
		return `${process.env.NEXT_PUBLIC_POKEDEX}${pokemon.id}.png`;
	};

 	return (
		<div className={styles.card} >
			<Image
				loader={myLoader}
				src={`${process.env.NEXT_PUBLIC_POKEDEX}${pokemon.id}.png`}
				width="120"
				height="120"
				alt={pokemon.name}
			/>
			<p className={styles.id} >#{pokemon.id}</p>
			<h3 className={styles.title} >{pokemon.name}</h3>
			<Link href={`/pokemon/${pokemon.id}`}>
				<a className={styles.btn} >Detalhes</a>
			</Link>
		</div>
	);
}
