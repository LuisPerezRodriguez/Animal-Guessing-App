import { useOrientationContext } from '@/context/OrientationContext';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Drawer from 'expo-router/drawer';
import React from 'react';

const DrawerNavigator = () => {
	const { isPortrait } = useOrientationContext();

	return (
		<Drawer
			screenOptions={{
				headerShown: true,
				drawerActiveTintColor: '#303F9F',
				drawerInactiveTintColor: '#757575',
				headerStyle: {
					backgroundColor: '#007bff',
					height: isPortrait ? 80 : 70,
				},
				headerTintColor: '#fff',
				headerTitleStyle: {
					fontWeight: 'bold',
					fontSize: 24,
					marginTop: 0,
				},
				headerTitleAlign: 'center',
				drawerPosition: 'right',
			}}
		>
			<Drawer.Screen
				name='animals'
				options={{
					drawerLabel: 'Animals',
					title: 'List of Animals',
					drawerIcon: ({ color, size }) => (
						<FontAwesome name='paw' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='game/index'
				options={{
					drawerLabel: 'Game',
					title: 'Game',
					drawerIcon: ({ color, size }) => (
						<FontAwesome name='user' size={size} color={color} />
					),
				}}
			/>
			<Drawer.Screen
				name='user/index'
				options={{
					drawerLabel: 'User',
					title: 'User information',
					drawerIcon: ({ color, size }) => (
						<FontAwesome name='user' size={size} color={color} />
					),
				}}
			/>
		</Drawer>
	);
};

export default DrawerNavigator;
