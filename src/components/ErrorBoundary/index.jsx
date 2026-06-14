import { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error, info) {
    console.log(error, info);
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%,-50%)",
          }}
          className="error"
        >
          <p>Something went wrong:</p>
          <pre>{this.state.error.message}</pre>
          <button className="btn btn-secondary" onClick={this.handleReset}>
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;

/*
 ErrorBoundary Component

 A reusable React Error Boundary implemented as a class component.

 This implementation follows the same pattern used internally
  by the `react-error-boundary` library, but is written here
  explicitly for learning and customization purposes.

 Purpose:
  Catches JavaScript errors anywhere in its child component tree.
  Prevents the entire application from crashing.
  Displays a fallback UI instead of the broken component tree.

 Why Class Component?
  Error Boundaries must be class components.
  They rely on lifecycle methods:
    1. static getDerivedStateFromError()
    2. componentDidCatch()

 How It Works:
 1. When a child component throws an error during rendering,
    lifecycle, or constructor:
       getDerivedStateFromError() updates state.
       componentDidCatch() logs error details.
 2. The fallback UI is rendered instead of crashing the app.

 Usage:
 <ErrorBoundary>
    <YourComponent />
 </ErrorBoundary>

 Note:
  Does NOT catch errors inside event handlers.
  Does NOT catch async errors (e.g., setTimeout, API calls).
  Does NOT catch errors in itself.
*/
