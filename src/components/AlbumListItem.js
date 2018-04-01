import React, { PureComponent } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ImageBackground,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

const styles = StyleSheet.create({
  albumPoster: {
    height: 150,
    width: Dimensions.get('window').width / 2,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#212121',
    opacity: 0.6,
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
          <ImageBackground
            style={styles.albumPoster}
            resizeMethod={'auto'}
            source={{ uri: item.background }}
          >
            <View style={styles.overlay} />
          </ImageBackground>
          <Text style={styles.albumTitle}>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  }
}

export default AlbumListItem;
