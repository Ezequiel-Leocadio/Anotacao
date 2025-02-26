import React from "react";
import { Text, View } from "react-native";
import { Container, Form, Title } from "./styles";
import { useEffect, useState } from "react";
import {
  handleItensEdit,
  storeData,
  getDataUrl,
  getData,
  getStoreData,
} from "../../services/data";

import Button from "../../components/button";
import { requestApi } from "../../services/api";
import Load from "../../components/load";
import FormInput from "../../components/Input";

function Sincronizar({ navigation, route }) {
  const [itens, setItens] = useState([]);
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  async function handleSinc() {
    // await storeData({ value: new Date(), tipo: "date" });

    setLoading(true);
    const dateGet: any = await getStoreData({ tipo: "date" });
    const itensGet: any = await getData({ tipo: "itens" });

    const res = await requestApi({
      route: "sincronizarnew",
      method: "post",
      data: { itens, date: dateGet || null, itensGet: itensGet.length },
    });

    if (res.success) {
      const itensf = itensGet;

      for await (const i of res.data) {
        const index = itensf.findIndex((f) => f.uuid === i.uuid);
        if (index >= 0) {
          itensf[index] = i;
        } else {
          itensf.push(i);
        }
      }

      await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
      await storeData({ value: JSON.stringify(res.date), tipo: "date" });

      navigation.navigate("Notas.");

      setItens([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      try {
        setUrl(String(await getDataUrl()));
        const i = await handleItensEdit();

        setItens(i);
        const dateGet: any = await getStoreData({ tipo: "date" });
        const itensGet: any = await getData({ tipo: "itens" });

        const res = await requestApi({
          route: "sincronizarnew",
          method: "post",
          data: { itens: i, date: dateGet || null, itensGet: itensGet.length },
        });
        // console.log(res);
        if (res.success) {
          // await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
          // navigation.navigate("Notas.");

          // setItens([]);
          const itensf = itensGet;

          for await (const i of res.data) {
            const index = itensf.findIndex((f) => f.uuid === i.uuid);

            if (index >= 0) {
              itensf[index] = i;
            } else {
              itensf.push(i);
            }
          }
          await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
          await storeData({ value: JSON.stringify(res.date), tipo: "date" });

          setItens([]);
          navigation.navigate("Notas.");
        }
      } catch (error) {
        alert(`${error}`);
      }
    });

    return unsubscribe;
  }, [navigation]);

  async function salveUrl() {
    await storeData({ tipo: "url", value: url });
  }

  return (
    <Container>
      <Title>Itens Para Sincronizar {itens.length}</Title>

      <Load loading={loading} />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="url"
          returnKeyType="next"
          value={url}
          onChangeText={(e) => {
            setUrl(e);
          }}
          label="URL"
        />

        <Button
          top={10}
          size={100}
          icon="save"
          color="info"
          onPress={() => salveUrl()}
        >
          Salvar URL (Link)
        </Button>
      </Form>

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
