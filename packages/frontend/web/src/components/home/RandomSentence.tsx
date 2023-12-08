import sentences from '../../data/sentences.json';

const sentencesArray: { sentences: string[] } = sentences;

// Select a random sentence from the array "sentences"
const randomSentence: string =
  sentencesArray.sentences[
    Math.floor(Math.random() * sentencesArray.sentences.length)
  ];

export default function RandomSentence() {
  return <h2 className='font-base text-base'>{randomSentence}</h2>;
}
