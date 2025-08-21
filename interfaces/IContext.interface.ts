//Auth context interfaces
export interface User {
	id: string;
	username: string;
	maxScore?: number;
}

export interface AuthContextType {
	user: User | null;
	isUserLoading: boolean;
	login: (username: string, password: string) => Promise<void>;
	logout: () => void;
}

export interface Animal {
	id: string;
	name: string;
	description: string;
	partialImageURL: string;
	completeImageURL: string;
	hint: string;
}

//AnimalsInfoContextInterfaces
export interface AnimalsContextType {
	allAnimals: Animal[] | null;
	areAnimalsLoading: boolean;
	reloadAnimals: () => Promise<void>;
	shuffleAnimals: (animals: Animal[]) => Animal[];
}

//Animals information context interface
export interface GameInfoContextType {
	difficulty: number;
	score: number;
	isHintModalVisible: boolean;
	totalQuestions: number;
	currentQuestion: number;
	currentAnimal: any;
	options: string[];
	setDifficulty: (diff: number) => void;
	setScore: (score: number) => void;
	setIsHintModalVisible: (visible: boolean) => void;
	handleAnswer: (isCorrect: boolean) => void;
	toggleDifficulty: () => void;
	resetGame: () => void;
	startGame: () => void;
	loadNextQuestion: () => void;
	usedAnimals: any[];
	unusedAnimals: any[];
}
