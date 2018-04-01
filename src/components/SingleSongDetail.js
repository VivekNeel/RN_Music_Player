import React, { PureComponent } from 'react';

import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Button,
  Dimensions,
  Platform,
} from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TrackPlayer from 'react-native-track-player';
import ImageButton from '../components/ImageButton';

import iconArrow from '../images/arrow.png';
import iconPlay from '../images/play.png';
import iconPause from '../images/pause.png';
import iconPrevious from '../images/previous.png';
import iconNext from '../images/next.png';

import { playbackTrack, updatePlayback } from '../redux/actions/playerActions';

class SingleSongDetail extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  _goBack() {
    this.props.navigation.goBack();
  }

  _playPause() {
    // if(this.props.state == TrackPlayer.STATE_PAUSED) {
    //     TrackPlayer.play();
    // } else {
    //     TrackPlayer.pause();
    // }
  }

  async _previous() {
    TrackPlayer.skipToPrevious();
  }

  _next(songId) {
    TrackPlayer.skipToNext();
    this.props.updatePlayback();
  }

  constructor(props) {
    super(props);
    this.state = { trackId: this.props.track };
    this._next = this._next.bind(this);
  }
  render() {
    const { songs, track } = this.props;

    const currentSong = songs.find(item => item.id == String(track));
    console.log('currentsong', currentSong, this.props);

    if (!currentSong) {
      return null;
    }
    return (
      <View style={styles.view}>
        <StatusBar translucent={true} backgroundColor="rgba(0, 0, 0, 0)" />
        <ImageBackground
          source={{ uri: currentSong.artwork }}
          resizeMode="cover"
          style={[styles.artwork, { height: 300 }]}
        >
          <View style={styles.header}>
            <ImageButton
              source={iconArrow}
              onPress={this._goBack.bind(this)}
              imageStyle={styles.headerIcon}
            />
            <Text style={styles.headerTitle}>Now Playing</Text>
          </View>
        </ImageBackground>
        <View style={styles.info}>
          <Text style={styles.title}>{currentSong.title}</Text>
          <Text style={styles.artist}>{currentSong.artist}</Text>
        </View>
        {/* <ProgressBar /> */}
        <View style={styles.controls}>
          <ImageButton
            source={iconPrevious}
            onPress={this._previous.bind(this)}
            imageStyle={styles.controlIcon}
          />
          <ImageButton
            source={
              this.props.state == TrackPlayer.STATE_PAUSED
                ? iconPlay
                : iconPause
            }
            onPress={this._playPause.bind(this)}
            style={styles.playPause}
            imageStyle={styles.controlIcon}
          />
          <ImageButton
            source={iconNext}
            onPress={this._next}
            imageStyle={styles.controlIcon}
          />
        </View>
      </View>
    );
  }
}

export default connect(
  state => ({
    track: state.musicPlaybackReducer.currentTrack,
    songs: state.musicPlaybackReducer.songs,
  }),
  dispatch => bindActionCreators({ playbackTrack, updatePlayback }, dispatch)
)(SingleSongDetail);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#2b2b2b',
  },
  artwork: {
    width: '100%',
    height: 200,
  },

  header: {
    marginTop: Platform.OS == 'ios' ? 20 : 24,
    padding: 1,
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    width: 24,
    height: 24,
    margin: 15,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '400',
    color: '#ffffff',
    marginHorizontal: 16,
  },
  info: {
    flexDirection: 'column',
    alignItems: 'center',
    margin: 20,
  },
  title: {
    color: '#e6e6e6',
    fontSize: 19,
    fontWeight: '500',
  },
  artist: {
    color: '#9a9a9a',
    fontSize: 16,
    fontWeight: '400',
  },
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 25,
  },
  controlIcon: {
    width: 40,
    height: 40,
  },
  playPause: {
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ffffff',
    padding: 10,
    marginHorizontal: 15,
  },
});
