import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'

export interface PlusMinusInputProps {
    increment: () => {},
    decrement: () => {},
    value: number,
    title: string
}

const Box = createBox<Theme>()
const Text = createText<Theme>()

const PlusMinusInput = ({ increment, decrement, value, title }: PlusMinusInputProps) => {
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            borderRadius={50}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="body">{title}</Text>
            <Box flexDirection="row">
                <IconButton
                    onPress={decrement}
                    icon={'ios-remove-circle-outline'}
                    size={25}></IconButton>
                <Text variant="body" marginHorizontal="s">
                    {value}
                </Text>
                <IconButton
                    onPress={increment}
                    icon={'ios-add-circle-outline'}
                    size={25}></IconButton>
            </Box>
        </Box>
    )
}

export default PlusMinusInput;