import { AppRegistry } from 'react-native';
import createApp from './App';
import createEventHandler from './src/player/eventhandler';
import TrackPlayer from 'react-native-track-player';

import configureStore from './src/redux/configureStore';

const store = configureStore();

AppRegistry.registerComponent('rnmusic', () => createApp(store));

TrackPlayer.registerEventHandler(createEventHandler(store));
