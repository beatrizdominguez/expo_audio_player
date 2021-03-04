
import { StyleSheet } from 'react-native'
import Colors from '../../constants/Colors'

import Layout from './../../constants/Layout'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.background,
    flex: 1,
    flexDirection: 'column',
    width: Layout.width,
    justifyContent: 'center',
  }
})

export default styles
