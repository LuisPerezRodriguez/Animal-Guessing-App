import { AnimaslInfoProvider } from '@/context/AnimalsInfoContext';
import { AuthProvider } from '@/context/AuthContext';
import { GameInfoProvider } from '@/context/GameInfoContext';
import { OrientationProvider } from '@/context/OrientationContext';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

const RootLayout = () => {
	return (
		<OrientationProvider>
			<AuthProvider>
				<AnimaslInfoProvider>
					<GameInfoProvider>
						<GestureHandlerRootView style={{ flex: 1 }}>
							<SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
								<StatusBar translucent style='light' />
								<Slot />
							</SafeAreaView>
						</GestureHandlerRootView>
					</GameInfoProvider>
				</AnimaslInfoProvider>
			</AuthProvider>
		</OrientationProvider>
	);
};

export default RootLayout;
