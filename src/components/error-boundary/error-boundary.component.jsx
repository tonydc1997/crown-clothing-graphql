import React from "react";
import astronaut from "../../assets/astronaut.png";

class ErrorBoundary extends React.Component {
  constructor() {
    super();

    this.state = {
      hasErrored: false,
    };
  }

  static getDerivedStateFromError(error) {
    // process the error & return fallback UI
    return { hasErrored: true };
  }

  componentDidCatch(error, errorInfo) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasErrored) {
      return (
        <div className="error-image-overlay">
          <img
            src={astronaut}
            alt="An astronaut lost in space"
            className="error-image-container"
          />
          <p className="error-text">Sorry, this page is lost in space...</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
