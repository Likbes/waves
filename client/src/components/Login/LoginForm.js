import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import FormField from '../utils/Form/formField';

import { update, generateData, isFormValid } from '../utils/Form/formActions';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser } from '../../store/actions/user';

class LoginForm extends Component {

  static propTypes = {
    history: PropTypes.object,
    dispatch: PropTypes.func,
  }

  state = {
    formError: false,
    formSuccess: '',
    formdata: {
      email: {
        element: 'input',
        value: '',
        config: {
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter your email',
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  }

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'login');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = e => {
    e.preventDefault();

    const { formdata } = this.state;
    const { dispatch, history } = this.props;
    let dataToSubmit = generateData(formdata, 'login');
    let formIsValid = isFormValid(formdata, 'login');

    if (formIsValid) {
      dispatch(loginUser(dataToSubmit))
        .then(res => {
          if (res.payload.loginSuccess) {
            history.push('/user/dashboard');
          } else {
            this.setState({
              formError: true,
            });
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  render() {

    const { formError, formdata } = this.state;

    return (
      <div className="signin_wrapper">
        <form onSubmit={e => this.submitForm(e)}>
          <FormField
            id="email"
            formdata={formdata.email}
            change={e => this.updateForm(e)}
          />

          <FormField
            id="password"
            formdata={formdata.password}
            change={e => this.updateForm(e)}
          />

          <Link to="/reset_user" className="forgot_password">
            Forgot password?
          </Link>

          {
            formError ?
              <div className="error_label">
                Please check your data
              </div> :
              ''
          }
          <button
            type="button"
            className="button"
            onClick={e => this.submitForm(e)}
          >
            Log in
          </button>
        </form>
      </div>
    );
  }
}

export default connect()(withRouter(LoginForm));
