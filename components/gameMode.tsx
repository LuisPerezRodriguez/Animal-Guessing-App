import { Colors } from '@/constants/Colors';
import { Spacing } from '@/constants/Spacing';
import { useGameInfoContext } from '@/context/GameInfoContext';
import { useOrientationContext } from '@/context/OrientationContext';
import { globalStyles } from '@/styles/globalStyles';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
	Alert,
	Image,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	View,
} from 'react-native';
import ActionButtons from './actionButtons';

const ModeComponent = () => {
	const { isPortrait } = useOrientationContext();

	const { difficulty, currentAnimal, options, handleAnswer } =
		useGameInfoContext();

	const [selectedOption, setSelectedOption] = useState<string | null>(null);
	const [feedbackColor, setFeedbackColor] = useState<Record<string, string>>(
		{}
	);
	const [allOptions, setAllOptions] = useState<string[]>([]);

	const {
		control,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm({
		defaultValues: { animalName: '' },
	});

	useEffect(() => {
		if (difficulty === 1) {
			setSelectedOption(null);
			setFeedbackColor({});
			if (!currentAnimal) return;
			setAllOptions(options);
		}
	}, [currentAnimal, options, difficulty]);

	const handleOptionPress = (option: string) => {
		if (selectedOption !== null) return;
		setSelectedOption(option);
		if (currentAnimal) {
			const isCorrect = option === currentAnimal.name;
			setFeedbackColor({ [option]: isCorrect ? 'green' : 'red' });
			setTimeout(() => handleAnswer(isCorrect), 1000);
		}
	};

	const onSubmit = (data: { animalName: string }) => {
		const userAnswer = data.animalName.trim().toLowerCase();
		const correctAnswer = currentAnimal?.name
			.toLowerCase()
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '');

		const isCorrect = userAnswer === correctAnswer;
		Alert.alert(
			isCorrect ? 'Correct!' : 'Incorrect!',
			`The correct answer was: ${currentAnimal?.name}`
		);

		handleAnswer(isCorrect);
		reset();
	};

	const styles = StyleSheet.create({
		guessContainerInfo: {
			width: isPortrait ? '100%' : '50%',
			textAlign: 'center',
			justifyContent: 'center',
			alignItems: 'center',
			marginTop: isPortrait ? 0 : 15,
			marginBottom: isPortrait ? 15 : 0,
			marginRight: isPortrait ? 0 : 50,
		},
		animalImage: {
			width: isPortrait ? 250 : 200,
			height: isPortrait ? 200 : 150,
			padding: 10,
			backgroundColor: Colors.mainBackground,
			borderRadius: Spacing.borderRadius,
			marginTop: 0,
		},
		questionText: {
			...globalStyles.subtitle,
			fontSize: 22,
			textAlign: 'center',
			marginBottom: isPortrait ? 20 : 0,
		},
		multipleOptionsContainer: {
			flexDirection: 'row',
			flexWrap: 'wrap',
			justifyContent: 'center',
			width: isPortrait ? '100%' : '45%',
			marginBottom: 20,
		},
		optionButton: {
			backgroundColor: Colors.primary,
			paddingVertical: 12,
			paddingHorizontal: 20,
			borderRadius: 25,
			margin: 5,
			minWidth: 100,
			alignItems: 'center',
			borderWidth: 1,
			borderColor: '#ddd',
		},
		singleOptionContainer: {
			width: isPortrait ? '100%' : '45%',
			alignItems: 'center',
		},
		input: {
			...globalStyles.textInput,
			width: '80%',
			marginBottom: 10,
		},
		errorText: {
			color: 'red',
			marginBottom: 10,
		},
		horizontalContainer: {
			flexDirection: 'row',
		},
		mainContainer: {
			flexDirection: isPortrait ? 'column' : 'row',
			margin: 0,
			height: '100%',
		},
	});

	return (
		<View
			style={
				isPortrait
					? globalStyles.appContainerVertical
					: globalStyles.appContainerHorizontal
			}
		>
			<View style={styles.mainContainer}>
				<View style={styles.guessContainerInfo}>
					<Text style={styles.questionText}>
						{difficulty === 1 ? 'Guess the animal' : 'What is this animal?'}
					</Text>
					<Image
						source={{ uri: currentAnimal?.partialImageURL }}
						style={styles.animalImage}
					/>
				</View>

				{difficulty === 1 ? (
					<View style={styles.multipleOptionsContainer}>
						{allOptions.map((option) => (
							<Pressable
								key={option}
								style={({ pressed }) => [
									styles.optionButton,
									selectedOption === option && {
										backgroundColor: feedbackColor[option] || Colors.primary,
										borderColor: feedbackColor[option] || Colors.primary,
									},
									pressed && {
										opacity: 0.7,
									},
								]}
								onPress={() => handleOptionPress(option)}
								disabled={selectedOption !== null}
							>
								<Text style={globalStyles.primaryButtonText}>{option}</Text>
							</Pressable>
						))}
						<ActionButtons />
					</View>
				) : (
					<View style={styles.singleOptionContainer}>
						<Controller
							control={control}
							name='animalName'
							rules={{ required: 'Your answer is required!' }}
							render={({ field: { onChange, onBlur, value } }) => (
								<TextInput
									style={styles.input}
									onBlur={onBlur}
									onChangeText={onChange}
									value={value}
									placeholder='Type the animal name'
									autoCapitalize='none'
								/>
							)}
						/>
						{errors.animalName && (
							<Text style={styles.errorText}>{errors.animalName.message}</Text>
						)}
						<Pressable
							onPress={handleSubmit(onSubmit)}
							style={globalStyles.primaryButton}
						>
							<Text style={globalStyles.primaryButtonText}>Submit Answer</Text>
						</Pressable>
						<ActionButtons />
					</View>
				)}
			</View>
		</View>
	);
};

export default ModeComponent;
