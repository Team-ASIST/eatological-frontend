import { createBox, createText } from '@shopify/restyle'
import theme, { Theme } from '../../../utils/theme'
import { TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Grocery, Ingredient } from '../../../utils/dataTypes'
import Tooltip from 'rn-tooltip'
import TagItem from '../common/TagItem'

const Text = createText<Theme>()
const Box = createBox<Theme>()

export type GroceryButtonProps = {
    ingredientId: number
    grocery: Grocery
    ingredient: Ingredient
    onClick: (arg0: number) => void
}

const GroceryButton = ({ ingredientId, grocery, ingredient, onClick }: GroceryButtonProps) => {
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

            <Box flex={5} padding={'m'}>
                <Text variant={'body'} color="primaryCardText">
                    {ingredient.name}
                </Text>
                {ingredient.alternative === null ? (
                    <></>
                ) : (
                    <Box flex={5} flexDirection="row" alignItems={'center'}>
                        <Text
                            variant={'body'}
                            color={'primaryCardText'}
                            marginRight="xs"
                            fontSize={13}>
                            Alternative:
                        </Text>
                        <Tooltip
                            width={200}
                            height={'auto'}
                            actionType="press"
                            backgroundColor={theme.colors.accent}
                            popover={<Text variant="body">{ingredient.alternative}</Text>}>
                            <Ionicons
                                color={theme.colors.white}
                                name={'information-circle-outline'}
                                size={18}
                            />
                        </Tooltip>
                    </Box>
                )}
            </Box>

            {/* Season, Amounts, Local */}
            <Box flexDirection={'column'} alignItems="flex-start" flex={5}>
                <Text variant={'body'} color="primaryCardText">
                    {(grocery.bought * ingredient.smallestAmount).toFixed(2)} /{' '}
                    {(grocery.required * ingredient.smallestAmount).toFixed(2)} {ingredient.unit}
                </Text>
                <Box flexDirection={'row'} alignItems="center" marginTop={'xs'}>
                    {ingredient.season ? (
                        <TagItem text={'Season'} backgroundColor={'mainForeground'} />
                    ) : (
                        <></>
                    )}
                    {ingredient.local ? (
                        <TagItem text={'Lokal'} backgroundColor={'alert'} />
                    ) : (
                        <></>
                    )}
                </Box>
            </Box>
        </Box>
    )
}
export default GroceryButton
