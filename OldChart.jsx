import React from 'react';
import { View } from 'react-native';
import { ClipPath, Defs, G, Line, Rect, Svg, Text } from 'react-native-svg';

const data = [
	{
		percentage: 20,
	},
	{
		percentage: 70,
	},
	{
		percentage: 60,
	},
	{
		percentage: 90,
	},
	{
		percentage: 50,
	},
	{
		percentage: 20,
	},
];


function roundUp(num) {
	if (num < 50) {
		return Math.ceil(num / 5) * 5;
	} else {
		return Math.ceil(num / 10) * 10;
	}
}

const height = 200
const YaxisLabelHeightOffset = height - 20

const ROWS_LINE_COUNT = 6


const maxYValue = roundUp(data.reduce((a, b) => b.percentage > a.percentage ? b : a)?.percentage)

const yAxisInterval = maxYValue / (ROWS_LINE_COUNT - 1);

const OldChart = () => {

	return (
		<View style={{ backgroundColor: '#ababab', flex: 1, marginTop: 100, padding: 20 }}>
			<View style={{ backgroundColor: '#fff', }}>
				<Svg height={height} width='100%'>

					<G translate={10}>
						{/* row */}
						{Array.from({ length: ROWS_LINE_COUNT }).map((_, index) => {
							const YAxislabel = index * yAxisInterval

							const YAxis = (YaxisLabelHeightOffset / (ROWS_LINE_COUNT + 1)) * ((ROWS_LINE_COUNT + 1) - index)
							const y = YaxisLabelHeightOffset - (index * yAxisInterval / maxYValue) * YaxisLabelHeightOffset;

							return <React.Fragment key={index}>
								<Text x={5} y={y - 3}>{YAxislabel}</Text>
								<Line x1={20} x2={'100%'} y1={YAxis} y2={YAxis} stroke="#000" />
							</React.Fragment>
						})}





						{/* column */}
						<Defs>
							<ClipPath id="cuts">
								<Rect x="0" y="0" width="100%" height={YaxisLabelHeightOffset} />
							</ClipPath>
						</Defs>


						{data.map((item, index) => {

							const stroke = (item.percentage / maxYValue) * YaxisLabelHeightOffset;
							return <>
								<Text>{ }</Text>
								<Rect
									key={index}
									x={(index + 1) * 40}
									y={YaxisLabelHeightOffset - stroke}
									width="10"
									height={stroke}
									fill="black"
									rx={5}
									ry={5}
									clipPath='url(#cuts)' /></>
						})}
					</G>
				</Svg>
			</View>
		</View>
	);
};

export default OldChart;


