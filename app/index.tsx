import { Colors } from '@/constants/Colors';
import { useAuthContext } from '@/context/AuthContext';
import { globalStyles } from '@/styles/globalStyles';
import { Redirect } from 'expo-router';
import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';

const Index = () => {
	const { user, isUserLoading } = useAuthContext();

	if (isUserLoading) {
		return (
			<View style={globalStyles.loadingContainer}>
				<ActivityIndicator size='large' color={Colors.primary} />
				<Text style={globalStyles.loadingText}>Loading user data...</Text>
			</View>
		);
	}

	if (!user) {
		return <Redirect href='/(auth)/login' />;
	}

	return <Redirect href='/animals' />;
};

export default Index;
