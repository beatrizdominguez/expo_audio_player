
import { StyleSheet } from 'react-native'
import Colors from './../../../constants/Colors'

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primary,
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    height: 150,
    width: 150,
  },
  appName: {
    color: Colors.white,
    fontSize: 24,
  },
})

export default styles
