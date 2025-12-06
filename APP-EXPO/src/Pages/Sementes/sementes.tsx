import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

import Icon from "@expo/vector-icons/MaterialIcons";
import { Container, NotaTitle, NotasContente } from "../Pasta/styles";

import { getStoreData } from "../../services/data";

import { WebSocketContext } from "../../WebSocket";
import {
  Image,
  ItenContente,
  ItenText,
  ItenTextContent,
  TextInput,
} from "./styles";
import ButtonFloat from "../../components/button/Float";
import Modal from "../../components/Modal/modal";
import ItensScroll from "../../components/ItensScroll";
import { formatDateTime, formatDate } from "../../util/format";
import Table from "../../components/table";
import ButtonIOS from "../../components/button/ButtonIOS";
import { ModalContent } from "@/src/components/button/styles";

function SementesArmazenamento({ navigation, route }) {
  const [modalView, setModalView] = useState(false);
  const [modalViewArm, setModalViewArm] = useState(false);
  const [modalImg, setModalImg] = useState(false);

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

            {/* <NotaTitle>{e.nome}</NotaTitle> */}

            <ItenTextContent>
              <ItenText>{e.nome}</ItenText>
              <ItenText>Código: {e.id}</ItenText>

              <ItenText>Dias Colheita: {e.dias_colheita}</ItenText>
            </ItenTextContent>
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
            { value: "id", label: "Código" },
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

        <TouchableOpacity onPress={() => setModalImg(true)}>
          <Image source={{ uri: itenView.imagem }} />
        </TouchableOpacity>
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
        title="Imagem Semente"
        modalVisible={modalImg}
        onRequestClose={() => setModalImg(false)}
      >
        {itenView.imagem && (
          <Image
            style={{ width: "100%", height: 500, resizeMode: "contain" }}
            source={{ uri: itenView.imagem }}
          />
        )}
        <ButtonIOS
          icon="close"
          color="dark"
          top={10}
          onPress={() => {
            setModalImg(false);
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
        color="success"
        icon="add"
        name="Inserir Arm"
        bottom={80}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={() => {
          navigation.navigate("ArmazenamentoForm");
        }}
      />

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
