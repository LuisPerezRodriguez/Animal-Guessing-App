import { Colors } from '@/constants/Colors';
import React from 'react';
import { Pressable, StyleSheet, Text, ViewStyle } from 'react-native';

interface GameButtonProps {
	label: string;
	onPress: () => void;
	containerStyle?: ViewStyle;
}

const GameButton = ({ label, onPress, containerStyle }: GameButtonProps) => {
	return (
		<Pressable onPress={onPress} style={[styles.button, containerStyle]}>
			<Text style={styles.buttonText}>{label}</Text>
		</Pressable>
	);
};

const styles = StyleSheet.create({
	button: {
		width: '80%',
		marginBottom: 10,
		paddingVertical: 15,
		borderRadius: 25,
		backgroundColor: Colors.primary,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 5,
		alignItems: 'center',
	},
	buttonText: {
		color: '#ffffff',
		fontSize: 16,
		fontWeight: 'bold',
		textAlign: 'center',
	},
});

export default GameButton;
