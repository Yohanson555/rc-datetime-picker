import React, {Component} from 'react';
import {render} from 'react-dom';
import moment from 'moment';

import {DatetimePicker, DatetimePickerTrigger, DatetimeRangePicker} from '../src/';
import './app.less';


class InlinePicker extends Component {
  constructor() {
    super();
    this.state = {
      moment: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      moment
    });
  }

  render() {
    const {moment: datetime} = this.state;

    const shortcuts = {
      'Today': moment(),
      'Yesterday': moment().subtract(1, 'days'),
    };

    return (
      <div>
        <DatetimePicker
          label={'From:'}
          shortcuts={shortcuts}
          moment={datetime}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

class PopupPicker extends Component {
  constructor() {
    super();
    this.state = {
      datetime: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      datetime: moment
    });
  }

  render() {
    const shortcuts = {
      'Today': moment(),
      'Yesterday': moment().subtract(1, 'days'),
      'Clear': ''
    };
    const {datetime} = this.state;
    const value = datetime ? datetime.format('YYYY/MM/DD HH:mm') : '';
    
    return (
      <DatetimePickerTrigger 
        shortcuts={shortcuts} 
        moment={datetime} 
        onChange={this.handleChange} 
      >
        <input type="text" value={value} readOnly />
        <span className="fa fa-calendar-o"></span>
      </DatetimePickerTrigger>
    );
  }
}

class RangePicker extends Component {
  constructor() {
    super();
    this.state = {
      datetime: moment()
    };
  }

  handleChange = (moment) => {
    this.setState({
      datetime: moment
    });
  }

  render() {
    const shortcuts = {
      'Today': moment()
    };
    const { datetime } = this.state;

    return (
      <DatetimeRangePicker 
        fromLabel='From:'
        toLabel='To:'
        shortcuts={shortcuts}
        moment={datetime} 
        onChange={this.handleChange} 
        showTimePicker={true}
      />
    );
  }
}

render(
  <InlinePicker />,
  document.getElementById('inline-picker')
);

render(
  <PopupPicker />,
  document.getElementById('popup-picker')
);

render(
  <RangePicker />,
  document.getElementById('range-picker')
);

