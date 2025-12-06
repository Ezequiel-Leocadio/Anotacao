import React, { useContext, useEffect, useRef, useState } from "react";
import { Alert, TouchableOpacity, View } from "react-native";

import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import Icon from "@expo/vector-icons/MaterialIcons";
import { Container, NotaTitle, NotasContente } from "../Pasta/styles";
import InputModal from "../../components/Modal";
import { getData } from "../../services/data";
import { AlertConfirm, StdAlert } from "../../components/Alert";

import { WebSocketContext } from "../../WebSocket";

function Sementes({ navigation, route }) {
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
      const itensGet: any = await getData({ tipo: "itens" });
    }

    load();
  }, []);

  async function loadItens() {
    const itensGet: any = await getData({ tipo: "itens" });
  }

  return (
    <View style={{ flex: 1 }}>
      <Container>
        <NotasContente
          onPress={() => {
            navigation.navigate("SementesArmazenamento");
          }}
        >
          <MaterialCommunityIcons name="seed" size={35} color="#fff" />
          <NotaTitle>Sementes/Armazenamento</NotaTitle>
          <Icon name="drag-handle" size={35} color="#fff" />
        </NotasContente>

        <NotasContente
          onPress={() => {
            navigation.navigate("Plantios");
          }}
        >
          <FontAwesome5 name="seedling" size={35} color="#fff" />
          <NotaTitle>Plantios</NotaTitle>
          <Icon name="drag-handle" size={35} color="#fff" />
        </NotasContente>
      </Container>
    </View>
  );
}

export default Sementes;
