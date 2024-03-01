import ErrorContainer from './ErrorContainer';
import ErrorContent from './ErrorContent';

export default function ErrorLayout() {
  return (
    <ErrorContainer>
      <ErrorContent
        title={'Error 404 !'}
        subtitle={'Page not found'}
        description={'The page does not exist !'}
      />
    </ErrorContainer>
  );
}
