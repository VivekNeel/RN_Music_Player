import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import TrackPlayer from 'react-native-track-player';
import Player from '../components/Player';
import SongItem from '../components/SongItem';

import { loadSongs } from '../redux/actions/playerActions';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playbackTrack } from '../redux/actions/playerActions';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },

  albumPoster: {
    height: 200,
  },
});

class AlbumDetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentTime: 0 };
    this.onSongPressed = this.onSongPressed.bind(this);
  }

  async componentDidMount() {
    this.props.loadSongs(this.props.navigation.state.params.albumSongs);
    await TrackPlayer.setupPlayer().then(() => {
      let tracks = [];
      let track;
      for (item of this.props.navigation.state.params.albumSongs) {
        track = {
          id: String(item.id),

          url: item.url,

          title: item.title,
          artist: item.album,
          album: item.album,
          genre: item.album,

          artwork: item.albumImage,
        };
        tracks.push(track);
      }

      TrackPlayer.add(tracks).then(() => {
        TrackPlayer.play();
        TrackPlayer.skip(String(tracks[0].id));
      });
    });
  }

  onSongPressed(currentSongID) {
    this.props.playbackTrack(currentSongID);
  }
  static navigationOptions = {
    title: '',
    header: null,
  };
  renderSong = ({ item }) => {
    return (
      <View>
        <SongItem song={item} onSongPressed={this.onSongPressed} />
      </View>
    );
  };

  keyExtractor = ({ id }) => String(id);
  render() {
    const { songs } = this.props;

    if (!songs) {
      return null;
    }

    return (
      <View style={styles.container}>
        <Image
          style={styles.albumPoster}
          resizeMethod={'auto'}
          source={{ uri: this.props.navigation.state.params.coverImg }}
        />

        <FlatList
          data={songs}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderSong}
        />

        <Player
          navigation={this.props.navigation}
          onSongPressed={this.onSongPressed}
        />
      </View>
    );
  }
}

export default connect(
  state => ({
    currentTrack: state.musicPlaybackReducer.currentTrack,
    songs: state.musicPlaybackReducer.songs,
  }),
  dispatch => bindActionCreators({ playbackTrack, loadSongs }, dispatch)
)(AlbumDetailView);
