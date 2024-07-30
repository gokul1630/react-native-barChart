/**
 * @format
 */

import {AppRegistry, SafeAreaView} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const S = () => (
  <SafeAreaView style={{flex:1}}>
    <App />
  </SafeAreaView>
);

AppRegistry.registerComponent(appName, () => S);
