import { animalsApiPetition } from '@/core/actions';
import { Animal, AnimalsContextType } from '@/interfaces/IContext.interface';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Alert } from 'react-native';

export const AnimalsInfoContext = createContext<AnimalsContextType | null>(
	null
);

// Personalized hook to use Context.
export const useAnimalsInfoContext = (): AnimalsContextType => {
	const context = useContext(AnimalsInfoContext);
	if (!context) {
		throw new Error(
			"Animals info context can't be accessed outside the provider."
		);
	}
	return context;
};

// Context provider component.
export const AnimaslInfoProvider = ({ children }: PropsWithChildren) => {
	const [allAnimals, setAllAnimals] = useState<Animal[] | null>(null);
	const [areAnimalsLoading, setAreAnimalsLoading] = useState<boolean>(true);

	// Make the API call to fetch animals when the component mounts
	// and store the data in the state.
	// If there is an error, show an alert to the user.
	// If the data is successfully fetched, store it in the state.
	useEffect(() => {
		const loadAnimals = async () => {
			try {
				setAreAnimalsLoading(true);
				const response = await animalsApiPetition();
				if (response) {
					setAllAnimals(response);
				}
			} catch (error) {
				Alert.alert(
					'Error loading animals data',
					'There was an error loading your animals data. Please reload to continue.'
				);
			} finally {
				setAreAnimalsLoading(false);
			}
		};

		loadAnimals();
	}, []);

	// Reload logic with error handling and state management.
	// This function can be called to refresh the animals data.
	const reloadAnimals = async (): Promise<void> => {
		setAreAnimalsLoading(true);
		try {
			const data = await animalsApiPetition();
			if (data) {
				setAllAnimals(data);
			}
		} catch (error) {
			Alert.alert(
				error instanceof Error ? error.message : 'Error loading animals data',
				'There was an error loading your animals data. Please reload to continue.'
			);
			throw error;
		} finally {
			setAreAnimalsLoading(false);
		}
	};

	const shuffleAnimals = (array: Animal[]) => {
		let currentIndex = array.length,
			randomIndex;

		// While there remain elements to shuffle.
		while (currentIndex !== 0) {
			// Pick a remaining element.
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;

			// And swap it with the current element.
			[array[currentIndex], array[randomIndex]] = [
				array[randomIndex],
				array[currentIndex],
			];
		}

		return array;
	};

	return (
		<AnimalsInfoContext.Provider
			value={{ areAnimalsLoading, reloadAnimals, allAnimals, shuffleAnimals }}
		>
			{children}
		</AnimalsInfoContext.Provider>
	);
};
