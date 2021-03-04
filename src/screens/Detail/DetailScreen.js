import React from 'react'
import { Text, SafeAreaView } from 'react-native'

// import PageStyles from './styles'

import { PageLayout } from './../../components'


const DetailScreen = ({ navigation, route }) => {
    const { params } = route
    console.log({ params })

    return (
        <PageLayout>
            <Text >{params.url}</Text>
        </PageLayout>
    )
}

export default DetailScreen
