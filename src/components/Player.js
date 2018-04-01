import React, { PureComponent } from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPlayer, { ProgressComponent } from 'react-native-track-player';

import iconPlay from '../images/play.png';
import iconPause from '../images/pause.png';

import { playbackTrack, updatePlayback } from '../redux/actions/playerActions';

class Player extends PureComponent {
  _openNowPlaying() {
    this.props.navigation.navigate('SingleSongDetail', {
      onSelect: this.props.onSongPressed,
    });
  }

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
    const { songs, track } = this.props;
    const currentSong = songs.find(item => item.id == track);
    console.log('currentsong', currentSong);

    if (!currentSong) {
      return null;
    }

    return (
      <View style={styles.player}>
        <View style={styles.content}>
          <TouchableOpacity
            style={styles.wide}
            onPress={this._openNowPlaying.bind(this)}
          >
            <View style={styles.metadata}>
              <Image
                source={{
                  uri: currentSong.albumImage,
                }}
                style={styles.artwork}
              />
              <View style={styles.info}>
                <Text style={styles.title}>{currentSong.title}</Text>
                <Text style={styles.artist}>{currentSong.artist}</Text>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={this._togglePlayPause.bind(this)}>
            <Image
              source={
                this.props.state == TrackPlayer.STATE_PAUSED
                  ? iconPlay
                  : iconPause
              }
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    state: state.musicPlaybackReducer.state,
    track: state.musicPlaybackReducer.currentTrack,
    songs: state.musicPlaybackReducer.songs,
  }),
  dispatch => bindActionCreators({ updatePlayback }, dispatch)
)(Player);

const styles = StyleSheet.create({
  player: {
    elevation: 5,
    backgroundColor: '#424141',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bar: {
    height: 2,
    backgroundColor: '#03A9F4',
  },
  wide: {
    flex: 1,
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  artwork: {
    width: 50,
    height: 50,
    margin: 10,
  },
  info: {
    paddingLeft: 5,
    paddingRight: 5,
  },
  title: {
    color: '#e6e6e6',
    fontSize: 16,
    fontWeight: '500',
  },
  artist: {
    color: '#9a9a9a',
    fontSize: 14,
    fontWeight: '300',
  },
  icon: {
    height: 50,
    width: 50,
    margin: 10,
  },
});
