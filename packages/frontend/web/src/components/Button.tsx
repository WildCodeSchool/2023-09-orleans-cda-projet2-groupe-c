import { motion } from 'framer-motion';

export default function Button({
  word,
  type,
  isOutline,
}: {
  readonly word: string;
  readonly type: 'button' | 'submit' | 'reset';
  readonly isOutline: boolean;
}) {
  return (
    // Use Link for navigation
    <motion.button
      type={type}
      // Initial state of the animation
      initial={{ y: 0, boxShadow: '0px 5px #bd0069' }}
      // State of the animation when the button is clicked
      whileTap={{
        y: 5,
        boxShadow: '0px 0px #bd0069',
        border: '1px solid #eb0573',
      }}
      // Configuration of the transition
      transition={{
        type: 'spring',
        damping: 10,
        stiffness: 200,
        duration: 0.1,
      }}
      className={`${
        isOutline ? 'bg-transparent' : 'bg-primary'
      } border-primary text-light-light w-full max-w-[500px] shrink-0 rounded-lg border px-2 py-3 text-xl`}
    >
      {/* Display the button text */}
      {word}
    </motion.button>
  );
}
