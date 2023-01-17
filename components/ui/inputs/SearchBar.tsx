import React, { useState } from 'react'
import { createBox, createText} from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import { useSelector } from 'react-redux'
import { selectAllIngredients } from '../../../redux/slice/currentPlanSlice'
import ProposalList from './ProposalList'
import SearchBarDisplay from './SearchBarDisplay'

const Box = createBox<Theme>()


type SearchBarProps = {
    typeOfItems: string
}

{
    /* Renders a search bar and an ingredient proposal list, based on the search phrase entered by the user.  */
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
                <ProposalList
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
