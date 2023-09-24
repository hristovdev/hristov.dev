import React, { PropsWithChildren } from "react";

interface State {
  hasError: boolean;
  error: Error | null;
}

interface Props {
  fallback: JSX.Element;
}

class ErrorBoundary extends React.Component<PropsWithChildren<Props>> {
  state: State = { hasError: false, error: null };

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
    };
  }

  render(): React.ReactNode {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
