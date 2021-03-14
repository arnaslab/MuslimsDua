import React from 'react';
import { TransparentButton } from '../components';
import YouTube from 'react-native-youtube';
import { View } from "react-native";

// const windowWidth = Dimensions.get('window').width;

const YoutubeView = ({ videoId, open = false, onClose }) => {

    // console.log("window width", windowWidth);

    if (open && videoId) {
        return (
            <View style={{ 
                position: 'absolute',
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0,
            }}>
                <View style={{
                    backgroundColor: "#000000",
                    display: "flex",
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    height: 40
                }}>
                    <TransparentButton icon="Close" size={15} onPress={onClose} color="#ffffff" />
                </View>
                <YouTube
                    apiKey="AIzaSyCODk-R0PbuPBPL0kF4Nm_dqysJde1C9Ig"
                    videoId={videoId} // The YouTube video ID
                    play // control playback of video with true/false
                    controls={2}
                    showinfo={false} //ios
                    fullscreen={false} // control whether the video should play in fullscreen or inline
                    loop={false} // control whether the video should loop when ended
                    onReady={e => console.log("ready: ", e)}
                    onChangeState={e => {
                        console.log("change state: ", e);
                        if (e.state === "ended") {
                            onClose();
                        }
                    }}
                    onChangeQuality={e => console.log("change quality: ", e)}
                    onError={e => console.log("error: ", e)}
                    style={{ alignSelf: 'stretch', height: 230 }}
                />
            </View>
        )
    } else {
        return null;
    }
}

export default YoutubeView;