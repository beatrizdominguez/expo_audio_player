import { StyleSheet } from 'react-native'
import Colors from '../../../constants/Colors'


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  imgContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  albumCover: {
    width: 300,
    height: 300
  },
  trackInfo: {
    padding: 40,
    backgroundColor: '#fff'
  },
  trackInfoText: {
    textAlign: 'center',
    flexWrap: 'wrap',
    color: '#550088'
  },
  largeText: {
    fontSize: 22
  },
  smallText: {
    fontSize: 16
  },
  control: {
    margin: 20
  },
  controls: {
    flexDirection: 'row'
  },
  progressText: {
    // color: Colors.background,
    fontSize: 16
  },
})

export default styles
