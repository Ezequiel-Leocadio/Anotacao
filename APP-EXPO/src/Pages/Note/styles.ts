import styled from "styled-components/native";
import { Dimensions } from "react-native";
const windowHeight = Dimensions.get("window").height;

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background: #524f4f;
  display: flex;
  height: 100%;
`;

export const Text = styled.Text`
  color: #fff;
  margin: 10px 0;
`;

export const TextId = styled.Text`
  color: #fff;
`;

export const TextInput = styled.TextInput`
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #747373;
  color: #fff;
`;

export const TextInputContent = styled.TextInput`
  display: flex;

  padding: 10px;
  border-radius: 5px;
  height: ${(props) => () => (windowHeight / 10) * 7}px;

  text-align-vertical: top;
  background: #747373;
  color: #fff;
  margin-bottom: 20px;
`;

export const Image = styled.Image`
  width: 200px;
  /* max-width: 500px; */
  height: 200px;
  resize-mode: center;
  margin: 0 auto;
`;
