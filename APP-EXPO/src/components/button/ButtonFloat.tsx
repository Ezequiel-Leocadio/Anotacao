import React, { useEffect, useState } from "react";
import { ActivityIndicator, Alert, Keyboard, Modal } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import { BodyChil, ButtonFloat, MBody, ModalContent } from "./styles";
import Button from "./index";

export default function ButtonFloatC({
  loading = false,
  icon,
  iconf = "",
  color,
  top = 0,
  onKeyBoardHidden,
  position,
  onEvent,
  ...rest
}) {
  let colorExa = "";
  switch (color) {
    case "success":
      colorExa = "#16a085";
      break;
    case "info":
      colorExa = "#0097e6";
      break;
    case "warning":
      colorExa = "#f1c40f";
      break;
    case "dark":
      colorExa = "#000000e3";
      break;
    case "danger":
      colorExa = "#c23616";
      break;

    case "transparent":
      colorExa = "transparent";
      break;
    default:
      colorExa = "#3b9eff";
  }

  const [hiddenKeyboad, setHiddenKeyboad] = useState(false);
  const [modal, setModal] = useState(false);
  const _keyboardDidShow = () => {
    // alert(onKeyBoardHidden);
    if (onKeyBoardHidden) {
      setHiddenKeyboad(true);
    } else {
      setHiddenKeyboad(false);
    }
  };

  function handlePress(e) {
    onEvent(e);
    setModal(false);
  }

  return (
    <>
      {modal && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setModal(false)}
        >
          <ModalContent onPress={() => setModal(false)}>
            <MBody color="#29313a">
              <Button
                size={60}
                icon="create-new-folder"
                color="dark"
                onPress={() => handlePress("pasta")}
              >
                Nova Pasta
              </Button>

              <Button
                top={10}
                size={60}
                icon="list"
                color="dark"
                onPress={() => handlePress("list")}
              >
                Nova Lista
              </Button>

              <Button
                top={10}
                size={60}
                icon="edit"
                color="dark"
                onPress={() => handlePress("nota")}
              >
                Nova Nota
              </Button>

              <Button
                top={10}
                size={60}
                icon="fastfood"
                color="dark"
                onPress={() => handlePress("receita")}
              >
                Nova Receita
              </Button>
            </MBody>
          </ModalContent>
        </Modal>
      )}

      {!hiddenKeyboad && (
        <ButtonFloat
          hidden={hiddenKeyboad}
          style={{ [position]: 10 }}
          mTop={top}
          color={colorExa}
          onPress={() => setModal(true)}
          {...rest}
        >
          {loading ? (
            <ActivityIndicator size="small" color="#FFF" />
          ) : (
            <>{icon && <Icon name={icon} size={35} color="#fff" />}</>
          )}
        </ButtonFloat>
      )}
    </>
  );
}
