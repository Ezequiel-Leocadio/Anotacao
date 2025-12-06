import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { Container, NotaTitle, NotasContente } from "../Pasta/styles";

import { getStoreData } from "../../services/data";

import { WebSocketContext } from "../../WebSocket";
import { Image, ItenContente, TextInput } from "./styles";
import ButtonFloat from "../../components/button/Float";
import Modal from "../../components/Modal/modal";
import ItensScroll from "../../components/ItensScroll";
import { formatDateTime, formatDate } from "../../util/format";
import Table from "../../components/table";
import ButtonIOS from "../../components/button/Button";

function SementesArmazenamento({ navigation, route }) {
  const [modalView, setModalView] = useState(false);
  const [modalViewArm, setModalViewArm] = useState(false);

  const [itens, setItens] = useState<any>([]);
  const [itenView, setItenView] = useState<any>({});
  const [itenViewArm, setItenViewArm] = useState<any>({});

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      // do something
      // console.log(id, numPasta);

      await loadItens();
    });

    return unsubscribe;
  }, [navigation]);

  useEffect(() => {
    async function load() {
      await loadItens();
    }

    load();
  }, []);

  async function loadItens() {
    const itensGet: any = await getStoreData({ tipo: "sementes" });

    if (itensGet.sementes) {
      let itensf = itensGet.sementes.map((e) => ({
        ...e,
        dataf: formatDateTime(e.data),
      }));

      //   for await (const i of itensGet.plantios) {
      //     const findIndex = itensGet.sementes.findIndex(
      //       (f) => f.id === i.semente
      //     );
      //     if (findIndex >= 0) {
      //       const semente = itensGet.sementes[findIndex];
      //       const { nome, imagem } = semente;

      //       itensf.push({
      //         ...i,
      //         nome,
      //         imagem,
      //         list_semente: semente,
      //       });
      //     }
      //   }
      setItens(itensf);
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <Container>
        {itens.map((e) => (
          <ItenContente
            onPress={() => {
              const armazenamento = e.armazenamento.map((a) => ({
                ...a,
                dataf: formatDate(a.data),
                data_proximo_plantiof: formatDate(a.data_proximo_plantio),
              }));
              setItenView({ ...e, armazenamento });

              setModalView(true);
            }}
          >
            <Image source={{ uri: e.imagem }} />

            <NotaTitle>{e.nome}</NotaTitle>
            <Icon name="drag-handle" size={35} color="#fff" />
          </ItenContente>
        ))}
      </Container>

      <Modal
        title="Semente Detalhada"
        modalVisible={modalView}
        onRequestClose={() => setModalView(false)}
      >
        <ItensScroll
          colluns={[
            { value: "nome", label: "Nome" },
            { value: "outros_nomes", label: "Outros Nomes" },
            { value: "especie", label: "Espécie" },
            { value: "origem", label: "Origem" },
            { value: "observacao", label: "Observação" },
            { value: "dataf", label: "Data" },
            { value: "dias_colheita", label: "Dias Colheita" },
          ]}
          itens={[itenView]}
        />

        <Table
          name="Armazenamentos"
          itens={itenView.armazenamento}
          options={[]}
          colluns={[
            { value: "quantidade", label: "QT" },
            // { value: "tratamento", label: "Tratamento" },
            { value: "local_armazenamento", label: "Local Armazenament" },
            // { value: "observacao", label: "Obs" },
            { value: "dataf", label: "Data" },
            { value: "data_proximo_plantiof", label: "Prox Plantio" },
          ]}
          footer={false}
          onEvent={(e: any) => {
            setItenViewArm(e.item);
            setModalViewArm(true);
          }}
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
        title="Armazenamento Detalhado"
        modalVisible={modalViewArm}
        onRequestClose={() => setModalViewArm(false)}
      >
        <ItensScroll
          colluns={[
            { value: "quantidade", label: "Quantidade" },
            { value: "tratamento", label: "Tratamento" },
            { value: "local_armazenamento", label: "Local Armazenament" },
            { value: "observacao", label: "Obs" },
            { value: "dataf", label: "Data" },
            {
              value: "data_proximo_plantiof",
              label: "Data Para Próximo Plantio",
            },
          ]}
          itens={[itenViewArm]}
        />

        <ButtonIOS
          icon="close"
          color="dark"
          top={10}
          onPress={() => {
            setModalViewArm(false);
          }}
        >
          Fechar
        </ButtonIOS>
      </Modal>

      <ButtonFloat
        color="info"
        icon="add"
        name="Inserir"
        bottom={10}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={() => {
          navigation.navigate("SementesArmazenamentoForm");
        }}
      />
    </View>
  );
}

export default SementesArmazenamento;
