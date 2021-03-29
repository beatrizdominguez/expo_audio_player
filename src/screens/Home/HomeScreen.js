import React, { useEffect } from 'react'
import { Text, SafeAreaView, Button, View } from 'react-native'

import { audioBookPlaylist } from './../../../constants/appConfig.json'
// import PageStyles from './styles'
import Colors from '../../../constants/Colors'
import PageStyles from './styles'

import { initDatabase } from './../../database'


import { PageLayout, CustomBUtton } from './../../components'

const HomeScreen = ({ navigation }) => {

    const goToScreen = (audioBook) => {
        navigation.navigate('Detail', { audioBook })
    }

    useEffect(() => {
        initDatabase()
    }, [])

    return (
        <PageLayout>
            {audioBookPlaylist.map((elem, i) => (
                <CustomBUtton
                    key={i}
                    styles={PageStyles.bigButton}
                    onPress={() => goToScreen(elem)}
                    title={elem.title}
                    color={Colors.contrast_colors[i]}
                    accessibilityLabel="Learn more about this purple button"
                />
            ))}

        </PageLayout>
    )
}

export default HomeScreen
