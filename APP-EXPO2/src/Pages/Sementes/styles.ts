import { Platform } from "react-native";
import { css } from "styled-components";
import styled from "styled-components/native";

export const Image = styled.Image`
  width: 100px;
  /* max-width: 500px; */
  height: 100px;
  resize-mode: center;
  margin: 0 auto;
  border-radius: 10px;
`;

export const TextInput: any = styled.TextInput`
  background: #3f3f3f;
  width: 100%;
  border-radius: 5px;
  color: #fff;
  padding: 10px 5px;

  ${Platform.OS === "web" &&
  css`
    outline: none !important;
    text-decoration: none;
  `}
`;

export const BtnSalvar = styled.TouchableOpacity`
  background: #22a087;
  border-radius: 10px;
  margin: 20px 0;
`;

export const TextBtnSalvar = styled.Text`
  color: #fff;
  font-size: 20px;
  padding: 10px 30px;
  text-align: center;
`;

export const ItenContente = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  padding: 10px;
  border-top-width: 1px;
  border-bottom-width: 1px;

  border-top-style: solid;
  border-bottom-style: solid;

  border-top-color: #fff;
  border-bottom-color: #fff;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ItenTextContent = styled.View`
  /* border: 1px solid; */
  width: 74%;
`;

export const ItenText = styled.Text`
  display: flex;
  color: #fff;
  font-weight: bold;
  font-size: 16px;
  text-align: left;
  margin-left: 2px;

  /* line-height: 2; */
`;
