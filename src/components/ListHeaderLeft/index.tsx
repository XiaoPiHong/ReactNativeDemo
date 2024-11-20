import React from "react";
import {IconButton} from "react-native-paper";
import {useTheme} from "@/context/useThemeContext";

const ListHeaderLeft = props => {
  console.log(props);
  const {theme} = useTheme();
  return (
    <IconButton
      icon="view-list"
      iconColor={theme.colors.primary}
      size={30}
      onPress={() => console.log("Pressed")}
    />
  );
};

export default ListHeaderLeft;
