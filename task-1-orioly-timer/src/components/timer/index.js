import React, { Component } from 'react';
import './index.css';

export default class Timer extends Component {
  state = {
    seconds: this.props.initial,
    isRunning: true,
  };

  componentDidMount() {
    if (this.state.isRunning) {
      this.intervalId = setInterval(() => {
        if (this.state.seconds > 0) {
          this.setState({ seconds: this.state.seconds - 1 });
        }
      }, 1000);
      return () => clearInterval(this.intervalId);
    }
  }

  componentDidUpdate() {
    if (this.state.isRunning === false) {
      clearInterval(this.intervalId);
    }
  }

  render() {
    return (
      <div className="mt-100 layout-column align-items-center justify-content-center">
        <div className="timer-value" data-testid="timer-value">
          {this.state.seconds}
        </div>
        <button
          className="large"
          data-testid="stop-button"
          onClick={() => {
            this.setState({ isRunning: (this.state.isRunning = false) });
          }}
        >
          Stop Timer
        </button>
      </div>
    );
  }
}
