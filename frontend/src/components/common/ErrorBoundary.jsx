import React, { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div>
          예상치 못한 에러가 발생했습니다!
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;