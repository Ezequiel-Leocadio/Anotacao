import styled from "styled-components/native";
import { Platform, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import IconF from "@expo/vector-icons/FontAwesome";
import { css } from "styled-components";

export const Container: any = styled.View`
  padding: 0 5px;

  height: ${(props: any) => props.height};

  flex-direction: row;
  align-items: center;
  width: 100%;
  top: -10px;
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

export const TextDanger = styled.Text`
  font-weight: bold;
  color: red;
`;

export const ContainerOption: any = styled(TouchableOpacity)`
  padding: 0 5px;
  height: 40px;
  top: -10px;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;

export const TInput = styled.TextInput.attrs((props) => ({
  placeholderTextColor: "#9d9d9d",
  selectionColor: "#fff",
  cursorColor: "#fff",
}))`
  flex: 1;
  font-size: 15px;
  margin-left: 2px;
  color: #fff;
`;

export const ContainerSearch: any = styled.View`
  flex-direction: row;
  align-items: center;

  top: -10px;
`;

export const InputSearch = styled.TextInput.attrs({
  placeholderTextColor: "#9d9d9d",
})`
  display: flex;
  font-size: 15px;
  color: #dde3f0;
  width: 95%;
  border: 1px solid #000;
  margin: 2px auto;
  border-radius: 5px;
  padding: 5px 2px;
  ${Platform.OS === "web" &&
  css`
    outline: none !important;
    text-decoration: none;
  `}
`;

export const ImagePreviu = styled.Image`
  width: 200px;
  height: 100px;
  resize-mode: contain;
`;

export const ModalArea = styled.View`
  display: flex;
  background: #29313a7a;
  height: 100%;
  align-items: center;
`;

export const OptionBody = styled.ScrollView`
  align-self: stretch;
  border-radius: 5px;
  max-height: 88%;
  background: #160f30;
`;

export const BtnClose = styled.Text`
  position: relative;
  border-radius: 50;
  width: 28px;
  height: 28px;
  background: #e74c3c;
  border: none;
  color: #fff;
  margin-bottom: 10px;
  text-align: center;
  align-items: center;

  top: 5px;
`;

export const ButtonImage = styled.TouchableOpacity`
  padding: 0 5px;
  height: 40px;
  top: -10px;
  flex-direction: row;
  align-items: center;
`;

export const Iconn: any = styled(Icon)`
  color: #fff;
`;

export const Iconff: any = styled(IconF)`
  color: #fff;
`;

export const InputGrup: any = styled.View`
  /* margin: 2.5px 0; */
  margin: 2.5px 0;

  margin-top: 15px;
  border: 2px solid ${(props: any) => (props.error ? "red" : "#fff")};
  border-radius: 12px;
  align-items: center;
  display: flex;
  justify-content: center;
  height: ${(props: any) => (props.type === "textarea" ? "80px" : "55px")};
  width: 100%;

  ${Platform.OS === "web" &&
  css`
    input {
      outline: none !important;
      text-decoration: none;
    }
  `}
`;

export const InputGrupp = styled.View`
  margin: 5px 0;
`;

export const InputTextError = styled.Text`
  font-size: 12px;
  color: red;
`;

export const InputTextSpan = styled.Text`
  font-size: 12px;
  color: #ffc107;
  top: -4px;
`;

export const ButtonSearch = styled.TouchableOpacity`
  border: 0;

  text-decoration: none;
  background: #ffc107;
  /* border-radius: 0 5px 5px 0; */
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  position: relative;

  color: #000;
  width: 15%;
  height: 50px;
  min-width: 25px;
  display: flex;
  top: -1px;
  left: -1px;
  justify-content: center;
  align-items: center;
`;

export const ContainerTable = styled.ScrollView`
  top: 10px;
  height: auto;
  min-height: 55%;
  max-height: 55%;
  width: 100%;
  /* border: 1px solid; */
`;

export const ContainerForm = styled.ScrollView`
  height: auto;
  min-height: 45%;
  max-height: 45%;
  width: 100%;
`;

export const ContainerModalSearch = styled.View`
  height: 90%;
`;

export const ButtonImageText = styled.Text`
  font-size: 16px;
  color: #fff;
`;

export const ModalBody = styled.View`
  display: flex;
  width: 100%;
  border-radius: 5px;
  padding: 0;
  margin-top: auto;
  background: #566573;
  align-items: flex-start;
  max-height: 100%;
`;

export const OptionIten: any = styled(TouchableOpacity)`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #f1f2f2;

  color: #fff;
  border-radius: 3px;
  padding: 5px;
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #007ba4;
  margin: 3px;
`;

export const OptionText: any = styled.Text`
  /* flex: 1; */
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  /* border: 1px solid; */
  text-align: center;
  color: #000;
  /* border-radius: 5px; */
`;

export const Text: any = styled.Text`
  flex: 1;
  font-size: 15px;
  margin-left: 10px;
  color: #fff;
`;
