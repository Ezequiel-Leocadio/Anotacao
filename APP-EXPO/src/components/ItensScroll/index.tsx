import React from "react";
import { ScrollView, View } from "react-native";

import { ListIten, ListTextLabel, ListTextValue } from "./styles";

function ItensScroll({ colluns, itens, onEvent }: any) {
  return (
    <ScrollView style={{ marginTop: 10 }}>
      {itens.map((item: any, indexi: any) => (
        <>
          {colluns.map((c: any) => (
            <ListIten>
              <ListTextValue>{c.label}:</ListTextValue>
              <ListTextLabel>{item[c.value]}</ListTextLabel>
            </ListIten>
          ))}
        </>
      ))}
    </ScrollView>
  );
}

export default ItensScroll;
