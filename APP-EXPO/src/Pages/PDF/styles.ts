import styled from "styled-components/native";

export const Container = styled.ScrollView`
  display: flex;
  background: #524f4f;
  height: 100%;
`;

export const NotaTitle = styled.Text`
  display: flex;
  color: #fff;
  font-weight: bold;
  font-size: 20px;
  width: 80%;
  text-align: left;

  /* line-height: 2; */
`;

export const NotasContente = styled.TouchableOpacity`
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
  align-items: flex-end;
`;
