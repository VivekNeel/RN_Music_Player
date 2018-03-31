import AlbumList from '../src/components/AlbumList';
import AlbumDetailView from '../src/components/AlbumDetailView';

import { StackNavigator } from 'react-navigation';

export default StackNavigator({
  AlbumList: {
    screen: AlbumList,
  },

  DetailAlbumList: {
    screen: AlbumDetailView,
  },
});
