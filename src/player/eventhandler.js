import { Alert } from 'react-native';
import TrackPlayer from 'react-native-track-player';

import {
  playbackState,
  playbackTrack,
  updatePlayback,
} from '../redux/actions/playerActions';

async function eventHandler(store, data) {
  switch (data.type) {
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
      store.dispatch(updatePlayback());

      break;
    case 'remote-previous':
      TrackPlayer.skipToPrevious();
      store.dispatch(updatePlayback());

      break;
    case 'remote-seek':
      TrackPlayer.seekTo(data.position);
      break;

    case 'remote-duck':
      TrackPlayer.setVolume(data.ducking ? 0.5 : 1);
      break;

    case 'playback-state':
      store.dispatch(playbackState(data.state));
      store.dispatch(updatePlayback());
      break;
    case 'playback-track-changed':
      store.dispatch(playbackTrack(String(data.nextTrack)));
      store.dispatch(updatePlayback());

      break;
    case 'playback-error':
      TrackPlayer.play();

      break;

    default:
      TrackPlayer.play();
  }
}

module.exports = function(store) {
  return eventHandler.bind(null, store);
};
