import { useGameInfoContext } from '@/context/GameInfoContext';
import { useOrientationContext } from '@/context/OrientationContext';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import ModeComponent from './gameMode';
import HintModal from './hintmodal';
import ScoreBoard from './scoreboard';

const GameScreen = () => {
	const { isPortrait } = useOrientationContext();

	const styles = StyleSheet.create({
		gameScreenContainer: {
			flex: 1,
			backgroundColor: '#F0F2F5',
			paddingHorizontal: 20,
			paddingTop: 20,
		},
		scoreBoardWrapper: {
			flexDirection: 'row',
			justifyContent: 'space-around',
			alignItems: 'center',
			backgroundColor: '#F0F2F5',
			borderRadius: 10,
			marginVertical: isPortrait ? 5 : 0,
			padding: isPortrait ? 10 : 5,
			shadowColor: '#000',
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.1,
			shadowRadius: 3,
			elevation: 3,
			borderColor: '#939292ff',
			borderWidth: 1,
			width: isPortrait ? '100%' : '50%',
		},
	});
	const {
		score,
		totalQuestions,
		difficulty,
		currentAnimal,
		isHintModalVisible,
		setIsHintModalVisible,
	} = useGameInfoContext();

	return (
		<View style={styles.gameScreenContainer}>
			<View style={styles.scoreBoardWrapper}>
				<ScoreBoard
					score={score}
					totalQuestions={totalQuestions}
					difficulty={difficulty}
				/>
			</View>
			<ModeComponent />
			<HintModal
				visible={isHintModalVisible}
				onClose={() => setIsHintModalVisible(false)}
				hintText={`Hint: ${currentAnimal?.hint}`}
			/>
		</View>
	);
};

export default GameScreen;
