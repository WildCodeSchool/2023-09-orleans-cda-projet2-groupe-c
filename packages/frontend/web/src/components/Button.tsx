import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  readonly isOutline: boolean;
  readonly type: 'button' | 'submit' | 'reset';
  readonly onClick?: () => void;
}

export default function Button({
  children,
  type,
  isOutline,
  onClick,
}: ButtonProps) {
  return (
    // Use Link for navigation
    <motion.button
      type={type}
      onClick={onClick}
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
        isOutline ? 'bg-transparent dark:text-white' : 'bg-primary text-white'
      } border-primary w-full max-w-[500px] shrink-0 rounded-lg border px-2 py-3 text-xl`}
    >
      {/* Display the button text */}
      {children}
    </motion.button>
  );
}
