import { useInteraction } from '@/contexts/InteractionContext';

import Loading from '../Loading';
import FormPicture from '../forms/FormPicture';
import Card from './Card';
import Interactions from './Interactions';

export default function HomeCards() {
  const { selectedUser } = useInteraction();

  if (!selectedUser) {
    return <Loading />;
  }

  return (
    <div className='font-base mx-auto flex h-[calc(100vh-56px)] w-full max-w-[500px] flex-col justify-between gap-5 overflow-y-auto px-5 py-10 text-white'>
      <FormPicture />
      <Card user={selectedUser} />
      <Interactions />
    </div>
  );
}
