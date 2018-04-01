import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import TrackPlayer from 'react-native-track-player';

import iconPlay from '../images/play.png';
import iconPause from '../images/pause.png';

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: 'row',
    margin: 20,
  },

  songTitleText: {
    fontSize: 18,
    flexGrow: 1,
  },

  controlIcon: {
    height: 40,
    width: 40,
  },
});

class SongItem extends PureComponent {
  _togglePlayPause() {
    if (this.props.state == TrackPlayer.STATE_PAUSED) {
      TrackPlayer.play();
      this.props.updatePlayback();
    } else {
      TrackPlayer.pause();
      this.props.updatePlayback();
    }
  }

  render() {
    const { song } = this.props;
    return (
      <View style={styles.songContainer}>
        <Text style={styles.songTitleText}>{song.title} </Text>
        <TouchableOpacity
          onPress={async () => {
            this.props.onSongPressed(String(song.id));
            TrackPlayer.skip(String(song.id));
          }}
        >
          <Image style={styles.controlIcon} source={iconPlay} />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SongItem;
