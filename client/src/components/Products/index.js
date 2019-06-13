import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PageTop from '../utils/PageTop';
import Images from './Images';
import Details from './Details';
import CircularProgress from '@material-ui/core/CircularProgress';

import { connect } from 'react-redux';
import { addToCart } from '../../store/actions/user';
import { getProductDetail, clearProductDetail } from '../../store/actions/products';

class ProductDetail extends Component {

  componentDidMount() {
    const { dispatch } = this.props;
    const { id } = this.props.match.params;

    dispatch(getProductDetail(id));
  }

  componentWillUnmount() {
    const { dispatch } = this.props;

    dispatch(clearProductDetail());
  }

  addToCart = id => {
    const { dispatch } = this.props;

    dispatch(addToCart(id));
  }

  render() {
    const { products } = this.props;

    return (
      <>
        <PageTop
          title="Product detail"
        />
        <div className="container">
          {
            products.prodDetail &&
              products.prodDetail[0] !== undefined ?
              <div className="product_detail_wrapper">
                <Images
                  detail={products.prodDetail[0]}
                />

                <Details
                  addToCart={id => this.addToCart(id)}
                  detail={products.prodDetail[0]}
                />
              </div> :
              <CircularProgress
                className="loader"
                style={{ color: '#00bcd4' }}
                thickness={7}
              />
          }
        </div>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  };
};

ProductDetail.propTypes = {
  products: PropTypes.object,
  match: PropTypes.object,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(ProductDetail);
