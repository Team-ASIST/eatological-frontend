import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { Button, View } from 'react-native'
import { NavigationScreenProp } from 'react-navigation'
import NavigationButton from '../../components/ui/NavigationButton'
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
            padding="m"
            backgroundColor="mainBackground"
            flex={1}
            maxHeight={70}
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
            padding="m"
            backgroundColor="mainBackground"
            flex={1}
            maxHeight={70}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="body">Meal {mealNumber}</Text>
            <Box flexDirection="row">
                <IconButton
                    onPress={() => {
                        if (mealCounter != 1) setMealCounter(mealCounter - 1)
                    }}
                    icon={'ios-remove-circle-outline'}
                    size={25}
                    color={''}></IconButton>
                <Text variant="body">{mealCounter}</Text>
                <IconButton
                    onPress={() => {
                        setMealCounter(mealCounter + 1)
                    }}
                    icon={'ios-add-circle-outline'}
                    size={25}
                    color={''}></IconButton>
            </Box>
        </Box>
    )
}

const MealQuantityScreen = ({ navigation }: Props) => {
    return (
        <Box padding="m" backgroundColor="mainBackground" flex={1}>
            <Box backgroundColor="primaryCardBackground" margin="s" padding="m" flexGrow={1}>
                <Text variant="header">How many meals do you want?</Text>
                <Meal mealNumber={1}></Meal>
                <NewMeal></NewMeal>
                <Button title="Home" onPress={() => navigation.navigate('CurrentPlan')} />
                <NavigationButton
                    onPress={function (): void {
                        navigation.navigate('Leftovers')
                    }}
                    text="Next"
                />
            </Box>
        </Box>
    )
}

export default MealQuantityScreen
