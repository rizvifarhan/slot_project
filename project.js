//1. deposit some money
//2. determine the no of lines to bet on
//3. collect a bet amt
//4. spin the slot machine
//5. check if the user won
//6. give the user their winning amt
//7. play again

const prompt = require("prompt-sync")();


const ROWS = 3;
const COLS = 3;


const SYMBOLS_COUNT = {
    "A" : 2,
    "B" : 4,
    "C" : 6,
    "D" : 8
}

const SYMBOLS_VALUES = {
    "A" : 5,
    "B" : 4,
    "C" : 3,
    "D" : 2
}


const deposit = () => {
    while(true) {
        const amtdep = prompt("enter the amount to be deposited inside the wallet: ");
        const numamtdep = parseFloat(amtdep);
        if(isNaN(numamtdep) || numamtdep <= 0 ) {
            console.log("invalid amount,try again");
        }else {
            return numamtdep;
        }
    }    
}

const getNumberOfLines = () => {
    while(true) {
        const Lines = prompt("enter the number of lines to bet on (1-3) : ");
        const numofLines = parseFloat(Lines);
        if(isNaN(numofLines) || numofLines <= 0 || numofLines > 3) {
            console.log("invalid number of lines ,try again");
        }else {
            return numofLines;
        }
    } 
}


const getBet = (balance,lines) => {
    while(true) {
        const bet = prompt("enter the bet per lines: ");
        const numbet = parseFloat(bet);
        if(isNaN(numbet) || numbet <= 0 || numbet > balance / lines) {
            console.log("invalid bet,try again");
        }else {
            return numbet;
        }
    } 
}

const spin = () => {
    const symbols = [];
    for(const[symbol,count] of Object.entries(SYMBOLS_COUNT)) {
        for(let i=0;i<count;i++) {
            symbols.push(symbol);
        }
    }
    const reels = []; 
    for(let i=0;i<COLS;i++) {
        reels.push([]);
        const reelsymbol = [...symbols];
        for(let j=0;j<ROWS;j++) {
            const Randomindex = Math.floor(Math.random()*reelsymbol.length);
            const selectedsymbol = reelsymbol[Randomindex];
            reels[i].push(selectedsymbol);
            reelsymbol.splice(Randomindex,1);
        }
    }
    return reels;
};

const transpose = (reels) => {
    const rows = [];

    for(let i=0;i<ROWS;i++) {
        rows.push([]);
        for(let j=0;j<COLS;j++) {
            rows[i].push(reels[j][i]);
        }
    }
    return rows;
};

const PrintRows = (rows) => {
    for(const row of rows) {
        let rowString  = "";
        for(const [i, symbol] of row.entries()) {
            rowString += symbol;
            if(i != row.length - 1) {
                rowString += " | ";
            }
        }
        console.log(rowString);
    }
};

const getwinnings = (rows,bet,Lines) => {
    let winnings = 0;

    for(let row=0;row<Lines;row++) {
        const symbols = rows[row];
        let allSame=true;

        for(const symbol of symbols) {
            if(symbol != symbols[0]) {
                allSame = false;
                break;
            }
        }
        if(allSame) {
            winnings += bet*SYMBOLS_VALUES[symbols[0]];
        }
    }
    return winnings;
}

const game = () => {
    
let balance = deposit();

while(true) {
    console.log("you have balance of $ " + balance);
    const  Numberoflines = getNumberOfLines();
    const bet = getBet(balance,Numberoflines);
    balance -= bet*Numberoflines;
    const reels = spin();
    const rows = transpose(reels);
    PrintRows(rows);
    const winnings =getwinnings(rows,bet,Numberoflines);
    balance += winnings;
    console.log("You Won, $" + winnings.toString());

    if(balance<=0) {
        console.log("you ran out of money ! ");
    }

    const playagain = prompt("do you want to play again (y/n) ?");
    if(playagain != "y") break;  

    }

}

game();
 