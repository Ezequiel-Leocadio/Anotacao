import styled, { css } from 'styled-components/native';
import CheckBoxR from '@react-native-community/checkbox';

export const Container = styled.View`
  /* display: flex; */

  /* align-items: center; */
  /* justify-content: center; */
  /* border: 1px solid; */
  margin: 5px 0;

  border-bottom-width: 2px;
  border-bottom-color: '#fff';
`;

export const CheckboxContainer = styled.View`
  flex-direction: row;
  /* margin-bottom: px; */
  align-items: center;
  /* border: 1px solid; */
`;

export const CheckBox = styled(CheckBoxR)`
  align-self: center;
`;

export const Label: any = styled.Text`
  margin: 0;
  color: ${(props: any) => props.color};
  font-size: 15px;

  font-weight: bold;
`;

export const TextPosition = styled.Text`
  color: #fff;
`;

export const TextInput: any = styled.TextInput`
  color: #fff;
  background: transparent;
  width: 80%;
  border-radius: 5px;
  padding: 0;
  height: 30px;
  text-decoration-style: solid;
  text-decoration-color: #fff;
  text-decoration-line: ${(props: any) =>
    props.decoration ? 'line-through' : 'none'};
`;
