import React, {useState} from 'react';
import {Button, Text as RNText, View} from 'react-native';
import {
  ClipPath,
  Defs,
  G,
  Line,
  LinearGradient,
  Rect,
  Stop,
  Svg,
  Text,
} from 'react-native-svg';

function roundUp(num) {
  if (num < 50) {
    return Math.ceil(num / 5) * 5;
  } else {
    return Math.ceil(num / 10) * 10;
  }
}

const XLabelHeightOffset = 60;

const initialState = {
  x: 0,
  y: 0,
  containerWidth: 0,
  selectedIndex: null,
};

const Chart = ({
  containerStyle,
  gridLineCount = 5,
  height = 400,
  chartData = [],
}) => {
  const [state, setState] = useState(initialState);
  const {containerWidth, x, y, selectedIndex} = state;

  const updateState = (key, value) =>
    setState(prevState => ({...prevState, [key]: value}));

  const YaxisLabelHeightOffset = height - XLabelHeightOffset;
  const maxYValue = roundUp(
    chartData?.reduce((a, b) => (b?.value > a?.value ? b : a))?.value,
  );
  const yAxisInterval = maxYValue / (gridLineCount - 1);

  const XaxisInterval = containerWidth / (chartData?.length + 1);

  const updateWidth = event =>
    updateState('containerWidth', event.nativeEvent.layout.width);

  const onClickBar = (index, x, y) => {
    setState(prevState => ({...prevState, x, y, selectedIndex: index}));
  };

  const [a, b] = useState(0);

  if (!chartData && !chartData?.length) {
    return null;
  }

  return (
    <View style={containerStyle}>
      <Svg onLayout={updateWidth} height={height} width={'100%'}>
        <G transform={'translate(0, 30)'}>
          {/* row */}
          {Array.from({length: gridLineCount}).map((_, index) => {
            const YAxislabel = yAxisInterval * index;
            const YAxis =
              YaxisLabelHeightOffset -
              ((index * yAxisInterval) / maxYValue) * YaxisLabelHeightOffset;
            return (
              <React.Fragment key={index}>
                {!isNaN(YAxis) ? (
                  <>
                    {YAxislabel ? (
                      <Text x={5} y={YAxis} fill="#768293" fontSize={15}>
                        {YAxislabel.toFixed(0)}
                      </Text>
                    ) : null}
                    <Line
                      x1={30}
                      y1={YAxis}
                      y2={YAxis}
                      x2="100%"
                      stroke="#F0F7FF"
                    />
                  </>
                ) : null}
              </React.Fragment>
            );
          })}

          {/* column */}
          <Defs>
            <ClipPath id="cuts">
              <Rect x="0" y="0" width="100%" height={YaxisLabelHeightOffset} />
            </ClipPath>
            <LinearGradient id="odd-gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset={'100%'} stopColor={'#07C54D'} stopOpacity={1} />
              <Stop offset={'100%'} stopColor={'#06AC43'} stopOpacity={1} />
            </LinearGradient>
            <LinearGradient id="even-gradient" x1="0" y1="0" x2="1" y2="1">
              <Stop offset={'100%'} stopColor={'#FA7061'} stopOpacity={1} />
              <Stop offset={'100%'} stopColor={'#F86649'} stopOpacity={1} />
            </LinearGradient>
          </Defs>
          {console.log(a)}
          {chartData?.map((item, index) => {
            const YAxisHeight =
              YaxisLabelHeightOffset * (a || item?.value / maxYValue);
            const XAxisInterval = XaxisInterval * (index + 1);

            return (
              <G key={item?.value + index}>
                {selectedIndex === index ? (
                  <>
                    <View style={{top: y, left: x}}>
                      <View
                        style={{
                          top: '100%',
                          transform: [{rotate: '-40deg'}],
                          width: 10,
                          height: 1,
                          backgroundColor: '#C4CFDE',
                        }}
                      />
                      <View
                        style={{
                          height: 30,
                          width: 30,
                          backgroundColor: 'white',
                          borderColor: '#C4CFDE',
                          borderWidth: 1,
                          borderRadius: 15,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                        <RNText style={{color: '#45505F'}}>
                          {Math.round(item.value)}
                        </RNText>
                      </View>
                    </View>
                  </>
                ) : null}
                <Rect
                  onPressIn={() =>
                    onClickBar(
                      index,
                      XAxisInterval + 7,
                      YaxisLabelHeightOffset - YAxisHeight - 5,
                    )
                  }
                  x={XAxisInterval}
                  // y={YaxisLabelHeightOffset - YAxisHeight}
                  y={
                    YaxisLabelHeightOffset - a ||
                    YaxisLabelHeightOffset - YAxisHeight
                  }
                  width="10"
                  height={YAxisHeight}
                  fill={
                    index % 2 === 0
                      ? 'url(#odd-gradient)'
                      : 'url(#even-gradient)'
                  }
                  rx={5}
                  ry={5}
                  clipPath="url(#cuts)"
                />
                {item?.label ? (
                  <Text
                    textAnchor="middle"
                    x={XAxisInterval + 5}
                    y={YaxisLabelHeightOffset + 20}
                    fill={'green'}
                    fontFamily="wantedSans-Regular"
                    fontSize={14}>
                    {item?.label}
                  </Text>
                ) : null}
              </G>
            );
          })}
        </G>
      </Svg>
      <Button title="click" onPress={() => b(r => (r -= -10))} />
    </View>
  );
};

export default Chart;
