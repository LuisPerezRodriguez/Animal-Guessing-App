import { validateCredentials } from '@/core/actions';
import { IApiAuthResponse } from '@/interfaces/IApiAuthResponse.interface';
import { AuthContextType, User } from '@/interfaces/IContext.interface';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Alert } from 'react-native';

export const AuthContext = createContext<AuthContextType | null>(null);

// Personalized hook to use Context.
export const useAuthContext = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error(
			"Authorization context can't be accessed outside the provider."
		);
	}
	return context;
};

// Context provider component.
export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<User | null>(null);
	const [isUserLoading, setIsUserLoading] = useState<boolean>(true);

	// If there is user data in AsyncStorage, load it when the app starts
	useEffect(() => {
		const loadUser = async () => {
			try {
				setIsUserLoading(true);
				const userData = await AsyncStorage.getItem('userData');
				if (userData) {
					const parsedUser: IApiAuthResponse = JSON.parse(userData);
					setUser({
						id: parsedUser.userId,
						username: parsedUser.userName,
						maxScore: parsedUser.maxScore,
					});
				}
			} catch (error) {
				Alert.alert(
					'Error loading user data',
					'There was an error loading your user data. Please login to continue.'
				);
			} finally {
				setIsUserLoading(false);
			}
		};

		loadUser();
	}, []);

	// Login logic with error handling and state management.
	const login = async (username: string, password: string): Promise<void> => {
		setIsUserLoading(true);
		try {
			const data = await validateCredentials(username, password);
			if (data) {
				// Save user data to AsyncStorage
				await AsyncStorage.setItem('userData', JSON.stringify(data));

				setUser({
					id: data.userId,
					username: data.userName,
					maxScore: data.maxScore,
				});
			}
		} catch (error) {
			throw error;
		} finally {
			setIsUserLoading(false);
		}
	};

	// Logout logic to clear user data from state and AsyncStorage.
	const logout = async (): Promise<void> => {
		try {
			await AsyncStorage.removeItem('userData');
			setUser(null);
		} catch (error: any) {
			throw error;
		}
	};

	return (
		<AuthContext.Provider value={{ user, isUserLoading, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
