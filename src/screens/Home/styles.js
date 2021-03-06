import { StyleSheet } from 'react-native'

import Layout from './../../../constants/Layout'
import {audioBookPlaylist} from './../../../constants/appConfig.json'

const height = Layout.window.height / audioBookPlaylist.length

const styles = StyleSheet.create({
    bigButton: {
        flexGrow: 1,
        height: height,
        alignSelf: 'stretch'
    }
})

export default styles
