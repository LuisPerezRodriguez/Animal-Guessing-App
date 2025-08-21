import CustomHeader from '@/components/header';
import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useAuthContext } from '@/context/AuthContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { globalStyles } from '@/styles/globalStyles';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
	ActivityIndicator,
	Alert,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

const LoginScreen = () => {
	const { isPortrait } = useOrientationContext();

	const [usernameOrEmail, setUsernameOrEmail] = useState('');
	const [password, setPassword] = useState('');
	const [secureTextEntry, setSecureTextEntry] = useState(true);
	const { login, isUserLoading } = useAuthContext();
	const router = useRouter();

	const handleLogin = async () => {
		if (usernameOrEmail.trim() === '') {
			Alert.alert('Login failed', 'Username or email cannot be empty.');
			return;
		} else if (password.trim() === '') {
			Alert.alert('Login failed', 'Password cannot be empty.');
			return;
		}
		try {
			await login(usernameOrEmail, password);
			router.replace('/animals');
		} catch (error: any) {
			Alert.alert(
				'Login failed',
				error.message || 'An unexpected error occurred.',
				[{ text: 'OK', style: 'cancel' }]
			);
		}
	};

	const toggleSecureTextEntry = () => {
		setSecureTextEntry((prev) => !prev);
	};

	return (
		<View
			style={
				isPortrait
					? globalStyles.appContainerVertical
					: globalStyles.appContainerHorizontal
			}
		>
			<CustomHeader headerText='Animal Guessing Game' icon='paw'></CustomHeader>

			<View
				style={[
					localStyles.loginFormContainer,
					!isPortrait && localStyles.landscapeLoginFormContainer,
				]}
			>
				{isPortrait && (
					<View>
						<Text style={localStyles.loginTitle}>Welcome Back! 🐾</Text>
						<Text style={localStyles.loginSubtitle}>
							Login to continue your adventure.
						</Text>
					</View>
				)}

				<View style={localStyles.inputGroup}>
					<FontAwesome name={'user'} size={20} style={localStyles.inputIcon} />
					<TextInput
						style={localStyles.inputField}
						placeholder='Username or Email'
						placeholderTextColor={Colors.textSecondary}
						value={usernameOrEmail}
						onChangeText={setUsernameOrEmail}
						autoCapitalize='none'
						editable={!isUserLoading}
					/>
				</View>

				<View style={localStyles.inputGroup}>
					<FontAwesome name={'lock'} size={20} style={localStyles.inputIcon} />
					<TextInput
						style={localStyles.inputField}
						placeholder='Password'
						placeholderTextColor={Colors.textSecondary}
						value={password}
						onChangeText={setPassword}
						secureTextEntry={secureTextEntry}
						autoCapitalize='none'
						editable={!isUserLoading}
					/>
					<Pressable
						onPress={toggleSecureTextEntry}
						style={localStyles.eyeIconContainer}
					>
						<FontAwesome
							name={secureTextEntry ? 'eye' : 'eye-slash'}
							style={localStyles.eyeIcon}
							size={20}
						></FontAwesome>
					</Pressable>
				</View>

				<Pressable
					style={[
						globalStyles.primaryButton,
						localStyles.loginButton,
						isUserLoading && { opacity: 0.7 },
					]}
					onPress={handleLogin}
					disabled={isUserLoading}
				>
					{isUserLoading ? (
						<ActivityIndicator color={Colors.buttonText} />
					) : (
						<Text style={globalStyles.primaryButtonText}>Login</Text>
					)}
				</Pressable>
			</View>
		</View>
	);
};

// Local Styles for LoginScreen
const localStyles = StyleSheet.create({
	loginFormContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: Spacing.large,
		backgroundColor: Colors.mainBackground,
		width: '100%',
	},
	landscapeLoginFormContainer: {
		width: '60%',
		alignSelf: 'center',
		paddingHorizontal: Spacing.small,
	},
	loginTitle: {
		...globalStyles.title,
		color: Colors.primary,
		marginBottom: Spacing.small,
		fontSize: 34,
	},
	loginSubtitle: {
		fontSize: 18,
		color: Colors.textSecondary,
		textAlign: 'center',
		marginBottom: Spacing.xlarge,
	},
	inputGroup: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		borderColor: Colors.border,
		borderWidth: 1,
		borderRadius: Spacing.borderRadius,
		marginBottom: Spacing.medium,
		height: 50,
		backgroundColor: Colors.mainBackground,
	},
	inputIcon: {
		paddingHorizontal: Spacing.medium,
		color: Colors.textSecondary,
	},
	inputField: {
		flex: 1,
		paddingVertical: Spacing.small,
		fontSize: 16,
		color: Colors.textPrimary,
	},
	eyeIconContainer: {
		paddingHorizontal: Spacing.medium,
		height: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		borderLeftWidth: 1,
		borderColor: Colors.border,
	},
	eyeIcon: {
		color: Colors.textSecondary,
	},
	loginButton: {
		marginTop: Spacing.large,
		paddingVertical: Spacing.medium + 5,
		borderRadius: Spacing.buttonRadius,
		shadowColor: Colors.shadow,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.3,
		shadowRadius: 5,
		elevation: 8,
	},
	signUpLink: {
		marginTop: Spacing.large,
		padding: Spacing.small,
	},
	signUpText: {
		fontSize: 16,
		color: Colors.textSecondary,
	},
	signUpHighlight: {
		color: Colors.primary,
		fontWeight: 'bold',
	},
});

export default LoginScreen;
