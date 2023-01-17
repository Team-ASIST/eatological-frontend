import React from 'react'
import { createBox, createText } from '@shopify/restyle'
import { Theme } from '../../../utils/theme'
import { Modal } from 'react-native'
import { Restriction } from '../../../utils/dataTypes'
import { ScrollView } from 'react-native'
import { RestrictionButton } from './RestrictionButton'
import { BackFloatingButton } from './BackFloatingButton'

const Text = createText<Theme>()
const Box = createBox<Theme>()

type RestrictionModalProps = {
    visible: boolean,
    toggleModal: Function,
    restrictions: Restriction[],
    setNewRestriction: (arg0: string) => void
}

export const RestrictionModal = ({ visible, toggleModal, restrictions, setNewRestriction }: RestrictionModalProps) => {
    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => {
                toggleModal();
            }}
        >
            {/* Container for all components in modal*/}
            <Box
                top={80}
                backgroundColor="white"
                paddingVertical="xl"
                paddingHorizontal="m"
                margin="s"
                borderRadius={20}
                height={'100%'}
                shadowOpacity={0.05}>
                <Box marginTop={"l"} marginBottom={"m"}>
                    <Text variant={'subheader'} marginHorizontal={'l'}>
                        Wähle deine Ernährungsform...
                    </Text>
                </Box>
                {/* ScrollView for Restrictions */}
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        restrictions.map((elem: Restriction) => {
                            return (
                                <RestrictionButton
                                    key={elem.name}
                                    restriction={elem}
                                    setNewRestriction={setNewRestriction}
                                />
                            )
                        })
                    }
                </ScrollView>
                <BackFloatingButton closingTag="✕" onClick={toggleModal} />
            </Box>
        </Modal>
    )
}
