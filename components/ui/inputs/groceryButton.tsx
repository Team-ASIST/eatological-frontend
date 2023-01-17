import { createBox, createText, useTheme } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Grocery, Ingredient } from '../../../utils/dataTypes';
import TagItem from '../common/TagItem';
import Tooltip from 'rn-tooltip';

const Text = createText<Theme>()
const Box = createBox<Theme>()

export type GroceryButtonProps = {
    ingredientId: number
    grocery: Grocery
    ingredient: Ingredient
    onClick: (arg0: number) => void
}

const GroceryButton = ({ ingredientId, grocery, ingredient, onClick }: GroceryButtonProps) => {
    const theme = useTheme<Theme>()

    return (
        <Box
            backgroundColor={
                grocery.bought >= grocery.required ? 'inactiveButtonColor' : 'primaryCardBackground'
            }
            borderRadius={20}
            flexDirection={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
            height={80}
            marginTop={'m'}
            paddingLeft={'m'}
            paddingRight={'xs'}>
            <Box flex={2}>
                <TouchableOpacity onPress={() => onClick(ingredientId)}>
                    {grocery.bought >= grocery.required ? (
                        <Ionicons name={'checkmark-outline'} size={50} color={theme.colors.white} />
                    ) : (
                        <Ionicons name={'add-outline'} size={50} color={theme.colors.white} />
                    )}
                </TouchableOpacity>
            </Box>

            <Box flex={5} flexDirection="row" alignItems={"center"} flexWrap="wrap">
                <Text variant={"body"} color="primaryCardText" marginRight="xs">
                    {ingredient.name}
                </Text>
                {ingredient.alternative ?
                    <Tooltip width={200} height={"auto"} actionType="press" backgroundColor={theme.colors.accent} popover={<Text variant="body">{ingredient.alternative}</Text>}>
                            <Ionicons color={theme.colors.primaryCardText} name={"information-circle-outline"} size={30} />
                    </Tooltip> : <></>}
            </Box>

            {/* Season, Amounts, Local */}
            <Box flexDirection={"column"} alignItems="flex-end" flex={4} marginRight="m">
                <Text variant={"body"} color="primaryCardText">
                {(grocery.bought * ingredient.smallestAmount).toFixed(2).replace(/\.?0*$/,'')} / {(grocery.required * ingredient.smallestAmount).toFixed(2).replace(/\.?0*$/,'')} {ingredient.unit}
                </Text>
                <Box flexDirection={"row"} alignItems="center">
                    {ingredient.season ? <TagItem text={"Season"} backgroundColor={"inactiveButtonColor"} /> : <></>}
                    {ingredient.local ? <TagItem text={"Lokal"} backgroundColor={"alert"} /> : <></>}
                </Box>
            </Box>
        </Box>
    )
}
export default GroceryButton
