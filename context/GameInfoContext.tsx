import { useAnimalsInfoContext } from '@/context/AnimalsInfoContext';
import { GameInfoContextType } from '@/interfaces/IContext.interface';
import {
	createContext,
	PropsWithChildren,
	useContext,
	useEffect,
	useState,
} from 'react';
import { Alert } from 'react-native';

// Create the context
export const GameInfoContext = createContext<GameInfoContextType | null>(null);

// Custom hook to use the context
export const useGameInfoContext = (): GameInfoContextType => {
	const context = useContext(GameInfoContext);
	if (!context) {
		throw new Error('GameInfoContext cannot be accessed outside the provider.');
	}
	return context;
};

// Provider component
export const GameInfoProvider = ({ children }: PropsWithChildren) => {
	const { allAnimals, shuffleAnimals } = useAnimalsInfoContext();

	const [difficulty, setDifficulty] = useState<number>(0);
	const [score, setScore] = useState<number>(0);
	const [isHintModalVisible, setIsHintModalVisible] = useState<boolean>(false);
	const [totalQuestions, setTotalQuestions] = useState<number>(10);
	const [currentQuestion, setCurrentQuestion] = useState<number>(0);
	const [currentAnimal, setCurrentAnimal] = useState<any>(undefined);
	const [options, setOptions] = useState<string[]>([]);
	const [unusedAnimals, setUnusedAnimals] = useState<any[]>([]);
	const [usedAnimals, setUsedAnimals] = useState<any[]>([]);
	const [hasInitialized, setHasInitialized] = useState<boolean>(false);

	// Initialize game once when animals are loaded
	useEffect(() => {
		if (!hasInitialized && allAnimals && allAnimals.length >= 10) {
			resetGame();
			setHasInitialized(true);
		}
	}, [allAnimals, hasInitialized]);

	// Trigger next question
	useEffect(() => {
		if (currentQuestion > 0 && currentQuestion < totalQuestions) {
			startNextQuestion();
		}
	}, [currentQuestion, totalQuestions]);

	// Helper to shuffle an array
	const shuffleArray = <T,>(array: T[]): T[] =>
		[...array].sort(() => Math.random() - 0.5);

	// Determine 4 options: 1 correct + 3 incorrect
	const determineOptions = (
		current: any,
		available: any[],
		used: any[]
	): string[] => {
		const incorrectCandidates = available.filter(
			(a) => a.name !== current.name
		);
		const needed = 3;
		let incorrectOptions: string[] = [];

		if (incorrectCandidates.length >= needed) {
			incorrectOptions = shuffleArray(incorrectCandidates)
				.slice(0, needed)
				.map((a) => a.name);
		} else {
			incorrectOptions = shuffleArray(incorrectCandidates).map((a) => a.name);
			const remaining = needed - incorrectOptions.length;
			const extras = shuffleArray(
				used.filter(
					(a) => a.name !== current.name && !incorrectOptions.includes(a.name)
				)
			)
				.slice(0, remaining)
				.map((a) => a.name);
			incorrectOptions = [...incorrectOptions, ...extras];
		}

		return shuffleArray([...incorrectOptions, current.name]);
	};

	// Reset the game
	const resetGame = () => {
		if (!allAnimals) return;
		const shuffled = shuffleAnimals([...allAnimals]);
		const firstAnimal = shuffled[0];
		const restAnimals = shuffled.slice(1);

		setScore(0);
		setCurrentQuestion(0);
		setCurrentAnimal(firstAnimal);
		setUnusedAnimals(restAnimals);
		setUsedAnimals([firstAnimal]);
		setOptions(determineOptions(firstAnimal, restAnimals, [firstAnimal]));
	};

	// Start next question
	const startNextQuestion = () => {
		if (unusedAnimals.length === 0) return;

		const index = Math.floor(Math.random() * unusedAnimals.length);
		const animal = unusedAnimals[index];
		if (!animal) return;

		const newUnused = [...unusedAnimals];
		newUnused.splice(index, 1);
		const newUsed = [...usedAnimals, animal];

		setUnusedAnimals(newUnused);
		setUsedAnimals(newUsed);
		setCurrentAnimal(animal);
		setOptions(determineOptions(animal, newUnused, newUsed));
	};

	// Handle user's answer
	const handleAnswer = (isCorrect: boolean) => {
		const newScore = isCorrect ? score + 1 : score;
		setScore(newScore);

		if (currentQuestion < totalQuestions - 1) {
			setCurrentQuestion((prev) => prev + 1);
		} else {
			Alert.alert(
				'Game ended',
				`Your final score is: ${newScore} / ${totalQuestions}`,
				[{ text: 'Restart game', onPress: () => resetGame() }]
			);
		}
	};

	// Toggle difficulty
	const toggleDifficulty = () => {
		Alert.alert(
			'Change difficulty',
			'If you change difficulty your current progress will be lost.',
			[
				{ text: 'Cancel', style: 'cancel' },
				{
					text: 'Change',
					onPress: () => {
						setDifficulty((prev) => (prev === 1 ? 2 : 1));
						resetGame();
					},
				},
			]
		);
	};

	const value: GameInfoContextType = {
		difficulty,
		score,
		isHintModalVisible,
		totalQuestions,
		currentQuestion,
		currentAnimal,
		options,
		setDifficulty,
		setScore,
		setIsHintModalVisible,
		handleAnswer,
		toggleDifficulty,
		resetGame,
		startGame: startNextQuestion,
		loadNextQuestion: startNextQuestion,
		usedAnimals,
		unusedAnimals,
	};

	return (
		<GameInfoContext.Provider value={value}>
			{children}
		</GameInfoContext.Provider>
	);
};
