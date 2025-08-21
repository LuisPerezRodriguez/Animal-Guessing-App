import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type ScoreBoardProps = {
	score: number;
	totalQuestions: number;
	difficulty: number;
};

const ScoreBoard = ({ score, totalQuestions, difficulty }: ScoreBoardProps) => {
	const difficultyText = difficulty === 1 ? 'Easy' : 'Hard';

	// Only local styles for text specifics
	const localStyles = StyleSheet.create({
		scoreboard: {
			flexDirection: 'row',
			justifyContent: 'space-evenly',
		},
		scoreboardText: {
			padding: 10,
			fontSize: 20,
			color: Colors.textPrimary,
			lineHeight: 22,
		},
	});

	return (
		<View style={localStyles.scoreboard}>
			<Text style={localStyles.scoreboardText}>
				Difficulty: {difficultyText}
			</Text>
			<Text style={localStyles.scoreboardText}>
				Score: {score} / {totalQuestions}
			</Text>
		</View>
	);
};

export default ScoreBoard;
