import React, { useState, useEffect } from 'react'
import { Text, View, Image, TouchableOpacity, ProgressBarAndroid } from 'react-native'
import { Ionicons } from '@expo/vector-icons';
import { Audio } from 'expo-av'

import { getDataById, update } from './../../database'
import { millisecondsToText } from './../../tools'

import PageStyles from './styles'

import { PageLayout } from './../../components'

const DetailScreen = ({ navigation, route }) => {
    const { params } = route
    const { audioBook } = params
    const [loading, setLoading] = useState(true)
    const [isPlaying, setIsPlaying] = useState(false)
    const [playbackInstance, setPlaybackInstance] = useState(null)
    const [volume, setVolume] = useState(1.0)
    const [isBuffering, setIsBuffering] = useState(false)
    const [positionMillis, setPositionMillis] = useState(0)
    const [durationMillis, setDurationMillis] = useState(0)
    const [progress, setProgress] = useState(0)
    const [isDataLoaded, setIsDataLoaded] = useState(false)



    useEffect(() => {
        getDataById(audioBook.title_id, (ms) => {
            setPositionMillis(ms)
            setIsDataLoaded(true)
        })
        initPlayer()
        return exitScreen
    }, [])
    
    useEffect(() => {
        if(isDataLoaded && playbackInstance){
            playbackInstance.setPositionAsync(positionMillis)
        }
    }, [isDataLoaded, playbackInstance, positionMillis])

    // https://upmostly.com/tutorials/setinterval-in-react-components-using-hooks
    useEffect(() => {
        let interval
        if (isPlaying) {
            interval = setInterval(() => {
                const newPositionMillis = positionMillis + 1000
                setPositionMillis(newPositionMillis)
                const progressValue = durationMillis ? newPositionMillis / durationMillis : 0
                setProgress(progressValue)
            }, 1000);

            return () => clearInterval(interval);

        } else if (!isPlaying && !loading) {
            update(audioBook.title_id, positionMillis)
        }
    }, [isPlaying, positionMillis, durationMillis])

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
            const result = await playbackInstance.loadAsync(source, status, false)
            const { durationMillis } = result
            setDurationMillis(durationMillis)
            setLoading(false)
            setPlaybackInstance(playbackInstance)
        } catch (e) {
            console.log(e)
        }
    }

    const initPlayer = async () => {
        await Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            interruptionModeIOS: Audio.INTERRUPTION_MODE_IOS_DO_NOT_MIX,
            playsInSilentModeIOS: true,
            interruptionModeAndroid: Audio.INTERRUPTION_MODE_ANDROID_DUCK_OTHERS,
            shouldDuckAndroid: true,
            staysActiveInBackground: true,
            playThroughEarpieceAndroid: true
        })
        loadAudio()
    }


    const onPlaybackStatusUpdate = status => {
        setIsBuffering(status.isBuffering)
    }

    const exitScreen = () => {
        console.log(`::::::`)
        console.log('BYE BYE!!!!')
        console.log(`::::::`)
        // pause if needed
        // save current state in database
        // update(audioBook.title_id, positionMillis )
    }

    const handlePlayPause = async (params) => {
        setIsPlaying(!isPlaying)
        const result = isPlaying ? await playbackInstance.pauseAsync() : await playbackInstance.playAsync()
        const { positionMillis } = result
        setPositionMillis(positionMillis)
        // playFromPositionAsync(0)
    }

    // const onVolumeUp = async params => {
    //     // bea-todo validate max volume
    //     await playbackInstance.setVolumeAsync(volume + 1)
    // }

    const renderProgress = () => {
        return (
            <View>
                <ProgressBarAndroid styleAttr="Horizontal" indeterminate={false} progress={progress} />
                <Text style={[PageStyles.progressText]}>{millisecondsToText(positionMillis || 0)} / {millisecondsToText(durationMillis || 0)}</Text>
            </View>
        )
    }
    const renderFileInfo = () => {
        return (
            <View style={PageStyles.trackInfo}>
                <Text style={[PageStyles.trackInfoText, PageStyles.largeText]}>
                    {audioBook.title}
                </Text>
                {renderProgress()}
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
                {loading ? (
                    <ProgressBarAndroid styleAttr='Large' />
                ) : (
                        <TouchableOpacity onPress={handlePlayPause}>
                            <Image
                                style={PageStyles.albumCover}
                                source={{ uri: 'http://www.archive.org/download/LibrivoxCdCoverArt8/hamlet_1104.jpg' }}
                            />
                        </TouchableOpacity>
                    )
                }
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
