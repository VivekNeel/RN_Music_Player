import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  albumPoster: {
    height: 150,
    opacity: 0.7,
    width: Dimensions.get('window').width / 2,
  },

  albumTitle: {
    position: 'absolute',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 150 / 2.5,
    textAlign: 'center',
    color: 'white',
    left: 0,
    right: 0,
  },
});

class AlbumListItem extends PureComponent {
  render() {
    const { item, navigation } = this.props;
    return (
      <TouchableOpacity
        onPress={async () => {
          navigation.navigate('DetailAlbumList', {
            albumSongs: item.songs,
            coverImg: item.background,
          });
        }}
      >
        <View>
          <Image
            style={styles.albumPoster}
            resizeMethod={'auto'}
            source={{ uri: item.background }}
          />
          <Text style={styles.albumTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AlbumListItem;
