import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

import { connect } from 'react-redux';
import { getSiteData } from '../store/actions/site';

class Layout extends Component {
  componentDidMount() {
    const { dispatch, site } = this.props;
    if (Object.keys(site.length === 0)) {
      dispatch(getSiteData());
    }
  }

  render() {
    const { site } = this.props;
    return (
      <>
        <Header />
        <div className="page_container">
          {this.props.children}
        </div>
        <Footer data={site} />
      </>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.element,
  dispatch: PropTypes.func,
  site: PropTypes.object,
};

export default connect(state => {
  return {
    site: state.site,
  };
})(Layout);
