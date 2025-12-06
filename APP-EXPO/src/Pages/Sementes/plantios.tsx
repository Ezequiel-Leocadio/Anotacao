import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { Container, NotaTitle, NotasContente } from "../Pasta/styles";
import InputModal from "../../components/Modal";
import Float from "../../components/button/Float";
import { getData, getStoreData } from "../../services/data";
import Modal from "../../components/Modal/modal";
import ItensScroll from "../../components/ItensScroll";
import { Image, ItenContente, ItenText, ItenTextContent } from "./styles";
import ButtonIOS from "../../components/button/ButtonIOS";
import Select from "../../components/Input/inputSelectGroup";

import { formatDate } from "../../util/format";

function Plantios({ navigation, route }: any) {
  const [loading, setLoading] = useState(false);
  const [modalView, setModalView] = useState(false);
  const [modalPesquisar, setModalPesquisar] = useState(false);
  const [itenView, setItenView] = useState<any>({});
  const [status, setStatus] = useState("Pendente");
  const [itens, setItens] = useState<any>([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // do something
      // console.log(id, numPasta);

      await loadItens("Pendente");
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    async function load() {
      await loadItens("Pendente");
    }

    load();
  }, []);

  function time(dt: Date) {
    const d = new Date(dt);
    return d.getTime();
  }

  async function loadStatus(status: String) {
    //
  }

  async function loadItens(status: String) {
    const itensGet: any = await getStoreData({ tipo: "sementes" });

    if (itensGet.plantios) {
      let itensf = [];
      for await (const i of itensGet.plantios) {
        setStatus(status);
        const findIndex = itensGet.sementes.findIndex(
          (f: any) =>
            f.id === i.semente &&
            (status === "Pendente"
              ? time(i.data_colheita) >= time(new Date())
              : time(i.data_colheita) <= time(new Date()))
        );
        if (findIndex >= 0) {
          const semente = itensGet.sementes[findIndex];
          const { nome, imagem } = semente;

          itensf.push({
            ...i,
            nome,
            imagem,
            data_colheitaf: formatDate(i.data_colheita),
            dataf: formatDate(i.data),
            list_semente: semente,
          });
        }
      }
      setItens(itensf);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <ItenContente>
          <Select
            icon="list"
            onSelected={(e: any) => loadItens(e.item.value)}
            name={status}
            itens={[
              { value: "Pendente", label: "Pendente" },
              { value: "Finalizada", label: "Finalizada" },
            ]}
            label="Status"
          />
        </ItenContente>

        {itens.map((e: any) => (
          <ItenContente
            onPress={() => {
              setItenView(e);
              setModalView(true);
            }}
          >
            <Image source={{ uri: e.imagem }} />

            <ItenTextContent>
              <ItenText>{e.nome}</ItenText>
              <ItenText>Código: {e.id}</ItenText>
              <ItenText>QT: {e.quantidade}</ItenText>
              <ItenText>DT: {e.dataf}</ItenText>
              <ItenText>DT Colheita: {e.data_colheitaf}</ItenText>
            </ItenTextContent>
            {/* <Icon name="drag-handle" size={35} color="#fff" /> */}
          </ItenContente>
        ))}
      </Container>

      <Modal
        title="Plantio Detalhada"
        modalVisible={modalView}
        onRequestClose={() => setModalView(false)}
      >
        <ItensScroll
          colluns={[
            { value: "nome", label: "Nome" },
            { value: "id", label: "Código" },
            { value: "quantidade", label: "Quantidade" },
            { value: "observacao", label: "Observação" },
            { value: "dataf", label: "Data de Cadastro" },
            { value: "data_colheitaf", label: "Data de  Colheita" },
          ]}
          itens={[itenView]}
        />

        <ButtonIOS
          icon="close"
          color="dark"
          top={10}
          onPress={() => {
            setModalView(false);
          }}
        >
          Fechar
        </ButtonIOS>
      </Modal>

      <Modal
        title="Pesquisar"
        modalVisible={modalPesquisar}
        onRequestClose={() => setModalPesquisar(false)}
      >
        <Select
          icon="list"
          onSelected={(e: any) => loadItens(e.item.value)}
          name={"pendente"}
          itens={[
            { value: "Pendente", label: "Pendente" },
            { value: "Finalizada", label: "Finalizada" },
          ]}
          label="Status"
        />

        <ButtonIOS
          icon="close"
          color="dark"
          top={10}
          onPress={() => {
            setModalPesquisar(false);
          }}
        >
          Fechar
        </ButtonIOS>
      </Modal>

      {/* <Float
        color="warning"
        icon="search"
        name="Pesquisar"
        bottom={80}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={() => {
          setModalPesquisar(true);
        }}
      /> */}

      <Float
        color="info"
        icon="add"
        name="Inserir"
        bottom={10}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={() => {
          navigation.navigate("PlantioForm");
        }}
      />
    </View>
  );
}

export default Plantios;
