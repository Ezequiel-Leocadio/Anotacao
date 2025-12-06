import React, { forwardRef, useState } from "react";

import * as ImagePicker from "expo-image-picker";

import {
  ButtonImage,
  ButtonImageText,
  ImagePreviu,
  InputGrup,
  LabelInput,
  LabelInputText,
} from "./stylesInput";
import { AlertConfirm } from "../Alert";

export default function Image({
  style,
  name,
  required,
  label,
  onSelected,
  ...rest
}: any) {
  const [selected, setSelected] = useState(name);
  const [prev, setPrev] = useState<any>(null);

  async function pickImageAsync() {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();

      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const galeria = await AlertConfirm(
        "Buscar Na Galeria ?",
        "Clique em (Cancelar) para Abrir a Câmera!"
      );

      let result = null;
      if (galeria) {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          base64: true,
        });
      } else {
        result = await ImagePicker.launchCameraAsync({ base64: true });
      }

      if (!result.canceled) {
        const image = {
          uri: result.assets[0].uri,
          type: "multipart/form-data",
          name: result.assets[0].uri,
        };

        setPrev(result.assets[0].uri);
        onSelected(`data:image/png;base64,${result.assets[0].base64}`);
        setSelected(image.name);
        // console.log(result.assets[0].base64);

        // setImg(`data:image/png;base64,${result.assets[0].base64}`);

        // const dataForm: any = new FormData();
        // dataForm.append("id", id);
        // dataForm.append("file", image);

        // const res = await requestApi({
        //   route: "/sincronizarimage",
        //   method: "post",
        //   data: dataForm,
        //   file: true,
        // });
      } else {
        // alert("You did not select any image.");
      }
    } catch (error) {
      alert(`${error}`);
    }
  }

  async function handleSelectImage() {
    try {
      const permissionResult =
        await ImagePicker.requestCameraPermissionsAsync();
      if (permissionResult.granted === false) {
        alert("You've refused to allow this appp to access your camera!");
        return;
      }
      const galeria = await AlertConfirm(
        "Buscar Na Galeria ?",
        "Clique em (Cancelar) para Abrir a Câmera!"
      );

      let result = null;

      if (galeria) {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          // base64: true,
        });
      } else {
        result = await ImagePicker.launchCameraAsync();
      }

      if (!result.canceled) {
        const image = {
          uri: result.assets[0].uri,
          type: "multipart/form-data",
          name: result.assets[0].uri,
        };
        setPrev(result.assets[0].uri);
        onSelected(image);
        setSelected(image.name);
      }
    } catch (error) {
      alert(`Erro ${error}`);
    }
  }

  return (
    <>
      <InputGrup>
        <LabelInput>
          <LabelInputText>
            {label}:{required ? "*" : ""}
          </LabelInputText>
        </LabelInput>
        <ButtonImage onPress={() => pickImageAsync()}>
          <ButtonImageText>{selected}</ButtonImageText>
        </ButtonImage>
      </InputGrup>
      {prev && <ImagePreviu source={{ uri: prev }} />}
    </>
  );
}
