import React, { useMemo, useState } from 'react';
import { View, Text as RNText, Touchable } from 'react-native';
import { ClipPath, Defs, G, Line, Rect, Svg, Text } from 'react-native-svg';

const data = [
	{
		percentage: 10,
	},
	{
		percentage: 70,
	},
	{
		percentage: 65.89,
	},
	{
		percentage: 45,
	},
	{
		percentage: 33.66,
	},
	{
		percentage: 100,
	},

];


function roundUp(num) {
	if (num < 50) {
		return Math.ceil(num / 5) * 5;
	} else {
		return Math.ceil(num / 10) * 10;
	}
}

const height = 380
const XLabelHeightOffset = 60
const YaxisLabelHeightOffset = height - XLabelHeightOffset

const ROWS_LINE_COUNT = 5

const maxYValue = roundUp(data.reduce((a, b) => b.percentage > a.percentage ? b : a)?.percentage)

const yAxisInterval = maxYValue / (ROWS_LINE_COUNT - 1);

const Chart = () => {
	const [containerWidth, setContainerWidth] = useState(0)
	const [pos, setPos] = useState({ x: 0, y: 0 })
	const [indexs, setindex] = useState(0)

	const XaxisInterval = useMemo(() => containerWidth / (data.length + 1), [containerWidth, data.length])

	return (
		<View style={{ backgroundColor: '#fff', }}>
			<Svg onLayout={(e) => setContainerWidth(e.nativeEvent.layout.width)} height={height} width='100%'>

				<G transform={`translate(0, 30)`}>
					{/* row */}

					{Array.from({ length: ROWS_LINE_COUNT }).map((_, index) => {
						const YAxislabel = yAxisInterval * index
						const YAxis = YaxisLabelHeightOffset - (index * yAxisInterval / maxYValue) * YaxisLabelHeightOffset;

						return <React.Fragment key={index}>
							{YAxislabel ? <Text x={3} y={YAxis - 5} fill="#000" fontSize={15}>
								{YAxislabel}
							</Text> : null}
							<Line x1={20} y1={YAxis} y2={YAxis} x2='100%' stroke="#000" />
						</React.Fragment>
					})}

					<Defs>
						<ClipPath id="cuts">
							<Rect x="0" y="0" width="100%" height={YaxisLabelHeightOffset} />
						</ClipPath>
					</Defs>




					{/* column */}

					{data.map((item, index) => {
						console.log(index)
						const YAxisHeight = YaxisLabelHeightOffset * (item?.percentage / maxYValue);
						const XAxisInterval = XaxisInterval * (index + 1)

						return <View key={item?.percentage + index}>
							{indexs === index + 1 && <>
								<View style={{ position: 'relative', top: pos.y, left: pos.x }}>
									<View style={{ top: '100%', transform: [{ rotate: '-40deg' }], width: 10, height: 1, backgroundColor: '#C4CFDE' }} />
									<View style={{ height: 30, width: 30, backgroundColor: 'white', borderColor: '#C4CFDE', borderWidth: 1, borderRadius: 15, justifyContent: 'center', alignItems: 'center', }}>
										<RNText style={{ color: '#45505F' }}>{Math.round(item.percentage)}</RNText>
									</View>
								</View>
							</>
							}
							<Rect
								onPress={() => {
									setPos({ x: XAxisInterval + 7, y: YaxisLabelHeightOffset - YAxisHeight - 5 })
									setindex(index + 1)
								}}
								x={XAxisInterval}
								y={YaxisLabelHeightOffset - YAxisHeight}
								width="10"
								height={YAxisHeight + XLabelHeightOffset}
								fill="green"
								rx={5}
								ry={5}
								clipPath='url(#cuts)'
							/>
							{item?.percentage ? <Text textAnchor='middle' x={XAxisInterval + 5} y={YaxisLabelHeightOffset + 20} fill="#000" fontSize={15}>
								{item?.percentage}
							</Text> : null}
						</View>
					})}
				</G>
			</Svg>
		</View >
	);
};

export default Chart;
