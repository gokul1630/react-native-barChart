import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Chart from './Chart';
import OldChart from './OldChart';

const data = [
  {
    value: 20,
    label: '1',
  },
  {
    value: 70,
    label: '2',
  },
  {
    value: 60,
    label: '3',
  },
  {
    value: 90,
    label: '4',
  },
  {
    value: 50,
    label: '5',
  },
  {
    value: 20,
    label: '6',
  },
];

const App = () => {
  return (
    <View style={{backgroundColor: '#ababab', flex: 1}}>
      <SafeAreaView style={{padding: 20}}>
        <Chart chartData={data} />
        {/* <OldChart /> */}
      </SafeAreaView>
    </View>
  );
};

export default App;
