import { Colors } from '@/constants/Colors'; // Import Colors
import { Spacing } from '@/constants/Spacing'; // Import Spacing
import { useAnimalsInfoContext } from '@/context/AnimalsInfoContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { Animal } from '@/interfaces/IContext.interface';
import { globalStyles } from '@/styles/globalStyles';
import React, { useEffect, useState } from 'react';
import {
	ActivityIndicator,
	FlatList,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';

const Home = () => {
	const { isPortrait } = useOrientationContext();
	const { allAnimals, areAnimalsLoading, reloadAnimals } =
		useAnimalsInfoContext();

	const [localAnimalData, setLocalAnimalData] = useState<Animal[] | []>([]);

	const [searchParameter, setSearchParameter] = useState<string>('');

	useEffect(() => {
		if (searchParameter) {
			setLocalAnimalData(
				(allAnimals ?? []).filter((a) =>
					a.name.toLowerCase().includes(searchParameter.toLowerCase())
				)
			);
		} else {
			setLocalAnimalData(allAnimals ?? []);
		}
	}, [searchParameter, allAnimals]);

	// Local styles for Home component
	const localStyles = StyleSheet.create({
		// FlatList and Animal Card Styles
		flatListContentContainer: {
			paddingHorizontal: Spacing.medium,
			paddingBottom: Spacing.large,
		},
		animalCard: {
			backgroundColor: Colors.mainBackground,
			borderRadius: Spacing.borderRadius,
			margin: isPortrait ? Spacing.xlarge : Spacing.small,
			shadowColor: Colors.shadow,
			shadowOffset: {
				width: 0,
				height: 2,
			},
			shadowOpacity: 0.15,
			shadowRadius: 3.84,
			elevation: 5,
			flex: 1,
			// Conditional padding based on orientation
			padding: isPortrait ? Spacing.medium : Spacing.small,
			flexDirection: isPortrait ? 'column' : 'row',
		},
		animalImage: {
			width: isPortrait ? '100%' : 250,
			height: isPortrait ? 200 : 150,
			marginBottom: Spacing.small,
			borderRadius: Spacing.borderRadius,
			backgroundColor: Colors.border,
			resizeMode: 'cover',
		},
		animalName: {
			...globalStyles.subtitle,
			fontSize: isPortrait ? 20 : 18,
			fontWeight: 'bold',
			color: Colors.textPrimary,
			marginBottom: Spacing.xsmall,
			textAlign: 'center',
			marginTop: 0,
		},
		animalDescription: {
			...globalStyles.text,
			fontSize: isPortrait ? 16 : 14,
			color: Colors.textSecondary,
			textAlign: 'center',
			marginBottom: Spacing.small,
		},
		cardInformation: {
			flexDirection: 'column',
			width: isPortrait ? 'auto' : 400,
			marginLeft: isPortrait ? 'auto' : 50,
			textAlign: 'center',
			justifyContent: 'center',
		},

		// Reload button styles
		reloadButtonContainer: {
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: Colors.mainBackground,
		},
		reloadButton: {
			...globalStyles.primaryButton,
			width: 'auto',
			paddingHorizontal: Spacing.large,
			marginTop: Spacing.medium,
			borderRadius: Spacing.buttonRadius,
			backgroundColor: Colors.primary,
			shadowColor: Colors.shadow,
			shadowOffset: { width: 0, height: 2 },
			shadowOpacity: 0.2,
			shadowRadius: 3,
			elevation: 4,
		},
		reloadButtonText: {
			...globalStyles.primaryButtonText,
			fontSize: 18,
			color: Colors.buttonText,
		},

		// Secondary navbar
		secondaryNavContainer: {
			flexDirection: isPortrait ? 'column' : 'row',
			alignItems: 'center',
			justifyContent: isPortrait ? 'space-between' : 'space-around',
			marginBottom: Spacing.medium,
			width: '90%',
			maxWidth: isPortrait ? 400 : 600,
			alignSelf: 'center',
			paddingVertical: Spacing.small,
		},

		// Search input
		searchInput: {
			flex: isPortrait ? 0 : 1,
			minWidth: isPortrait ? 200 : 120,
			paddingVertical: Spacing.small,
			paddingHorizontal: Spacing.medium,
			fontSize: 16,
			color: Colors.textPrimary,
			borderColor: Colors.border,
			borderWidth: 1,
			borderRadius: 25,
			backgroundColor: Colors.mainBackground,
			textAlign: 'center',
			textAlignVertical: 'center',
			marginTop: isPortrait ? Spacing.medium : 0,
			marginLeft: isPortrait ? 0 : 20,
			shadowColor: Colors.shadow,
			shadowOffset: { width: 0, height: 1 },
			shadowOpacity: 0.1,
			shadowRadius: 2,
			elevation: 2,
		},
	});

	if (areAnimalsLoading) {
		return (
			<View style={globalStyles.loadingContainer}>
				<ActivityIndicator size='large' color={Colors.primary} />
				<Text style={globalStyles.loadingText}>Loading Animals...</Text>
			</View>
		);
	}
	if (!areAnimalsLoading && allAnimals === null) {
		return (
			<View style={localStyles.reloadButtonContainer}>
				<Pressable onPress={reloadAnimals} style={localStyles.reloadButton}>
					<Text style={localStyles.reloadButtonText}>Reload Animals</Text>
				</Pressable>
			</View>
		);
	}

	return (
		<View
			style={
				isPortrait
					? globalStyles.appContainerVertical
					: globalStyles.appContainerHorizontal
			}
		>
			<View style={localStyles.secondaryNavContainer}>
				<Text style={globalStyles.title}>All Animals</Text>

				<TextInput
					value={searchParameter}
					onChangeText={(text) => setSearchParameter(text)}
					placeholder='Search'
					style={localStyles.searchInput}
				></TextInput>
			</View>
			<FlatList
				data={localAnimalData}
				keyExtractor={(item) => item.id.toString()}
				contentContainerStyle={localStyles.flatListContentContainer}
				renderItem={({ item }) => (
					<View style={localStyles.animalCard}>
						<Image
							source={{ uri: item.completeImageURL }}
							style={localStyles.animalImage}
						/>
						<View style={localStyles.cardInformation}>
							<Text style={localStyles.animalName}>{item.name}</Text>
							<Text style={localStyles.animalDescription}>
								{item.description}
							</Text>
						</View>
					</View>
				)}
			/>
		</View>
	);
};

export default Home;
