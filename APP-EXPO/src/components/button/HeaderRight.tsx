import React from "react";
import { View } from "react-native";

type PropsBts = {
  icon: string;
  color: string;
  name: string;
  onPress: () => void;
};
type PropsButton = {
  buttons: PropsBts[];
  [x: string]: any;
};

export function HeaderRight(props: PropsButton) {
  const { buttons } = props;

  return (
    <View style={{ display: "flex", flexDirection: "row" }}>
      {/* {buttons.map((e, index) => (
        <TouchableOpacity key={String(index)} onPress={() => e.onPress()}>
          <Icon name={e.icon} size={35} color={e.color} />
        </TouchableOpacity>
      ))} */}
    </View>
  );
}
