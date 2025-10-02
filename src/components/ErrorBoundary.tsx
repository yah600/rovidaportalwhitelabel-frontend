import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(_: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error: _, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-100 p-4">
          <div className="bg-white p-8 rounded-lg shadow-lg text-center max-w-md">
            <h1 className="text-2xl font-bold text-red-700 mb-4">Something went wrong.</h1>
            <p className="text-gray-700 mb-4">We're sorry, but an unexpected error occurred.</p>
            {this.state.error && (
              <details className="text-left text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                <summary className="font-semibold cursor-pointer">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap break-words">
                  {this.state.error.toString()}
                  <br />
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
            <button
              className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
              onClick={() => window.location.reload()}
            >
              Reload Page
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;