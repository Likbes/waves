import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { getProductsToShop, getBrands, getWoods } from '../../store/actions/products';
import { price } from '../utils/Form/fixedCategories';

import PageTop from '../utils/PageTop';
import Filters from './Filters';
import Grids from './Grids';
import Content from './Content';

class Shop extends Component {

  state = {
    grid: '',
    limit: 6,
    skip: 0,
    filters: {
      brand: [],
      frets: [],
      wood: [],
      price: [],
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { skip, limit, filters } = this.state;

    dispatch(getBrands());
    dispatch(getWoods());
    dispatch(getProductsToShop(
      skip, limit, filters
    ));
  }

  handleGrid = () => {
    this.setState(prevState => {
      return {
        grid: !prevState.grid ? 'grid_bars' : '',
      };
    });
  }

  handlePrice = value => {
    const data = price;
    let array = [];

    for (let key in data) {
      if (data[key]._id === parseInt(value, 10)) {
        array = data[key].array;
      }
    }

    return array;
  }

  handleFilters = (filters, section) => {
    const newFilters = { ...this.state.filters };
    newFilters[section] = filters;

    if (section === 'price') {
      let priceValues = this.handlePrice(filters);
      newFilters[section] = priceValues;
    }

    this.showFilteredResults(newFilters);
    this.setState({
      filters: newFilters,
    });
  }

  showFilteredResults = filters => {
    const { dispatch } = this.props;
    const { limit } = this.state;

    dispatch(getProductsToShop(
      0, limit, filters
    )).then(() => {
      this.setState({
        skip: 0,
      });
    });
  }

  loadMoreCards = () => {
    const { dispatch, products } = this.props;
    const { skip, limit, filters } = this.state;
    let newSkip = skip + limit;

    // products.toShop - old state to merge
    dispatch(getProductsToShop(
      newSkip, limit,
      filters, products.toShop
    )).then(() => {
      this.setState({
        skip: newSkip,
      });
    });
  }

  render() {
    const { products, dispatch } = this.props;
    const { grid, limit } = this.state;

    return (
      <>
        <PageTop title="Browse products" />
        <div className="container">
          <div className="shop_wrapper">
            <Filters
              {...products}
              handleFilters={this.handleFilters}
              dispatch={dispatch}
            />
            <div className="right">
              <Grids
                grid={grid}
                handleGrid={this.handleGrid}
              />
              <Content
                grid={grid}
                limit={limit}
                size={products.toShopSize}
                list={products.toShop}
                loadMore={() => this.loadMoreCards()}
              />
            </div>
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

Shop.propTypes = {
  products: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(Shop);
