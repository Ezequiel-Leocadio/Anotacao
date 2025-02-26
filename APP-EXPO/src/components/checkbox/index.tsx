import React, { useEffect, useRef, useState } from "react";

import {
  Container,
  CheckboxContainer,
  CheckBox,
  TextPosition,
  TextInput,
} from "./styles";
import { Alert, Platform, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { AlertConfirm, StdAlert } from "../Alert";

const checkbox = ({
  name,
  posicao,
  focus = false,
  color = "white",
  defaultValue = "",
  onSubmit,
  isSelected,
  onDelete,
  id,
  onValueChange,
  ...rest
}) => {
  const ref: any = useRef();
  const [value, setValue] = useState(String(defaultValue));

  useEffect(() => {
    if (ref.current && focus) {
      setTimeout(() => {
        ref.current?.blur();
        ref.current?.focus();
      }, 100);
    }

    setValue(String(defaultValue));
  }, []);

  let decoration = false;

  if (isSelected) {
    decoration = true;
  } else {
    decoration = false;
  }

  return (
    <Container key={String(id)}>
      <CheckboxContainer>
        {/* <TextPosition>{posicao < 10 ? "0" + posicao : posicao}</TextPosition> */}
        <CheckBox
          value={isSelected}
          // tintColors={{ true: "#4cc9f0", false: "#4cc9f0" }}
          onValueChange={onValueChange}
          color="#4cc9f0"
          {...rest}
        />
        <TouchableOpacity
          onPress={() => onValueChange()}
          style={{ width: "80%" }}
        >
          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            placeholderTextColor={"#ffffff"}
            returnKeyType="next"
            onSubmitEditing={() => onSubmit(value)}
            decoration={decoration}
          >
            {value}
          </TextInput>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={async () => {
            if (await AlertConfirm("Excluir Item", "")) {
              onDelete();
            }
          }}
        >
          <Icon name="delete" size={25} color="#fff" />
        </TouchableOpacity>
      </CheckboxContainer>
    </Container>
  );
};

export default checkbox;
