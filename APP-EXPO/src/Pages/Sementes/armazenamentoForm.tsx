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

function ArmazenamentoForm({ navigation, route }) {
  const [armazenamento, setArmazenamento] = useState("");
  const [semente, setSemente] = useState("");
  const [observacao, setObservacao] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [localArmazenamento, setLocalArmazenamento] = useState("");
  const [tratamento, setTratamento] = useState("Nenhum");
  const [observacaoArmazenamento, setObservacaoArmazenamento] = useState("");

  const [date, setDate] = useState(null);
  const [dataProximoPlantio, setDataProximoPlantio] = useState(null);

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
        quantidade: { type: "number", required: true, label: "Quantidade" },
        localArmazenamento: {
          type: "string",
          required: true,
          label: "Local Armazenamento",
        },
        tratamento: { type: "string", required: true, label: "Quantidade" },
        observacaoArmazenamento: {
          type: "string",

          label: "observacao Armazenamento",
        },

        dataProximoPlantio: {
          type: "date",
          required: true,
          label: "data Proximo Plantio",
        },
        date: { type: "date", required: true, label: "Data" },
      };
      await validateValue({
        schema,
        data: {
          semente,
          quantidade,
          localArmazenamento,
          tratamento,
          date,
          dataProximoPlantio,
          observacaoArmazenamento,
        },
      });

      const itensGet: any = await getStoreData({ tipo: "sementes" });
      const itensf = itensGet.sementes || [];
      const index = itensf.findIndex((f: any) => f.id === semente);
      if (index >= 0) {
        const armazenamentos = itensf[index].armazenamento;
        armazenamentos.push({
          quantidade,
          local_armazenamento: localArmazenamento,
          tratamento,
          observacao: observacaoArmazenamento,
          data: date,
          data_proximo_plantio: dataProximoPlantio,
        });
        itensf[index].armazenamento = armazenamentos;
        await storeData({
          tipo: "sementes",
          value: JSON.stringify({ ...itensGet, sementes: itensf }),
        });
      }

      alert("Salvo");
    } catch (error) {
      alert(`${error}`);
    }
  }

  function handleSelectSemente(e) {
    const filter = sementes.filter((f) => Number(f.id) === Number(e));
    setItenEdit(filter[0]);

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

        <Input
          label="Quantidade"
          value={quantidade}
          type="number"
          onChangeText={setQuantidade}
          placeholder={"Quantidade em Gramas"}
        />

        <Input
          label="Local Armazenamento"
          value={localArmazenamento}
          type="number"
          onChangeText={setLocalArmazenamento}
          placeholder={"Local Armazenamento"}
        />

        <Input
          label="Tratamento"
          value={tratamento}
          type="number"
          onChangeText={setTratamento}
          placeholder={"Tratamento da Semente"}
        />

        <DateInput label="Data" date={date} onChange={setDate} />

        <DateInput
          label="Data Prox Plantio"
          date={dataProximoPlantio}
          onChange={setDataProximoPlantio}
        />

        <Input
          label="Observação Armazenamento"
          value={observacaoArmazenamento}
          type="number"
          onChangeText={setObservacaoArmazenamento}
          placeholder={"Observação Armazenamento"}
        />

        <BtnSalvar onPress={() => handleSalvar()}>
          <TextBtnSalvar>SALVAR</TextBtnSalvar>
        </BtnSalvar>
      </ContainerForm>
    </KeyboardAvoidingView>
  );
}

export default ArmazenamentoForm;
