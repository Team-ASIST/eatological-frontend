import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import Ionicons from 'react-native-vector-icons/Ionicons'

export interface PlusMinusInputProps {
    increment: () => {}
    decrement: () => {}
    value: number
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
            opacity={0.78}
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="subsubheader" color={'primaryCardText'}>
                {title}{' '}
            </Text>
            <Box flexDirection="row">
                <IconButton
                    onPress={decrement}
                    icon={'ios-remove-circle-outline'}
                    size={28}></IconButton>
                <Box flexDirection="row" alignContent="center" marginHorizontal="m">
                    <Ionicons
                        name={'person-outline'}
                        size={25}
                        color={theme.colors.primaryCardText}
                    />
                    <Text variant="subsubheader" color={'primaryCardText'} marginLeft="xs">
                        {value}
                    </Text>
                </Box>
                <IconButton
                    onPress={increment}
                    icon={'ios-add-circle-outline'}
                    size={28}></IconButton>
            </Box>
        </Box>
    )
}

export default PlusMinusInput
