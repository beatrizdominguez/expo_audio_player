import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

import Colors from '../../constants/Colors'

const CustomButton = (props) => {
    const { onPress, title, color, styles } = props
    console.log({ color })

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={[
                    customStyles.button,
                    styles,
                    color && { backgroundColor: color }
                ]}
            >
                {title && (
                    <Text
                        style={[customStyles.buttonText]}
                    >
                        {title}
                    </Text>
                )}
                {props.children}
            </View>
        </TouchableOpacity>
    )
}


const customStyles = StyleSheet.create({
    button: {
        backgroundColor: Colors.primary,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonText: {
        color: Colors.white,
        fontSize: 18,
    },
})

CustomButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    styles: PropTypes.object,
}

export default CustomButton
