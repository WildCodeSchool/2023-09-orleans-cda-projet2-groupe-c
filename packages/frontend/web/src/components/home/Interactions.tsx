import { useHome } from '../../contexts/HomeContext';
import InteractionButton from './InteractionButtonBase';

export default function Interactions() {
  const { selectedUser } = useHome();

  return (
    <div>
      <p>{selectedUser?.name}</p>

      <InteractionButton>{`Like`}</InteractionButton>
    </div>
  );
}
