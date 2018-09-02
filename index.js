import React, { Component } from 'react';
import {findDOMNode} from "react-dom";
import PropTypes from 'prop-types'


class ScaledComponent extends Component {
  static propTypes = {
    maxHeight: PropTypes.number.required,
    maxWidth: PropTypes.number.required,
    contentClass: PropTypes.string,
    children: PropTypes.node.required,
  };

  static defaultProps = {
    contentClass: '',
  };

  constructor(props) {
    super(props);

    this.state = {
      contentSize: { width: 0, height: 0 },
      scale: 1,
    };
  }

  componentDidMount() {
    this.setComponentSize()
  }

  /**
   * Gets the size of the component inside the container and scales it using css to the maxWidth, maxHeight set
   * Can be called externally as a callback using refs
   */
  setComponentSize = () => {
    const { maxHeight, maxWidth } = this.props;
    const { content } = this.refs;
    const actualContent = content.children[0];
    const contentSize = findDOMNode(actualContent).getBoundingClientRect()

    this.setState({
      scale: Math.min((maxWidth / contentSize.width), (maxHeight / contentSize.height)),
      contentSize: { width: (maxWidth / contentSize.width), height: (maxHeight / contentSize.height) },
    });
  }

  render() {
    const { scale } = this.state;
    const { children, contentClass, maxWidth, maxHeight } = this.props;

    return (
      <div
        style={{
          height: maxHeight + 'px',
          width: maxWidth + 'px',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          ref="content"
          className={contentClass}
          style={{
            transform: 'scale(' + scale + ')',
            transformOrigin: '0 0 0',
            width: '100%',
            height: '100%',
          }}
        >
          {children}
        </div>
      </div>
    );
  }
}

export default ScaledComponent