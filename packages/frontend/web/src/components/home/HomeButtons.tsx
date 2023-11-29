import { motion } from 'framer-motion';

import Button from '../Button';

// Variant animation for the container
const containerVariants = {
  hidden: {
    opacity: 0,
    y: 200,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      delay: 0.3,
      damping: 12,
      stiffness: 150,
    },
  },
};

export default function HomeButtons() {
  return (
    <motion.div
      variants={containerVariants}
      initial='hidden'
      animate='visible'
      transition={{ duration: 0.5 }}
      className='mb-5 flex w-full flex-col items-center gap-8'
    >
      <Button word='Login' path='/login' isOutline={false} />
      <Button word='Register' path='#' isOutline />

      <p className='text-light-hard max-w-[500px] text-sm'>
        {`By clicking 'Login,' you agree to our `}
        <span className='underline'>{`Terms of Service.`}</span>
        {` For more information on how we use your data, please refer to our `}
        <span className='underline'>{`Privacy Policy.`}</span>
      </p>
    </motion.div>
  );
}