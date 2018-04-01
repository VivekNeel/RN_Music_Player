import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import { playbackState, playbackTrack } from '../redux/actions/playerActions';

async function eventHandler(data) {
  switch (data) {
    case 'remote-play':
      TrackPlayer.play();
      break;
    case 'remote-pause':
      TrackPlayer.pause();
      break;
    case 'remote-stop':
      TrackPlayer.stop();
      break;
    case 'remote-next':
      TrackPlayer.skipToNext();
      break;
    case 'remote-previous':
      TrackPlayer.skipToPrevious();
      break;
    case 'remote-seek':
      TrackPlayer.seekTo(data.position);
      break;

    case 'remote-duck':
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
      break;

    case 'playback-state':
      store.dispatch(playbackState(data.state));
      break;
    case 'playback-track-changed':
      store.dispatch(playbackTrack(data.nextTrack));
      break;
    case 'playback-error':
      Alert.alert('An error ocurred', data.error);

      break;

    default:
    // TrackPlayer.play();
  }
}

module.exports = function(store) {
  return eventHandler.bind(null, store);
};
