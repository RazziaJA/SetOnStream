export default class SetGame {
    constructor() {
        this.deck = [];
        this.on_table = [];
        this.isGameOver = true;
        this.scores = {};

        this.restartGame();
    }

    clone() {
        var clone = new SetGame();
        clone.deck = this.deck;
        clone.on_table = this.on_table;
        clone.isGameOver = this.isGameOver;
        clone.scores = this.scores;
        return clone;
    }

    restartGame() {
        if (this.isGameOver) {
            this.initializeDeck();
            this.dealCards();
            this.scores = {};
            this.isGameOver = false;
        }
    }
    
    dealCards() {
        for (var c = 0; c < 12; c++) {
            var card_num = this.deck.pop();
            this.on_table.push(card_num);
        }
        this.ensureSetOnTable();
    }
    
    checkSet(player, tableIndices) {
        var possible_set = tableIndices.map(x => this.on_table[x]);
        const features = this.getFeatures(possible_set);
        if (this.isSet(features)) {
            this.replaceCards(tableIndices);
            if (!this.scores[player]) {
                this.scores[player] = 0;
            }
            this.scores[player]++;
        }

        this.isGameOver = this.countSets(this.on_table) === 0;
    }

    replaceCards(cardIdxs) {
        for (var j = 0; j < cardIdxs.length; j++) {
            this.on_table.splice(cardIdxs[j], 1, -1) 
        }
        for (var k = 0; k < this.on_table.length; k++) {
            if (this.on_table[k] === -1) {
                var replacement = -1;
                while (this.on_table.length > 12 && replacement === -1) {
                    replacement = this.on_table.pop();
                }
                if (replacement === -1 && this.deck.length > 0) {
                    replacement = this.deck.pop();
                }
                if (replacement === -1) {
                    this.on_table.splice(k, 1);
                } else {
                    this.on_table.splice(k, 1, replacement);
                }
                k--;
            } 
        }
        
        this.ensureSetOnTable();
    }

    ensureSetOnTable() {
        while ((this.countSets(this.on_table) === 0) && (this.deck.length > 0)) {
            for (var i = 0; i < 3; ++i) {
                this.on_table.push(this.deck.pop());
            }
        }
    }

    getDeckCount() {
        return this.deck.length;
    }
    
    initializeDeck() {
        this.deck = [];
        this.on_table = [];
        for (var i = 0; i < 81; i++) {
            this.deck.push(i);
        }
        this.shuffleDeck();
        //var capSet = [28, 46, 10, 70, 7, 25, 31, 49, 13, 44, 17, 39, 3, 21, 36, 54, 72, 42, 6, 24].map(val => val-1);
        //this.deck = this.deck.filter(val => !capSet.includes(val)).concat(capSet);
    }
    
    shuffleDeck() {
        for (var idx = 0; idx < this.deck.length; idx++) {
            var swapIdx = idx + Math.floor(Math.random() * (this.deck.length - idx));
            var tmp = this.deck[idx];
            this.deck[idx] = this.deck[swapIdx];
            this.deck[swapIdx] = tmp;
        }
    }

    getFeatures(possible_set) {
        var color = [];
        var number = [];
        var shape = [];
        var shading = [];
        for (var idx in possible_set) {
            color.push(SetGame.getColor(possible_set[idx]));
            number.push(SetGame.getNumber(possible_set[idx]));
            shape.push(SetGame.getShape(possible_set[idx]));
            shading.push(SetGame.getShading(possible_set[idx]));
        }
        return [ 
           this.arrSum(color) % 3,
           this.arrSum(number) % 3,
           this.arrSum(shape) % 3,
           this.arrSum(shading) % 3,
        ];
    }

    countSets(cards) {
        var count = 0;
        for (var i = 0; i < cards.length; i++) {
            for (var j = i + 1; j < cards.length; j++) {
                for (var k = j + 1; k < cards.length; k++) {
                    count = (this.isSet(this.getFeatures([cards[i], cards[j], cards[k]])) ? count + 1 : count);   
                }
            }
        }
        return count;
    }
    
    isSet(features) {
        return this.arrSum(features) === 0;
    }

    arrSum (arr) {
        return arr.reduce((a,b) => a + b, 0);
    }

    static getColor(card) {
        return Math.floor(card / 27);
    }
    
    static getNumber(card) {
        return card % 3;
    }
    
    static getShape(card) {
        return Math.floor((card % 9) / 3);
    }
    
    static getShading(card) {
        return Math.floor((card % 27) / 9);
    }
}