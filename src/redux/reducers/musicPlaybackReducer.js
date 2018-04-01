import {
  NAVIGATE_TO,
  PLAYBACK_INIT,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
  UPDATE_LIBRARY,
} from '../actionTypes';

const musicPlaybackReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_LIBRARY: {
      return {
        ...state,
        songs: action.songs,
      };
    }
    case PLAYBACK_INIT:
      return {
        ...state,
        init: true,
      };
    case PLAYBACK_STATE:
      return {
        ...state,
        state: action.state,
      };
    case PLAYBACK_TRACK:
      return {
        ...state,
        currentTrack: action.track,
      };
    default:
      return state;
  }
};

export default musicPlaybackReducer;
