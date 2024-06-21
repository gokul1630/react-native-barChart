import React from 'react';
import { StyleSheet, View, Text as RnText, useWindowDimensions } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { Line, Svg, Text, ClipPath, Rect, Path } from 'react-native-svg';
import Chart from './Chart';

const data = [
  {
    percentage: 20,
  },
  {
    sessionDate: 1718342100,
    percentage: 78.53,
  },
  {
    percentage: 63.52,
    sessionDate: 1718342280,
  },
  {
    sessionDate: 1718356500,
    percentage: 93.5,
  },
  {
    sessionDate: 1718342400,
    percentage: 100,
  },
  {
    percentage: 76.8,
    sessionDate: 1718531880,
  },
];

function roundUp(num) {
  if (num < 50) {
    return Math.ceil(num / 5) * 5;
  } else {
    return Math.ceil(num / 10) * 10;
  }
}


const percentage = 80;
const App = () => {

  const maxYValue = roundUp(data.reduce((a, b) => b.percentage > a.percentage ? b : a)?.percentage)

  const stroke = 200 - 200 * (percentage / 100);

  const { width } = useWindowDimensions()

  return (
    <View style={{ backgroundColor: '#ababab', flex: 1, }}>
      <View style={{ backgroundColor: '#fff', flexDirection: 'row' }}>
        <Svg style={{}} height={220} width={width}>



          <Text x={5} y={18} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={20} y2={20} x2={300} stroke="#000" />

          <Text x={5} y={38} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={40} y2={40} x2={300} stroke="#000" />

          <Text x={5} y={58} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={60} y2={60} x2={300} stroke="#000" />

          <Text x={5} y={78} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={80} y2={80} x2={300} stroke="#000" />

          <Text x={5} y={98} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={100} y2={100} x2={300} stroke="#000" />

          <Text x={5} y={118} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={120} y2={120} x2={300} stroke="#000" />

          <Text x={5} y={138} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={140} y2={140} x2={300} stroke="#000" />

          <Text x={5} y={158} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={160} y2={160} x2={300} stroke="#000" />

          <Text x={5} y={178} fill="#000" fontSize={15}>
            10
          </Text>
          <Line x1={20} y1={180} y2={180} x2={300} stroke="#000" />

          <Line x1={20} y1={200} y2={200} x2={300} stroke="#000" />


          <ClipPath id="cutbottom">
          <Path d="M40,30 L40,360 A5,5 0 0,1 35,365 L15,365 L15,30 Z" />
          </ClipPath>


          <Text x={40} y={215} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={40}
            x2={40}
            y1={195}
            y2={10}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />

          <Text x={80} y={195} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={80}
            x2={80}
            y1={185}
            y2={30}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />

          <Text x={120} y={195} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={120}
            x2={120}
            y1={185}
            y2={30}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />

          <Text x={160} y={195} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={160}
            x2={160}
            y1={185}
            y2={30}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />

          <Text x={200} y={195} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={200}
            x2={200}
            y1={185}
            y2={30}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />

          <Text x={240} y={195} fill="#000" fontSize={15}>
            10
          </Text>
          <Line
            x1={240}
            x2={240}
            y1={185}
            y2={stroke}
            stroke="#000"
            strokeWidth={10}
            strokeLinecap="round"
          />
        </Svg>
      </View>
      <Chart />
    </View>
  );
};

export default App;
