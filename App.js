/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import createRootNavigator from './src/navigation/nav';
import AsyncStorage from '@react-native-community/async-storage';
import {Provider} from 'react-redux';
import {store} from './src/store';
import RealmService from './src/localDB/realm';
import {setLoginStatus} from './src/store/action';

const Layout = createRootNavigator;

function App() {
  useEffect(() => {
    checkLogin();
  });

  const setLogin = val => {
    store.dispatch(
      setLoginStatus({
        isLoggedIn: val,
      }),
    );
  };

  const checkLogin = async () => {
    await RealmService.open();
    const res = await AsyncStorage.getItem('isLoggedIn');
    if (res && JSON.parse(res)) {
      setLogin(true);
    } else {
      setLogin(false);
    }
    return res;
  };

  return (
    <View style={styles.container}>
      <Provider store={store}>
        <Layout />
      </Provider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default App;
