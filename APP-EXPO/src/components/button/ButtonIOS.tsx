import React, { ReactNode } from "react";
import { ActivityIndicator, TouchableOpacityProps } from "react-native";
// import PropTypes from 'prop-types';

import { ContainerIOS, Text, Icon, IconF } from "./styles";

type Props = {
  children: ReactNode;
  loading?: boolean;
  icon?: string;
  iconf?: string;
  color: string;
  top?: number;

  size?: number;
  hidden?: boolean;

  [x: string]: any;
} & TouchableOpacityProps;

export default function ButtonIOS({
  children,
  loading,
  icon,
  iconf,
  color,
  top,
  size,
  hidden,
  ...rest
}: Props) {
  let colorExa = "";
  let colorExaLight = "";
  switch (color) {
    case "success":
      colorExa = "#0f866f";
      colorExaLight = "#16a085";
      break;
    case "info":
      colorExa = "#0270ab";
      colorExaLight = "#0097e6f2";
      break;
    case "primary":
      colorExa = "#2eaccc";
      colorExaLight = "#4fcfef";

      break;
    case "warning":
      colorExa = "#796205";
      colorExaLight = "#cda502";
      break;
    case "danger":
      colorExa = "#c23616";
      colorExaLight = "#97270f";
      break;
    case "dark":
      colorExa = "#000000e3";
      colorExaLight = "#00000082";
      break;
    case "transparent":
      colorExa = "transparent";
      colorExaLight = "#0097e65c";
      break;
    default:
      colorExa = "#0270ab";
      colorExaLight = "#0097e6f2";
  }
  return (
    <ContainerIOS
      hidden={hidden}
      mTop={top}
      msize={size}
      color={colorExaLight}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator size="small" color="#FFF" />
      ) : (
        <>
          {icon && (
            <Icon colorIcon={colorExa} name={icon} size={35} color="#fff" />
          )}
          {iconf && (
            <IconF colorIcon={colorExa} name={iconf} size={35} color="#fff" />
          )}
          <Text>{children}</Text>
        </>
      )}
    </ContainerIOS>
  );
}
