import AsyncStorage from '@react-native-async-storage/async-storage';

import axios from 'axios';
import { Alert } from 'react-native';
import { getDataUser, handleCheckLogin } from './data';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@nota_storage_Key_ip_server');
    if (value !== null) {
      return value;
    }
    return 0;
  } catch (e) {
    return 0;
  }
};

// export const urlSocket = `http://192.168.40.7:4488`;

export const requestApi = async (props) => {
  const {
    route,
    method,
    data,
    timeout = 9000,
    notification = true,
    notificationError = true,
  } = props;
  const ip = '192.168.40.94'; //await getData();
  const user = await getDataUser();
  const isLogado = await handleCheckLogin();

  if ((!user || !isLogado) && route !== 'login') {
    Alert.alert('Erro', 'Necessário Fazer Login');
    return { success: false, message: ` Necessário Fazer Login` };
  }

  const api = axios.create({
    baseURL: ' https://58e8-186-26-111-30.ngrok-free.app', //`http://${ip}:3131`,
    timeout: 9000,
    timeoutErrorMessage: 'Erro de Conexão, Verifique sua Rede!!',
    // baseURL: 'http://10.0.2.212:3333',
  });
  api.defaults.headers.Authorization = `Bearer ${user.token}`;
  try {
    let response: any = [];
    let dataParams = data;
    if (method.toUpperCase() === 'GET') {
      dataParams = { params: data };
    }
    await api[method](route, dataParams, { timeout })
      .then((res) => {
        const { success, message } = res.data;
        if (success) {
          response = res.data;
          // Alert.alert('Sucesso', message);
        } else {
          if (notification) {
            Alert.alert('Erro', message);
          }
          response = { ...res.data, success: false, message };
        }
      })
      .catch((error) => {
        if (notificationError) {
          Alert.alert('Erro', ` ${error}`);
        }

        response = { success: false, message: `${error}` };
      });

    return response;
  } catch (error) {
    if (notification) {
      Alert.alert('Erro', ` ${error}`);
    }
    return { success: false, message: ` ${error}` };
  }
};
