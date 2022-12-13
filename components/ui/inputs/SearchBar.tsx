import React, { useState } from 'react'
import { createBox, createText } from '@shopify/restyle'
import { TextInput, Keyboard, FlatList, ListRenderItemInfo, View } from 'react-native'
import { Theme } from '../../../utils/theme'
import NavigationButton from './NavigationButton'
import IconButton from './IconButton'

const data = [
    {
        id: '1',
        name: 'Michael Scott',
    },
    {
        id: '2',
        name: 'Jim Halpert',
    },
    {
        id: '3',
        name: 'Pam Beesly',
    },
    {
        id: '4',
        name: 'Dwight Schrute',
    },
    {
        id: '5',
        name: 'Andy Bernard',
    },
    {
        id: '6',
        name: 'Ryan Howard',
    },
    {
        id: '7',
        name: 'Kelly Kapoor',
    },
    {
        id: '8',
        name: 'Toby Flenderson',
    },
    {
        id: '9',
        name: 'Stanley Hudson',
    },
    {
        id: '10',
        name: 'Phyllis Vance',
    },
]

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
                placeholder="Search..."
                value={searchPhrase}
                onChangeText={setSearchPhrase}
                onFocus={() => {
                    setClicked(true)
                }}
            />
            {/* cancel button, depending on whether the search bar is clicked or not */}
            {clicked && (
                <NavigationButton
                    onPress={() => {
                        Keyboard.dismiss()
                        setClicked(false)
                    }}
                    text="Cancel"
                />
            )}
        </Box>
    )
}

type ItemProps = {
    name: string
    id: string
}

const Item = ({ name }: ItemProps) => (
    <Box
        padding="xs"
        backgroundColor="mainBackground"
        borderRadius={10}
        flexDirection="row"
        justifyContent="space-between">
        <Text variant="navigationButton">{name}</Text>
        <IconButton
            onPress={() => {}}
            icon={'ios-add-circle-outline'}
            size={25}
            color={'black'}></IconButton>
    </Box>
)

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
                    return <View /> //TODO: herausfinden, wie ich nichts zurückgeben kann
                }
            }}
            keyExtractor={(item: ItemProps) => item.id}
        />
    )
}

const SearchBar = () => {
    const [searchPhrase, setSearchPhrase] = useState('')
    const [clicked, setClicked] = useState(false)

    return (
        <Box marginVertical="s" padding="m" backgroundColor="mainBackground" borderRadius={50}>
            <SearchBarDisplay
                searchPhrase={searchPhrase}
                setSearchPhrase={setSearchPhrase}
                clicked={clicked}
                setClicked={setClicked}
            />
            {clicked && <List searchPhrase={searchPhrase} data={data} />}
        </Box>
    )
}

export default SearchBar
