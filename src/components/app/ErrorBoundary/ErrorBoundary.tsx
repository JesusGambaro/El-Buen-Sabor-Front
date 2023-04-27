import { cloneElement, ReactElement, Children, useState } from "react";
import { ErrorBoundaryProps } from "Types/types";

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const [hasError, setHasError] = useState(false);

  function handleError(error: Error, errorInfo: React.ErrorInfo) {
    // You can also log the error to an error reporting service
    console.error(error, errorInfo);
    setHasError(true);
  }

  if (hasError) {
    // You can render any custom fallback UI
    return <h1>Something went wrong.</h1>;
  }

  return (
    <>
      {Children.map(props.children, (child) => {
        return cloneElement(child as ReactElement, {
          onError: handleError,
        });
      })}
    </>
  );
};

export default ErrorBoundary;
