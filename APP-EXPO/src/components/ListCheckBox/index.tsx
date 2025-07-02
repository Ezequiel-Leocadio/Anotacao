import React, { useEffect, useState } from "react";
import Icon from "@expo/vector-icons/Ionicons";

import CheckBox from "../checkbox";
import {
  BtnTextCheck,
  ModalView,
  TextCheck,
  TextInput,
  TitleModal,
} from "./styles";
import { Modal } from "react-native";
import Button from "../../components/button";
import { ModalContent } from "../../components/button/styles";
import { AlertConfirm } from "../Alert";

const ListCheckbox = ({
  itens,
  itens2,
  handleEditMarcado,
  handleEditDescricao,
  handleDelete,
}) => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);
  const [viewChecked, setViewChecked] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [value, setValue] = useState("");
  const [itenEdit, setItenEdit] = useState<any>({});

  useEffect(() => {
    setList(itens);
    console.log(itens);
  }, [itens]);

  useEffect(() => {
    setList2(itens2);
    // console.log(itens2);
  }, [itens2]);

  return (
    <>
      {list.map((e) => (
        <CheckBox
          id={String(e.id)}
          // key={String(e.id)}
          key={`${e.id}-${e.descricao}`}
          name="CheckBox"
          posicao={e.posicao}
          defaultValue={e.descricao}
          isSelected={e.marcado || false}
          focus={false}
          onSubmit={(e) => {}}
          onValueChange={(f) => handleEditMarcado(f, e.id)}
          onDelete={() => handleDelete(e, e.id)}
          onEdit={() => {
            setItenEdit(e);
            setValue(e.descricao);
            setModalEdit(true);
          }}
        />
      ))}

      <BtnTextCheck onPress={() => setViewChecked((e) => !e)}>
        <TextCheck>Itens Riscados</TextCheck>
        <Icon name={viewChecked ? "eye" : "eye-off"} color="#fff" size={30} />
      </BtnTextCheck>
      {viewChecked ? (
        <>
          {list2.map((e) => (
            <CheckBox
              key={`${e.id}-${e.descricao}`}
              id={String(e.id)}
              name="CheckBox"
              posicao={e.posicao}
              defaultValue={e.descricao}
              isSelected={e.marcado || false}
              focus={false}
              onSubmit={(e) => {}}
              onValueChange={(f) => handleEditMarcado(f, e.id)}
              onDelete={() => handleDelete(e, e.id)}
              onEdit={() => {}}
            />
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
            <TextInput
              value={value}
              onChangeText={setValue}
              placeholder={"..."}
              placeholderTextColor={"#c7c7c7"}
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
                  handleEditDescricao(value, itenEdit.id);
                  setModalEdit(false);
                }
              }}
            >
              Salvar Descrição
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
