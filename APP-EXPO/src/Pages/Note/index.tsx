import React, { useContext, useEffect, useState } from "react";
import { View, TouchableOpacity, Modal, ToastAndroid } from "react-native";
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
import { AlertConfirm, StdAlert } from "../../components/Alert";
import ButtonFloat from "../../components/button/Float";
import { HtmlEtiqueta } from "../../components/Print/etiqueta";
import { PrintFile } from "../../components/Print/print";
import * as ImagePicker from "expo-image-picker";
import Button from "../../components/button";
import { ModalContent } from "../../components/button/styles";
import * as Clipboard from "expo-clipboard";
import { WebSocketContext } from "../../WebSocket";

const App = ({ navigation, route }) => {
  const ws: any = useContext(WebSocketContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [modalImg, setModalImg] = useState(false);
  const [opcoes, setOpcoes] = useState(false);
  const [edit, setEdit] = useState(false);
  const [img, setImg] = useState(null);
  const [uuid, setUuid] = useState(null);
  const [codigo, setCodigo] = useState(null);

  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const { title, anotacao, image, uuid, codigo } = await handleFind(id);

      setTitle(title);
      setUuid(uuid);
      setCodigo(codigo);
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

  // useEffect(() => {

  //   navigation.setOptions({
  //     title: title,

  //     headerRight: () => (
  //       <View style={{ display: "flex", flexDirection: "row" }}>
  //         <TouchableOpacity
  //           style={{ marginRight: 20 }}
  //           onPress={async () => {
  //             if (
  //               await AlertConfirm(
  //                 "Excluir Nota",
  //                 "Irá Excluir a Anotação Toda!"
  //               )
  //             ) {
  //               handleDelete();
  //             }
  //           }}
  //         >
  //           <Icon name="delete" size={35} color="#f86161" />
  //         </TouchableOpacity>
  //         <TouchableOpacity
  //           style={{ width: 50 }}
  //           onPress={() => {
  //             handleEdit({
  //               id,
  //               anotacao: content,
  //               list: [],
  //               title,
  //               image: img,
  //             });
  //             ws.sendMessage({
  //               data: {
  //                 id,
  //                 anotacao: content,
  //                 list: [],
  //                 title,
  //                 image: img,
  //                 uuid,
  //               },
  //               message: "note",
  //             });

  //             StdAlert("Salvo", "Anotação Salva");
  //           }}
  //         >
  //           <Icon name="save" size={35} color="#92effc" />
  //         </TouchableOpacity>
  //       </View>
  //     ),
  //   });
  // }, [navigation, title, content, img, uuid]);

  useEffect(() => {
    async function load() {
      await handleEdit({
        id,
        anotacao: content,
        list: [],
        title,
        image: img,
      });
    }
    load();
  }, [title, content, img]);

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

  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(content);

    setOpcoes(false);
    // ToastAndroid.show("Copiado", ToastAndroid.SHORT);
  };

  return (
    <>
      <Container>
        <TextId>Código: {codigo}</TextId>
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
          <ModalContent>
            {img && (
              <Image
                style={{ width: "95%", height: "80%", resizeMode: "contain" }}
                source={{ uri: img }}
              />
            )}

            <Button
              top={10}
              size={100}
              icon="close"
              color="danger"
              onPress={() => setModalImg(false)}
            >
              Fechar
            </Button>
          </ModalContent>
        </Modal>
      </Container>

      {opcoes && (
        <>
          <ButtonFloat
            color="warning"
            icon="discount"
            name="Imprimir"
            bottom={355}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={(e) => {
              printEtiqueta();
              setOpcoes(false);
            }}
          />
          <ButtonFloat
            color="danger"
            icon="delete"
            name="Excluir"
            bottom={286}
            // left={10}

            position="right"
            onKeyBoardHidden={true}
            onPress={async () => {
              if (
                await AlertConfirm(
                  "Excluir Nota",
                  "Irá Excluir a Anotação Toda!"
                )
              ) {
                handleDelete();
              }
              setOpcoes(false);
            }}
          />

          {/* <ButtonFloat
            color="success"
            icon="save"
            name="Salvar"
            bottom={218}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={() => {
              handleEdit({
                id,
                anotacao: content,
                list: [],
                title,
                image: img,
              });
              ws.sendMessage({
                data: {
                  id,
                  anotacao: content,
                  list: [],
                  title,
                  image: img,
                  uuid,
                },
                message: "note",
              });

              StdAlert("Salvo", "Anotação Salva");
              setOpcoes(false);
            }}
          /> */}

          {!edit && (
            <ButtonFloat
              name="Copiar"
              color="info"
              icon="content-paste-go"
              bottom={150}
              left={10}
              position="right"
              onKeyBoardHidden={true}
              onPress={copyToClipboard}
            />
          )}

          {edit && (
            <ButtonFloat
              name="Imagem"
              color="info"
              icon="image"
              bottom={150}
              left={10}
              position="right"
              onKeyBoardHidden={true}
              onPress={(e) => {
                pickImageAsync();
                setOpcoes(false);
              }}
            />
          )}

          <ButtonFloat
            color="success"
            icon="edit"
            name="Editar"
            bottom={80}
            left={10}
            position="right"
            onKeyBoardHidden={true}
            onPress={() => {
              setEdit((e) => !e);
            }}
          />
        </>
      )}
      <ButtonFloat
        color="primary"
        icon={null}
        iconf="gear"
        name="Opçoes"
        bottom={10}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onPress={(e) => {
          setOpcoes((e) => !e);
        }}
      />
    </>
  );
};

export default App;
