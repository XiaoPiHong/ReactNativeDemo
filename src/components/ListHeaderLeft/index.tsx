import React from "react";
import {IconButton} from "react-native-paper";
import {useTheme} from "@/context/useThemeContext";
import {useRootComps} from "@/context/useRootCompsContext";

const ListHeaderLeft = ({navigationProps}) => {
  const {theme} = useTheme();
  const {listDrawerRef} = useRootComps();
  const onPress = () => {
    console.log("navigationProps", navigationProps);
    listDrawerRef?.current?.setOpen(true);
  };
  return (
    <IconButton
      icon="view-list"
      iconColor={theme.colors.primary}
      size={30}
      onPress={onPress}
    />
  );
};

export default ListHeaderLeft;
