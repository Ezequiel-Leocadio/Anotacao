import styled from 'styled-components/native';

export const Container = styled.View``;

export const Loading = styled.View`
  justify-content: center;
  align-self: center;
  align-content: center;

  width: 20px;
  height: 20px;
  border-radius: 20px;
  padding: 30px;
  background: #fff;
`;

export const ContainerLoading = styled.View`
  flex: 1;
  justify-content: center;
  /* align-items: center; */
  align-self: center;
  align-content: center;

  width: 100%;
  height: 100%;
  /* line-height: 50px; */
  /* top: 40%; */
  /* margin-top: -80px; */
  border-radius: 20px;
  padding: 20px;
  background: #fff;
  display: flex;
  position: absolute;
  z-index: 1;
  /* border: 1px solid; */
  background: transparent;
`;

export const Text = styled.Text`
  color: #fff;
  margin: 5px;
  font-size: 16px;
  text-align: center;
`;

export const ModalBody = styled.View`
  display: flex;
  /* height: 50%; */
  padding: 20px;
  margin: auto 0;
  background: #34495e;
`;
