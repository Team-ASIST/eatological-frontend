import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import { TextInput, Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import { Theme } from '../../../utils/theme'
import IconButton from './IconButton'
import { leftoverAdded, selectAllLeftovers } from '../../../redux/slice/newPlanSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/ingredientSlice'


const Text = createText<Theme>()
const Box = createBox<Theme>()

type SearchBarDisplayProps = {
    clicked: boolean
    searchPhrase: string
    setSearchPhrase: (input: string) => void
    setClicked: (click: boolean) => void
}

const SearchBarDisplay = ({
    clicked,
    searchPhrase,
    setSearchPhrase,
    setClicked,
}: SearchBarDisplayProps) => {
    return (
        <Box
            flexDirection="row"
            marginVertical="s"
            padding="m"
            backgroundColor="mainBackground"
            borderRadius={50}
            borderWidth={2}
            borderColor="primaryCardBackground"
            justifyContent="space-between">
            {/* Input field */}
            <TextInput
                style={{ width: 235 }}
                placeholder="Search..."
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true)
                }}
            />
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <IconButton
                    onPress={() => {
                        Keyboard.dismiss()
                        setClicked(false)
                        setSearchPhrase('')
                    }}
                    icon={'close'}
                    size={15}></IconButton>
            )}
        </Box>
    )
}

type ItemProps = {
    name: string
    id: string
}

const Item = ({ name }: ItemProps) => {
    const dispatch = useDispatch()
    return (
        <Box
            padding="xs"
            backgroundColor="mainBackground"
            borderRadius={10}
            flexDirection="row"
            justifyContent="space-between">
            <Text variant="navigationButton">{name}</Text>
            <IconButton
                onPress={() => dispatch(leftoverAdded(name))}
                icon={'ios-add-circle-outline'}
                size={25}></IconButton>
        </Box>
    )
}

type ListProps = {
    searchPhrase: string
    data: any
}

const List = ({ searchPhrase, data }: ListProps) => {
    
    return (
        <FlatList
            data={data}
            renderItem={({ item }: ListRenderItemInfo<ItemProps>) => {
                if (searchPhrase === '') {
                    return <View />
                }
                if (
                    item.name
                        .toUpperCase()
                        .includes(searchPhrase.toUpperCase().trim().replace(/\s/g, ''))
                ) {
                    return <Item name={item.name} id={item.id} />
                } else {
                    return <View /> 
                }
            }}
            keyExtractor={(item: ItemProps) => item.id}
        />
    )
}

const SearchBar = () => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [clicked, setClicked] = useState(false)

    const leftovers = useSelector(selectAllIngredients)

    return (
        <Box marginVertical="s" padding="m" backgroundColor="mainBackground" borderRadius={50}>
            <SearchBarDisplay
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked && <List searchPhrase={searchPhrase} data={leftovers} />}
        </Box>
    )
}

export default SearchBar
