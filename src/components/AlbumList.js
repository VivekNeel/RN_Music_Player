import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import { Artists } from '../mockData';
import SongItem from '../components/SongItem';
import TrackPlayer from 'react-native-track-player';

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  container: {
    flexGrow: 1,
  },

  albumPoster: {
    height: 150,
    width: 150,
  },
});
const mapTracksForPlayer = tracks => {
  console.log(tracks);

  return tracks.map(track => ({
    id: track.id,
    url: track.url,
    title: track.title,
    artist: 'Phish',
    album: track.album,
    genre: 'Phish',
    artwork: 'https://s3.amazonaws.com/hose/images/' + track.id + '.jpg',
  }));
};
class AlbumList extends PureComponent {
  static navigationOptions = {
    title: `Albums`,
  };
  renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={async () => {
          this.props.navigation.navigate('DetailAlbumList', {
            albumSongs: item.songs,
            coverImg: item.background,
          });
        }}
      >
        <View style={{ flexGrow: 1, flexDirection: 'column', margin: 10 }}>
          <Image
            style={styles.albumPoster}
            resizeMethod={'auto'}
            source={{ uri: item.background }}
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractor = ({ name }) => name;
  render() {
    return (
      <View style={styles.mainContainer}>
        <FlatList
          numColumns={2}
          style={styles.container}
          data={Artists}
          renderItem={this.renderItem}
          keyExtractor={this.keyExtractor}
        />
      </View>
    );
  }
}

export default AlbumList;
