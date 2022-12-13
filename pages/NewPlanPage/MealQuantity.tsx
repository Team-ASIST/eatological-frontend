import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import { NavigationButtonContainer } from '../../components/ui/NavigationButton'
import IconButton from '../../components/ui/IconButton'
import { useState } from 'react'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

type MealProps = {
    mealNumber: number
}

const NewMeal = () => {
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            borderRadius={50}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="body">New Meal</Text>
            <IconButton
                onPress={() => {}}
                icon={'ios-add-circle-outline'}
                size={25}
                color={''}></IconButton>
        </Box>
    )
}

const Meal = ({ mealNumber }: MealProps) => {
    const [mealCounter, setMealCounter] = useState(1)
    return (
        <Box
            marginVertical="s"
            padding="m"
            backgroundColor="primaryCardBackground"
            borderRadius={50}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="body">Meal {mealNumber} </Text>
            <Box flexDirection="row">
                <IconButton
                    onPress={() => {
                        if (mealCounter != 1) setMealCounter(mealCounter - 1)
                    }}
                    icon={'ios-remove-circle-outline'}
                    size={25}
                    color={'black'}></IconButton>
                <Text variant="body" marginHorizontal="s">
                    {mealCounter}
                </Text>
                <IconButton
                    onPress={() => {
                        setMealCounter(mealCounter + 1)
                    }}
                    icon={'ios-add-circle-outline'}
                    size={25}
                    color={'black'}></IconButton>
            </Box>
        </Box>
    )
}

const MealQuantityScreen = ({ navigation }: Props) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box marginVertical="l" marginHorizontal="xs" padding="m" flexGrow={1}>
                <Text variant="subheader">How many meals do you want?</Text>
                <Box marginVertical="l" flexGrow={1}>
                    <Meal mealNumber={1}></Meal>
                    <NewMeal></NewMeal>
                </Box>
            </Box>
            <NavigationButtonContainer
                onPressLeft={() => navigation.navigate('CurrentPlan')}
                textLeft="Home"
                onPressRight={() => navigation.navigate('Leftovers')}
                textRight="Next"></NavigationButtonContainer>
        </Box>
    )
}

export default MealQuantityScreen
