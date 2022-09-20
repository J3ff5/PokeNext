import React, { useCallback } from "react";
import { useRouter } from "next/router";
import Image, { ImageLoader } from "next/image";
import CircularProgress from "@mui/material/CircularProgress";

import styles from "../../styles/Pokemon.module.css";
import {
  Egg,
  EggAltOutlined,
  EggAltTwoTone,
  EggOutlined,
  EggTwoTone,
  Map,
} from "@mui/icons-material";
import {
  EColorStat,
  EConvertNumber,
  EStat,
  IChainEvolution,
  IChainEvolutionChain,
  IPlace,
  IPokemon,
  ISpecies,
  IStats,
} from "../../utils/interfaces";
import { getLastElementInURL } from "../../utils/utils";

export default function Pokemon() {
  const [pokemonData, setPokemonData] = React.useState<IPokemon | null>(null);
  const [location, setLocation] = React.useState<IPlace[]>([]);
  const [status, setStatus] = React.useState<IStats[]>([]);
  const [species, setSpecies] = React.useState<ISpecies>({} as ISpecies);
  const [evolutionChain, setEvolutionChain] = React.useState<IChainEvolution>(
    {} as IChainEvolution
  );

  const [loading, setLoading] = React.useState(false);
  const router = useRouter();
  const id = router.query.pokemonId;

  const myLoader = () => {
    setLoading(true);
    return `${process.env.NEXT_PUBLIC_POKEDEX}${id}.png`;
  };

  const showDetaisPokemon = React.useCallback(() => {
    return (
      <>
        <div>
          <>
            <h3>Número:</h3>
            <p>#{pokemonData?.id}</p>
          </>
        </div>
        <div>
          <h3>Tipo:</h3>
          <div className={styles.types_container}>
            {pokemonData?.types?.map((item, index) => (
              <span
                key={index}
                className={`${styles.type} ${styles["type_" + item.type.name]}`}
              >
                {item?.type?.name}
              </span>
            ))}
          </div>
        </div>
        <div className={styles.data_container}>
          <div className={styles.data_height}>
            <h4>Altura:</h4>
            <p>{Number(pokemonData?.height) * 10}cm</p>
          </div>
          <div className={styles.data_weight}>
            <h4>Peso:</h4>
            <p>{Number(pokemonData?.weight) / 10}kg</p>
          </div>
        </div>
      </>
    );
  }, [pokemonData]);

  const handlePlaceFound = () => {
    setLoading(true);

    fetch(`${process.env.NEXT_PUBLIC_POKEMON}${id}/encounters`)
      .then((res) => res.json())
      .then((data) => {
        setLocation(data);
        setLoading(false);
      });
  };

  const handleGeneration = (ger: string): string => {
    if (ger) {
      return `${EConvertNumber[ger?.replace("generation-", "")] + 1}° Geração `;
    } else {
      return "";
    }
  };

  const showPlaces = React.useMemo(() => {
    return (
      location?.length !== 0 && (
        <div className={styles.pokemon_row}>
          <div className={styles.column_name}>Onde pode ser encontrado</div>
          <div className={styles.column_value}>
            <>
              {location?.map((e, i) => (
                <div key={`location_${i}`} className={styles.row_place}>
                  <Map className={styles.icon_map} />
                  <p>{e?.location_area?.name?.replace(/-/g, " ")}</p>
                </div>
              ))}
            </>
          </div>
        </div>
      )
    );
  }, [location]);

  const handleColorStst = (key: string) => {
    // console.log("color");

    if (key) {
      document
        ?.getElementById(key)
        ?.style?.setProperty("border-color", EColorStat[key]);
    }
  };

  const showEggGroups = React.useCallback(() => {
    return (
      <>
        <div className={styles.pokemon_row}>
          <div>
            <EggTwoTone className={styles.icon_egg} />
            <EggTwoTone className={styles.icon_egg1} />
            <EggOutlined className={styles.icon_egg2} />
          </div>
        </div>
      </>
    );
  }, []);

  const showStats = React.useMemo(() => {
    return (
      <div className={styles.pokemon_row}>
        {status?.map((e, i) => (
          <div
            key={e?.stat?.name}
            className={styles.field_stat}
            id={e?.stat?.name}
          >
            <div key={`sn_${i}`} className={styles.stat_name}>
              {EStat[e?.stat?.name]}
              {/* {handleColorStst(e?.stat?.name)} */}
            </div>
            <div key={`sv_${i}`} className={styles.stat_value}>
              {e?.base_stat}
            </div>
            {/* <>
              {console.log('showStats')}
            </> */}
          </div>
        ))}
      </div>
    );
  }, [status]);

  const handlePokemon = () => {
    fetch(`${process.env.NEXT_PUBLIC_POKEMON}${id}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemonData(data);
        setStatus(data.stats);
      });
  };

  const handleChainEvolution = (url: string) => {
    // console.log({species})
    // console.log('--------------',
    //   species?.evolution_chain?.url
    // );
    // const idEvolution = getLastElementInURL(species?.evolution_chain?.url)
    const idEvolution = getLastElementInURL(url);
    fetch(`${process.env.NEXT_PUBLIC_EVOLUTION}${idEvolution}`)
      .then((res) => res.json())
      .then((data) => {
        console.log({ evolution: data });
        setEvolutionChain(data);
      })
      .catch(() => setEvolutionChain({} as IChainEvolution));
  };

  const showEvolution = React.useMemo(() => {
    const replaceURL = (str: string) => {
      return `${window.location.href.split("/").slice(0, -1).join("/")}/${str}`;
    };
    const deeping = (a: IChainEvolutionChain) => {
      if (Array.isArray(a?.evolves_to) && a?.evolves_to.length >= 1) {
        let urlImag = () =>
          `${process.env.NEXT_PUBLIC_POKEDEX}${getLastElementInURL(
            a?.species?.url
          )}.png`;

        console.log("if");

        return (
          <div className={styles.evolution_pokemon}>
            <a href={replaceURL(getLastElementInURL(a?.species?.url))}>
              <div className={styles.evolutions}>
                <Image
                  loader={urlImag}
                  src={urlImag()}
                  width="100"
                  height="100"
                  alt={a?.species?.name}
                />

                {`${a?.species?.name} - N°${getLastElementInURL(
                  a?.species?.url
                )}`}
              </div>
            </a>

            <div className={styles.evolution_pokemon_plus}>
              {a?.evolves_to.map((e, i) => {
                const reponseDeeping = deeping(e);
                let returnDeepingArray = String(reponseDeeping).split("°");
                let urlImage2 = () =>
                  `${process.env.NEXT_PUBLIC_POKEDEX}${
                    returnDeepingArray[returnDeepingArray.length - 1]
                  }.png`;
                const whoIsThatPokemon = String(reponseDeeping).split(" - ")[0];

                return (
                  <>
                    <a
                      style={{ justifyContent: "center" }}
                      key={a?.species?.name}
                      href={replaceURL(
                        getLastElementInURL(
                          returnDeepingArray[returnDeepingArray.length - 1]
                        )
                      )}
                    >
                      <div className={styles.evolution_map}>
                        {e?.evolves_to?.length < 1 && (
                          <Image
                            loader={urlImage2}
                            src={`${process.env.NEXT_PUBLIC_POKEDEX}${
                              returnDeepingArray[returnDeepingArray.length - 1]
                            }.png`}
                            width="100"
                            height="100"
                            alt={whoIsThatPokemon}
                          />
                        )}
                        {reponseDeeping}
                      </div>
                    </a>
                  </>
                );
              })}
            </div>
          </div>
        );
      } else {
        console.log("else");
        return `${a?.species?.name} - N°${getLastElementInURL(
          a?.species?.url
        )}`;
      }
    };

    return (
      <div className={styles.pokemon_evolve}>
        <div>
          <h3>Evoluções</h3>
        </div>
        <div className={styles.pokemon_evolutions}>
          {evolutionChain && deeping(evolutionChain.chain)}
        </div>
      </div>
    );
  }, [evolutionChain]);

  const handleSpecies = () => {
    fetch(`${process.env.NEXT_PUBLIC_SPECIES}${id}`)
      .then((res) => res.json())
      .then((data: ISpecies) => {
        console.log({ Species: data });
        setSpecies(data);
        handleChainEvolution(data.evolution_chain.url);
      })
      .catch(() => setSpecies({} as ISpecies));
  };

  React.useEffect(() => {
    status?.map((e, i) => handleColorStst(e?.stat?.name));
  }, [status]);

  React.useEffect(() => {
    if (id) {
      handlePokemon();
      handlePlaceFound();
      handleSpecies();
    }
  }, [id]);

  return (
    <div className={styles.pokemon_container}>
      <h1 className={styles.pokemon_title}>{pokemonData?.name}</h1>
      <p className={styles.generation}>
        {handleGeneration(species?.generation?.name)}
      </p>
      <Image
        loader={myLoader}
        src={`${process.env.NEXT_PUBLIC_POKEDEX}${id}.png`}
        width="200"
        height="200"
        alt={pokemonData?.name}
      />
      {loading ? (
        <>{pokemonData ? showDetaisPokemon() : <CircularProgress />}</>
      ) : (
        <CircularProgress />
      )}
      {status?.length !== 0 && showStats}
      {location?.length !== 0 && showPlaces}
      {Object.keys(species).length !== 0 && showEvolution}
    </div>
  );
}
