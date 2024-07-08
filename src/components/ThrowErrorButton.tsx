import React from 'react';

interface ThrowErrorButtonProps {
  throwError: () => void;
}

class ThrowErrorButton extends React.Component<ThrowErrorButtonProps> {
  handleClick = async () => {
    try {
      this.props.throwError();
    } catch (error) {
      this.setState(() => {
        throw error;
      });
    }
  };

  render() {
    return <button onClick={this.handleClick}>Throw Error</button>;
  }
}

export default ThrowErrorButton;
