import React, { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectUsername, selectToken, getToken, renameUser, deleteUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import TextButton from "../../components/ui/inputs/TextButton";
import { NavigationScreenProp } from "react-navigation";
import { UsernameInput } from "../../components/ui/inputs/UsernameInput";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Restriction } from "../../utils/dataTypes";
import { getRestrictions, setRestrictions } from "../../utils/axios/userManagementCalls";
import { ScrollView } from "react-native";
import { RestrictionButton } from "../../components/ui/inputs/RestrictionButton";


const Text = createText<Theme>();
const Box = createBox<Theme>();

export type SettingsPageProps = {
  navigation: NavigationScreenProp<any, any>
};

const SettingsPage = ({ navigation }: SettingsPageProps) => {
  // User Management
  const username = useSelector(selectUsername)
  const token = useSelector(selectToken)
  const [currentUsername, setCurrentUsername] = useState("")
  const [clicked, setClicked] = useState(false)
  const [switchMode, setSwitchMode] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const changeUser = (newUsername: string) => {
    if (!switchMode) {
      dispatch(renameUser(newUsername))
    } else {
      dispatch(getToken(newUsername))
    }
  }

  const deleteUsername = () => {
    if (username != "" && token.startsWith('T')) {
      dispatch(deleteUser(username))
    }
  }

  // Restriction Management

  const [currentRestrictions, setCurrentRestrictions] = useState([] as Restriction[])

  // Fetch available restrictions
  useEffect(() => {
    getRestrictions().then(
      (availableRestrictions: Restriction[]) => {
        setCurrentRestrictions(availableRestrictions)
      }
    )
  }, [])

  const setNewRestriction = async (restriction: string) => {
    const success: boolean = await setRestrictions(restriction)
    if (success) {
      const current = currentRestrictions.map((x) => x)
      for (const restr of current) {
        if (restr.active) {
          restr.active = false
        }
        if (!restr.active && restr.name === restriction) {
          restr.active = true
        }
      }
      setCurrentRestrictions(current)
    }
  }

  return (
    <Box padding="m" backgroundColor="mainBackground" flex={1}>
      <Box marginTop={"l"} flexDirection="row">
        <Box flexDirection={"row"} alignItems={"center"}>
          <Ionicons name="person-circle-outline" size={30} color={theme.colors.black} />
          <Text variant="subsubheader">{username}</Text>
        </Box>
        <Box flexDirection={"row"} flexGrow={1} justifyContent="flex-end" alignItems={"center"}>
          <Text variant="subsubheader">{token}</Text>
        </Box>
      </Box>

      <Box marginTop={"m"}>
        <UsernameInput
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          clicked={clicked}
          setClicked={setClicked}
          switchMode={switchMode}
          currentUsername={currentUsername}
          setCurrentUsername={setCurrentUsername}
          changeUser={changeUser}
        />
      </Box>
      <Box marginTop={"m"}>
        <Box marginTop={"s"} padding={'s'}>
          <TextButton
            onPress={() => {
              setSwitchMode(false)
              setModalVisible(true)
            }
            }
            icon={"person-circle-outline"}
            size={35}
            label={"Nutzernamen ändern"}
            disabled={false}
            color={theme.colors.black}
          />
        </Box>

        <Box padding={'s'}>
          <TextButton
            onPress={() => {
              setSwitchMode(true)
              setModalVisible(true)
            }
            }
            icon={"people-circle-outline"}
            size={35}
            label={"Konto wechseln"}
            color={theme.colors.black}
            disabled={false}
          />
        </Box>

        <Box marginBottom={"l"} padding={'s'}>
          <TextButton
            onPress={
              deleteUsername}
            icon={"close-circle-outline"}
            size={35}
            label={"Aktiven Account löschen"}
            color={theme.colors.black}
            disabled={false}
          />
        </Box>
      </Box>

      <Box marginTop={"m"} marginBottom={"m"} alignItems="center">
        <Text variant="subsubheader">Wähle Deine Ernährungsform...</Text>
      </Box>

      <ScrollView showsVerticalScrollIndicator={false}>
        {
          currentRestrictions.map((elem: Restriction) => {
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
      <Box />

    </Box>
  );
}

export default SettingsPage; 