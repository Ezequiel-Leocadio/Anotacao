import React, { forwardRef } from "react";

import {
  Container,
  TInput,
  InputGrup,
  InputTextError,
  LabelInput,
  LabelInputText,
  Iconn,
  Iconff,
  TextDanger,
} from "./stylesInput";

type Props = {
  type?: string;
  required?: boolean;
  style?: any;
  icon?: string;
  iconf?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  label: string;
  [x: string]: any;
};

function input(
  {
    type = "text",
    descricao,
    required = false,
    style,
    icon = false,
    iconf = false,
    placeholder,
    error = false,
    errorMessage,
    label,
    keyboardType,
    ...rest
  }: Props,
  ref: any
) {
  let height = "40px";
  if (type === "textarea") {
    height = "80px";
  }

  return (
    <InputGrup type={type} error={error}>
      <LabelInput type={type}>
        <LabelInputText>
          {label || descricao}:{required ? <TextDanger> *</TextDanger> : ""}
        </LabelInputText>
      </LabelInput>

      <Container height={height} style={style}>
        {icon && (
          <Iconn name={icon} size={20} color="rgba(255, 255,255, 0.6)" />
        )}
        {iconf && (
          <Iconff name={iconf} size={20} color="rgba(255, 255,255, 0.6)" />
        )}

        <TInput
          multiline={type === "textarea"}
          placeholder={placeholder}
          numberOfLines={type === "textarea" ? 3 : 1}
          cursorColor="#fff"
          selectionColor={"#fff"}
          placeholderTextColor={"#fff"}
          // keyboardType={type === "number" ? "numeric" : "text"}
          {...rest}
          keyboardType={type === "number" ? "number-pad" : keyboardType}
          ref={ref}
        />
      </Container>
      {error && <InputTextError>{errorMessage}</InputTextError>}
    </InputGrup>
  );
}

export default forwardRef(input);
