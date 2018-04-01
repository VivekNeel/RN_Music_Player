import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StatusBar,
} from 'react-native';

import { Artists } from '../mockData';
import SongItem from '../components/SongItem';
import TrackPlayer from 'react-native-track-player';
import AlbumListItem from '../components/AlbumListItem';
import Player from '../components/Player';
import { COLOR_ACCENT, COLOR_ACCENT_DARK } from '../colors';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { playbackTrack, updatePlayback } from '../redux/actions/playerActions';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
  },
});

class AlbumList extends PureComponent {
  constructor(props) {
    super(props);
    this.onSongPressed = this.onSongPressed.bind(this);
  }

  onSongPressed(currentSongID) {
    this.props.playbackTrack(currentSongID);
    this.props.updatePlayback();
  }
  static navigationOptions = {
    title: `Doodleblue Music`,

    headerStyle: { backgroundColor: COLOR_ACCENT },
  };
  renderItem = ({ item }) => {
    return <AlbumListItem navigation={this.props.navigation} item={item} />;
  };
  keyExtractor = ({ name }) => name;
  render() {
    return (
      <View style={styles.mainContainer}>
        <StatusBar
          backgroundColor={COLOR_ACCENT_DARK}
          barStyle="light-content"
        />
        <FlatList
          numColumns={2}
          style={styles.container}
          data={Artists}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />

        <Player
          navigation={this.props.navigation}
          onSongPressed={this.onSongPressed}
        />
      </View>
    );
  }
}

export default connect(null, dispatch =>
  bindActionCreators({ updatePlayback, playbackTrack }, dispatch)
)(AlbumList);
