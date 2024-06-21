import React from 'react';
import { SafeAreaView, View } from 'react-native';
import Chart from './Chart';
import OldChart from './OldChart';

const App = () => {

  return (
    <View style={{ backgroundColor: '#ababab', flex: 1, }}>
      <SafeAreaView style={{ padding: 20 }}>
        <Chart />
        {/* <OldChart /> */}
      </SafeAreaView>
    </View>
  );
};

export default App;
