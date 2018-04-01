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

  onSongPressed(currentSong) {
    console.log(currentSong);

    this.props.playbackTrack(currentSong);
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
    const { albumSongs, coverImg } = this.props.navigation.state.params;
    console.log(coverImg);

    return (
      <View style={styles.container}>
        <Image
          style={styles.albumPoster}
          resizeMethod={'auto'}
          source={{ uri: coverImg }}
        />

        <FlatList
          data={albumSongs}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderSong}
        />

        <Player />
      </View>
    );
  }
}

export default connect(
  state => ({ currentTrack: state.musicPlaybackReducer }),
  dispatch => bindActionCreators({ playbackTrack }, dispatch)
)(AlbumDetailView);
