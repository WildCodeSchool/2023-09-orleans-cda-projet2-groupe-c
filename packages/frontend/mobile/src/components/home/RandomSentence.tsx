import { View } from 'react-native';

import sentences from '../../../data/sentences.json';
import Sentence from '../Sentence';

const sentencesArray: { sentences: string[] } = sentences;

// Select a random sentence from the array "sentences"
const randomSentence: string =
  sentencesArray.sentences[
    Math.floor(Math.random() * sentencesArray.sentences.length)
  ];

export default function RandomSentence() {
  return (
    <View>
      <Sentence size={16}>{randomSentence}</Sentence>
    </View>
  );
}
