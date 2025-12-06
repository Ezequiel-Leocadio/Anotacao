import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

import CheckBox from "../checkbox";
import {
  BtnTextCheck,
  ModalView,
  TextCheck,
  TextInput,
  TitleModal,
  TitleSecao,
} from "./styles";
import { Modal, Text } from "react-native";
import Button from "../../components/button";
import { ModalContent } from "../../components/button/styles";
import { AlertConfirm } from "../Alert";
import { arrayGroupBy } from "../../util/format";
import { getStoreData } from "@/src/services/data";
import Select from "../../components/Input/inputSelectGroup";
import Input from "../../components/Input/inputGroup";

const ListCheckbox = ({
  itens,
  itens2,
  handleEditMarcado,
  handleEditDescricao,
  handleDelete,
}) => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [secoes, setSecoes] = useState<any>([]);
  const [viewChecked, setViewChecked] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [value, setValue] = useState("");
  const [itenEdit, setItenEdit] = useState<any>({});

  useEffect(() => {
    async function load() {
      const itensGet: any = await getStoreData({ tipo: "secoes" });
      setSecoes(itensGet);
    }
    load();
  }, []);

  useEffect(() => {
    const group: any = arrayGroupBy(itens, "desc_secao");
    setList(group);

    // console.log(itens);
  }, [itens]);

  useEffect(() => {
    const group: any = arrayGroupBy(itens2, "desc_secao");
    setList2(group);
    // setList2(itens2);
    // console.log(itens2);
  }, [itens2]);

  async function handleEditSecao(value: any) {
    const index = secoes.findIndex((f: any) => f.value === value);
    if (index >= 0) {
      const i: any = {
        ...itenEdit,
        secao: value,
        desc_secao: secoes[index].label,
      };
      setItenEdit(i);
      console.log(i);
    }
  }

  return (
    <>
      {list.map((g: any) => (
        <>
          <TitleSecao>{g.desc_secao}</TitleSecao>
          {g.itens.map((e: any) => (
            <CheckBox
              id={String(e.id)}
              // key={String(e.id)}
              key={`${e.id}-${e.descricao}`}
              name="CheckBox"
              posicao={e.posicao}
              defaultValue={e.descricao}
              isSelected={e.marcado || false}
              focus={false}
              onSubmit={(e: any) => {}}
              onValueChange={(f: any) => handleEditMarcado(f, e.id)}
              onDelete={() => handleDelete(e, e.id)}
              onEdit={() => {
                setItenEdit(e);
                setValue(e.descricao);
                setModalEdit(true);
              }}
            />
          ))}
        </>
      ))}

      <BtnTextCheck onPress={() => setViewChecked((e) => !e)}>
        <TextCheck>Itens Riscados</TextCheck>
        <Icon name={viewChecked ? "eye" : "eye-off"} color="#fff" size={30} />
      </BtnTextCheck>
      {viewChecked ? (
        <>
          {list2.map((g: any) => (
            <>
              <TitleSecao>{g.desc_secao}</TitleSecao>
              {g.itens.map((e: any) => (
                <CheckBox
                  key={`${e.id}-${e.descricao}`}
                  id={String(e.id)}
                  name="CheckBox"
                  posicao={e.posicao}
                  defaultValue={e.descricao}
                  isSelected={e.marcado || false}
                  focus={false}
                  onSubmit={(e: any) => {}}
                  onValueChange={(f: any) => handleEditMarcado(f, e.id)}
                  onDelete={() => handleDelete(e, e.id)}
                  onEdit={() => {}}
                />
              ))}
            </>
          ))}
        </>
      ) : null}

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalEdit}
        onRequestClose={() => setModalEdit(false)}
      >
        <ModalContent>
          <ModalView>
            <TitleModal>{itenEdit.descricao}</TitleModal>
            {/* <TextInput
              value={value}
              onChangeText={setValue}
              placeholder={"..."}
              placeholderTextColor={"#c7c7c7"}
            /> */}

            <Input
              label="Descrição"
              value={value}
              onChangeText={setValue}
              placeholder={"Descrição"}
            />
            <Select
              icon="list"
              onSelected={(e: any) => handleEditSecao(e.item.value)}
              name={itenEdit.secao || "Semente"}
              itens={secoes}
              label="Seção"
            />
            <Button
              top={10}
              size={100}
              icon="close"
              color="danger"
              onPress={async () => {
                if (await AlertConfirm("Excluir Item", "")) {
                  handleDelete(null, itenEdit.id);
                  setModalEdit(false);
                }
              }}
            >
              Excluir ??
            </Button>
            <Button
              top={20}
              size={100}
              icon="save"
              color="success"
              onPress={async () => {
                if (await AlertConfirm("Salvar Descrição", "")) {
                  handleEditDescricao(value, itenEdit);
                  setModalEdit(false);
                }
              }}
            >
              Salvar
            </Button>

            <Button
              top={20}
              size={100}
              icon="close"
              color="dark"
              onPress={async () => {
                setModalEdit(false);
              }}
            >
              Fechar Janela
            </Button>
          </ModalView>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ListCheckbox;
