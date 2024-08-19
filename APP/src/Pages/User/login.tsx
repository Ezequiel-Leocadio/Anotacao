import { Text, View } from 'react-native';
import { Container, Form, Title } from './styles';
import { useEffect, useRef, useState } from 'react';
import {
  getDataUser,
  handleCheckLogin,
  handleItensEdit,
  storeData,
} from '../../services/data';
import Button from '../../components/button';
import { requestApi } from '../../services/api';
import Load from '../../components/load';
import FormInput from '../../components/Input';

function Login({ navigation, route }) {
  const passwordRef: any = useRef();

  const [login, setLogin] = useState('');
  const [senha, setSenha] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit() {
    setLoading(true);
    const res = await requestApi({
      route: 'login',
      method: 'post',
      data: { login, senha },
    });
    if (res.success) {
      await storeData({ tipo: 'user', value: JSON.stringify(res.data) });
      navigation.navigate('Perfil');
    }
    setLoading(false);
  }

  useEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: '#615e5e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    });
    const unsubscribe = navigation.addListener('focus', async () => {
      const isLodado = await handleCheckLogin();
      if (isLodado) {
        navigation.navigate('Perfil');
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
          // keyboardType="email-address"
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
          icon="input"
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
