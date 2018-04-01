import {
  NAVIGATE_TO,
  PLAYBACK_INIT,
  PLAYBACK_STATE,
  PLAYBACK_TRACK,
} from '../actionTypes';

const musicPlaybackReducer = (state = {}, action) => {
  switch (action.type) {
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
      console.log(action.track);

      return {
        ...state,
        currentTrack: action.track,
      };
    default:
      return state;
  }
};

export default musicPlaybackReducer;
