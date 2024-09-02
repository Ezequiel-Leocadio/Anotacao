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
