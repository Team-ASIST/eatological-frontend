import React from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { TouchableOpacity, ImageBackground, Image, Dimensions } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

const Text = createText<Theme>();
const Box = createBox<Theme>();

export const HiddenCard = (swipeLeft: any, swipeRight: any, id: number) => {
    return (
      <Box height={theme.heights.m} paddingTop={"m"} flexDirection={"row"}>
  
        <Box flex={1}>
          <TouchableOpacity onPress={() => swipeLeft(id)}>
            <Box
              height={theme.heights.m}
              borderBottomLeftRadius={50}
              borderTopLeftRadius={50}
              alignItems={"flex-start"}
              justifyContent={"center"}
              paddingLeft={"s"}
              backgroundColor="mainForeground"
            >
              <Ionicons name="arrow-undo-outline" size={40} color="white" />
            </Box>
          </TouchableOpacity>
        </Box>
  
        <Box flex={1}>
          <TouchableOpacity onPress={() => swipeRight(id)}>
            <Box
              height={theme.heights.m}
              borderBottomRightRadius={50}
              borderTopRightRadius={50}
              alignItems={"flex-end"}
              justifyContent={"center"}
              paddingRight={"s"}
              backgroundColor="secondaryCardBackground"
            >
              <Ionicons name="arrow-redo-outline" size={40} color="white" />
            </Box>
          </TouchableOpacity>
        </Box>
  
      </Box>
    );
  }
  