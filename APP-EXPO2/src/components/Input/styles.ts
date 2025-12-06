import styled from "styled-components/native";

export const Content = styled.View`
  display: flex;
`;

export const Text = styled.Text`
  color: #fff;
  margin-top: 5px;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: "#fff",
})`
  margin-bottom: 10px;
  color: #fff;
  background: #3a3737;
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  height: 50px;
`;
