import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type GroceryButtonProps = {
    ingredientId: number,
    ingredientName: string,
    unit: string,
    season: boolean,
    local: boolean,
    alternative: string,
    bought: number,
    required: number,
    onClick: (arg0: number) => void,
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

const GroceryButton = ({ ingredientId, ingredientName, unit, season, local, alternative, bought, required, onClick }: GroceryButtonProps) => {
    return (
        <Box
            backgroundColor={"accent"}
            borderRadius={50}
            flexDirection={"row"}
            justifyContent={"space-between"}
            alignItems={"center"}
            height={75}
            marginTop={"m"}
            paddingLeft={"m"}
            paddingRight={"s"}
        >
            <Box flex={2}>
                <TouchableOpacity onPress={() => onClick(ingredientId)}>
                    <CheckIcon bought={(required === bought)} />
                </TouchableOpacity>
            </Box>
            <Box flex={6}>
                <Text variant={"body"} color="primaryCardText">{ingredientName}</Text>
            </Box>
            <Box flexDirection={"column"} alignItems="flex-start" flex={4}>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={season ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> season </Text>
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
                    <Text variant={"body"}> local </Text>
                </Box>
            </Box>
        </Box>
    )
}
export default GroceryButton;