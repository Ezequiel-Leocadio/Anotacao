import React, { useEffect, useRef, useState } from "react";

import { Container, CheckboxContainer, CheckBox, TextInput } from "./styles";
import { TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import { AlertConfirm } from "../Alert";

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
  onEdit,
  ...rest
}) => {
  const ref: any = useRef(null);
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

        {/* <TouchableOpacity
          onPress={async () => {
            if (await AlertConfirm("Excluir Item", "")) {
              onDelete();
            }
          }}
        >
          <Icon name="delete" size={25} color="#fff" />
        </TouchableOpacity> */}

        <TouchableOpacity
          onPress={async () => {
            // if (await AlertConfirm("Editar Item", "")) {
            // }
            onEdit();
          }}
        >
          <Icon name="edit" size={25} color="#fff" />
        </TouchableOpacity>
      </CheckboxContainer>
    </Container>
  );
};

export default checkbox;
