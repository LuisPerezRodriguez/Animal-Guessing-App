import { IApiAnimalsResponse } from '@/interfaces/IApiAnimalsResponse.interface';
import { IApiAuthResponse } from '@/interfaces/IApiAuthResponse.interface';
import { Animal } from '@/interfaces/IContext.interface';
import axios, { AxiosError } from 'axios';

// Environment variables for API configuration
const PROTOCOL = process.env.EXPO_PUBLIC_PROTOCOL;
const IP = process.env.EXPO_PUBLIC_IP;
const PORT = process.env.EXPO_PUBLIC_PORT;

// Construct the API URL using the environment variables
const API_URL = `${PROTOCOL}://${IP}:${PORT}`;

export const validateCredentials = async (
	inputUsernameOrEmail: string,
	inputPassword: string
): Promise<IApiAuthResponse> => {
	// Trim the input to remove any leading or trailing whitespace
	if (!inputUsernameOrEmail || !inputPassword) {
		throw new Error('Username or password cannot be empty');
	}
	const enteredUser = inputUsernameOrEmail.trim();
	const enteredPassword = inputPassword.trim();

	try {
		// I use axios.post to send a POST request to the API endpoint for login
		// The endpoint is constructed using the API_URL from the environment variables
		// The request body contains the username or email and password entered by the user
		const { data } = await axios.post<IApiAuthResponse>(
			`${API_URL}/api/Auth/login`,
			{
				userNameOrEmail: enteredUser,
				password: enteredPassword,
			},
			{
				// Axios has a built in timeout feature that allows you to specify a timeout for the request
				// If the request takes longer than the specified timeout, it will throw an error
				timeout: 8000,
			}
		);
		return data;
	} catch (error) {
		// Catch any errors that occur during the request using axios error handling
		const axiosError = error as AxiosError;

		if (axiosError.response?.status === 500) {
			// Provide user-friendly feedback based on status
			throw new Error('Internal server error. Please try again later.');
		} else if (axiosError.request.status === 401) {
			// The request was made but the server responded with a 401 status code
			// This indicates that the credentials provided were invalid
			throw new Error('Invalid credentials. Please try again.');
		} else {
			// For any other errors, throw a generic error message
			throw new Error('An unexpected error occurred. Please try again later.');
		}
	}
};
export const animalsApiPetition = async (): Promise<IApiAnimalsResponse[]> => {
	try {
		const { data } = await axios.get<Animal[]>(`${API_URL}/api/Animals`, {});
		data.map((animal) => {
			// Ensure that each animal has a valid image URL
			if (animal.partialImageURL.includes('localhost')) {
				animal.partialImageURL = animal.partialImageURL.replace(
					'localhost',
					`${IP}`
				);
			}
			// Ensure that each animal has a valid image URL
			if (animal.completeImageURL.includes('localhost')) {
				animal.completeImageURL = animal.completeImageURL.replace(
					'localhost',
					`${IP}`
				);
			}
		});
		return data;
	} catch (error) {
		const axiosError = error as AxiosError;

		if (axiosError.response?.status === 500) {
			// Provide user-friendly feedback based on status
			throw new Error('Internal server error. Please try again later.');
		} else {
			// For any other errors, throw a generic error message
			throw new Error('An unexpected error occurred. Please try again later.');
		}
	}
};
