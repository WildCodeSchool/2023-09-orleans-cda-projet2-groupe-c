import PasswordNotVisible from '../svg/PasswordNotVisible';
import PasswordVisible from '../svg/PasswordVisible';

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
