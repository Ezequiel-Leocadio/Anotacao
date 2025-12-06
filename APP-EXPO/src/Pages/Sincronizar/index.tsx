import React from "react";
import { Alert, Platform, Text, View } from "react-native";
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

import AsyncStorage from "@react-native-async-storage/async-storage";

import { File, Directory, Paths } from "expo-file-system";
import * as FileSystem from "expo-file-system/legacy";

import * as Sharing from "expo-sharing";
import * as DocumentPicker from "expo-document-picker";

function Sincronizar({ navigation, route }) {
  const [itens, setItens] = useState([]);
  const [url, setUrl] = useState("");

  const [loading, setLoading] = useState(false);

  const exportData = async () => {
    try {
      // Obtém todas as chaves do AsyncStorage
      const keys = await AsyncStorage.getAllKeys();

      // Obtém os valores das chaves
      const items = await AsyncStorage.multiGet(keys);

      // Converte para um objeto JSON
      const jsonData = Object.fromEntries(items);

      // Caminho do arquivo para salvar

      // const fileUri = FileSystem.documentDirectory + "dados_app_notas.json";
      // const destination = new Directory(Paths.cache, "dados_app_notas.json");

      // Salva o JSON no dispositivo
      // await File.writeAsStringAsync(
      //   destination,
      //   JSON.stringify(jsonData, null, 2)
      // );
      const fileUri = `${FileSystem.documentDirectory}dados_app_notas.json`;

      // const file = new File(Paths.document, "dados_app_notas.json");
      // file.create();
      // await file.write(JSON.stringify(jsonData, null, 2), {
      //   encoding: "utf8",
      // });
      await FileSystem.writeAsStringAsync(
        fileUri,
        JSON.stringify(jsonData, null, 2)
      );

      // Compartilha o arquivo para download
      await Sharing.shareAsync(fileUri);

      alert("Arquivo exportado com sucesso!");
    } catch (error) {
      console.error("Erro ao exportar dados:", error);
    }
  };

  function base64DataUriToJson(dataUri: string): any {
    // Remove o prefixo 'data:application/json;base64,'
    const base64String = dataUri.split(",")[1];
    // console.log(dataUri);
    // Decodifica de Base64 para string
    // const jsonString = atob(base64String);

    // Decodifica base64 em uma string com caracteres corretos em UTF-8
    const decodedUtf8String = decodeURIComponent(
      Array.prototype.map
        .call(
          atob(base64String),
          (c: string) => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2)
        )
        .join("")
    );
    // Converte a string para objeto JSON
    return JSON.parse(decodedUtf8String);
  }

  const importData = async () => {
    try {
      // Abre o seletor de arquivos para escolher o JSON
      const result: any = await DocumentPicker.getDocumentAsync({
        type: "application/json",
        copyToCacheDirectory: true, // Garante que o arquivo pode ser lido
      });

      if (result.canceled) {
        alert("Importação cancelada.");
        return;
      }

      // Caminho do arquivo selecionado
      const fileUri = result.assets[0].uri;
      const fileBase64 = result.assets[0].base64;
      // console.log(result);
      if (Platform.OS === "web") {
        for (const [key, value] of Object.entries(
          base64DataUriToJson(fileBase64)
        )) {
          await AsyncStorage.setItem(key, value);
          // await AsyncStorage.setItem(key, JSON.stringify(value));
        }
        return;
      }

      // Verifica se o arquivo pode ser lido
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      if (!fileInfo.exists) {
        throw new Error("O arquivo não foi encontrado.");
      }

      // Lê o conteúdo do arquivo
      const jsonContent = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.UTF8,
      });

      // Converte para um objeto JSON
      const data = JSON.parse(jsonContent);

      // Salva os dados no AsyncStorage
      for (const [key, value] of Object.entries(data)) {
        // console.log(key);

        await AsyncStorage.setItem(key, value);
        // await AsyncStorage.setItem(key, JSON.stringify(value));
      }

      alert("Dados importados com sucesso!");
    } catch (error) {
      console.error("Erro ao importar dados:", error);
      alert("Erro ao importar dados!");
    }
  };

  async function handleSinc() {
    // await storeData({ value: new Date(), tipo: "date" });

    setLoading(true);
    const dateGet: any = await getStoreData({ tipo: "date" });
    const itensGet: any = await getData({ tipo: "itens" });
    const sementesGet: any = await getStoreData({ tipo: "sementes" });

    const res = await requestApi({
      route: "sincronizarnew",
      method: "post",
      data: {
        itens,
        date: dateGet || null,
        itensGet: itensGet.length,
        sementes: sementesGet,
      },
    });

    if (res.success) {
      const itensf = itensGet;

      for await (const i of res.data) {
        const index = itensf.findIndex((f: any) => f.uuid === i.uuid);
        if (index >= 0) {
          itensf[index] = i;
        } else {
          itensf.push(i);
        }
      }

      await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
      await storeData({ value: JSON.stringify(res.date), tipo: "date" });
      await storeData({
        value: JSON.stringify(res.sementes),
        tipo: "sementes",
      });
      await storeData({
        value: JSON.stringify(res.secoes),
        tipo: "secoes",
      });
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
        const sementesGet: any = await getStoreData({ tipo: "sementes" });

        const res = await requestApi({
          route: "sincronizarnew",
          method: "post",
          data: {
            itens: i,
            date: dateGet || null,
            itensGet: itensGet.length,
            sementes: sementesGet,
          },
        });
        // console.log(res);
        if (res.success) {
          // await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
          // navigation.navigate("Notas.");

          // setItens([]);
          const itensf = itensGet;

          for await (const i of res.data) {
            const index = itensf.findIndex((f: any) => f.uuid === i.uuid);

            if (index >= 0) {
              itensf[index] = i;
            } else {
              itensf.push(i);
            }
          }
          await storeData({ value: JSON.stringify(res.data), tipo: "itens" });
          await storeData({ value: JSON.stringify(res.date), tipo: "date" });
          await storeData({
            value: JSON.stringify(res.sementes),
            tipo: "sementes",
          });
          await storeData({
            value: JSON.stringify(res.secoes),
            tipo: "secoes",
          });

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
          onChangeText={(e: any) => {
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
        top={50}
        size={100}
        icon="sync"
        color="success"
        onPress={() => handleSinc()}
      >
        Sincronizar
      </Button>

      <Button
        top={30}
        size={100}
        icon="import-export"
        color="info"
        onPress={() => exportData()}
      >
        Exportar Dados
      </Button>

      <Button
        top={30}
        size={100}
        icon="import-export"
        color="success"
        onPress={() => importData()}
      >
        Importar Dados
      </Button>
    </Container>
  );
}

export default Sincronizar;
