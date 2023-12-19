import EyeCloseIcon from '../icons/EyeCloseIcon';
import EyeOpenIcon from '../icons/EyeOpenIcon';

export default function VisiblePassword({
  isVisible,
  setIsVisible,
}: {
  readonly isVisible: boolean;
  readonly setIsVisible: (isVisible: boolean) => void;
}) {
  return (
    <div>
      {isVisible ? (
        <button
          type='button'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
        >
          <EyeOpenIcon />
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className='translate-y-[1px]'
        >
          <EyeCloseIcon />
        </button>
      )}
    </div>
  );
}
