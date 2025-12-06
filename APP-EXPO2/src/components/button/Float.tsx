import React, { useState } from "react";
import { Text } from "react-native";
import Icon from "@expo/vector-icons/MaterialIcons";
import Iconf from "@expo/vector-icons/FontAwesome6";

import { ButtonFloat } from "./styles";

export default function Float({
  loading = false,
  icon,
  iconf = "",
  color,
  top = 0,
  onKeyBoardHidden,
  position,
  name,
  ...rest
}) {
  let colorExa = "";
  switch (color) {
    case "success":
      colorExa = "#16a085";
      break;
    case "info":
      colorExa = "#0097e6";
      break;
    case "warning":
      colorExa = "#f1c40f";
      break;
    case "dark":
      colorExa = "#000000e3";
      break;
    case "danger":
      colorExa = "#c23616";
      break;

    case "transparent":
      colorExa = "transparent";
      break;
    default:
      colorExa = "#3b9eff";
  }

  const [hiddenKeyboad, setHiddenKeyboad] = useState(false);
  const [modal, setModal] = useState(false);
  const _keyboardDidShow = () => {
    // alert(onKeyBoardHidden);
    if (onKeyBoardHidden) {
      setHiddenKeyboad(true);
    } else {
      setHiddenKeyboad(false);
    }
  };

  return (
    <>
      {!hiddenKeyboad && (
        <ButtonFloat
          hidden={hiddenKeyboad}
          style={{ [position]: 10 }}
          mTop={top}
          color={colorExa}
          {...rest}
        >
          {loading ? (
            <></>
          ) : (
            <>
              {icon && (
                <Icon
                  name={icon}
                  size={35}
                  color={color === "warning" ? "#000" : "#fff"}
                />
              )}

              {iconf && (
                <Iconf
                  name={iconf}
                  size={35}
                  color={color === "warning" ? "#000" : "#fff"}
                />
              )}
            </>
          )}
          <Text
            style={{
              color: color === "warning" ? "#000" : "#fff",
              fontSize: 12,
            }}
          >
            {name || icon || iconf}
          </Text>
        </ButtonFloat>
      )}
    </>
  );
}
