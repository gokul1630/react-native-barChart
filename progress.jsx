import React, { useEffect, useRef } from 'react';
import { Animated, StyleSheet, View } from 'react-native';
import { Circle, Defs, LinearGradient, Stop, Svg } from 'react-native-svg';

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const CircularProgress = ({
	percentage = 10,
	circleSize = 100,
	strokeWidth = 10,
	strokeOffsets = [
		{ offset: '10%', color: 'red' },
		{ offset: '100%', color: 'green' },
	],
	children,
}) => {
	const circleRadius = (circleSize - strokeWidth) / 2;
	const circumference = 2 * Math.PI * circleRadius;
	const strokeOffset = circumference - (percentage / 100) * circumference;
	const circlePercentage = useRef(new Animated.Value(0)).current;
	console.log(strokeOffset)

	useEffect(() => {
		Animated.timing(circlePercentage, {
			toValue: percentage,
			delay: 500,
			duration: 2000,
			useNativeDriver: true,
		}).start();
	}, [circumference, strokeOffset, circlePercentage, percentage]);

	return (
		<View style={[styles.container, { height: circleSize, width: circleSize }]}>
			<Svg
				height={circleSize}
				width={circleSize}
				transform={[{ rotate: '-90deg' }]}>
				<Defs>
					<LinearGradient id="gradient" x1="0" y1="0" x2="1" y2="1">
						{strokeOffsets?.map(stroke => (
							<Stop
								key={stroke?.color}
								offset={stroke?.offset}
								stopColor={stroke?.color}
								stopOpacity={stroke?.opacity || 1}
							/>
						))}
					</LinearGradient>
				</Defs>

				<Circle
					fill="none"
					opacity={0.2}
					r={circleRadius}
					cx={circleSize / 2}
					cy={circleSize / 2}
					strokeWidth={strokeWidth}
					stroke="url(#gradient)"
				/>

				<AnimatedCircle
					fill="none"
					cx={circleSize / 2}
					cy={circleSize / 2}
					r={circleRadius}
					strokeLinecap="round"
					stroke="url(#gradient)"
					strokeWidth={strokeWidth}
					strokeDasharray={[circumference]}
					strokeDashoffset={circlePercentage.interpolate({
						inputRange: [0, 100],
						outputRange: [circumference, 0],
						extrapolate: 'clamp'
					})}
				/>
			</Svg>

			<View style={[styles.contentContainer, { width: circleSize }]}>
				{children}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		justifyContent: 'center',
	},
	contentContainer: {
		position: 'absolute',
		alignSelf: 'center',
	},
});

export default CircularProgress;
