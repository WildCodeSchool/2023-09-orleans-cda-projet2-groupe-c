import LocationIcon from '../icons/LocationIcon';
import type { InteractionBody } from './ProfileInteractionLayout';
import Stamp from './Stamp';

export default function ProfileCard({
  interaction,
}: {
  readonly interaction: InteractionBody;
}) {
  const age = 18;

  return (
    <div
      key={interaction.id}
      className='relative h-[70vw] max-h-[400px] flex-1 rounded-xl shadow-md'
    >
      <div className='absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2'>
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

      <div className='absolute bottom-0 left-0 z-40 h-1/2 w-full rounded-b-xl bg-gradient-to-t from-black/80 to-black/0' />
      <div className='absolute bottom-0 left-0 z-50 w-full px-4 py-3'>
        <p className='mb-2 truncate text-lg'>{`${interaction.receiver.name} • ${age}`}</p>
        <div className='flex gap-1'>
          <LocationIcon />
          <p className='truncate text-sm'>{interaction.receiver.city.name}</p>
        </div>
      </div>
      <div className='h-full overflow-hidden rounded-xl'>
        <img
          src={interaction.receiver.pictures.path}
          alt={`Picture of ${interaction.receiver.name}`}
          className='h-full w-full scale-105 object-cover'
        />
      </div>
    </div>
  );
}
