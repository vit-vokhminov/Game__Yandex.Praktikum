import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error('Uncaught error:', error, errorInfo);
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    public render() {
        const { hasError } = this.state;
        const { children } = this.props;
        if (hasError) {
            return <h1>Sorry.. there was an error</h1>;
        }
        return children;
    }
}

export default ErrorBoundary;
