const sentences: string[] = [
  'Find someone who speaks the same language as you.',
  "Finding love isn't a syntax issue here.",
  'Looking for a relationship without “fatal errors” ?',
  'In our world, attached strings are the most valuable.',
  'Find someone who understands the code of your heart.',
  'Looking for your perfect function? Welcome to Tindev, where every call can be a match.',
  'Find your code lover and together, build an open source relationship full of love and commits.',
  'Find love on Tindev, because even developers need someone to debug their hearts.',
  'Welcome to Tindev, where syntax errors are forgiven, but not heart errors!',
  "Swipe right if you're ready to commit to a relationship without committing too quickly. Tindev, where each connection is well tested.",
  'No try and catch here. Only swipe and match. Tindev, or love stories are as fluid as a well-designed algorithm.',
  'For a relationship that lasts longer than a battery.',
  'Swipe towards happiness, where each if turns into a happy else.',
  'Welcome to Tindev, where every love story begins with a “Hello World”',
  'Looking for someone who can handle your exceptions?',
  "Swipe right if you're ready to enter an infinite loop of love on Tindev, where each iteration is better than the last.",
  'Welcome to Tindev, where each match is an SQL query to find the perfect partner.',
  'Swipe right if you want someone who appreciates your CSS jokes. On Tindev, we believe that love is like code, it must be stylish.',
  'On Tindev, each match is a promise to never leave us in callback.',
  'Welcome to Tindev, where each match is an infinite loop of love without breaks.',
  'Welcome to Tindev, where finding love is as simple as declaring a variable.',
  "Swipe right if you're ready to share your cookies and create unforgettable memories on Tindev.",
  'Welcome to Tindev, where dating is like HTML: simple but with infinite potential.',
];

export default function RandomSentence() {
  // Select a random sentence from the array "sentences"
  const randomSentence: string =
    sentences[Math.floor(Math.random() * sentences.length)];

  return <h2 className='font-base text-base'>{randomSentence}</h2>;
}
