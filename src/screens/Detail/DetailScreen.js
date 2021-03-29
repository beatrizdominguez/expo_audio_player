import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, RefreshControlBase } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'

import { getData } from './../../database'

import PageStyles from './styles'

import { PageLayout } from './../../components'


const DetailScreen = ({ navigation, route }) => {
    const { params } = route
    const { audioBook } = params
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackInstance, setPlaybackInstance] = useState(null)
    const [volume, setVolume] = useState(1.0)
    const [isBuffering, setIsBuffering] = useState(false)


    useEffect(() => {

        const dbData = getData(audioBook.title_id)
        try {

            (async () => {
                async(
                    await Audio.setAudioModeAsync({
                        allowsRecordingIOS: false,
                        interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
                        playsInSilentModeIOS: true,
                        interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
                        shouldDuckAndroid: true,
                        staysActiveInBackground: true,
                        playThroughEarpieceAndroid: true
                    })
                )
            })()
            loadAudio()
        } catch (error) {
            console.error('UPS: ' + error)
        }
    }, [])


    const loadAudio = async () => {
        try {
            const playbackInstance = new Audio.Sound()
            const source = {
                uri: audioBook.uri
            }

            const status = {
                shouldPlay: isPlaying,
                volume
            }

            playbackInstance.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate)
            await playbackInstance.loadAsync(source, status, false)
            setPlaybackInstance(playbackInstance)
        } catch (e) {
            console.log(e)
        }
    }


    const onPlaybackStatusUpdate = status => {
        setIsBuffering(status.isBuffering)
    }

    const handlePlayPause = async (params) => {
        isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
        setIsPlaying(!isPlaying)
    }

    // const onVolumeUp = async params => {
    //     // bea-todo validate max volume
    //     await playbackInstance.setVolumeAsync(volume + 1)
    // }

    const renderFileInfo = () => {
        return (
            <View style={PageStyles.trackInfo}>
                <Text style={[PageStyles.trackInfoText, PageStyles.largeText]}>
                    {audioBook.title}
                </Text>
                <Text style={[PageStyles.trackInfoText, PageStyles.smallText]}>
                    {audioBook.author}
                </Text>
                <Text style={[PageStyles.trackInfoText, PageStyles.smallText]}>
                    {audioBook.source}
                </Text>
            </View>
        )
    }

    return (
        <PageLayout>
            <View style={PageStyles.imgContent}>
                <TouchableOpacity onPress={handlePlayPause}>
                    <Image
                        style={PageStyles.albumCover}
                        source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
                    />
                </TouchableOpacity>
                <View style={PageStyles.controls}>
                    <TouchableOpacity style={PageStyles.control} onPress={handlePlayPause}>
                        {isPlaying ? (
                            <Ionicons name='ios-pause' size={48} color='#444' />
                        ) : (
                                <Ionicons name='ios-play-circle' size={48} color='#444' />
                            )}
                    </TouchableOpacity>
                </View>
            </View>
            {renderFileInfo()}
        </PageLayout >
    )
}

export default DetailScreen
