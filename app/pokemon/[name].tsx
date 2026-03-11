import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";

export default function PokemonDetailsScreen() {
  const params = useLocalSearchParams();

  const [PokemonData, setPokemonData] = useState(null);

  useEffect(() => {
    getPokemonData();
  }, []);
  const getPokemonData = async () => {
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${params.name}`,
    );
    const json = await response.json();
    setPokemonData(json);
  };
  return (
    <View>
      <Text>{JSON.stringify(PokemonData)}</Text>
    </View>
  );
}
