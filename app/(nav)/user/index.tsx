import { Colors } from '@/constants/Colors';
import { useAuthContext } from '@/context/AuthContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { globalStyles } from '@/styles/globalStyles';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const UserIndex = () => {
	const { user, logout } = useAuthContext();
	const { isPortrait } = useOrientationContext();
	const router = useRouter();

	const handleLogout = async () => {
		await logout();
		router.replace('/login');
	};

	return (
		<View
			style={
				isPortrait
					? globalStyles.appContainerVertical
					: globalStyles.appContainerHorizontal
			}
		>
			<View style={localStyles.welcomeContainer}>
				{user && user.username ? (
					<Text style={localStyles.welcomeUsernameText}>
						Hello {user.username}!
					</Text>
				) : (
					<Text style={localStyles.welcomeUsernameText}>Welcome, Guest!</Text>
				)}
				<Text style={localStyles.taglineText}>
					Are you done exploring the amazing world of animals? 🐾
				</Text>
			</View>
			<Pressable style={localStyles.logoutButton} onPress={handleLogout}>
				<Text style={localStyles.logoutButtonText}>Logout</Text>
			</Pressable>
		</View>
	);
};

const localStyles = StyleSheet.create({
	welcomeContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
		paddingHorizontal: 20,
	},
	welcomeUsernameText: {
		fontSize: 32,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 15,
		textAlign: 'center',
		textShadowColor: 'rgba(0, 0, 0, 0.1)',
		textShadowOffset: { width: 1, height: 1 },
		textShadowRadius: 2,
	},
	taglineText: {
		fontSize: 18,
		color: '#555',
		textAlign: 'center',
		lineHeight: 24,
	},
	logoutButton: {
		backgroundColor: Colors.error,
		paddingVertical: 15,
		paddingHorizontal: 30,
		borderRadius: 25,
		alignSelf: 'center',
		marginBottom: 40,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.2,
		shadowRadius: 5,
		elevation: 8,
	},
	logoutButtonText: {
		color: '#FFFFFF',
		fontSize: 20,
		fontWeight: 'bold',
		letterSpacing: 0.8,
	},
});

export default UserIndex;
