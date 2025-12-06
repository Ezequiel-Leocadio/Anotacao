import { Platform } from "react-native";
import { css } from "styled-components";
import styled from "styled-components/native";

export const TextCheck = styled.Text`
  text-align: center;
  border-bottom-color: #fff;
  color: #fff;
  padding: 5px;
  font-size: 16px;
  margin-right: 20px;
`;

export const BtnTextCheck = styled.TouchableOpacity`
  margin-top: 30px;
  margin-bottom: 10px;
  text-align: center;
  border-bottom-color: #fff;
  color: #fff;
  background-color: #2e2d2d;
  border-radius: 5px;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const ModalView = styled.View`
  justify-content: space-around;
  align-items: center;
  width: 95%;
  padding: 0 10px;

  height: 350px;
  background: #615c5c;
  border-radius: 10px;

  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.55;
  shadow-radius: 8;
  elevation: 20;
`;

export const TitleModal = styled.Text`
  text-align: center;
  font-size: 25;
  color: #fff;
`;

export const TitleSecao = styled.Text`
  text-align: center;
  font-size: 16px;
  color: #fff;
  margin-top: 5px;

  border-bottom-width: 0.8px;
  border-bottom-style: solid;
  border-bottom-color: #fff;
`;

export const TextInput: any = styled.TextInput`
  background: #3f3f3f;
  width: 100%;
  border-radius: 5px;
  color: #fff;
  padding: 15px 5px;

  ${Platform.OS === "web" &&
  css`
    outline: none !important;
    text-decoration: none;
  `}
`;
