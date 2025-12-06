import styled from "styled-components/native";

export const Content: any = styled.View`
  flex: 1 1 auto;
`;

export const Container: any = styled.View`
  flex: 1 1 auto;
  padding: 5px;
  display: flex;
  /* height: 100%; */
  /* border: 1px solid; */
`;

export const Name = styled.Text`
  color: #fff;
  margin: 0 auto;
`;
export const Header = styled.View`
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  margin-top: 4px;
  justify-content: flex-end;
`;
export const Footer = styled.View`
  display: flex;
  flex-direction: row;
  padding-right: 20px;
  margin-top: 4px;
  justify-content: flex-end;
  align-items: center;
`;
export const Modal = styled.View``;
export const Check: any = styled.View``;

export const Table = styled.View`
  display: flex;
  min-height: 0;
  height: auto;
  /* overflow: auto; */
  flex-direction: column;
`;
export const Thead = styled.View`
  display: flex;
  align-items: center;
  border: 2px solid #92929263;
  justify-content: center;
`;
export const Tbody = styled.FlatList`
  max-height: 90%;
  width: 100%;
`;

export const TableTr: any = styled.TouchableOpacity`
  /* flex: 1; */
  display: flex;
  /* border-radius: 5px; */
  align-self: stretch;
  flex-direction: row;
  background: ${(props: any) =>
    props.index % 2 === 0 ? "#25292d" : "#2e3338"};
  /* margin-bottom: 3px; */
  justify-content: space-between;
  /* border: 1px solid; */
  border-left-style: solid;
  border-left-color: #000;
  border-left-width: 1px;

  border-right-style: solid;
  border-right-color: #000;
  border-right-width: 1px;
`;

export const TableThTr = styled.TouchableOpacity`
  /* flex: 1; */
  display: flex;
  border-radius: 5px;
  align-self: stretch;
  flex-direction: row;
  background: #01111e;
  margin-bottom: 3px;
  justify-content: space-between;
`;

export const TableTh: any = styled.Text`
  /* flex: 1; */
  display: flex;
  color: #fff;
  font-weight: bold;
  /* padding: 0 5px; */
  width: ${(props: any) => 100 / props.width}%;
  padding: 5px 0;
  text-align: center;
  border-right-width: 1px;
  border-right-color: #fff;
  font-size: 11px;
  align-self: center;
  justify-content: center;
`;

export const TableTd: any = styled.Text`
  /* flex: 1; */
  display: flex;
  color: #fff;
  width: ${(props: any) => 100 / props.width}%;

  padding: 5px 0;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-size: 12px;
`;

export const ListIten: any = styled.View`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;

  border-radius: 3px;
  padding: 5px;
  border-style: solid;
  border-left-width: 4px;
  border-left-color: #007ba4;
  border: 1px solid;
  margin: 3px;
`;

export const ListText = styled.Text`
  width: 100%;
  text-align: left;
  font-size: 20px;
  font-weight: bold;
  color: #2f2260;
`;

export const TitleList = styled.Text`
  color: #fff;
  font-weight: bold;
`;

export const CardList = styled.TouchableOpacity`
  margin-top: 10px;
  display: flex;
  width: 100%;
  /* height: 80px; */
  border-radius: 5px;
  border: 0.2px solid #e19c4e;
  padding: 0 5px;
  border-bottom-color: #e19c4e;
  border-bottom-width: 2.5px;
  border-bottom-style: solid;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  background: #fff;
`;

export const CardListItem = styled.View`
  display: flex;
  margin-top: 5px;
  width: auto;
  /* border: 1px solid; */
  flex-direction: row;
  align-items: end;
`;

export const CardListItemHead = styled.Text`
  color: #dfa968;
  margin-right: 5px;
  font-size: 20px;
`;

export const CardListItemBody: any = styled.Text`
  display: flex;
  /* color: #000; */
  color: ${(props: any) =>
    props.status === "danger"
      ? "#a51609"
      : props.status === "success"
      ? "#048a08"
      : props.theme.color_input};

  font-size: 20px;
  font-weight: bold;
`;
