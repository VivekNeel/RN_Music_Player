import AlbumList from '../src/pages/AlbumList';
import AlbumDetailView from '../src/pages/AlbumDetailView';
import SingleSongDetail from '../src/pages/SingleSongDetail';

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
