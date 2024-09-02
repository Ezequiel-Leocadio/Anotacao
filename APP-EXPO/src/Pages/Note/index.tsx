import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, Platform } from "react-native";
import {
  getDataUrl,
  handleDeleteItem,
  handleEdit,
  handleFind,
} from "../../services/data";
import Icon from "@expo/vector-icons/MaterialIcons";
import {
  Container,
  TextId,
  TextInput,
  TextInputContent,
  Image,
  Text,
} from "./styles";
import { AlertConfirm } from "../../components/Alert";
import ButtonFloat from "../../components/button/Float";
import { HtmlEtiqueta } from "../../components/Print/etiqueta";
import { PrintFile } from "../../components/Print/print";
import * as ImagePicker from "expo-image-picker";
import { requestApi } from "../../services/api";

const App = ({ navigation, route }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalImg, setModalImg] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);

  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const { title, anotacao, image } = await handleFind(id);

      setTitle(title);
      if (anotacao === "" || anotacao === undefined) {
        setEdit(true);
      }
      setContent(anotacao);

      // if (image?.name) {
      setImg(image);
      // } else {
      //   const url: any = await getDataUrl();

      //   setImg({
      //     uri: `${url}${Platform.OS === "web" ? "" : "/"}files/${image}`,
      //   });
      // }
    }

    load();
  }, []);

  async function handleDelete() {
    await handleDeleteItem(id);
    navigation.goBack();
  }

  async function pickImageAsync() {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

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
      try {
        const image = {
          uri: result.assets[0].uri,
          type: "multipart/form-data",
          name: result.assets[0].uri,
        };
        // console.log(result.assets[0].base64);

        setImg(`data:image/png;base64,${result.assets[0].base64}`);

        // const dataForm: any = new FormData();
        // dataForm.append("id", id);
        // dataForm.append("file", image);

        // const res = await requestApi({
        //   route: "/sincronizarimage",
        //   method: "post",
        //   data: dataForm,
        //   file: true,
        // });
      } catch (error) {
        alert(`${error}`);
      }
    } else {
      // alert("You did not select any image.");
    }
  }

  useEffect(() => {
    navigation.setOptions({
      title: title,

      headerRight: () => (
        <View style={{ display: "flex", flexDirection: "row" }}>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() => {
              if (
                AlertConfirm("Excluir Nota", "Irá Excluir a Anotação Toda!")
              ) {
                handleDelete();
              }
            }}
          >
            <Icon name="delete" size={35} color="#f86161" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleEdit({ id, anotacao: content, list: [], title, image: img })
            }
          >
            <Icon name="save" size={35} color="#92effc" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content, img]);

  async function printEtiqueta() {
    const htmlIten = `
        <div class="etiqueta">
        <div class="title">${title}</div>
        <div class="codigo">Código: ${id}</div>
          
        </div>
    `;

    const html = HtmlEtiqueta(htmlIten);
    await PrintFile(html);
  }

  return (
    <>
      <Container>
        <TextId>Código: {id}</TextId>
        {edit ? (
          <TextInput
            placeholder="Titulo"
            value={title}
            onChangeText={setTitle}
          />
        ) : (
          <Text>{title}</Text>
        )}

        {edit ? (
          <TextInputContent
            multiline
            placeholder="Anotações"
            value={content}
            onChangeText={setContent}
          />
        ) : (
          <Text>{content}</Text>
        )}

        {img && (
          <TouchableOpacity onPress={() => setModalImg(true)}>
            <Image source={{ uri: img }} />
          </TouchableOpacity>
        )}

        <Modal
          animationType="fade"
          transparent={true}
          visible={modalImg}
          onRequestClose={() => setModalImg(false)}
        >
          {img && (
            <Image
              style={{ width: "100%", height: "100%" }}
              source={{ uri: img }}
            />
          )}
        </Modal>
      </Container>

      <ButtonFloat
        color="success"
        icon="edit"
        bottom={150}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={() => {
          setEdit((e) => !e);
        }}
      />

      <ButtonFloat
        color="info"
        icon="image"
        bottom={80}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={(e) => {
          pickImageAsync();
        }}
      />

      <ButtonFloat
        color="warning"
        icon="discount"
        bottom={10}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={(e) => {
          printEtiqueta();
        }}
      />
    </>
  );
};

export default App;
