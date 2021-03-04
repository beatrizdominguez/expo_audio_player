import React from 'react'
import { Text, SafeAreaView } from 'react-native'

// import { appName } from './../../../constants/appConfig.json'
// import PageStyles from './styles'

// import { PageLayout, Spacing } from '../../components'

// const IMAGENAME = require('./../../res/icon.png')

const SplashScreen = (props) => {
    return (
        <>
            {/* <CustomStatusBar hidden={fullScreen} /> */}
            <SafeAreaView style={{ ...GlobalStyles.container, ...styles }}>
                <Text >Audio player</Text>
            </SafeAreaView>
        </>
    )
}

export default SplashScreen
