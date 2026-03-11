import PokemonCard from "@/components/PokemonCard";
import { useEffect, useState } from "react";
import { ScrollView, StyleSheet, TextInput } from "react-native";

interface Pokemon {
  name: string;
  url: string;
}

export default function Index() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [result, setResult] = useState<Pokemon[]>([]);

  useEffect(() => {
    console.log("Entre en pantalla");
    getPokemons();
  }, []);

  const getPokemons = async () => {
    try {
      const URL = "https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0";
      const response = await fetch(URL, {
        method: "GET",
      });

      if (response.ok) {
        const data = await response.json();
        setResult(data.results);
        setPokemonList(data.results);
      } else {
        console.log("Bard Request");
      }
    } catch (error) {
      console.log("Ocurrió un error");
    }
  };
  const filterPokemon = (text: string) => {
    const arrayFilter = pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(text.toLowerCase()),
    );
    setResult(arrayFilter);
  };
  return (
    <ScrollView>
      <TextInput
        style={styles.text}
        onChangeText={filterPokemon}
        placeholder="Busca tu Pokemon"
      ></TextInput>
      {result.map((item) => {
        return (
          <PokemonCard
            key={item.name}
            name={item.name}
            url={item.url}
          ></PokemonCard>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  text: {
    borderRadius: 5,
    backgroundColor: "gray",
    width: 500,
    height: 30,
  },
});
