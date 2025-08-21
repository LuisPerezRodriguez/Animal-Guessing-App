import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import { ActivityIndicator, Dimensions, View } from 'react-native';

interface OrientationContextType {
	isPortrait: boolean;
}

export const OrientationContext = createContext<OrientationContextType | null>(
	null
);

export const useOrientationContext = (): OrientationContextType => {
	const context = useContext(OrientationContext);
	if (!context) {
		throw new Error(
			"Orientation context can't be accessed outside the provider."
		);
	}
	return context;
};

const determineOrientation = (): boolean => {
	const { height, width } = Dimensions.get('window');
	return height > width;
};

export const OrientationProvider = ({ children }: PropsWithChildren) => {
	const [isPortrait, setIsPortrait] = useState<boolean | null>(null);

	useEffect(() => {
		const updateOrientation = () => {
			setIsPortrait(determineOrientation());
		};

		// Determine initial orientation
		updateOrientation();

		const subscription = Dimensions.addEventListener(
			'change',
			updateOrientation
		);

		return () => {
			subscription?.remove();
		};
	}, []);

	// Show loading while orientation is not determined
	if (isPortrait === null) {
		return (
			<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
				<ActivityIndicator size='large' />
			</View>
		);
	}

	return (
		<OrientationContext.Provider value={{ isPortrait }}>
			{children}
		</OrientationContext.Provider>
	);
};
