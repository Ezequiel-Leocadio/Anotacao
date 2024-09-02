import { Container, Form, Title } from "./styles";
import { useEffect, useRef, useState } from "react";
import { getDataUrl, handleCheckLogin, storeData } from "../../services/data";
import Button from "../../components/button";
import { requestApi } from "../../services/api";
import Load from "../../components/load";
import FormInput from "../../components/Input";
import Entypo from "@expo/vector-icons/Entypo";

function Login({ navigation, route }) {
  const passwordRef: any = useRef(null);

  const [login, setLogin] = useState("");
  const [url, setUrl] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

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
