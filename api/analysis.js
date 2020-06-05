const express = require("express");
const router = express.Router();
const BrainJs = require("brain.js");
const natural = require("natural");
const data = require('../data/trainingData');

//Neural Network Training
const buildWordDictionary = (trainingData) => {
    const tokenisedArray = trainingData.map(item => {
        const tokens = item.phrase.split(' ');
        return tokens.map(token => natural.PorterStemmer.stem(token));
    });
    const flattenedArray = [].concat.apply([], tokenisedArray)
    return flattenedArray.filter((item, pos, self) => self.indexOf(item) == pos)
}

const dictionary = buildWordDictionary(data)

const encode = (phrase) => {
    const phraseTokens = phrase.split(' ');
    const encodedPhrase = dictionary.map(word => phraseTokens.includes(word) ? 1 : 0);
    return encodedPhrase;
}

const encodedTrainingSet = TrainingSet.map(dataSet => {
    const encodedValue = encode(dataSet.phrase)
    return { input: encodedValue, output: dataSet.result }
})

const network = new BrainJs.NeuralNetwork()
network.train(encodedTrainingSet)


/*
@route:     /api/analyse/
@desc:      To analyse whether the given sentence is possitive or not
*/
router.get('/', (req, res) => {
    let sentence = req.params.input;
    const encoded = encode(sentence);

    //Passing through network
    const result = network.run(encoded);
    res.send(result);
});



module.exports = router;