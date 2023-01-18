import { View } from 'react-native'
import React from 'react'
import { createBox, createText, useTheme } from '@shopify/restyle';
import { Theme } from '../../../utils/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from '../inputs/IconButton';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type IconTextProps = {
    iconName: keyof typeof Ionicons.glyphMap
    text: string
}

const iconText = (props: IconTextProps) => {
    const theme = useTheme<Theme>()

    return (
        <Box flexDirection="row" alignContent="center" alignItems={"center"}>
            <IconButton icon={props.iconName} size={theme.textVariants.subheader.fontSize}/>
            <Text variant="subheader" color={"primaryCardText"}>{props.text}</Text>
        </Box>
    )
}

export default iconText
