import React from 'react-native'
import { createBox, createText } from '@shopify/restyle';
import { Theme } from '../../../utils/theme';

type Props = {
    stepNumber: number,
    stepInstruction: string
}

const Box = createBox<Theme>();
const Text = createText<Theme>();

const InstructionItem = (props: Props) => {
    return (
        <Box>
            <Text paddingBottom={"m"} variant={"subsubheader"}>{props.stepNumber}. Schritt</Text>
            <Text paddingBottom={"m"} variant={"body"}>{props.stepInstruction}</Text>
        </Box>
    )
}

export default InstructionItem