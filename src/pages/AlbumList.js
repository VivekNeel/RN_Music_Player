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

import { Artists } from '../mockData';
import SongItem from '../components/SongItem';
import TrackPlayer from 'react-native-track-player';
import AlbumListItem from '../components/AlbumListItem';

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
  static navigationOptions = {
    title: `Doodleblue Music`,
  };
  renderItem = ({ item }) => {
    return <AlbumListItem navigation={this.props.navigation} item={item} />;
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
