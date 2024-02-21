/* eslint-disable unicorn/no-nested-ternary */
import type { InteractionBody } from '@app/shared';

import useAge from '@/hooks/use-age';

import LocationIcon from '../icons/LocationIcon';
import Stamp from './Stamp';

export default function ProfileCard({
  interaction,
  isVisible,
}: {
  readonly interaction: InteractionBody;
  readonly isVisible: boolean;
}) {
  // Calculate the age of the user with the custom hook useAge
  const age = useAge({ userBirthdate: interaction.receiver.birthdate });
  const age2 = useAge({ userBirthdate: interaction.initiator.birthdate });

  const isSuperLiked = Boolean(interaction.superlike_at);

  return (
    <div className='relative h-[70vw] max-h-[400px] flex-1 rounded-xl shadow-md'>
      <div className='absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2'>
        <Stamp
          className={
            Boolean(interaction.liked_at)
              ? 'border-primary text-primary'
              : 'border-super-like text-super-like'
          }
        >
          {Boolean(interaction.liked_at) ? 'Liked' : 'Super Liked'}
        </Stamp>
      </div>

      <div className='absolute bottom-0 left-0 z-30 h-1/2 w-full rounded-b-xl bg-gradient-to-t from-black/80 to-black/0' />
      <div className='absolute bottom-0 left-0 z-40 w-full px-4 py-3'>
        {isVisible && Boolean(interaction) ? (
          <p className='mb-2 truncate text-lg'>{`${interaction.receiver.name} • ${age}`}</p>
        ) : isSuperLiked ? (
          <p className='mb-2 truncate text-lg'>{`${interaction.initiator.name} • ${age2}`}</p>
        ) : undefined}

        {isVisible && Boolean(interaction) ? (
          <div className='flex gap-1'>
            <LocationIcon className='fill-primary w-4' />
            <p className='truncate text-sm'>{interaction.receiver.city.name}</p>
          </div>
        ) : isSuperLiked ? (
          <div className='flex gap-1'>
            <LocationIcon />
            <p className='truncate text-sm'>
              {interaction.initiator.city.name}
            </p>
          </div>
        ) : undefined}
      </div>

      {/* Add a backdrop blur filter to users liked me */}
      {isVisible ? undefined : isSuperLiked ? undefined : (
        <div className='absolute top-0 z-30 h-full w-full rounded-lg backdrop-blur-lg' />
      )}

      <div className='h-full w-full overflow-hidden rounded-xl'>
        <img
          src={
            isVisible
              ? interaction.receiver.pictures.path
              : interaction.initiator.pictures.path
          }
          alt={`Picture of ${
            isVisible && Boolean(interaction)
              ? interaction.receiver.name
              : isSuperLiked
                ? interaction.initiator.name
                : undefined
          }`}
          className='h-full w-full scale-105 object-cover'
        />
      </div>
    </div>
  );
}
