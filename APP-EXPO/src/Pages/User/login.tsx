import { Container, Form, Title } from "./styles";
import { useEffect, useRef, useState } from "react";
import { getDataUrl, handleCheckLogin, storeData } from "../../services/data";
import Button from "../../components/button";
import { requestApi } from "../../services/api";
import Load from "../../components/load";
import FormInput from "../../components/Input";

function Login({ navigation, route }) {
  const passwordRef: any = useRef(null);

  const [login, setLogin] = useState("");
  const [url, setUrl] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   async function load() {
  //     console.log(Location.stopGeofencingAsync("taskName"));
  //     const { status } = await Notifications.getPermissionsAsync();

  //     console.log(status);
  //     if (status !== "granted") {
  //       alert("Erro você não possiu permissão de notificação");
  //       return;
  //     }

  //     let { status: statusLocation } =
  //       await Location.requestForegroundPermissionsAsync();
  //     if (statusLocation !== "granted") {
  //       alert("Permission to access location was denied");
  //       return;
  //     }

  //     let token = await Notifications.getExpoPushTokenAsync();

  //     console.log(token);

  //     Notifications.addNotificationReceivedListener(async (notification) => {
  //       console.log(notification);

  //       let location = await Location.getCurrentPositionAsync({});

  //       const res = await requestApi({
  //         route: "usuariolocation",
  //         method: "post",
  //         data: { location },
  //       });
  //       if (res.success) {
  //         //
  //       }
  //     });
  //   }

  //   load();
  // }, []);

  async function handleSubmit() {
    setLoading(true);
    await storeData({ tipo: "url", value: url });

    const res = await requestApi({
      route: "login",
      method: "post",
      data: { login, senha },
    });
    if (res.success) {
      await storeData({ tipo: "user", value: JSON.stringify(res.data) });
      navigation.navigate("Perfil");
    }
    setLoading(false);
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setUrl(String(await getDataUrl()));
      const isLodado = await handleCheckLogin();
      if (isLodado) {
        navigation.navigate("Perfil");
      }
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <Container>
      <Title>Login</Title>

      <Load loading={loading} />

      <Form>
        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="url"
          returnKeyType="next"
          value={url}
          onChangeText={setUrl}
          label="URL"
        />

        <FormInput
          autoCorrect={false}
          autoCapitalize="none"
          placeholder="Digite seu Login"
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={login}
          onChangeText={setLogin}
          label="Login"
        />
        <FormInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua Senha"
          ref={passwordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={senha}
          onChangeText={setSenha}
          label="Senha"
        />

        <Button
          top={20}
          size={100}
          icon="login"
          color="success"
          onPress={() => handleSubmit()}
        >
          Acessar
        </Button>
      </Form>
    </Container>
  );
}

export default Login;
