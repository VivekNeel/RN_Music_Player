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
import CustomButton from '../components/CustomButton';

import iconArrow from '../images/arrow.png';
import iconPlay from '../images/play.png';
import iconPause from '../images/pause.png';
import iconPrevious from '../images/previous.png';
import iconNext from '../images/next.png';

import {
  playbackTrack,
  updatePlayback,
  playbackState,
} from '../redux/actions/playerActions';

class SingleSongDetail extends PureComponent {
  static navigationOptions = {
    header: null,
  };
  _goBack() {
    this.props.navigation.goBack();
  }

  _playPause() {
    console.log('...state', this.props.state);

    if (this.props.state == TrackPlayer.STATE_PAUSED) {
      TrackPlayer.play();
      this.props.updatePlayback();
    } else {
      TrackPlayer.pause();
      this.props.updatePlayback();
    }
  }

  async _previous() {
    TrackPlayer.skipToPrevious();
    this.props.updatePlayback();
  }

  _next() {
    TrackPlayer.skipToNext();
    this.props.updatePlayback();
  }

  constructor(props) {
    super(props);
    this._next = this._next.bind(this);
  }
  render() {
    const { songs, track } = this.props;

    const currentSong = songs.find(item => item.id == String(track));

    if (!currentSong) {
      return null;
    }
    return (
      <View style={styles.view}>
        <StatusBar />
        <ImageBackground
          source={{ uri: currentSong.albumImage }}
          resizeMode="cover"
          style={[styles.artwork, { height: 300 }]}
        >
          <View style={styles.header}>
            <CustomButton
              source={iconArrow}
              onPress={this._goBack.bind(this)}
              imageStyle={styles.headerIcon}
            />
          </View>
        </ImageBackground>
        <View style={styles.info}>
          <Text style={styles.title}>{currentSong.title}</Text>
          <Text style={styles.artist}>{currentSong.artist}</Text>
        </View>
        {/* <ProgressBar /> */}
        <View style={styles.controls}>
          <CustomButton
            source={iconPrevious}
            onPress={this._previous.bind(this)}
            imageStyle={styles.controlIcon}
          />
          <CustomButton
            source={
              this.props.state == TrackPlayer.STATE_PAUSED
                ? iconPlay
                : iconPause
            }
            onPress={this._playPause.bind(this)}
            style={styles.playPause}
            imageStyle={styles.controlIcon}
          />
          <CustomButton
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
    state: state.musicPlaybackReducer.state,
    track: state.musicPlaybackReducer.currentTrack,
    songs: state.musicPlaybackReducer.songs,
  }),
  dispatch =>
    bindActionCreators(
      { playbackTrack, updatePlayback, playbackState },
      dispatch
    )
)(SingleSongDetail);

const styles = StyleSheet.create({
  view: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#212121',
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
