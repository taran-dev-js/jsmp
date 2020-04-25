import {Game, IGame, availableCategories, GameOptions} from './game';

enum Players {
    Chet = 'Chet',
    Pat = 'Pat',
    Sue = 'Sue',
    Joe = 'Joe',
}

export const gameOptions: GameOptions = {
    maxScore: 6,
    questionsNumber: 50,
    availableCategories,
}

export class GameRunner {
    private game: IGame;

    public start(): void {
        this.game = new Game(gameOptions);

        this.game.addNewPlayer(Players.Chet);
        this.game.addNewPlayer(Players.Pat);
        this.game.addNewPlayer(Players.Sue);
        this.game.addNewPlayer(Players.Joe);

        this.gameRound();

        console.log('-----Game is finished!-----');
    }

    private gameRound = () => {
        let winner = false;
        this.game.roll(Math.floor(Math.random() * 6) + 1);

        if (Math.floor(Math.random() * 10) == 7) {
            winner = this.game.wrongAnswer();
        } else {
            winner = this.game.correctAnswer();
        }

        if (!winner) {
            this.gameRound();
        }
    }
}
