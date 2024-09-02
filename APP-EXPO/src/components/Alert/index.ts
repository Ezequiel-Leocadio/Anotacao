import { Alert, Platform } from "react-native";

export const AlertConfirm = async (title, description) => {
  return new Promise((resolve, reject) => {
    try {
      if (Platform.OS === "web") {
        resolve(
          window.confirm([title, description].filter(Boolean).join("\n"))
        );
      } else {
        Alert.alert(
          title,
          description,
          [
            { text: "Cancelar", onPress: () => resolve(false) },
            { text: "SIM", onPress: () => resolve(true) },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      reject(error);
    }
  });
};

export const StdAlert = (title, description) => {
  if (Platform.OS === "web") {
    window.confirm([title, description].filter(Boolean).join("\n"));
  } else {
    Alert.alert(title, description);
  }
};
