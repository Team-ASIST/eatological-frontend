import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type GroceryButtonProps = {
    ingredientId: number,
    index: number,
    ingredientName: string,
    unit: string,
    season: boolean,
    local: boolean,
    alternative: string,
    bought: number,
    required: number,
    onClick: (arg0: number, arg1: number) => void,
}

export type CheckIconProps = {
    bought: boolean
}

const CheckIcon = ({ bought }: CheckIconProps) => {
    if (bought) {
        return (
            <Ionicons
                name={'checkmark-circle-outline'}
                size={50}
                color={theme.colors.white}
            />
        )
    } else {
        return (
            <Ionicons
                name={'add-circle-outline'}
                size={50}
                color={theme.colors.white}
            />
        )
    }
}

const GroceryButton = ({ ingredientId, index, ingredientName, unit, season, local, alternative, bought, required, onClick }: GroceryButtonProps) => {
    return (
        <Box
            backgroundColor={bought === required ? 'inactiveButtonColor' : 'accent'}
            borderRadius={50}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={75}
            marginTop={"s"}
            paddingLeft={"m"}
            paddingRight={"xs"}
        >
            <Box flex={2}>
                <TouchableOpacity onPress={() => onClick(index, ingredientId)}>
                    <CheckIcon bought={(required === bought)} />
                </TouchableOpacity>
            </Box>

            <Box flex={6}>
                <Text variant={"body"} color="primaryCardText">
                    {ingredientName}
                    {alternative===null ? "" : "\nAlt: [ " + alternative + " ]"}
                </Text>
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-start" flex={4}>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={season ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Season </Text>
                </Box>
                <Text variant={"body"} color="primaryCardText">
                    {bought} / {required} {unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={local ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Local </Text>
                </Box>
            </Box>
        </Box>
    )
}
export default GroceryButton;
