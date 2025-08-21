import { Stack } from 'expo-router';
import React from 'react';

const AnimalsStackLayout = () => {
	return (
		<Stack
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='index' options={{ title: 'Animals' }}></Stack.Screen>
		</Stack>
	);
};

export default AnimalsStackLayout;
