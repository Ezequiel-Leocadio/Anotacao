import React from "react";
import { Text, View } from "react-native";
import { Container, Title } from "./styles";
import { useEffect, useState } from "react";
import { handleItensEdit, storeData } from "../../services/data";
import Button from "../../components/button";
import { requestApi } from "../../services/api";
import Load from "../../components/load";

function Sincronizar({ navigation, route }) {
  const [itens, setItens] = useState([]);

  const [loading, setLoading] = useState(false);

  async function handleSinc() {
    setLoading(true);
    const res = await requestApi({
      route: "sincronizar",
      method: "post",
      data: { itens },
    });

    if (res.success) {
      await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
      setItens([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      const i = await handleItensEdit();

      setItens(i);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Title>Itens Para Sincronizar {itens.length}</Title>

      <Load loading={loading} />
      <Button
        top={70}
        size={100}
        icon="sync"
        color="success"
        onPress={() => handleSinc()}
      >
        Sincronizar
      </Button>
    </Container>
  );
}

export default Sincronizar;
