import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useOrientationContext } from '@/context/OrientationContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface CustomHeaderProps {
	headerText?: string;
	icon?: string;
}

const CustomHeader = ({ headerText, icon }: CustomHeaderProps) => {
	const { isPortrait } = useOrientationContext();
	return (
		<View
			style={
				isPortrait
					? localStyles.headerContainerVertical
					: localStyles.headerContainerHorizontal
			}
		>
			{icon !== '' && (
				<FontAwesome name={icon as any} style={localStyles.headerIcon} />
			)}
			<Text style={localStyles.headerText}>{headerText}</Text>
			{icon !== '' && (
				<FontAwesome name={icon as any} style={localStyles.headerIcon} />
			)}
		</View>
	);
};
const localStyles = StyleSheet.create({
	headerContainerVertical: {
		width: '100%',
		height: 100,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomLeftRadius: Spacing.borderRadius,
		borderBottomRightRadius: Spacing.borderRadius,
		shadowColor: Colors.shadow,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	headerContainerHorizontal: {
		width: '100%',
		height: 60,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		flexDirection: 'row',
		borderBottomLeftRadius: Spacing.borderRadius,
		borderBottomRightRadius: Spacing.borderRadius,
		shadowColor: Colors.shadow,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	headerText: {
		color: Colors.headerText,
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center',
		flex: 1,
	},
	headerIcon: {
		marginHorizontal: Spacing.small,
		fontSize: 24,
		color: Colors.headerText,
	},
});

export default CustomHeader;
