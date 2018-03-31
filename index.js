import { AppRegistry } from 'react-native';
import App from './App';
import AlbumList from './src/components/AlbumList';
import createEventHandler from './src/player/eventhandler';
import TrackPlayer from 'react-native-track-player';

AppRegistry.registerComponent('rnmusic', () => App);
TrackPlayer.registerEventHandler(createEventHandler());
