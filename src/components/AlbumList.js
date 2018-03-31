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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  albumPoster: {
    flexGrow: 1,
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
          })
        }
      >
        <View style={{ flexGrow: 1, flexDirection: 'column', margin: 10 }}>
          <Image
            style={styles.albumPoster}
            resizeMethod={'auto'}
            source={require('../images/album.jpg')}
          />
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  keyExtractor = ({ name }) => name;
  render() {
    console.log(this.props);

    return (
      <FlatList
        numColumns={2}
        style={styles.container}
        data={Artists}
        renderItem={this.renderItem}
        keyExtractor={this.keyExtractor}
      />
    );
  }
}

export default AlbumList;
