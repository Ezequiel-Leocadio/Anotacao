import styled, { css } from "styled-components/native";

import Iconn from "@expo/vector-icons/MaterialIcons";
import IconFf from "@expo/vector-icons/Ionicons";

export const ContainerIOS: any = styled.TouchableOpacity`
  height: 46px;
  width: ${(props: any) => props.msize}%;
  background: ${(props: any) => props.color};
  border: 1px solid ${(props: any) => props.color};
  margin-top: ${(props: any) => props.mTop}px;
  border-radius: 4px;
  padding-left: 10px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${(props: any) =>
    props.hidden === true &&
    css`
      display: none;
    `}
`;

export const ButtonFloat: any = styled.TouchableOpacity`
  margin-top: 5px;
  position: absolute;

  /* opacity: 0.7; */
  z-index: 5;
  display: flex;
  background: ${(props: any) => props.color};
  border: 1px solid ${(props: any) => props.color};
  margin-top: ${(props: any) => props.mTop}px;
  flex-direction: row;
  text-align: center;
  /* right: 10px; */
  /* left: 10px; */
  border-radius: 26px;
  height: 55px;
  width: 55px;
  bottom: ${(props: any) => props.bottom}px;
  /* shadow-color: #000;
  shadow-offset:  {width: 1, height: 13};
  shadow-opacity: 1; */
  align-items: center;
  text-align: center;
  justify-content: center;
  elevation: 6;
`;

export const Text = styled.Text`
  flex: 1;
  font-size: 20px;
  text-align: center;
  padding-right: 15%;
  max-height: 50px;
  /* border: 2px solid #000; */
  /* padding-right: 10%; */

  color: #fff;
`;

export const Icon: any = styled(Iconn)`
  padding: 2px;
  border-radius: 4px;
  background: ${(props: any) => props.colorIcon};
`;

export const IconF = styled(IconFf)`
  padding: 2px;
  border-radius: 4px;
  background: ${(props: any) => props.colorIcon};
`;

export const ModalContent: any = styled.TouchableOpacity`
  /* display: flex; */
  background: #161616c7;
  height: 100%;
  align-items: center;
  padding: 8px 10px;
`;

export const MBody: any = styled.View`
  display: flex;
  /* align-self: center; */
  width: 100%;
  /* line-height: 150px; */
  /* top: 10%; */
  /* margin-top: -80px; */

  min-height: 250px;
  /* border-radius: 50px; */
  margin: 0;
  /* background: #000; */
  elevation: 6;
  shadow-color: transparent;
  shadow-offset: 0 0;
  shadow-opacity: 0;
  position: absolute;
  bottom: 50px;
  border: none;

  justify-content: center;
  align-items: flex-end;
  /* background: #dfe4ea; */
`;

export const BodyChil = styled.View`
  /* padding: 0px 10px 5px 10px; */
`;
