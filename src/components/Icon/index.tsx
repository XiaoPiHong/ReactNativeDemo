import React from "react";
import IonIcon from "react-native-vector-icons/Ionicons";
import {ColorValue} from "react-native";

const Icon = ({
  name,
  color,
  size = 24,
}: {
  name: string;
  color?: ColorValue | number;
  size?: number;
}) => {
  return <IonIcon name={name} size={size} color={color} />;
};

export default Icon;
