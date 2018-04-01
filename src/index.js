import AlbumList from '../src/components/AlbumList';
import AlbumDetailView from '../src/components/AlbumDetailView';
import SingleSongDetail from '../src/components/SingleSongDetail';

import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  AlbumList: {
    screen: AlbumList,
  },

  DetailAlbumList: {
    screen: AlbumDetailView,
  },

  SingleSongDetail: {
    screen: SingleSongDetail,
  },
});
