import styled from 'styled-components/native';

export const Container = styled.View`
  flex: 1;
  background: #524f4f;
`;

export const ScrollItens = styled.ScrollView.attrs({
  // contentContainerStyle: { padding: 10 },
})`
  align-self: stretch;
  width: 100%;
  display: flex;
  max-height: 90%;
  padding: 10px 10px;
`;

export const TextInput = styled.TextInput`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: #747373;
`;

export const TextInputAdd = styled.TextInput`
  width: 90%;
  padding: 5px;
  margin-left: 5px;
  border-radius: 5px;
`;

export const ContentAdd = styled.View`
  width: 100%;
  display: flex;
  background: #747373;
  flex-direction: row;
  position: absolute;
  bottom: 1px;
  align-items: center;
  justify-content: space-between;
  border-width: 2px;
  border-color: #000;
  border-style: solid;
`;
