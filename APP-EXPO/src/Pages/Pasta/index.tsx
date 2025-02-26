import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import ButtonFloatC from "../../components/button/ButtonFloat";
import ButtonFloat from "../../components/button/Float";
import Icon from "@expo/vector-icons/MaterialIcons";
import { Container, NotaTitle, NotasContente, TextInput } from "./styles";
import InputModal from "../../components/Modal";
import {
  getData,
  handleDeleteItem,
  handleEdit,
  storeData,
} from "../../services/data";
import { AlertConfirm, StdAlert } from "../../components/Alert";
import * as Crypto from "expo-crypto";
import { requestApi } from "../../services/api";
import { WebSocketContext } from "../../WebSocket";

function Pasta({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const refSearch = useRef(null);
  const [search, setSearch] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [title, setTitle] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const ws: any = useContext(WebSocketContext);

  const [itenAdd, setItenAdd] = useState("");

  const [itens, setItens] = useState<any>([]);

  const { id, id_nivel, numPasta } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // do something
      // console.log(id, numPasta);

      await loadItens();
    });

    return unsubscribe;
  }, [navigation]);

  async function handleDelete() {
    await handleDeleteItem(id);
    navigation.goBack();
  }

  function headerRight() {
    return (
      <View style={{ display: "flex", flexDirection: "row" }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={async () => {
            if (
              await AlertConfirm(
                "Excluir Pasta",
                "Irá Excluir a Pasta  e Tudo que Está Nela!"
              )
            ) {
              handleDelete();
            }
          }}
        >
          <Icon name="delete" size={35} color="#f86161" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalEdit(true)}>
          <Icon name="edit" size={35} color="#92effc" />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    async function load() {
      const itensGet: any = await getData({ tipo: "itens" });
      const filter = itensGet.filter(
        (f) => String(f.id_nivel) === String(id_nivel)
      );
      setItens(filter);

      // if (id > 0) {
      const index = itensGet.findIndex((f) => String(f.id) === String(id));
      if (index >= 0) {
        //   console.log(itensGet[index]);
        setTitle(itensGet[index].title);
        navigation.setOptions({
          title: itensGet[index].title || "Pasta",

          // headerRight: headerRight,
        });
      }
      // }
    }

    load();
  }, []);

  async function loadItens() {
    const itensGet: any = await getData({ tipo: "itens" });

    const filter = itensGet.filter(
      (f) => String(f.id_nivel) === String(id_nivel)
    );

    // if (id > 0) {
    const index = itensGet.findIndex((f) => String(f.id) === String(id));
    if (index >= 0) {
      setTitle(itensGet[index].title);
      navigation.setOptions({
        title: itensGet[index].title || "Pasta",

        // headerRight: headerRight,
      });
    }
    // }
    setItens(filter);
  }

  async function handleAdd({ title, iten }) {
    if (iten === "pasta" && numPasta === 9) {
      StdAlert("Erro", "Vc Esta No Último Nivel de Pasta!");
      return;
    }
    // setLoading(true);
    const itensGet: any = await getData({ tipo: "itens" });

    const itensf = itensGet;
    let icon = "";
    switch (iten) {
      case "pasta":
        icon = "folder";
        break;

      case "list":
        icon = "list";
        break;

      case "nota":
        icon = "edit";
        break;

      case "receita":
        icon = "fastfood";
        break;

      default:
        break;
    }

    const uuid = Crypto.randomUUID();

    let idIten = uuid;
    // for await (const i of itensf) {
    //   if (i.id > idIten) {
    //     idIten = i.id;
    //   }
    // }
    // idIten = idIten + 1;

    itensf.push({
      id: idIten,
      tipo: iten,
      icon: icon,
      title: title,
      id_nivel: id,
      list: [],
      edit: true,
      uuid: uuid,
      existe: false,
    });
    await storeData({ tipo: "itens", value: JSON.stringify(itensf) });

    ws.sendMessage({
      data: {
        id: idIten,
        tipo: iten,
        icon: icon,
        title: title,
        id_nivel: id,
        list: [],
        edit: true,
        uuid: uuid,
        existe: false,
      },
      message: iten,
    });
    await loadItens();

    setModalVisible(false);
    setTitle("");

    // setTimeout(() => {
    //   setLoading(false);
    // }, 50);
    // console.log(numPasta);
    if (iten === "nota") {
      navigation.navigate("Notas", { id: idIten });
    } else if (iten === "list") {
      navigation.navigate("Lista", { id: idIten });
    } else if (iten === "receita") {
      navigation.navigate("Notas", { id: idIten });
    } else if (iten === "pasta") {
      navigation.navigate("Pasta" + numPasta, {
        id: idIten,
        id_nivel: idIten,
        numPasta: numPasta === 9 ? 0 : numPasta + 1,
      });
    }
  }

  async function handleEditTitle(e) {
    await handleEdit({ id, anotacao: "", list: [], title: e });

    await loadItens();
    setModalEdit(false);
  }

  function handleRoute(e) {
    setSearch(false);
    setTextSearch("");
    if (e.tipo === "nota") {
      navigation.navigate("Notas", { id: e.id });
    } else if (e.tipo === "pasta") {
      navigation.navigate("Pasta" + numPasta, {
        id: e.id,
        id_nivel: e.id,

        numPasta: numPasta === 9 ? 0 : numPasta + 1,
      });
    } else if (e.tipo === "list") {
      navigation.navigate("Lista", { id: e.id });
    } else if (e.tipo === "receita") {
      navigation.navigate("Notas", { id: e.id });
    }
  }

  async function handleSearch(e) {
    setTextSearch(e);
    const itensGet: any = await getData({ tipo: "itens" });
    const itensf = itensGet.filter(
      (f) => String(f.id_nivel) === String(id_nivel)
    );

    const filter = itensGet.filter((f) =>
      f.title.toUpperCase().match(e.toUpperCase())
    );
    if (filter.length > 0 && e !== "") {
      // if (filter.length === 1 && Number(e) > 0) {
      //   handleRoute(filter[0]);
      // }
      setItens(filter);
    } else {
      setItens(itensf);
    }
  }

  async function handleSearchId(e) {
    // setTextSearch(e);
    const itensGet: any = await getData({ tipo: "itens" });
    const itensf = itensGet.filter(
      (f) => String(f.id_nivel) === String(id_nivel)
    );

    const filter = itensGet.filter(
      (f) => Number(f.codigo) === Number(textSearch)
    );

    if (filter.length > 0) {
      handleRoute(filter[0]);

      setItens(filter);
    } else {
    }
    setItens(itensf);
  }

  return (
    <View style={{ flex: 1 }}>
      <Container>
        {!loading && (
          <>
            {itens.map((e) => (
              <NotasContente key={String(e.id)} onPress={() => handleRoute(e)}>
                <Icon name={e.icon} size={35} color="#fff" />
                <NotaTitle>{e.title}</NotaTitle>
                <Icon name="drag-handle" size={35} color="#fff" />
              </NotasContente>
            ))}
          </>
        )}

        <InputModal
          modalVisible={modalEdit}
          title="Editar Título Pasta"
          buttonOneTitle="..."
          onRequestClose={() => setModalEdit(false)}
          onPressOne={async (title) => {
            //   setModalVisible(false);
            //   validatePasswordEtc();

            handleEditTitle(title);
          }}
          defaultValue={title}
          placeholder="..."
        />

        <InputModal
          modalVisible={modalVisible}
          title="Informe um Título"
          buttonOneTitle="..."
          onRequestClose={() => setModalVisible(false)}
          onPressOne={async (title) => {
            //   setModalVisible(false);
            //   validatePasswordEtc();

            handleAdd({ iten: itenAdd, title });
          }}
          placeholder="..."
        />
      </Container>
      {search && (
        <TextInput
          ref={refSearch}
          placeholder="Pesquisar, Titulo ou Código"
          value={textSearch}
          onChangeText={handleSearch}
          onSubmitEditing={handleSearchId}
        />
      )}
      {id === 0 ? (
        <>
          {/* <ButtonFloat
            color="info"
            icon="picture-as-pdf"
            bottom={170}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={(e) => {
              navigation.navigate("PDF");
            }}
          /> */}
          <ButtonFloat
            color="warning"
            icon="search"
            name="Buscar"
            bottom={100}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={(e) => {
              setSearch((e) => !e);
              setTimeout(() => {
                if (refSearch.current) {
                  refSearch.current.focus();
                }
              }, 10);
            }}
          />
        </>
      ) : (
        <>
          <ButtonFloat
            color="danger"
            icon="delete"
            name="Excluir"
            bottom={160}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={async () => {
              if (
                await AlertConfirm(
                  "Excluir Pasta",
                  "Irá Excluir a Pasta  e Tudo que Está Nela!"
                )
              ) {
                handleDelete();
              }
            }}
          />

          <ButtonFloat
            color="info"
            icon="edit"
            name="Editar"
            bottom={90}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={() => {
              setModalEdit(true);
            }}
          />
        </>
      )}

      <ButtonFloatC
        color="success"
        icon="add"
        bottom={20}
        position="right"
        onKeyBoardHidden={true}
        onEvent={(e) => {
          setItenAdd(e);
          setModalVisible(true);
        }}
      />
    </View>
  );
}

export default Pasta;
