import React from 'react';
import { View } from 'react-native';
import { ClipPath, Defs, Line, Rect, Svg, Text } from 'react-native-svg';

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
		percentage: 44,
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

const height = 200
const YaxisLabelHeightOffset = height - 20

const ROWS_LINE_COUNT = 5

const Chart = () => {

	const maxYValue = roundUp(data.reduce((a, b) => b.percentage > a.percentage ? b : a)?.percentage)



	return (
		<View style={{ backgroundColor: '#ababab', flex: 1, marginTop: 100, padding: 16 }}>
			<View style={{ backgroundColor: '#fff', }}>
				<Svg height={height} width='100%'>

					{/* row */}

					{Array.from({ length: ROWS_LINE_COUNT + 1 }).map((_, index) => {
						const YAxislabel = maxYValue / ROWS_LINE_COUNT * (index)
						const YAxis = (YaxisLabelHeightOffset / (ROWS_LINE_COUNT + 1)) * ((ROWS_LINE_COUNT + 1) - index)

						return <React.Fragment key={index}>
							{YAxis ? <Text x={5} y={YAxis - 3} fill="#000" fontSize={15}>
								{YAxis}
							</Text> : null}
							<Line x1={20} y1={YAxis} y2={YAxis} x2='100%' stroke="#000" />
						</React.Fragment>
					})}





					{/* column */}
					<Defs>
						<ClipPath id="cuts">
							<Rect x="0" y="0" width="100%" height={YaxisLabelHeightOffset} />
						</ClipPath>
					</Defs>

					{/* <Text x={40} y={195} fill="#000" fontSize={15}>
						900
					</Text> */}

					{data.map((item, index) => {

						const stroke = YaxisLabelHeightOffset - YaxisLabelHeightOffset * (item?.percentage / 100) + (YaxisLabelHeightOffset / (ROWS_LINE_COUNT+1));
						console.log(stroke,  )
						return <>
							{/* <Rect key={index} x={(index + 1) * 40} y={stroke} width="10" height={YaxisLabelHeightOffset-20} fill="black" rx={5} ry={5} clipPath='url(#cut)' /> */}
							<Line
								y2={stroke}
								key={index}
								x1={(index + 1) * 40} x2={(index + 1) * 40}
								y1={YaxisLabelHeightOffset}
								strokeWidth={10}
								clipPath='url(#cuts)'
								strokeLinecap='round'
								stroke='red' />
						</>
					})}
				</Svg>
			</View>
		</View>
	);
};

export default Chart;
