import React, { forwardRef, useState, useEffect } from "react";
import { Modal, Platform } from "react-native";
import Input from "./inputGroup";

import {
  ContainerOption,
  Text,
  ModalBody,
  OptionBody,
  OptionIten,
  OptionText,
  ModalArea,
  InputTextError,
  InputGrup,
  Iconn,
  Iconff,
  LabelInput,
  LabelInputText,
} from "./stylesInput";

type PropsInputSelect = {
  value: any;
  label: string;
};

type Props = {
  style?: any;
  icon?: string;
  iconf?: string;
  error?: boolean;
  errorMessage?: string;
  name: string;
  itens: PropsInputSelect[] | undefined | [];
  onSelected: ({ item }: any) => void;
  label: string;

  required?: boolean;
  placeholder?: string;
  [x: string]: any;
};

function select({
  style,
  icon,
  iconf,
  error,
  errorMessage,
  name,
  itens,
  onSelected,
  label,
  required = false,
  placeholder,
  ...rest
}: Props) {
  const [modalItens, setModalItens] = useState(false);
  const [value, setValue] = useState(false);
  const [nameSelect, setNameSelect] = useState(name);
  const [page, setPage] = useState(1);
  const [itensf, setItensf] = useState<any>([]);

  useEffect(() => {
    setItensf(itens);
    // console.log("kk");
    const index = itens.findIndex((f) => String(f.value) === String(name));
    if (index >= 0) {
      setNameSelect(itens[index].label);
      setValue(true);
    } else {
      setNameSelect(name);
    }
  }, [itens, name]);

  useEffect(() => {
    function load() {
      setPage(1);

      try {
        setPage(1);

        // const findIndex = itens.findIndex(
        //   (f: any) => String(f.value) === String(name)
        // );
        // if ((findIndex) => 0) {
        //   setNameSelect(itens[index].label);
        // } else {
        //   setNameSelect(name);
        // }
      } catch (error) {
        // setNameSelect(name);
      }
    }

    load();
  }, [name]);

  async function loadPage(e: any) {
    const scrollPossition = e.nativeEvent.contentOffset.y;
    const scrollViewheight = e.nativeEvent.layoutMeasurement.height;
    const contentheight = e.nativeEvent.contentSize.height;
    const isScrollendToBottom = scrollViewheight + scrollPossition;

    if (isScrollendToBottom >= contentheight - 50) {
      const totalPage = Math.floor(itensf.length / 10);
      if (page <= totalPage) {
        // dispatch(ToastActionsCreators.displayError('setpage', 5000));
        setPage(page + 1);
      }
    }
  }

  function handleSearch(e: any) {
    const filter = itens.filter((f: any) =>
      f.label.toUpperCase().match(e.toUpperCase())
    );
    if (filter.length > 0 || e !== "") {
      setItensf(filter);
    } else {
      setItensf(itens);
    }
  }

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();

      // Se quiser só impedir, "empurra" o usuário de volta para a rota atual
      window.history.pushState(null, "", window.location.pathname);

      setModalItens(false);
    };

    if (Platform.OS === "web") {
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("popstate", handlePopState);
      }
    };
  }, []);

  return (
    <>
      <Modal
        animationType="slide"
        transparent
        visible={modalItens}
        onRequestClose={() => setModalItens(false)}
      >
        <ModalArea style={{ paddingLeft: 10, paddingRight: 10 }}>
          <ModalBody>
            {/* <BtnClose>X</BtnClose> */}
            <OptionBody onMomentumScrollEnd={(e) => loadPage(e)}>
              {Platform.OS === "web" ? (
                <>
                  {itensf.map((f: any) => (
                    <OptionIten
                      key={f.value}
                      background={f.background}
                      onPress={() => {
                        onSelected({ item: f });
                        setNameSelect(f.label);
                        setValue(true);
                        setModalItens(false);
                      }}
                    >
                      <OptionText background={f.background}>
                        {f.label}
                      </OptionText>
                    </OptionIten>
                  ))}
                </>
              ) : (
                <>
                  {itensf.slice(0, page * 20).map((f: any) => (
                    <OptionIten
                      key={f.value}
                      background={f.background}
                      onPress={() => {
                        onSelected({ item: f });
                        setNameSelect(f.label);
                        setValue(true);
                        setModalItens(false);
                      }}
                    >
                      <OptionText background={f.background}>
                        {f.label}
                      </OptionText>
                    </OptionIten>
                  ))}
                </>
              )}
            </OptionBody>
            <Input
              label="Pesquisa"
              onChangeText={handleSearch}
              placeholder="Digite Para Pesquisar!"
            />
          </ModalBody>
        </ModalArea>
      </Modal>

      <InputGrup>
        {/* <InputText>
          {label}:{required ? "*" : ""}
        </InputText> */}

        <LabelInput>
          <LabelInputText>
            {label}:{required ? "*" : ""}
          </LabelInputText>
        </LabelInput>

        <ContainerOption
          style={style}
          error={error}
          onPress={() => {
            setItensf(itens);
            setModalItens(true);
          }}
          {...rest}
        >
          {icon && <Iconn name={icon} size={20} />}
          {iconf && <Iconff name={iconf} size={20} />}

          <Text value={value}>{placeholder || nameSelect}</Text>

          <Iconn name="keyboard-arrow-down" size={20} />
        </ContainerOption>
      </InputGrup>

      {error && <InputTextError>{errorMessage}</InputTextError>}
    </>
  );
}

export default select;
