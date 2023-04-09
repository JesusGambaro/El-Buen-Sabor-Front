import React, { useState } from 'react';

const ErrorBoundary = (props) => {
    const [hasError, setHasError] = useState(false);

    function handleError(error, errorInfo) {
        // You can also log the error to an error reporting service
        console.error(error, errorInfo);
        setHasError(true);
    }

    if (hasError) {
        // You can render any custom fallback UI
        return <h1>Something went wrong.</h1>;
    }

    return (
        <React.Fragment>
            {React.Children.map(props.children, child => {
                return React.cloneElement(child, { onError: handleError });
            })}
        </React.Fragment>
    );
}

export default ErrorBoundary;