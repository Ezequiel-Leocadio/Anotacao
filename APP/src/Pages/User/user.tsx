import { Text, View } from 'react-native';
import { Container, Form, Separator, Title } from './styles';
import { useEffect, useRef, useState } from 'react';
import { getDataUser, handleItensEdit, storeData } from '../../services/data';
import Button from '../../components/button';
import { requestApi } from '../../services/api';
import Load from '../../components/load';
import FormInput from '../../components/Input';

function User({ navigation, route }) {
  const [user, serUser] = useState<any>({ user: { nome: '' } });
  const passwordRef = useRef();
  const oldPasswordRef = useRef();
  const confirmPasswordRef = useRef();
  const loginRef = useRef();
  const [loading, setLoading] = useState(false);

  const [login, setLogin] = useState('');
  const [nome, setNome] = useState('');
  const [password, setPassword] = useState('');
  const [oldPassword, setOldPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

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
      const userf = await getDataUser();
      serUser(userf);
      setNome(userf.user.nome);
      setLogin(userf.user.usuario);
    });

    return unsubscribe;
  }, [navigation]);

  async function handleSubmit() {
    setLoading(true);
    const res = await requestApi({
      route: 'usuarioedit',
      method: 'put',
      data: {
        usuario: login,
        nome,
        senhaAntiga: oldPassword,
        senha: password,
        confirmSenha: confirmPassword,
      },
    });
    if (res.success) {
      await storeData({ tipo: 'user', value: JSON.stringify(res.data) });
    }
    setLoading(false);
  }

  async function handleSair() {
    await storeData({ tipo: 'user', value: '{}' });

    navigation.navigate('Login');
  }

  return (
    <Container>
      <Title>{user.user.nome}</Title>

      <Load loading={loading} />

      <Form>
        <FormInput
          placeholder="Digite seu Nome"
          value={nome}
          returnKeyType="next"
          onSubmitEditing={() => loginRef.current.focus()}
          onChangeText={setNome}
          label="Nome"
        />
        <FormInput
          placeholder="Digite seu Login"
          autoCorrect={false}
          autoCapitalize="none"
          value={login}
          ref={loginRef}
          returnKeyType="next"
          onSubmitEditing={() => oldPasswordRef.current.focus()}
          onChangeText={setLogin}
          label="Login"
        />

        <Separator />

        <FormInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua Senha Atual"
          ref={oldPasswordRef}
          returnKeyType="next"
          onSubmitEditing={() => passwordRef.current.focus()}
          value={oldPassword}
          onChangeText={setOldPassword}
          label="Senha Atual"
        />
        <FormInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua Nova Senha"
          ref={passwordRef}
          returnKeyType="next"
          onSubmitEditing={() => confirmPasswordRef.current.focus()}
          value={password}
          onChangeText={setPassword}
          label="Nova Senha"
        />
        <FormInput
          secureTextEntry
          autoCapitalize="none"
          placeholder="Digite sua Senha Novamente"
          ref={confirmPasswordRef}
          returnKeyType="send"
          onSubmitEditing={handleSubmit}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          label="Senha Novamente"
        />

        <Button
          top={20}
          size={100}
          icon="save"
          color="success"
          onPress={() => handleSubmit()}
        >
          Salvar
        </Button>

        <Button
          top={40}
          size={100}
          icon="exit-to-app"
          color="danger"
          onPress={() => handleSair()}
        >
          Sair
        </Button>
      </Form>
    </Container>
  );
}

export default User;
