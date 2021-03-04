import { StyleSheet, Image } from 'react-native'

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center'
    },
    albumCover: {
      width: 250,
      height: 250
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
    }
  })

export default styles
