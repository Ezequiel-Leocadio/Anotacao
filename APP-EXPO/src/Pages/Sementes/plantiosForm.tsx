import React, { useContext, useEffect, useRef, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { ContainerForm } from "../Pasta/styles";
import Input from "../../components/Input/inputGroup";
import Select from "../../components/Input/inputSelectGroup";

import DateInput from "../../components/dateTimeInput/index.androidGroup";

import { BtnSalvar, TextBtnSalvar } from "./styles";
import { getData, getStoreData, storeData } from "../../services/data";
import { validateValue } from "../../util/format";
import { format } from "date-fns";

function PlantioForm({ navigation, route }) {
  const [armazenamento, setArmazenamento] = useState("");
  const [semente, setSemente] = useState("");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [date, setDate] = useState(null);

  const [sementes, setSementes] = useState([]);
  const [armazenamentos, setArmazenamentos] = useState([]);
  const [itenEdit, setItenEdit] = useState<any>({});

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
        value: e.id,
        label: e.nome,
      }));

      setSementes(itensf);
    }
  }
  async function handleSalvar() {
    try {
      const schema = {
        semente: { type: "number", required: true, label: "Semente" },
        armazenamento: {
          type: "number",
          required: true,
          label: "Armazenamento",
        },
        quantidade: { type: "number", required: true, label: "Quantidade" },

        observacao: { type: "string", label: "Observação" },
        data: { type: "date", required: true, label: "Data" },
      };
      await validateValue({
        schema,
        data: {
          observacao,
          data: date,
          quantidade,
          semente,
          armazenamento,
        },
      });

      const itensGet: any = await getStoreData({ tipo: "sementes" });
      const itensf = itensGet.plantios || [];

      const data_colheita = new Date(date + "T23:00:00");

      data_colheita.setDate(data_colheita.getDate() + itenEdit.dias_colheita);
      data_colheita.setHours(23, 59, 59, 999);

      itensf.push({
        observacao,
        data: date,
        quantidade,
        semente,
        armazenamento,
        data_colheita: format(data_colheita, "yyyy-MM-dd HH:mm:ss"),
      });
      await storeData({
        tipo: "sementes",
        value: JSON.stringify({ ...itensGet, plantios: itensf }),
      });
      alert("Salvo");
    } catch (error) {
      alert(`${error}`);
    }
  }

  function handleSelectSemente(e) {
    const filter = sementes.filter((f) => Number(f.id) === Number(e));
    setItenEdit(filter[0]);
    const itensf = filter[0].armazenamento.map((f) => ({
      ...f,
      value: f.id,
      label: `${f.id}: ${f.local_armazenamento} - QT:${f.quantidade}`,
    }));
    setArmazenamentos(itensf);
    setSemente(e);
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={[{ flex: 1 }]}
    >
      <ContainerForm>
        <Select
          icon="list"
          onSelected={(e: any) => handleSelectSemente(e.item.value)}
          name={"Semente"}
          itens={sementes}
          label="Semente"
        />
        <Select
          icon="list"
          onSelected={(e: any) => setArmazenamento(e.item.value)}
          name={"Armazenamento"}
          itens={armazenamentos}
          label="Armazenamento"
        />
        <Input
          label="Quantidade"
          value={quantidade}
          type="number"
          onChangeText={setQuantidade}
          placeholder={"Quantidade em Gramas"}
        />
        <Input
          label="Observação"
          value={observacao}
          onChangeText={setObservacao}
          placeholder={"Observação"}
        />

        <DateInput label="Data" date={date} onChange={setDate} />

        <BtnSalvar onPress={() => handleSalvar()}>
          <TextBtnSalvar>SALVAR</TextBtnSalvar>
        </BtnSalvar>
      </ContainerForm>
    </KeyboardAvoidingView>
  );
}

export default PlantioForm;
