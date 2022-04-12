export default class SetGame {
    constructor() {
        this.deck = [];
        this.on_table = [];
        this.isGameOver = true;
        this.scores = {};

        this.restartGame();
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
        if (this.deck.length > 0) {
            for (var i = 0; i < cardIdxs.length; i++) {
                var new_card = this.deck.pop();
                this.on_table.splice(cardIdxs[i], 1, new_card)
            }
        } else {
            for (var j = 0; j < cardIdxs.length; j++) {
                this.on_table.splice(cardIdxs[j], 1, -1) 
            }
            for (var k = this.on_table.length-1; k >= 0; k--) {
                if (this.on_table[k] === -1) {
                    this.on_table.splice(k, 1);
                } 
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
            color.push(this.getColor(possible_set[idx]));
            number.push(this.getNumber(possible_set[idx]));
            shape.push(this.getShape(possible_set[idx]));
            shading.push(this.getShading(possible_set[idx]));
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

    getColor(card) {
        return Math.floor(card / 27);
    }
    
    getNumber(card) {
        return card % 3;
    }
    
    getShape(card) {
        return Math.floor((card % 9) / 3);
    }
    
    getShading(card) {
        return Math.floor((card % 27) / 9);
    }
}