import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../utils/theme'
import { NavigationScreenProp } from 'react-navigation'
import React from 'react'
import SearchBar from '../../components/ui/inputs/SearchBar'
import {
    ILeftOver,
    selectAllLeftovers,
    leftoverDecrement,
    leftoverIncrement,
    leftoverRemoved,
} from '../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import LeftOverInput from '../../components/ui/inputs/LeftOverInput'
import { ScrollView } from 'react-native-gesture-handler'
import NewPlanNavigationBar from './NavigationNewPlanBar'
import { useRoute } from '@react-navigation/native'
import { resetPlanConfiguration } from '../../redux/slice/newPlanSlice'
import { AppDispatch } from '../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type Props = {
    navigation: NavigationScreenProp<any, any>
}

const LeftoversScreen = ({ navigation }: Props) => {
    const leftovers = useSelector(selectAllLeftovers)
    const dispatch = useDispatch<AppDispatch>()
    const route = useRoute()

    const leftoverInputs = leftovers.map((leftover: ILeftOver) => (
        <LeftOverInput
            key={leftover.id}
            increment={() => dispatch(leftoverIncrement({ id: leftover.id }))}
            decrement={() => dispatch(leftoverDecrement({ id: leftover.id }))}
            remove={() => dispatch(leftoverRemoved({ id: leftover.id }))}
            value={leftover.quantity * leftover.smallestAmount}
            title={leftover.name}
            unit={leftover.unit}
        />
    ))

    return (
        <Box padding="l" backgroundColor="mainBackground" flex={1}>
            <NewPlanNavigationBar
                onClickBack={() => navigation.navigate('MealQuantity')}
                onClickNext={() => navigation.navigate('FoodPreferences')}
                onClickAbort={() => {
                    dispatch(resetPlanConfiguration())
                    navigation.navigate('CurrentPlan')
                }}>
                <Box marginVertical="l" marginHorizontal="xs" padding="m" height={'75%'}>
                    <Text variant="subheader">Hast Du Reste im Kühlschrank?</Text>
                    <Box position="relative" zIndex={1}>
                        <SearchBar typeOfItems="leftover"></SearchBar>
                    </Box>
                    <Box
                        position="absolute"
                        top={185}
                        width={'111.2%'}
                        height={'75%'}
                        padding="m"
                        zIndex={0}>
                        <ScrollView
                            alwaysBounceVertical={false}
                            showsVerticalScrollIndicator={false}>
                            {leftoverInputs}
                        </ScrollView>
                    </Box>
                </Box>
            </NewPlanNavigationBar>
        </Box>
    )
}

export default LeftoversScreen
