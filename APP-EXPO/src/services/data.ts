import AsyncStorage from "@react-native-async-storage/async-storage";
import jwtDecode from "jwt-decode";

export const storeData = async ({ value, tipo }) => {
  try {
    await AsyncStorage.setItem("@nota_storage_Key_" + tipo, value);
  } catch (e) {
    // saving error
  }
};

export const getDataUser = async () => {
  try {
    const value = await AsyncStorage.getItem("@nota_storage_Key_user");
    if (value !== null) {
      return JSON.parse(value);
    }
    return false;
  } catch (e) {
    return false;
  }
};

export const getDataUrl = async () => {
  try {
    const value = await AsyncStorage.getItem("@nota_storage_Key_url");
    if (value !== null) {
      return value;
    }
    return "";
  } catch (e) {
    return "";
  }
};

export const getData = async ({ tipo }) => {
  try {
    const value = await AsyncStorage.getItem("@nota_storage_Key_" + tipo);
    if (value !== null) {
      const itens = JSON.parse(value);
      const filter = itens.filter((f) => f.tipo !== "excluido");
      return filter;
    }
    return [];
  } catch (e) {
    return [];
  }
};

export const handleDeleteItem = async (id) => {
  const itensGet: any = await getData({ tipo: "itens" });
  const index = itensGet.findIndex((f) => f.id === id);
  if (index >= 0) {
    itensGet[index].tipo = "excluido";
    itensGet[index].edit = true;
  }
  await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });
};

export const handleEdit = async ({
  id,
  title,
  list,
  anotacao,
  image = null,
}) => {
  const itensGet: any = await getData({ tipo: "itens" });
  const index = itensGet.findIndex((f) => f.id === id);
  if (index >= 0) {
    itensGet[index].title = title;
    itensGet[index].edit = true;
    itensGet[index].list = list;
    itensGet[index].anotacao = anotacao;
    itensGet[index].image = image;
  }
  await storeData({ tipo: "itens", value: JSON.stringify(itensGet) });
};

export const handleFind = async (id) => {
  const itensGet: any = await getData({ tipo: "itens" });
  const index = itensGet.findIndex((f) => f.id === id);
  if (index >= 0) {
    return itensGet[index];
  }

  return {};
};

export const handleItensEdit = async () => {
  const value = await AsyncStorage.getItem("@nota_storage_Key_itens");
  if (value !== null) {
    const itens = JSON.parse(value);
    const filter = itens.filter((f) => f.edit === true);

    return filter;
  }

  return [];
};

export const handleCheckLogin = async () => {
  const user = await getDataUser();

  // console.log(user);

  try {
    const decodedToken: any = jwtDecode(user.token);

    const dateNow = new Date();
    const dateNoww = new Date();
    let isValid = true;
    dateNoww.setTime(decodedToken.exp * 1000);
    const timeExpiration = decodedToken.exp * 1000;
    if (timeExpiration < dateNow.getTime()) {
      isValid = false;
    }

    return isValid;
  } catch (error) {
    console.log(error);

    return false;
  }
};
