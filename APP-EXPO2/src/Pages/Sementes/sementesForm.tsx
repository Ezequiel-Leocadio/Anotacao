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

import DateInput from "../../components/dateTimeInput/index.androidGroup";
import ImageInput from "../../components/Input/image";

import { WebSocketContext } from "../../WebSocket";
import { BtnSalvar, TextBtnSalvar } from "./styles";
import { getData, getStoreData, storeData } from "../../services/data";
import { validateValue } from "../../util/format";

function SementesArmazenamentoForm({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const refSearch = useRef(null);
  const [search, setSearch] = useState(false);
  const [nome, setNome] = useState("");
  const [outrosNome, setOutrosNome] = useState("");
  const [imagem, setImagem] = useState("");
  const [especie, setEspecie] = useState("");
  const [origem, setOrigem] = useState("@thiago.agrofloresta SP");
  const [observacao, setObservacao] = useState("");
  const [diasColheita, setDiasColheita] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [localArmazenamento, setLocalArmazenamento] = useState("");
  const [tratamento, setTratamento] = useState("Nenhum");
  const [observacaoArmazenamento, setObservacaoArmazenamento] = useState("");

  const [date, setDate] = useState(null);
  const [dataProximoPlantio, setDataProximoPlantio] = useState(null);

  async function handleSalvar() {
    try {
      const schema = {
        nome: { type: "string", required: true, label: "Nome" },
        outrosNome: { type: "string", required: true, label: "Outros Nomes" },
        imagem: { type: "string", required: true, label: "Imagem" },
        especie: { type: "string", required: true, label: "Espécie" },
        origem: { type: "string", required: true, label: "Origem" },
        observacao: { type: "string", label: "Observação" },
        data: { type: "date", required: true, label: "Data" },
        diasColheita: {
          type: "number",
          required: true,
          label: "Dias Colheita",
        },
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
      };
      await validateValue({
        schema,
        data: {
          nome,
          outrosNome,
          imagem,
          especie,
          origem,
          observacao,
          data: date,
          diasColheita,
          quantidade,
          localArmazenamento,
          tratamento,
          observacaoArmazenamento,
          dataProximoPlantio,
        },
      });

      const itensGet: any = await getStoreData({ tipo: "sementes" });
      const itensf = itensGet.sementes || [];

      itensf.push({
        nome,
        outros_nomes: outrosNome,
        imagem,
        especie,
        origem,
        observacao,
        data: date,
        dias_colheita: diasColheita,

        armazenamento: [
          {
            quantidade,
            local_armazenamento: localArmazenamento,
            tratamento,
            observacao: observacaoArmazenamento,
            data: date,
            data_proximo_plantio: dataProximoPlantio,
          },
        ],
      });
      await storeData({
        tipo: "sementes",
        value: JSON.stringify({ ...itensGet, sementes: itensf }),
      });
      alert("Salvo");
    } catch (error) {
      alert(`${error}`);
    }
  }

  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={80}
      behavior={Platform.OS === "ios" ? "padding" : "height"} // ou "height"
      style={[{ flex: 1 }]}
    >
      <ContainerForm>
        <Input
          label="Nome"
          value={nome}
          onChangeText={setNome}
          placeholder={"Nome"}
        />

        <Input
          type="textarea"
          label="Outros Nomes"
          value={outrosNome}
          onChangeText={setOutrosNome}
          placeholder={"Outros Nomes"}
        />

        <ImageInput
          label="Imagem"
          name="Imagem"
          onSelected={(e) => setImagem(e)}
        />

        <Input
          label="Espécie"
          value={especie}
          onChangeText={setEspecie}
          placeholder={"Milho/Feijão"}
        />

        <Input
          label="Origem"
          value={origem}
          onChangeText={setOrigem}
          placeholder={"Origem"}
        />

        <Input
          label="Observação"
          value={observacao}
          onChangeText={setObservacao}
          placeholder={"Observação"}
        />

        <DateInput label="Data" date={date} onChange={setDate} />

        <Input
          label="Dias colheita"
          value={diasColheita}
          type="number"
          onChangeText={setDiasColheita}
          placeholder={"Dias para colheita"}
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

export default SementesArmazenamentoForm;
