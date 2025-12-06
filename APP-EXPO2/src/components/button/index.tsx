import React, { ReactNode } from 'react';
import { ActivityIndicator } from 'react-native';

import { ContainerIOS, Text, Icon, IconF } from './styles';

type PropsButton = {
  children?: ReactNode;
  density?: string | 'solid' | 'transparent';
  icon?: string;
  iconf?: string;
  size?: number;
  color: string;
  [x: string]: any;
};

export default function button(props: PropsButton) {
  const {
    children,
    loading,
    icon,
    iconf,
    color,
    top = 0,
    size,
    hidden,
    ...rest
  } = props;
  let colorExa = '';
  let colorExaLight = '';
  switch (color) {
    case 'success':
      colorExa = '#16a085';
      colorExaLight = '#16a08561';
      break;
    case 'info':
      colorExa = '#00a7ff';
      colorExaLight = '#0097e65c';
      break;
    case 'primary':
      colorExa = '#4fcfef';
      colorExaLight = '#4fcfef9c';

      break;
    case 'warning':
      colorExa = '#ff9800de';
      colorExaLight = '#9e610787';
      break;
    case 'danger':
      colorExa = '#c23616';
      colorExaLight = '#f5573475';
      break;
    case 'dark':
      colorExa = '#000000e3';
      colorExaLight = '#00000082';
      break;
    case 'transparent':
      colorExa = 'transparent';
      colorExaLight = '#0097e65c';
      break;
    default:
      colorExa = '#3b9eff';
      colorExaLight = '#0097e65c';
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
