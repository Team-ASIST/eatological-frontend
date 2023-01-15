import React, { useState, useEffect } from "react";
import { createBox, createText } from '@shopify/restyle';
import theme, { Theme } from '../../utils/theme';
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { selectUsername, selectToken, getToken, renameUser, deleteUser, selectUpdatingUser } from "../../redux/slice/userSlice";
import { useSelector } from "react-redux";
import TextButton from "../../components/ui/inputs/TextButton";
import { NavigationScreenProp } from "react-navigation";
import { UsernameInput } from "../../components/ui/inputs/UsernameInput";
import Ionicons from 'react-native-vector-icons/Ionicons'
import { Restriction } from "../../utils/dataTypes";
import { getRestrictions, setRestrictions } from "../../utils/axios/userManagementCalls";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { RestrictionModal } from "../../components/ui/inputs/RestrictionModal";
import { getPlan } from "../../redux/slice/currentPlanSlice";


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
  const updating = useSelector(selectUpdatingUser)

  // Restriction Management
  const [currentRestrictions, setCurrentRestrictions] = useState([] as Restriction[])
  const [restrictionsVisible, setRestrictionsVisible] = useState(false)

  const dispatch = useDispatch<AppDispatch>()

  const changeUser = (newUsername: string) => {
    if (!switchMode) {
      dispatch(renameUser(newUsername))
    } else {
      dispatch(getToken(newUsername)).then(
        () => dispatch(getPlan())
      )
    }
  }

  const deleteUsername = () => {
    if (username != "" && token.startsWith('T')) {
      dispatch(deleteUser(username))
    }
  }

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
      <ScrollView refreshControl={
        <RefreshControl
          refreshing={updating}
        />
      }>
        <Box marginTop={"l"} flexDirection={"row"} alignItems={"center"} paddingLeft="s">
          <Ionicons name="person-circle-outline" size={30} color={theme.colors.black} />
          <Box paddingLeft={"xs"}>
            <Text variant="subsubheader">{username}</Text>
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
          <RestrictionModal
            visible={restrictionsVisible}
            toggleModal={() => setRestrictionsVisible(!restrictionsVisible)}
            restrictions={currentRestrictions}
            setNewRestriction={setNewRestriction}
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

          <Box marginBottom={"m"} padding={'s'}>
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

          <Box padding={'s'}>
            <TextButton
              onPress={() => {
                setRestrictionsVisible(true)
              }
              }
              icon={"ellipsis-vertical-circle-outline"}
              size={35}
              label={"Ernährungsform wählen"}
              color={theme.colors.black}
              disabled={false}
            />
          </Box>
        </Box>
      </ScrollView>
    </Box>
  );
}

export default SettingsPage; 