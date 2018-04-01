import {
  NAVIGATE_TO,
  PLAYBACK_INIT,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
} from '../actionTypes';

import TrackPlayer from 'react-native-track-player';

export function initializePlayback() {
  return async (dispatch, getState) => {
    await TrackPlayer.setupPlayer({
      maxCacheSize: 1024 * 5,
    });
    dispatch({
      type: PLAYBACK_INIT,
    });
  };
}
export function playbackState(state) {
  return {
    type: PLAYBACK_STATE,
    state: state,
  };
}

export function playbackTrack(track) {
  return {
    type: PLAYBACK_TRACK,
    track: track,
  };
}

export function updatePlayback() {
  return async (dispatch, getState) => {
    try {
      dispatch(playbackState(await TrackPlayer.getState()));
      dispatch(playbackTrack(await TrackPlayer.getCurrentTrack()));
    } catch (e) {
      // The player is probably not yet initialized
    }
  };
}
