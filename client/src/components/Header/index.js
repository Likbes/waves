import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import { connect } from 'react-redux';
import { logoutUser } from '../../store/actions/user';

class Header extends Component {

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
  }

  state = {
    page: [
      { name: 'Home', linkTo: '/', public: true },
      { name: 'Guitars', linkTo: '/shop', public: true },
    ],
    user: [
      { name: 'My Cart', linkTo: '/user/cart', public: false },
      { name: 'My Account', linkTo: '/user/dashboard', public: false },
      { name: 'Log In', linkTo: '/login', public: true },
      { name: 'Log Out', linkTo: '/user/logout', public: false },
    ],
  }

  logoutHandler = () => {
    const { dispatch, history } = this.props;

    dispatch(logoutUser())
      .then(res => {
        if (res.payload.success) {
          history.push('/');
        }
      });
  }

  defaultLink = link => (
    link.name === 'Log Out' ?
      <a
        href="/"
        key={link.name}
        className="log_out_link"
        onClick={() => this.logoutHandler()}
      >
        {link.name}
      </a> :
      <Link to={link.linkTo} key={link.name}>
        {link.name}
      </Link>
  )

  cartLink = link => {
    const { cart } = this.props.user.userData;

    return (
      <div className="cart_link" key={link.name}>
        <span>{cart ? cart.length : 0}</span>
        <Link to={link.linkTo}>
          {link.name}
        </Link>
      </div>
    );
  }

  showLinks = type => {
    const { userData } = this.props.user;
    let list = [];

    if (userData) {
      type.forEach(item => {
        // if user is not login, show only public links
        if (!userData.isAuth) {
          if (item.public) list.push(item);
        } // all except login if you are authed
        else if (item.name !== 'Log In') list.push(item);
      });
    }

    return list.map(item => {
      return item.name !== 'My Cart' ?
        this.defaultLink(item) :
        this.cartLink(item);
    });
  }

  render() {
    const { page, user } = this.state;

    return (
      <header className="bck_b_light">
        <div className="container">
          <div className="left">
            <div className="logo">WAVES</div>
          </div>
          <div className="right">
            <div className="top">
              {this.showLinks(user)}
            </div>
            <div className="bottom">
              {this.showLinks(page)}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
  };
}

export default connect(mapStateToProps)(withRouter(Header));
