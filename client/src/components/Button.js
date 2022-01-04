import React from 'react';

export default class Button extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            thisDisabled: false,
        };
    }
  
    handleButtonClicked = () => {
      //going back logic
      this.setState({
        thisDisabled: true,
      });
      setTimeout(() => {
          this.setState(() => ({
            thisDisabled: false,
          }));
        }, 1500);
    };
    
    
    render() {
        const {onClick, disabled, ...buttonProps } = this.props
      return (
        <button   
          onClick={(e)=>{
              this.handleButtonClicked(); 
              if (typeof onClick === 'function') {
                  onClick(e);
                }
            }}
          disabled={this.state.thisDisabled || disabled}
          {...buttonProps}
        >
            {this.props.children}
        </button>
      );
    }
  }
  