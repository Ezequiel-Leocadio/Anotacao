import { StyleSheet, Platform } from "react-native";
import styled, { css } from "styled-components/native";

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

export const Text = styled.Text`
  color: rgb(255 255 255);
  font-size: 20px;
  background: #22a087;
  padding: 5px 35px;
  border-radius: 20px;
`;

export const Title = styled.Text`
  text-align: center;
  font-size: 25;
  color: #fff;
`;

export const ModalContent: any = styled.TouchableOpacity`
  width: 100%;
  height: 100%;
  max-width: 500px;
  margin: 0 auto;
  align-items: center;
  margin-top: 30px;
`;

export const ModalContentFull: any = styled.View`
  width: 100%;
  max-width: 500px;
  height: 90%;
  margin: 0 auto;
  align-items: center;
  margin-top: 10px;
`;

export const ModalView = styled.ScrollView`
  /* justify-content: space-around; */
  /* align-items: center; */
  width: 90%;

  height: 90%;
  background-color: #615c5c;
  border-radius: 10px;
  padding: 10px;
  /* 
  // paddingTop: 10,
  shadow-color: #000;
  shadow-offset: {
    width: 0;
    height: 4;
  }
  shadow-opacity: 0.55;
  shadow-radius: 8; */
  elevation: 20;
`;

const customModalStyles = StyleSheet.create({
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  centeredView: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 30,
  },
  modalView: {
    justifyContent: "space-around",
    alignItems: "center",
    width: "90%",

    height: 250,
    backgroundColor: "#615c5c",
    borderRadius: 10,
    paddingHorizontal: 15,
    // paddingTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.55,
    shadowRadius: 8,
    elevation: 20,
  },
  textSize: {
    textAlign: "center",
    fontSize: 25,
    color: "#fff",
  },
});

export default customModalStyles;
