import PasswordNotVisible from '../icons/PasswordNotVisible';
import PasswordVisible from '../icons/PasswordVisible';

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
