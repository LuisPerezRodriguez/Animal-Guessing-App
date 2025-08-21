import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useGameInfoContext } from '@/context/GameInfoContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { globalStyles } from '@/styles/globalStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome6';
import React from 'react';
import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';

const ActionButtons = () => {
	const { setIsHintModalVisible, toggleDifficulty, difficulty } =
		useGameInfoContext();

	const { isPortrait } = useOrientationContext();

	const { resetGame } = useGameInfoContext();

	const localStyles = StyleSheet.create({
		actionButtonContainer: {
			flexDirection: isPortrait ? 'column' : 'row',
			alignItems: 'center',
			width: '100%',
			padding: Spacing.medium,
			marginBottom: Spacing.large,
			justifyContent: isPortrait ? 'space-between' : 'center',
		},
		gameActionButton: {
			backgroundColor: Colors.primary,
			justifyContent: 'center',
			alignItems: 'center',
			borderRadius: Spacing.borderRadius,
			padding: isPortrait ? Spacing.medium : Spacing.small,
			marginTop: Spacing.medium,
			margin: isPortrait ? 8 : 5,
		},
		gameActionButtonText: {
			color: Colors.buttonText,
			fontSize: 16,
			fontWeight: 'bold',
			textAlign: 'center',
		},
	});

	return (
		<View style={localStyles.actionButtonContainer}>
			<Pressable
				onPress={toggleDifficulty}
				style={localStyles.gameActionButton}
			>
				<Text style={globalStyles.primaryButtonText}>
					{`Switch to ${difficulty === 1 ? 'hard' : 'easy'} mode`}
				</Text>
			</Pressable>
			<View style={{ flexDirection: 'row' }}>
				<Pressable
					onPress={() => setIsHintModalVisible(true)}
					style={localStyles.gameActionButton}
				>
					<FontAwesome name='lightbulb' size={24} color={Colors.buttonText} />
				</Pressable>
				<Pressable
					onPress={() =>
						Alert.alert(
							'Reset Game',
							'Do you really want to reset the game?',
							[
								{ text: 'Cancel', style: 'cancel' },
								{ text: 'Yes', onPress: () => resetGame() },
							],
							{ cancelable: true }
						)
					}
					style={localStyles.gameActionButton}
				>
					<FontAwesome name='rotate' size={24} color={Colors.buttonText} />
				</Pressable>
			</View>
		</View>
	);
};

export default ActionButtons;
