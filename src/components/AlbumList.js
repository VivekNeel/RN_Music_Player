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

class AlbumList extends PureComponent {
  static navigationOptions = {
    title: `Albums`,
  };
  renderItem = ({ item }) => {
    console.log(item);

    return (
      <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate('DetailAlbumList', {
            albumSongs: item.songs,
            coverImg: item.background,
          })
        }
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
