import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

import Collapse from '@material-ui/core/Collapse';
import FormControlLabel from '@material-ui/core/FormControlLabel';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

library.add(faAngleDown, faAngleUp);

export default class CollapseRadio extends Component {

  state = {
    open: false,
    value: '0',
  }

  componentDidMount() {
    const { initState } = this.props;

    if (initState) this.setState({ open: initState });
  }

  handleClick = () => {
    this.setState(prevState => {
      return {
        open: !prevState.open,
      };
    });
  }

  handleAngle = () => {
    const { open } = this.state;

    return (
      open ?
        <FontAwesomeIcon icon="angle-up" className="icon" /> :
        <FontAwesomeIcon icon="angle-down" className="icon" />
    );
  }

  handleChange = event => {
    const { handleFilters } = this.props;
    handleFilters(event.target.value);

    this.setState({
      value: event.target.value,
    });
  }

  renderRadioList = () => {
    const { list } = this.props;

    return (
      list ?
        list.map(price => (
          <FormControlLabel
            key={price._id}
            value={`${price._id}`}
            control={<Radio className="radio_item" />}
            label={price.name}
            margin="none"
          />
        )) : ''
    );
  }

  render() {
    const { title } = this.props;
    const { open, value } = this.state;

    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            className="collapse_block_title"
            style={{
              padding: '10px 23px 10px 0',
              cursor: 'pointer',
            }}
          >
            <ListItemText
              primary={title}
              className="collapse_title"
            />
            {this.handleAngle()}
          </ListItem>
          <Collapse
            in={open}
            timeout="auto"
            unmountOnExit
          >
            <List component="div" disablePadding>
              <RadioGroup
                aria-label="prices"
                name="prices"
                value={value}
                onChange={this.handleChange}
              >
                {this.renderRadioList()}
              </RadioGroup>
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

CollapseRadio.propTypes = {
  initState: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  handleFilters: PropTypes.func,
};
