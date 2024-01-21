/* eslint-disable unicorn/no-nested-ternary */
import type { InteractionReceivedBody, InteractionSentBody } from '@app/shared';

import LocationIcon from '../icons/LocationIcon';
import Stamp from './Stamp';

export default function ProfileCard({
  interaction,
  isVisible,
}: {
  readonly interaction?: InteractionSentBody | InteractionReceivedBody;
  readonly isVisible: boolean;
}) {
  // TODO : replace this const with the hook to display the correct age
  const age = 18;

  return (
    <div className='relative h-[70vw] max-h-[400px] flex-1 rounded-xl shadow-md'>
      <div className='absolute left-1/2 top-1/2 z-40 -translate-x-1/2 -translate-y-1/2'>
        <Stamp
          className={
            Boolean(interaction?.liked_at)
              ? 'border-primary text-primary'
              : 'border-super-like text-super-like'
          }
        >
          {Boolean(interaction?.liked_at) ? 'Liked' : 'Super Liked'}
        </Stamp>
      </div>

      <div className='absolute bottom-0 left-0 z-30 h-1/2 w-full rounded-b-xl bg-gradient-to-t from-black/80 to-black/0' />
      <div className='absolute bottom-0 left-0 z-40 w-full px-4 py-3'>
        {isVisible && interaction ? (
          <p className='mb-2 truncate text-lg'>{`${interaction.receiver.name} • ${age}`}</p>
        ) : undefined}

        {isVisible && interaction && 'city' in interaction.receiver ? (
          <div className='flex gap-1'>
            <LocationIcon />
            <p className='truncate text-sm'>{interaction.receiver.city.name}</p>
          </div>
        ) : undefined}
      </div>

      {/* Add a backdrop blur filter to users liked me */}
      {isVisible ? undefined : (
        <div className='absolute top-0 z-30 h-full w-full rounded-lg backdrop-blur-lg' />
      )}

      <div className='h-full w-full overflow-hidden rounded-xl'>
        <img
          src={
            isVisible
              ? interaction && 'pictures' in interaction.receiver
                ? interaction.receiver.pictures.path
                : undefined
              : interaction && 'pictures' in interaction.initiator
                ? interaction.initiator.pictures.path
                : undefined
          }
          alt={`Picture of ${
            isVisible && interaction && 'pictures' in interaction.receiver
              ? interaction.receiver.name
              : 'the sender'
          }`}
          className='h-full w-full scale-105 object-cover'
        />
      </div>
    </div>
  );
}
