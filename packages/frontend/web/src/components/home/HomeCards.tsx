import { useInteraction } from '@/contexts/InteractionContext';

import Loading from '../Loading';
import Card from './Card';
import Interactions from './Interactions';

export default function HomeCards() {
  const { selectedUser } = useInteraction();

  if (!selectedUser) {
    return <Loading />;
  }

  return (
    <div className='font-base mx-auto flex w-full max-w-[500px] flex-col justify-between gap-5 overflow-y-auto px-5 py-10 text-white'>
      <Card user={selectedUser} />
      <Interactions />
    </div>
  );
}
