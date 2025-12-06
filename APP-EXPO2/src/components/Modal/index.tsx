import React, { FC, useEffect, useRef, useState } from "react";
import { View, Modal, TouchableOpacity, Platform } from "react-native";

import customModalStyles, {
  TextInput,
  Text,
  Title,
  ModalContent,
} from "./styles";
// import Button from '../button';

interface Props {
  modalVisible: boolean;
  onRequestClose;
  title: string;
  defaultValue?: string;
  buttonOneTitle: string;
  onPressOne: (event: any) => void;

  placeholder: string;
}

const InputModal: FC<Props> = ({
  modalVisible,
  title,
  onPressOne,
  placeholder,
  defaultValue = "",
  onRequestClose,
}) => {
  const [value, setValue] = useState(String(defaultValue));
  const ref: any = useRef(null);

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        setValue(String(defaultValue));

        ref.current?.blur();
        ref.current?.focus();
      }, 500);
    }
  }, [modalVisible]);

  useEffect(() => {
    if (Platform.OS === "web") {
      const handler = (e) => {
        if (e.key === "Escape") {
          alert("kkk");
          onRequestClose();
        }
      };
      window.addEventListener("keydown", handler);
      return () => window.removeEventListener("keydown", handler);
    }
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <ModalContent>
        <View style={customModalStyles.modalView}>
          <Title style={customModalStyles.textSize}>{title}</Title>

          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={"#c7c7c7"}
          />

          {/* <Button
            title="Salvar"
            onPress={() => {
              onPressOne(value);
              setValue('');
            }}
          /> */}

          <TouchableOpacity
            style={{ display: "flex", alignItems: "flex-end" }}
            onPress={() => {
              onPressOne(value);
              setValue("");
            }}
          >
            <Text>SALVAR</Text>
          </TouchableOpacity>
          {/* // <Button
          //   onPress={() => {
          //     onPressOne(value);
          //     setValue('');
          //   }}
          //   icon="save"
          //   color="success"
          //   top={10}
          //   size={100}
          // >
          //   Salvar
          // </Button> */}
        </View>
      </ModalContent>
    </Modal>
  );
};

export default InputModal;
