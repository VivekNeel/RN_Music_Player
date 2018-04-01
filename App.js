/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import TrackPlayer from 'react-native-track-player';

import Pages from './src/index';
import { AppState } from 'react-native';

import configureStore from './src/redux/configureStore';
import { updatePlayback } from './src/redux/actions/playerActions';

const store = configureStore();

class App extends Component<Props> {
  async componentDidMount() {
    AppState.addEventListener('change', this._handleStateChange);

    await TrackPlayer.setupPlayer({});
    TrackPlayer.updateOptions({
      capabilities: [
        TrackPlayer.CAPABILITY_PLAY,
        TrackPlayer.CAPABILITY_PAUSE,
        TrackPlayer.CAPABILITY_SEEK_TO,
        TrackPlayer.CAPABILITY_SKIP_TO_NEXT,
        TrackPlayer.CAPABILITY_SKIP_TO_PREVIOUS,
      ],
    });
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleStateChange);
  }

  _handleStateChange(appState) {
    if (appState == 'active') {
      store.dispatch(updatePlayback());
    }
  }

  render() {
    return (
      <Provider store={store}>
        <Pages />
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = function(store) {
  App.store = store;
  return App;
};
