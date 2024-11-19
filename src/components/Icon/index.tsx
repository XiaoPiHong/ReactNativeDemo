import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import {ColorValue} from "react-native";
import {Text} from "react-native-paper";

const Icon = ({
  name,
  color,
  size = 24,
}: {
  name: string;
  color?: ColorValue | number;
  size?: number;
}) => {
  return (
    <Text>
      <IonIcon name={name} size={size} color={color} />
    </Text>
  );
};

export default Icon;
