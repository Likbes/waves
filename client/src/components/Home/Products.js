import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import CardBlock from '../utils/CardBlock';

import {
  getProductsByArrival,
  getProductsBySell,
} from '../../store/actions/products';

class Products extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getProductsBySell());
    dispatch(getProductsByArrival());
  }

  render() {
    const { sell } = this.props;
    const { bySell, byArrival } = this.props.products;

    return (
      sell ?
        <CardBlock list={bySell} title="Best Selling guitars" /> :
        <CardBlock list={byArrival} title="New arrivals" />
    );
  }
}

const mapStateToOrops = state => {
  return {
    products: state.products,
  };
};

Products.propTypes = {
  dispatch: PropTypes.func,
  sell: PropTypes.bool,
  products: PropTypes.object,
};

export default connect(mapStateToOrops)(Products);



