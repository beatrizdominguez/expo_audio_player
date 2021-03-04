import React from 'react'
import { SafeAreaView } from 'react-native'
import PropTypes from 'prop-types'


import GlobalStyles from './../styles/globalStyles'


const PageLayout = (props) => {
  const { fullScreen, styles = {} } = props

  return (
    <>
      <SafeAreaView style={{...GlobalStyles.container, ...styles}}>
        {props.children}
      </SafeAreaView>
    </>
  )
}

PageLayout.propTypes = {
  fullScreen: PropTypes.bool,
  styles: PropTypes.object
}

export default PageLayout
