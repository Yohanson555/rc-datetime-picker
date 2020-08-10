import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import DatetimePicker from './Picker.jsx';
import {START_DATE_TEXT, END_DATE_TEXT} from './constants.js';

class Range extends Component {
  constructor(props) {
    super(props);

    this.state = {
      moment: props.moment
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentWillReceiveProps(props) {
    this.setState({
      moment: props.moment
    });
  }

  handleChange(moment) {
    const { onChange } = this.props;

    this.setState({
      moment
    });

    if (onChange && typeof onChange === 'function') {
      onChange(moment);
    }
  }
  
  render() {
    const {moment} = this.state;
    const {
      fromLabel,
      toLabel,
      format, 
      showTimePicker = false, 
      isOpen = true,
      shortcuts,
      startDateText = START_DATE_TEXT,
      endDateText = END_DATE_TEXT
    } = this.props;
    const formatStyle = format || (showTimePicker ? 'YYYY/MM/DD HH:mm' : 'YYYY/MM/DD');
    const className = classNames('datetime-range-picker', this.props.className);
    const props = blacklist(this.props, 'className', 'isOpen', 'format', 'moment', 'showTimePicker', 'shortcuts', 'onChange');

    return (
      <div className={className} style={{display: isOpen ? 'block' : 'none'}}>
        <div className="datetime-range-picker-panel">
          <div className="datetime-range-picker-item">
            <DatetimePicker
              shortcuts={shortcuts}
              label={fromLabel || startDateText}
              {...props}
              isOpen={isOpen}
              className="range-start-picker"
              showTimePicker={showTimePicker}
              moment={moment}
              range
              rangeAt="start"
              onChange={this.handleChange}
              format={formatStyle}
              minPanel="day"
            />
          </div>

          <div className="datetime-range-picker-item">
            <DatetimePicker
              shortcuts={shortcuts}
              label={toLabel || endDateText}
              {...props}
              isOpen={isOpen}
              className="range-end-picker"
              showTimePicker={showTimePicker}
              moment={moment}
              range
              rangeAt='end'
              onChange={this.handleChange}
              format={formatStyle}
              minPanel="day"
            />
          </div>
        </div>
      </div>
    );
  }
}


export default Range;