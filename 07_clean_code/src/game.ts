import { Notification } from './notification';

enum Category {
    Science = 'Science',
    Pop = 'Pop',
    Sports = 'Sports',
    Rock = 'Rock',
}

export const availableCategories = [Category.Science, Category.Pop, Category.Sports, Category.Rock];

const PlaceCategoryMap = {
    [0]: Category.Pop,
    [4]: Category.Pop,
    [8]: Category.Pop,
    [1]: Category.Science,
    [5]: Category.Science,
    [9]: Category.Science,
    [2]: Category.Sports,
    [6]: Category.Sports,
    [10]: Category.Sports,
}

type Questions = string[];

type Player = {
    name: string,
    place: number,
    purse: number,
    inPenaltyBox: boolean,
};

export type GameOptions = {
    maxScore: number,
    questionsNumber: number,
    availableCategories: Category[],
};

export interface IGame {
    addNewPlayer: (name: string) => boolean;
    roll: (roll: number) => void;
    wrongAnswer: () => boolean;
    correctAnswer: () => boolean;
}

export const GameCreator = (logger: (string) => void) => {
    return class implements IGame {
        private players: Player[] = [];
        private currentPlayer: number = 0;
        private isGettingOutOfPenaltyBox: boolean = false;
        private questions: Questions[] = [];

        private maxScore: number = 6;
        private questionsNumber: number = 50;

        constructor(option: GameOptions) {
            const {
                maxScore,
                questionsNumber,
                availableCategories,
            } = option;

            this.maxScore = maxScore;
            this.questionsNumber = questionsNumber;
            this.createQuestions(availableCategories);
        }

        private createQuestions = (categories) => {
            categories.forEach(this.addQuestionsByCategory);
        }

        private addQuestionsByCategory = (category: Category) => {
            if (!this.questions[category]) {
                this.questions[category] = [];
            }

            for (let i = 0; i < this.questionsNumber; i++) {
                this.questions[category].push(Notification.question({category, i}));
            }
        }

        public addNewPlayer = (name: string): boolean => {
            this.players.push(this.createPlayer(name));

            logger(Notification.nameAdded({name}));
            logger(Notification.playerNumber({number: this.players.length}));

            return true;
        }

        private createPlayer = (name) => {
            return {
                name,
                place: 0,
                purse: 0,
                inPenaltyBox: false,
            }
        }

        public roll = (roll: number) => {
            const maxRollResult = 12;
            const currentPlayer = this.players[this.currentPlayer];
            logger(Notification.currentPlayer({name: currentPlayer.name}));
            logger(Notification.playerRolled({roll}));

            if (currentPlayer.inPenaltyBox) {
                if (!(roll % 2 != 0)) {
                    logger(Notification.gettingOutOfPenaltyBox({name: currentPlayer.name, isOut: false}));
                    this.isGettingOutOfPenaltyBox = false;
                    return;
                } else {
                    logger(Notification.gettingOutOfPenaltyBox({name: currentPlayer.name, isOut: true}));
                    this.isGettingOutOfPenaltyBox = true;
                }
            }

            currentPlayer.place = currentPlayer.place + roll;
            if (currentPlayer.place > maxRollResult - 1) {
                currentPlayer.place = currentPlayer.place - maxRollResult;
            }

            logger(Notification.playerLocation({name: currentPlayer.name, place: currentPlayer.place}));
            logger(Notification.currentCategory({category: this.getCurrentCategory()}));
            logger(this.getQuestion());
        }

        private getQuestion(): string {
            return this.questions[this.getCurrentCategory()].shift()
        }

        private getCurrentCategory(): Category {
            const currentPlayer = this.players[this.currentPlayer];
            return PlaceCategoryMap[currentPlayer.place] || Category.Rock;
        }

        private didPlayerWin(player: Player): boolean {
            return player.purse >= this.maxScore;
        }

        public wrongAnswer(): boolean {
            const currentPlayer = this.players[this.currentPlayer];

            logger(Notification.wrongAnswer());
            logger(Notification.playerGoToPenaltyBox({name: currentPlayer.name}));

            currentPlayer.inPenaltyBox = true;

            this.goToNextPlayer();
            return false;
        }

        public correctAnswer(): boolean {
            const currentPlayer = this.players[this.currentPlayer];

            if (currentPlayer.inPenaltyBox && !this.isGettingOutOfPenaltyBox) {
                this.goToNextPlayer();
                return false;
            }

            logger(Notification.correctAnswer());
            currentPlayer.purse++;
            logger(Notification.playerScore({name: currentPlayer.name, purse: currentPlayer.purse}));

            const isWinner = this.didPlayerWin(currentPlayer);
            this.goToNextPlayer();
            return isWinner;
        }

        private goToNextPlayer() {
            this.currentPlayer++;

            if (this.currentPlayer == this.players.length) {
                this.currentPlayer = 0;
            }
        }

    }
}

export const Game = GameCreator(console.log);
