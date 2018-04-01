import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

import TrackPlayer from 'react-native-track-player';

const styles = StyleSheet.create({
  songContainer: {
    flexDirection: 'row',
    margin: 20,
  },

  songTitleText: {
    fontSize: 16,
    flexGrow: 1,
  },

  controlIcon: {
    height: 20,
    width: 20,
  },
});

class SongItem extends PureComponent {
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
          <Image
            style={styles.controlIcon}
            source={require('../images/play.png')}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

export default SongItem;
