const express = require("express");
const router = express.Router();
const BrainJs = require("brain.js");
const natural = require("natural");
const TrainingSet = require('../data/trainingData');

function buildWordDictionary(trainingData) {
    const tokenisedArray = trainingData.map(item => {
        const tokens = item.phrase.split(' ')
        return tokens.map(token => natural.PorterStemmer.stem(token))
    })

    const flattenedArray = [].concat.apply([], tokenisedArray)
    return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
}

const dictionary = buildWordDictionary(TrainingSet)

function encode(phrase) {
    const phraseTokens = phrase.split(' ')
    const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0)

    return encodedPhrase
}

const encodedTrainingSet = TrainingSet.map(dataSet => {
    const encodedValue = encode(dataSet.phrase)
    return { input: encodedValue, output: dataSet.result }
})


const network = new BrainJs.NeuralNetwork()
network.train(encodedTrainingSet)

const encoded = encode("Im so happy to have cae")



/*
@route:     /api/analyse/
@desc:      To analyse whether the given sentence is possitive or not
*/
router.get('/', (req, res) => {
    
    let result = network.run(encoded);
    result = JSON.stringify(result);
    res.send("Analysed" + result);
});



module.exports = router;