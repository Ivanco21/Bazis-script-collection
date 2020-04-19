
// jshint esversion:9

/**
 * BM block names simple translator 
 * using Yandex Translate API https://yandex.ru/dev/translate/
 * npm install yandex.translate     - wrapper for Yandex API 
 */

let userSettings = require('../user_settings/api_keys.json');

let YandexTranslator = require('yandex.translate');
let translator = new YandexTranslator(userSettings.yandexTranslateKey);

let blocks = [];
blocks = getBlocksTopLvl();

for (let i = 0; i < blocks.length; i++) {
    let bl = blocks[i];
    translator.translate( bl.Name, 'en').then (function (arg) {
        bl.Name = arg[0];
    });
    Action.Continue();
}
Action.Finish();

function getBlocksTopLvl() {

    var topBlocks = [];
    for (var i = 0; i < Model.Count; i++) {
        var obj = Model[i];
        if (obj.List && TFurnBlock) {
            topBlocks.push(obj);
        }
    }
    return topBlocks;
}
