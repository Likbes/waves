import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';

import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown';
import faAngleUp from '@fortawesome/fontawesome-free-solid/faAngleUp';

library.add(faAngleDown, faAngleUp);

class CollapseCheckbox extends Component {

  state = {
    open: false,
    checked: [],
  }

  componentDidMount() {
    const { initState } = this.props;

    if (initState) this.setState({ open: initState });
  }

  renderCheckboxesList = () => {
    const { list } = this.props;
    const { checked } = this.state;

    return (
      list ?
        list.map(item => (
          <ListItem key={item._id} style={{ padding: '7px 0' }}>
            <ListItemText primary={item.name} className="collapse_item" />
            <ListItemSecondaryAction>
              <Checkbox
                color="primary"
                onChange={this.handleToggle(item._id)}
                checked={checked.indexOf(item._id) !== -1}
              />
            </ListItemSecondaryAction>
          </ListItem>
        )) : ''
    );
  }

  handleToggle = id => () => {
    const { handleFilters } = this.props;
    const { checked } = this.state;
    const currentIndex = checked.indexOf(id);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(id);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    this.setState({
      checked: newChecked,
    }, () => handleFilters(newChecked));
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

  render() {
    const { open } = this.state;
    const { title } = this.props;

    return (
      <div className="collapse_items_wrapper">
        <List style={{ borderBottom: '1px solid #dbdbdb' }}>
          <ListItem
            onClick={this.handleClick}
            className="collapse_block_title"
            style={{
              padding: '10px 23px 10px 0px',
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
              {this.renderCheckboxesList()}
            </List>
          </Collapse>
        </List>
      </div>
    );
  }
}

CollapseCheckbox.propTypes = {
  initState: PropTypes.bool,
  title: PropTypes.string,
  list: PropTypes.array,
  handleFilters: PropTypes.func,
};

export default CollapseCheckbox;
