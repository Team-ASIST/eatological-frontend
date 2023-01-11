import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../../utils/theme';
import { TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Grocery, Ingredient } from '../../../utils/dataTypes';

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type GroceryButtonProps = {
    ingredientId: number,
    grocery: Grocery,
    ingredient: Ingredient,
    onClick: (arg0: number) => void,
}

const GroceryButton = ({ ingredientId, grocery, ingredient, onClick }: GroceryButtonProps) => {
    return (
        <Box
            backgroundColor={grocery.bought >= grocery.required ? 'inactiveButtonColor' : 'primaryCardBackground'}
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
                <TouchableOpacity onPress={() => onClick(ingredientId)}>
                    {
                        grocery.bought >= grocery.required ?
                            <Ionicons
                                name={'checkmark-circle-outline'}
                                size={50}
                                color={theme.colors.white}
                            /> :
                            <Ionicons
                                name={'add-circle-outline'}
                                size={50}
                                color={theme.colors.white}
                            />

                    }
                </TouchableOpacity>
            </Box>

            <Box flex={6}>
                <Text variant={"body"} color="primaryCardText">
                    {ingredient.name}
                    {ingredient.alternative === null ? "" : "\nAlt: [ " + ingredient.alternative + " ]"}
                </Text>
            </Box>


            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-start" flex={4}>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={ingredient.season ? 'checkmark-circle-outline' : 'close-circle-outline'}
                        size={15}
                        color={theme.colors.white}
                    />
                    <Text variant={"body"}> Season </Text>
                </Box>
                <Text variant={"body"} color="primaryCardText">
                    {grocery.bought} / {grocery.required} {ingredient.unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    <Ionicons
                        name={ingredient.local ? 'checkmark-circle-outline' : 'close-circle-outline'}
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
