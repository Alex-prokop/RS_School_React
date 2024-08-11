import React from 'react';
import Button from './Button';
import styles from '../styles/ThrowErrorButton.module.css';

interface ThrowErrorButtonProps {
  throwError: () => void;
  className?: string;
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
    return (
      <Button className={styles.throwErrorButton} onClick={this.handleClick}>
        Throw Error
      </Button>
    );
  }
}

export default ThrowErrorButton;
