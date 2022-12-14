import { View } from 'react-native'
import React from 'react'
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import Ionicons from '@expo/vector-icons/Ionicons';
import IconButton from '../inputs/IconButton';

const Box = createBox<Theme>();
const Text = createText<Theme>();

type IconTextProps = {
    iconName: keyof typeof Ionicons.glyphMap
    text: string
}

const iconText = (props: IconTextProps) => {
    return (
        <Box flexDirection="row" alignContent="center" >
            <IconButton icon={props.iconName} size={theme.textVariants.subheader.fontSize}/>
            <Text variant="subheader" color={"primaryCardText"}>{props.text}</Text>
        </Box>
    )
}

export default iconText