type NotificationType = {[s: string]: (any?) => string}

export const Notification: NotificationType = {
    question: ({category, i}) => {
        return `${category} Question ${i}`;
    },
    nameAdded: ({name}) => {
        return `${name} was added`;
    },
    playerNumber: ({number}) => {
        return `They are player number ${number}`;
    },
    currentPlayer: ({name}) => {
        return `${name} is the current player`;
    },
    currentCategory: ({category}) => {
        return `The category is ${category}`;
    },
    playerRolled: ({roll}) => {
        return `They have rolled a ${roll}`;
    },
    gettingOutOfPenaltyBox: ({name, isOut}) => {
        return `${name} is ${isOut ? '' : 'not '}getting out of the penalty box`;
    },
    playerLocation: ({name, place}) => {
        return `${name}'s new location is ${place}`;
    },
    correctAnswer: () => {
        return `Answer was correct!!!!`;
    },
    wrongAnswer: () => {
        return `Question was incorrectly answered`;
    },
    playerGoToPenaltyBox: ({name}) => {
        return `${name} was sent to the penalty box`;
    },
    playerScore: ({name, purse}) => {
        return `${name} now has ${purse} Gold Coins.`;
    },
};