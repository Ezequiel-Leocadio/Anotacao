import axios from "axios";
import { getDataUrl, getDataUser, handleCheckLogin } from "./data";
import { StdAlert } from "../components/Alert";

export const requestApi = async (props) => {
  const {
    route,
    method,
    data,
    timeout = 9000,
    notification = true,
    notificationError = true,
    file = false,
  } = props;
  const url: any = await getDataUrl();
  const user = await getDataUser();
  const isLogado = await handleCheckLogin();

  if (!url) {
    StdAlert("Erro", "Necessário Informar URL");
    return { success: false, message: ` Necessário Informar URL` };
  }

  if ((!user || !isLogado) && route !== "login") {
    StdAlert("Erro", "Necessário Fazer Login");
    return { success: false, message: ` Necessário Fazer Login` };
  }

  const api = axios.create({
    baseURL: url,
    timeout: 9000,
    timeoutErrorMessage: "Erro de Conexão, Verifique sua Rede!!",
  });
  api.defaults.headers.Authorization = `Bearer ${user.token}`;
  if (file) {
    api.defaults.headers.accept = `application/json`;
    api.defaults.headers["Content-Type"] = `multipart/form-data`;
  }

  try {
    let response: any = [];
    let dataParams = data;
    if (method.toUpperCase() === "GET") {
      dataParams = { params: data };
    }
    await api[method](route, dataParams, { timeout })
      .then((res) => {
        const { success, message } = res.data;
        if (success) {
          response = res.data;
        } else {
          if (notification) {
            StdAlert("Erro", message);
          }
          response = { ...res.data, success: false, message };
        }
      })
      .catch((error) => {
        if (notificationError) {
          StdAlert("Erro", ` ${error}`);
        }

        response = { success: false, message: `${error}` };
      });

    return response;
  } catch (error) {
    if (notification) {
      StdAlert("Erro", ` ${error}`);
    }
    return { success: false, message: ` ${error}` };
  }
};
