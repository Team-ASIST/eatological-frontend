import { ImageBackground } from 'react-native'
import React, { Fragment } from 'react'
import theme, { Theme } from '../../../utils/theme';
import { createText, createBox } from '@shopify/restyle';
import { BlurView } from 'expo-blur';
import IconText from '../common/iconText';

const Text = createText<Theme>();
const Box = createBox<Theme>();

export type RecipeCardProps = {
    imageSource: string,
    cookingTime: number,
    recipeName: string,
    ready: boolean,
    persons: number
}

const recipeCard = (props: RecipeCardProps) => {
    return (
        <Box backgroundColor="secondaryCardBackground" height={theme.heights.m}>
            <ImageBackground

                resizeMode="cover"
                style={{ height: '100%', width: '100%', justifyContent: 'flex-end' }}
                source={{
                    uri: props.imageSource,
                }}
            >
                <BlurView
                    tint="dark"
                    intensity={40}
                >
                    <Box padding="s" flexDirection="row" width={"95%"} justifyContent="space-between" alignContent="center" margin="s">
                        <Box flexDirection="row" width={"80%"}>
                            <Text variant="subsubheader" color={"primaryCardText"}>
                                {props.recipeName}
                            </Text>
                        </Box>
                        <Box flexDirection="row" justifyContent="flex-end" flexGrow={1} width={"20%"}>
                            {props.ready ?
                                <Box>
                                    <IconText iconName={'checkmark-outline'} text={''} />
                                </Box> :
                                <Fragment></Fragment>
                            }
                            <Box paddingRight="m">
                                <IconText iconName={'person-outline'} text={props.persons.toString()} />
                            </Box>
                        </Box>
                    </Box>
                </BlurView>
            </ImageBackground>

            {/** top-right corner */}
            <Box padding='xs' style={{ position: 'absolute', top: 10, right: 0, backgroundColor: theme.colors.primaryCardBackground }}>
                <Text
                    variant="body">
                    {props.cookingTime} mins
                </Text>
            </Box>
        </Box>
    )
}

export default recipeCard