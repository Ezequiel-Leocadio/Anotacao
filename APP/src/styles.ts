import styled from 'styled-components/native';
import { Image as ImageRn } from 'react-native';

export const Content = styled.View`
  flex: 1;
  display: flex;
  width: 100%;
  margin: 0;
  height: 100vh;
  background: #2c3e50;
  overflow: hidden;
  flex-direction: column;
`;

export const Header = styled.View`
  margin-bottom: 20px;

  display: flex;
  /* background-color: #211312; */
  background-color: #252e48;
  position: relative;
  color: #fff;
  padding: 5px;
  z-index: 4;
  align-items: center;
  height: 100px;
  text-align: center;
  justify-content: center;
  z-index: 4;
  width: 100%;

  border-bottom-width: 4px;
  border-bottom-color: #ff9800;
  /* transform: rotate(-2deg); */
`;

export const HeaderText = styled.Text`
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-size: 50px;

  text-align: center;
`;

export const Body = styled.View`
  flex: 1;
  display: flex;
  justify-content: center;

  flex-direction: row;
`;

export const Card = styled.TouchableOpacity`
  /* box-shadow: 0 5px 11px 0 #273c75, 0 4px 15px 0 #273c75; */
  /* flex: 1; */

  width: 40%;
  height: 80%;
  background: #21364a;
  border-radius: 5px;
  margin: auto 5px;
  display: flex;
  justify-content: center;
  cursor: pointer;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  justify-content: center;
  padding: 15px 0px;
  border: 1px solid #fff;
  font-family: 'Oswald';
  /* line-height: 1.1; */
`;

export const CardQr = styled.View`
  /* box-shadow: 0 5px 11px 0 #273c75, 0 4px 15px 0 #273c75; */
  /* flex: 1; */

  width: 100%;
  height: 200px;
  background: #21364a;
  border-radius: 5px;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  text-align: center;
  color: #fff;
  justify-content: center;
`;

export const CardText = styled.Text`
  /* flex: 1; */
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-size: 40px;

  text-align: center;
`;

export const Title = styled.Text`
  display: flex;
  width: 100%;
  align-content: center;
  justify-content: center;
  color: #fff;
  font-size: 20px;

  text-align: center;
`;

export const Teclado = styled.View`
  display: flex;
  width: 500px;
  height: 340px;
  align-content: center;
  justify-content: center;
  margin: 0 auto;
  /* margin-top: 30px; */
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Tecla = styled.TouchableOpacity`
  width: 30%;
  height: 50px;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 27px;
  font-weight: bold;
  border-radius: 5px;
  margin: 5px;
  cursor: pointer;
  transition: all 0.1s ease 0s;
  color: #000;
`;

export const Image = styled(ImageRn)`
  margin: 0 auto;
  width: 200px;
  height: 200px;
  border-radius: 20px;
`;

export const ImageQr = styled(ImageRn)`
  margin: 0 auto;
  width: 350px;
  height: 350px;
  border-radius: 5px;
`;
export const TextTecla = styled.Text`
  color: #000;
  font-size: 35px;
  font-weight: bold;
`;

export const SemPapelContent = styled.View`
  background: #ffeb3b;
  height: 100%;
  justify-content: center;
  padding: 10px 0;
  display: flex;
`;

export const SemPapelImage = styled(ImageRn)`
  margin: 0 auto;
  width: 100px;
  height: 100px;
  border-radius: 20px;
`;

export const SemPapelText = styled.Text`
  text-align: center;
  color: #000;
  font-weight: bold;
  font-size: 50px;
  /* line-height: 2; */
`;

export const NotasContente = styled.TouchableOpacity`
  display: flex;
  width: 100%;
  padding: 10px;
  border-top-width: 1px;
  border-bottom-width: 1px;

  border-top-style: solid;
  border-bottom-style: solid;

  border-top-color: #000;
  border-bottom-color: #000;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
`;

export const NotaTitle = styled.Text`
  display: flex;
  color: #000;
  font-weight: bold;
  font-size: 20px;
  width: 80%;
  text-align: left;

  /* line-height: 2; */
`;

export const ScrollItens = styled.ScrollView.attrs({
  // contentContainerStyle: { padding: 10 },
})`
  align-self: stretch;

  width: 100%;
  display: flex;
  max-height: 90%;
  padding: 10px 10px;
  /* padding-bottom: 50px; */
  /* justify-content: space-between; */
`;
