import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create({
	// --- Layout and View Styles ---
	appContainerVertical: {
		flex: 1,
		backgroundColor: Colors.mainBackground,
		padding: Spacing.large,
	},
	appContainerHorizontal: {
		flex: 1,
		backgroundColor: Colors.mainBackground,
	},
	centeredContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.mainBackground,
		padding: Spacing.large,
	},

	// --- Text Styles and Typography ---
	title: {
		fontSize: 28,
		fontWeight: '700',
		marginBottom: Spacing.large,
		marginTop: Spacing.large,
		textAlign: 'center',
		letterSpacing: 1.5,
		color: Colors.textPrimary,
	},
	subtitle: {
		fontSize: 20,
		fontWeight: '700',
		marginBottom: Spacing.large,
		marginTop: Spacing.large,
		textAlign: 'center',
		letterSpacing: 1.5,
		color: Colors.textPrimary,
	},
	text: {
		fontSize: 16,
		color: Colors.textPrimary,
		lineHeight: 22,
	},

	// --- Generic Styles for Buttons ---
	primaryButton: {
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: Spacing.borderRadius,
		padding: Spacing.medium,
		marginTop: Spacing.medium,
	},
	primaryButtonText: {
		color: Colors.buttonText,
		fontSize: 22,
		fontWeight: 'bold',
	},

	// --- Generic Input Styles ---
	textInput: {
		width: '100%',
		borderColor: Colors.border,
		borderWidth: 1,
		borderRadius: Spacing.borderRadius,
		paddingHorizontal: Spacing.medium,
		marginBottom: Spacing.medium,
		color: Colors.textPrimary,
		height: 50,
		backgroundColor: Colors.mainBackground,
	},

	// --- Image Styles ---
	image: {
		width: 250,
		height: 200,
		resizeMode: 'contain',
	},

	// Loading indicator styles
	loadingContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.mainBackground,
	},
	loadingText: {
		fontSize: 24,
		marginTop: Spacing.medium,
		color: Colors.textSecondary,
		padding: 10,
	},
});
