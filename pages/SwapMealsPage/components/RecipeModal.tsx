

import { View, Modal, Alert } from 'react-native'
import React from 'react'
import { Theme } from '../../../utils/theme'
import { createBox, createText } from '@shopify/restyle'
import MealCard from '../../../components/ui/recipe/MealCard'
import { RecipeSwipeObject } from '../../../utils/dataTypes'
import { BackFloatingButton } from '../../../components/ui/inputs/BackFloatingButton'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type RecipeModalProps = {
    visible: boolean, 
    toggleModal: Function, 
    recipe: RecipeSwipeObject
}

const RecipeModal = ({visible, toggleModal, recipe}: RecipeModalProps) => {
  return (
    <Modal
            animationType="slide"
            transparent={true}
            visible={visible}

            onRequestClose={() => {
              toggleModal();
            }}
          >
            <Box
              flex={1}
              shadowColor="black"
              shadowOpacity={0.86}
              shadowRadius={100}
              shadowOffset={{ width: 0, height: 10 }}>
              <Box justifyContent="center"
                flex={1}
                alignItems="center"
                marginTop="xxl"
                backgroundColor="secondaryCardBackground"
                marginStart="s" marginHorizontal="s" borderTopRightRadius={40} borderTopLeftRadius={40} overflow="hidden">
                <MealCard recipe={recipe} />
                <BackFloatingButton closingTag="✕" onClick={toggleModal} />
              </Box>
            </Box>
          </Modal>
  )
}

export default RecipeModal