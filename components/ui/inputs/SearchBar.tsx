import React, { useState } from 'react'
import { createBox, createText, useTheme } from '@shopify/restyle'
import { TextInput, Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { leftoverAdded, preferenceAdded } from '../../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/currentPlanSlice'
import { AppDispatch } from '../../../redux/store'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type SearchBarDisplayProps = {
    clicked: boolean
    searchPhrase: string
    setSearchPhrase: (input: string) => void
    setClicked: (click: boolean) => void
}

{
    /* Component for the display of the searchBar only */
}
const SearchBarDisplay = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}: SearchBarDisplayProps) => { 
    const theme = useTheme<Theme>()
    
    return (
        <Box
            flexDirection="row"
            padding="m"
            marginBottom="s"
            backgroundColor="mainBackground"
            borderRadius={50}
            borderWidth={2}
            borderColor="accent"
            justifyContent="space-between">
            {/* Input field */}
            <TextInput
                style={{ width: 235, color: theme.colors.secondaryCardText }}
                placeholder="Suche..."
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true)
                }}
            />
            {/* close button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <IconButton
                    onPress={() => {
                        Keyboard.dismiss()
                        setClicked(false)
                        setSearchPhrase('')
                    }}
                    icon={'close'}
                    size={15}
                    color={theme.colors.secondaryCardText}
                />
            )}
        </Box>
    )
}

{
    /* typeOfItem specifies when pressing the plus button if the item is supposed to be a leftover or a foodpreference */
}
type ItemProps = {
    typeOfItem: string
    id: number
    name: string
    smallestAmount: number
    amount: number
    unit: string
    setClicked: (click: boolean) => void
    setSearchPhrase: (input: string) => void
}

{
    /* Items for search bar proposals with important ingredient properties for leftovers, preferences */
}
const Item = ({
    id,
    name,
    smallestAmount,
    amount,
    unit,
    typeOfItem,
    setClicked,
    setSearchPhrase,
}: ItemProps) => {
    const dispatch = useDispatch<AppDispatch>()
    const theme = useTheme<Theme>()

    return (
        <Box
            padding="xs"
            backgroundColor="mainBackground"
            flexDirection="row"
            justifyContent="space-between"
            borderBottomWidth={1}
            borderColor="black"
            opacity={0.93}>
            <Text variant="subsubheader">{name}</Text>
            {/* icon button for adding food items to respective redux store */}
            <IconButton
                onPress={() => {
                    if (typeOfItem === 'leftover') {
                        dispatch(leftoverAdded({ id, name, smallestAmount, amount, unit }))
                    } else if (typeOfItem === 'foodpreference') {
                        dispatch(preferenceAdded({ id, name }))
                    }
                    setClicked(false)
                    setSearchPhrase('')
                }}
                icon={'ios-add-circle-outline'}
                size={25}
                color={theme.colors.secondaryCardText}
            />
        </Box>
    )
}

type ListProps = {
    setClicked: (click: boolean) => void
    setSearchPhrase: (input: string) => void
    typeOfItems: string
    searchPhrase: string
    data: any
}

{
    /* List of displayed items, no case sensitivity */
}
const List = ({ searchPhrase, data, typeOfItems, setClicked, setSearchPhrase }: ListProps) => {
    return (
        <Box maxHeight={200}>
            <FlatList
                style={{ flex: 0 }}
                initialNumToRender={data.length}
                alwaysBounceVertical={false}
                showsVerticalScrollIndicator={false}
                data={data}
                renderItem={({ item }: ListRenderItemInfo<ItemProps>) => {
                    if (searchPhrase === '') {
                        return <View />
                    } else if (
                        item.name
                            .toLowerCase()
                            .includes(searchPhrase.trim().replace(/ /g, '_').toLowerCase())
                    ) {
                        return (
                            <Item
                                typeOfItem={typeOfItems}
                                name={item.name}
                                id={item.id}
                                smallestAmount={item.smallestAmount}
                                amount={item.smallestAmount}
                                unit={item.unit}
                                setClicked={setClicked}
                                setSearchPhrase={setSearchPhrase}
                            />
                        )
                    } else {
                        return <View />
                    }
                }}
                keyExtractor={(item: ItemProps) => item.id.toString()}
            />
        </Box>
    )
}

type SearchBarProps = {
    typeOfItems: string
}

const SearchBar = ({ typeOfItems }: SearchBarProps) => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [clicked, setClicked] = useState(false)

    const allIngredients = useSelector(selectAllIngredients)

    return (
        <Box marginVertical="m" paddingVertical="m">
            <SearchBarDisplay
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked && (
                <List
                    typeOfItems={typeOfItems}
                    searchPhrase={searchPhrase}
                    data={allIngredients}
                    setClicked={setClicked}
                    setSearchPhrase={setSearchPhrase}
                />
            )}
        </Box>
    )
}

export default SearchBar
