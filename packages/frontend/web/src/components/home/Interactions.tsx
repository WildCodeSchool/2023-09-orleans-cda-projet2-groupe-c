import { useHome } from '../../contexts/HomeContext';
import LikeIcon from '../icons/LikeIcon';
import NextIcon from '../icons/NextIcon';
import SuperLikeIcon from '../icons/SuperLikeIcon';
import InteractionButton from './InteractionButtonBase';

export default function Interactions() {
  const {
    selectedUser,
    handleLikeClick,
    handleSuperLikeClick,
    handleNextClick,
  } = useHome();

  return (
    <>
      <p>{selectedUser?.name}</p>
      <div className='flex justify-center'>
        <div className='flex w-full max-w-[500px] items-center justify-between'>
          <InteractionButton onClick={handleNextClick} size='20'>
            <NextIcon className='w-10 fill-[#D52121]' />
          </InteractionButton>

          <InteractionButton onClick={handleSuperLikeClick} size='16'>
            <SuperLikeIcon className='w-10 fill-[#59C3FF]' />
          </InteractionButton>

          <InteractionButton onClick={handleLikeClick} size='20'>
            <LikeIcon className='fill-primary w-12' />
          </InteractionButton>
        </div>
      </div>
    </>
  );
}
