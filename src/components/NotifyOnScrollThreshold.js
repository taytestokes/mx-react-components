const React = require('react');
const _throttle = require('lodash/throttle');

const NotifyOnScrollThreshold = React.createClass({
  propTypes: {
    children: React.PropTypes.func,
    threshold: React.PropTypes.number
  getDefaultProps () {
    return {
      threshold: 0.9
    };
  },

  getInitialState () {
    return {
      thresholdMet: false
    };
  },

  componentDidMount () {
    this._handleScroll = _throttle(this._handleScroll, 200);

    this.container.parentElement.addEventListener('scroll', this._handleScroll);
  },

  componentWillUnmount () {
    this.container.parentElement.removeEventListener('scroll', this._handleScroll);
  },

  _handleScroll (evt) {
    const element = evt.target;
    const availableHeight = element.scrollHeight - element.clientHeight;
    const position = element.scrollTop / availableHeight;

    this.setState({ thresholdMet: position >= this.props.threshold });
  },

  render () {
    // TODO:
    // 1. Position from bottom passed to children function
    // 2. What happens if the parent isn't scrollable due to lack of content?

    return (
      <div ref={(ref) => this.container = ref}>
        {this.props.children(this.state.thresholdMet)}
      </div>
    );
  }
});

module.exports = NotifyOnScrollThreshold;