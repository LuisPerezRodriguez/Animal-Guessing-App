import { useGameInfoContext } from '@/context/GameInfoContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { globalStyles } from '@/styles/globalStyles';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import GameButton from './gameButton';

const GameStart = () => {
	const { setDifficulty, startGame } = useGameInfoContext();
	const { isPortrait } = useOrientationContext();

	const handleStart = (difficulty: number) => {
		setDifficulty(difficulty);
		startGame();
	};

	const styles = StyleSheet.create({
		buttonContainer: {
			width: isPortrait ? '100%' : '50%',
			alignItems: 'center',
		},
	});

	return (
		<View
			style={
				isPortrait
					? globalStyles.appContainerVertical
					: globalStyles.appContainerHorizontal
			}
		>
			<View style={globalStyles.centeredContainer}>
				<Text style={globalStyles.title}>
					Welcome to the animal guessing game
				</Text>
				<Text style={globalStyles.subtitle}>
					Please select your desired difficulty
				</Text>

				<View style={styles.buttonContainer}>
					<GameButton label='Easy mode' onPress={() => handleStart(1)} />
					<GameButton label='Hard mode' onPress={() => handleStart(2)} />
				</View>
			</View>
		</View>
	);
};

export default GameStart;
