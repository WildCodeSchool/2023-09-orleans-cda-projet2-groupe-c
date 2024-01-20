// TODO : First creation for the error page, in the new PR i will create a context for catch the status code and show the correct error page
import ErrorContainer from './ErrorContainer';
import ErrorContent from './ErrorContent';

export default function ErrorLayout() {
  return (
    <ErrorContainer>
      <ErrorContent
        title={'Error 403'}
        subtitle={'Unauthorized'}
        description={'You do not have permission to view this page!'}
      />
    </ErrorContainer>
  );
}
