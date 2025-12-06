import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import { View, Modal, TouchableOpacity, Platform } from "react-native";

import customModalStyles, {
  TextInput,
  Text,
  Title,
  ModalContent,
  ModalContentFull,
  ModalView,
} from "./styles";
// import Button from '../button';

interface Props {
  modalVisible: boolean;
  onRequestClose;
  title: string;

  children?: ReactNode;
}

const InputModal: FC<Props> = ({
  modalVisible,
  title,
  children,
  onRequestClose,
}) => {
  useEffect(() => {
    if (Platform.OS === "web") {
      const handlePopState = (event) => {
        event.preventDefault();

        // Se quiser só impedir, "empurra" o usuário de volta para a rota atual
        window.history.pushState(null, "", window.location.pathname);

        onRequestClose();
      };

      // Adiciona um "estado falso" no histórico
      window.history.pushState(null, "", window.location.pathname);
      window.addEventListener("popstate", handlePopState);
    }

    return () => {
      if (Platform.OS === "web") {
        window.removeEventListener("popstate", () => {});
      }
    };
  }, []);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <ModalContentFull>
        <ModalView>
          <Title style={customModalStyles.textSize}>{title}</Title>

          {children}
          <View style={{ height: 30 }} />
        </ModalView>
      </ModalContentFull>
    </Modal>
  );
};

export default InputModal;
