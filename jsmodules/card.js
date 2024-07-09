"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var card = /** @class */ (function () {
    function card(cardcode, cardname, classes, canMissionary, keyWords) {
        this.whenOpen = function (state) {
            // TODO: Open card logic
            return state;
        };
        this.whenInfluentialization = function (state) {
            // TODO: Influentialization card logic
            return state;
        };
        this.cardcode = cardcode;
        this.cardname = cardname;
        this.classes = classes;
        this.canMissionary = canMissionary;
        this.keyWords = keyWords;
    }
    return card;
}());
