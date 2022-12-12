import { View } from 'react-native'
import React from 'react'
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import Ionicons from '@expo/vector-icons/Ionicons';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type IconTextProps = {
    iconName: keyof typeof Ionicons.glyphMap
    text: string
}

const iconText = (props: IconTextProps) => {
    return (
        <Box flexDirection="row" alignContent="center" >
            <Ionicons name={props.iconName} size={theme.textVariants.subheader.fontSize} color={theme.colors.primaryCardText}/>
            <Text variant="subheader">{props.text}</Text>
        </Box>
    )
}

export default iconText