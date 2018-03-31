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

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },

  albumPoster: {
    height: 200,
  },

  songContainer: {
    flexDirection: 'row',
    margin: 20,
  },

  songTitleText: {
    fontSize: 16,
    flexGrow: 1,
  },

  controlIcon: {
    height: 20,
    width: 20,
  },
});

var track = {
  id: 'unique track id',

  url:
    'https://api.soundcloud.com/tracks/9737435/stream?client_id=8a754483a114344c70ab15f20a5035ab',

  title: 'Avaritia',
  artist: 'deadmau5',
  album: 'while(1<2)',
  genre: 'Progressive House, Electro House',

  artwork:
    'http://www.aprocura.com.br/wp-content/uploads/2012/10/Significado-Cores-Bandeira-do-Brasil.jpg',
};

class AlbumDetailView extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { currentTime: 0 };
  }
  static navigationOptions = {
    title: '',
    header: null,
  };
  componentDidMount() {
    console.log(TrackPlayer);

    // Creates the player
    TrackPlayer.setupPlayer().then(async () => {
      // Adds a track to the queue
      await TrackPlayer.add(track);

      // Starts playing it
      TrackPlayer.play();
    });
  }
  renderSong = ({ item }) => {
    return (
      <View style={styles.songContainer}>
        <Text style={styles.songTitleText}>{item.title} </Text>
        <TouchableOpacity>
          <Image
            style={styles.controlIcon}
            source={require('../images/play.png')}
          />
        </TouchableOpacity>
      </View>
    );
  };

  keyExtractor = ({ url }) => url;
  render() {
    const { albumSongs } = this.props.navigation.state.params;
    return (
      <View style={styles.container}>
        <Image
          style={styles.albumPoster}
          resizeMethod={'scale'}
          source={require('../images/album.jpg')}
        />

        <FlatList
          data={albumSongs}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderSong}
        />
      </View>
    );
  }
}

export default AlbumDetailView;
