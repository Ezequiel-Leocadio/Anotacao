import styled from 'styled-components/native';

export const Container = styled.ScrollView`
  flex: 1;
  padding: 10px;
  background: #524f4f;
`;

export const Title = styled.Text`
  color: #fff;
  text-align: center;
  font-size: 20px;
`;

export const Form = styled.View`
  align-self: stretch;
  margin-top: 10px;
`;

export const FormInput = styled.TextInput`
  margin-bottom: 10px;

  color: #fff;
  background: #3a3737;
  width: 100%;
  border-radius: 5px;
  padding: 5px;
  height: 50px;
`;

export const Separator = styled.View`
  height: 1px;
  background: rgba(255, 255, 155, 0.2);
  margin: 10px 0 10px;
`;
