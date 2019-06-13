import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { auth } from '../store/actions/user';
import CircularProgress from '@material-ui/core/CircularProgress';

export default function (ComposedClass, isPrivate, adminRoute = null) {
  class AuthenticationCheck extends Component {

    state = {
      isLoading: true,
    }

    componentDidMount() {
      const { dispatch, history } = this.props;

      dispatch(auth())
        .then(() => {
          let user = this.props.user.userData;

          if (!user.isAuth) {
            if (isPrivate) history.push('/login');
          } else {
            if (adminRoute && !user.isAdmin) {
              // u a not an admin and try to open adminRoute
              history.push('/user/dashboard');
            } else {
              // auth user try to go to login / register route
              if (isPrivate === false) history.push('/user/dashboard');
            }
          }

          this.setState({ isLoading: false });
        });
    }

    render() {
      const { user } = this.props;
      const { isLoading } = this.state;
      if (isLoading) {
        return (
          <div className="main_loader">
            <CircularProgress
              style={{ color: '#2196F3' }}
              thickness={7}
            />
          </div>
        );
      }
      return <ComposedClass {...this.props} user={user} />;
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user,
    };
  }

  AuthenticationCheck.propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
    history: PropTypes.object,
  };

  return connect(mapStateToProps)(AuthenticationCheck);
}
