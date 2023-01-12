import React from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { ActivityIndicator } from "react-native";

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type HiddenCardProps = {
  loading: boolean
}

const indicator = (isLoading: boolean, left: boolean) => {
  switch(isLoading){
    case false: if(left){return <Ionicons name="arrow-back-circle-outline" size={40} color="white" />} 
                else{return <Ionicons name="arrow-forward-circle-outline" size={40} color="white" />}
    case true: return <ActivityIndicator size={40} color="white"/>            
  }
}

export const HiddenCard = (props: HiddenCardProps) => {
  return (
    <Box height={theme.heights.m} paddingTop={"m"} flexDirection={"row"}>

      {/* This is the left hidden Card */}
      <Box flex={1}>
        <Box
          height={theme.heights.m}
          borderBottomLeftRadius={20}
          borderTopLeftRadius={20}
          alignItems={"flex-start"}
          justifyContent={"center"}
          backgroundColor="accent"
          paddingLeft={"s"}
        >
          {indicator(props.loading, true)}
        </Box>
      </Box>

      {/* This is the right hidden Card */}
      <Box flex={1}>
        <Box
          height={theme.heights.m}
          borderBottomRightRadius={20}
          borderTopRightRadius={20}
          alignItems={"flex-end"}
          justifyContent={"center"}
          backgroundColor="accent"
          paddingRight={"s"}
        >
          {indicator(props.loading, false)}
        </Box>
      </Box>

    </Box>
  );
}
