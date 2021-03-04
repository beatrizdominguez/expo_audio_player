import React from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'

import { audios } from './../../../constants/appConfig.json'
// import PageStyles from './styles'
import Colors from '../../../constants/Colors'
import PageStyles from './styles'

import { PageLayout, CustomBUtton } from './../../components'

const HomeScreen = ({ navigation }) => {

    const goToScreen = (url) => {
        navigation.navigate('Detail', { url })
    }

    return (
        <PageLayout>
            {audios.map((elem, i) => (
                <CustomBUtton
                    key={i}
                    styles={PageStyles.bigButton}
                    onPress={() => goToScreen(elem.url)}
                    title={elem.name}
                    color={Colors.contrast_colors[i]}
                    accessibilityLabel="Learn more about this purple button"
                />
            ))}

        </PageLayout>
    )
}

export default HomeScreen
