import React from "react";
import { ScrollView, View } from "react-native";

import {
  CardList,
  CardListItem,
  CardListItemBody,
  CardListItemHead,
} from "./styles";

type Props = {
  itens: any;
  colluns: any;
};

function ListCard({ colluns, itens }: Props) {
  return (
    <View>
      {itens.map((item: any, indexx: any) => (
        <CardList key={String(indexx)}>
          {colluns.map((c: any, index: any) => (
            <CardListItem key={String(index)}>
              <CardListItemHead>{c.label}:</CardListItemHead>
              <CardListItemBody>{item[c.value]}</CardListItemBody>
            </CardListItem>
          ))}
        </CardList>
      ))}
    </View>
  );
}

export default ListCard;
