import GameScreen from '@/components/gameScreen';
import GameStart from '@/components/gameStart';
import { useAnimalsInfoContext } from '@/context/AnimalsInfoContext';
import { useGameInfoContext } from '@/context/GameInfoContext';
import gameStyles from '@/styles/gameStyles';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

const GameContainer = () => {
	const { difficulty, resetGame } =
		useGameInfoContext();
	const { allAnimals } = useAnimalsInfoContext();

	if (!allAnimals || allAnimals.length === 0) {
		return (
			<Pressable style={gameStyles.errorContainer} onPress={resetGame}>
				<Text style={gameStyles.errorMessageText}>
					Error loading game information. Please try restarting.
				</Text>
				<Text style={gameStyles.restartButtonText}>Restart Game</Text>
			</Pressable>
		);
	}

	if (allAnimals && allAnimals.length < 10) {
		return (
			<View style={gameStyles.errorContainer}>
				<Text style={gameStyles.errorMessageText}>
					Not enough animals to start the game. At least ten animals are needed.
				</Text>
				<Text style={gameStyles.errorMessageSubText}>
					Current total animals: {allAnimals.length.toString()}
				</Text>
			</View>
		);
	}

	switch (difficulty) {
		case 0:
			return <GameStart />;
		case 1:
		case 2:
			return <GameScreen />;
		default:
			return null;
	}
};

export default GameContainer;
