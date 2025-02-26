import React, { useContext, useEffect, useRef, useState } from "react";
import { View, TouchableOpacity, Button } from "react-native";
import {
  getData,
  handleDeleteItem,
  handleEdit,
  handleFind,
  storeData,
} from "../../services/data";
import ListCheckbox from "../../components/ListCheckBox";
import Load from "../../components/load";
import Icon from "@expo/vector-icons/MaterialIcons";
import {
  ScrollItens,
  Container,
  TextInput,
  ContentAdd,
  TextInputAdd,
} from "./styles";
import { AlertConfirm, StdAlert } from "../../components/Alert";
import { WebSocketContext } from "../../WebSocket";
import ButtonFloat from "../../components/button/Float";

const App = ({ navigation, route }) => {
  const refScroll = useRef();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [textAdd, setTextAdd] = useState("");
  const ws: any = useContext(WebSocketContext);
  const [uuid, setUuid] = useState(null);
  const [opcoes, setOpcoes] = useState(false);

  const [list, setList] = useState([]);
  const [listAll, setListAll] = useState([]);

  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const { title, list, uuid } = await handleFind(id);

      setTitle(title);
      setUuid(uuid);
      const listf = list.filter((f) => !f.delet);
      setListAll(list);

      setList(listf.map((e) => ({ ...e })));
      // console.log(listf);

      if (refScroll.current) {
        const e: any = refScroll.current;

        e.scrollToEnd();
      }
    }

    load();
  }, []);

  async function handleDelete(e, idEdit) {
    setLoading(true);

    const itensGet: any = await getData({ tipo: "itens" });
    const index = itensGet.findIndex((f) => f.id === id);
    if (index >= 0) {
      const i = list;
      const indexEdit = i.findIndex((f: any) => f.id === idEdit);

      if (indexEdit >= 0) {
        // i.splice(indexEdit, 1);

        i[indexEdit].delet = true;
        i[indexEdit].edit = true;
      }

      itensGet[index].list = i;
      itensGet[index].edit = true;
      const listf = i.filter((f) => !f.delet);
      setListAll(i);
      setList(listf);
    }

    await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });

    setTimeout(() => {
      setLoading(false);
    }, 5);
  }

  async function handleDeleteItens() {
    // setLoading(true);

    const itensGet: any = await getData({ tipo: "itens" });
    const index = itensGet.findIndex((f) => f.id === id);
    if (index >= 0) {
      const i = itensGet[index].list.map((f: any) => ({
        ...f,
        edit: f.marcado || false,
        delet: f.marcado || false,
      }));

      itensGet[index].list = i;
      itensGet[index].edit = true;
      const listf = i.filter((f) => !f.delet);
      setListAll(i);
      console.log(i);
      setList(listf);
    }

    await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });

    setTimeout(() => {
      setLoading(false);
    }, 5);
  }

  async function handleEditMarcado(e, idEdit) {
    // setLoading(true);
    const i: any = list;

    const itensGet: any = await getData({ tipo: "itens" });
    const index = itensGet.findIndex((f) => f.id === id);

    if (index >= 0) {
      const indexEdit = i.findIndex((f) => f.id === idEdit);

      if (indexEdit >= 0) {
        i[indexEdit].marcado = !i[indexEdit].marcado;
        itensGet[index].list = i;
        itensGet[index].edit = true;
        const listf = i.filter((f) => !f.delet);

        setList(listf);
      }
    }

    await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });
    setTimeout(() => {
      setLoading(false);
    }, 5);
  }

  async function handleAdd({ descricao, posicao, idEdit }) {
    const itensGet: any = await getData({ tipo: "itens" });
    const index = itensGet.findIndex((f) => f.id === id);
    if (index >= 0) {
      let idIten = 0;
      for await (const i of list) {
        if (i.id > idIten) {
          idIten = i.id;
        }
      }
      idIten = idIten + 1;
      const i = {
        id: idIten,
        id_nota: id,
        posicao: posicao,
        descricao: descricao,
        marcado: false,
      };
      const indexEdit = list.findIndex((f) => f.id === idEdit);

      if (indexEdit >= 0) {
        list[indexEdit].descricao = descricao;
      } else {
        list.push(i);
      }
      const indexEditAll = listAll.findIndex((f) => f.id === idEdit);

      if (indexEditAll >= 0) {
        listAll[indexEditAll].descricao = descricao;
      } else {
        listAll.push(i);
      }

      itensGet[index].list = list;
      itensGet[index].edit = true;
    }

    await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });

    setTextAdd("");

    setTimeout(() => {
      if (refScroll.current) {
        const e: any = refScroll.current;

        e.scrollToEnd();
      }
    }, 20);
  }

  async function handleDeleteLista() {
    await handleDeleteItem(id);
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      title: title,

      // headerRight: () => (
      //   <View style={{ display: "flex", flexDirection: "row" }}>
      //     <TouchableOpacity
      //       style={{ marginRight: 10 }}
      //       onPress={async () => {
      //         if (
      //           await AlertConfirm("Excluir Lista", "Irá Excluir a Lista Toda!")
      //         ) {
      //           handleDeleteLista();
      //         }
      //       }}
      //     >
      //       <Icon name="delete" size={35} color="#f86161" />
      //     </TouchableOpacity>
      //     <TouchableOpacity
      //       style={{ marginRight: 10 }}
      //       onPress={() => {
      //         handleEdit({ id, anotacao: "", list: listAll, title });
      //         ws.sendMessage({
      //           data: {
      //             id,
      //             anotacao: "",
      //             list: listAll,
      //             title,
      //             uuid,
      //             image: "",
      //           },
      //           message: "lista",
      //         });
      //         // console.log(list);
      //         StdAlert("Salvo", "Lista Salva");
      //       }}
      //     >
      //       <Icon name="save" size={35} color="#92effc" />
      //     </TouchableOpacity>

      //     <TouchableOpacity
      //       onPress={async () => {
      //         if (
      //           await AlertConfirm(
      //             "Limpar Itens",
      //             "Irá Excluir os Itens Riscados"
      //           )
      //         ) {
      //           handleDeleteItens();
      //         }
      //       }}
      //     >
      //       <Icon name="clear" size={35} color="#f86161" />
      //     </TouchableOpacity>
      //   </View>
      // ),
    });
  }, [navigation, title, uuid, listAll]);

  return (
    <Container>
      <ScrollItens ref={refScroll}>
        <Load loading={loading} />
        <TextInput placeholder="Titulo" value={title} onChangeText={setTitle} />

        <ListCheckbox
          handleEditMarcado={handleEditMarcado}
          handleDelete={handleDelete}
          itens={list.filter((f) => !(f.marcado === true || f.marcado === 1))}
          itens2={list.filter((f) => f.marcado === true || f.marcado === 1)}
        />
      </ScrollItens>

      <ContentAdd>
        <TextInputAdd
          placeholder="Inserir Item"
          value={textAdd}
          returnKeyType="send"
          onSubmitEditing={() =>
            handleAdd({
              descricao: textAdd,
              posicao: list.length + 1,
              idEdit: -1,
            })
          }
          onChangeText={setTextAdd}
        />

        <TouchableOpacity
          onPress={() =>
            handleAdd({
              descricao: textAdd,
              posicao: list.length + 1,
              idEdit: -1,
            })
          }
        >
          <Icon
            name="add"
            size={35}
            color="#fff"
            style={{
              borderLeftWidth: 2,
              borderLeftColor: "#000",
              //   borderLeftStyle: 'solid',
            }}
          />
        </TouchableOpacity>
      </ContentAdd>

      {opcoes && (
        <>
          <ButtonFloat
            color="danger"
            icon="delete"
            name="Excluir"
            bottom={270}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={async (e) => {
              if (
                await AlertConfirm("Excluir Lista", "Irá Excluir a Lista Toda!")
              ) {
                handleDeleteLista();
              }
              setOpcoes(false);
            }}
          />
          <ButtonFloat
            color="dark"
            icon="clear"
            name="Limpar"
            bottom={200}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={async (e) => {
              if (
                await AlertConfirm(
                  "Limpar Itens",
                  "Irá Excluir os Itens Riscados"
                )
              ) {
                handleDeleteItens();
              }
              setOpcoes(false);
            }}
          />

          <ButtonFloat
            color="success"
            icon="save"
            name="Salvar"
            bottom={130}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={async (e) => {
              await handleEdit({ id, anotacao: "", list: listAll, title });
              ws.sendMessage({
                data: {
                  id,
                  anotacao: "",
                  list: listAll,
                  title,
                  uuid,
                  image: "",
                },
                message: "lista",
              });
              // console.log(list);
              StdAlert("Salvo", "Lista Salva");
              setOpcoes(false);
            }}
          />
        </>
      )}
      <ButtonFloat
        color="info"
        icon={null}
        iconf="gear"
        name="Opçoes"
        bottom={60}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={(e) => {
          setOpcoes((e) => !e);
        }}
      />
    </Container>
  );
};

export default App;
