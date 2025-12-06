import styled from "styled-components/native";
// import {} from 'react-native'
import Icon from "@expo/vector-icons/MaterialIcons";

export const Container: any = styled.View`
  padding: 0 5px;
  height: 40px;
  top: -10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const DateButton = styled.TouchableOpacity`
  padding: 0 5px;
  height: 46px;
  /* background: rgba(0, 0, 0, 0.1); */
  border-radius: 5px;
  /* margin: 0 10px; */
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 10px;
`;

export const Iconn = styled(Icon)`
  color: #fff;
`;

export const Picker = styled.View`
  background: #fff;
  padding: 15px 30px;
  margin-top: 30px;
`;

export const InputTextError = styled.Text`
  font-size: 12px;
  color: red;
`;

export const InputGrup = styled.View`
  /* margin: 5px 0; */
  margin: 2.5px 0;
  margin-top: 15px;
  border: 2px solid #fff;
  border-radius: 15px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: 55px;
`;
export const InputText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const LabelInput: any = styled.View`
  background: #524f4f;

  align-self: flex-start;
  height: 22px;
  position: relative;
  top: ${(props: any) => (props.type === "textarea" ? "-2px" : "-10px")};
  padding-right: 7px;
  padding-left: 7px;
  left: 20px;
`;

export const LabelInputText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;
