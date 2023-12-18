import PasswordNotVisible from '../icons/EyeCloseIcon';
import PasswordVisible from '../icons/EyeOpenIcon';

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
          <PasswordVisible />
        </button>
      ) : (
        <button
          type='button'
          onClick={() => {
            setIsVisible(!isVisible);
          }}
          className='translate-y-[1px]'
        >
          <PasswordNotVisible />
        </button>
      )}
    </div>
  );
}
