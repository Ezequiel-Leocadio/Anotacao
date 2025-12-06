import React from "react";
import { ScrollView, View } from "react-native";

import { ListIten, ListText, TitleList } from "./styles";

function List({ colluns, itens, maxHeight = "75%" }: any) {
  return (
    <ScrollView style={{ maxHeight: maxHeight }}>
      {itens.map((item: any, indexx: any) => (
        <View key={String(indexx)}>
          {colluns.map((c: any, index: any) => (
            <>
              <TitleList key={String(index)}>{c.label}:</TitleList>
              <ListIten index={index}>
                <ListText>{item[c.value]}</ListText>
              </ListIten>
            </>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}

export default List;
