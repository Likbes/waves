import React, { Component } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import FormField from '../utils/Form/formField';
import Dialog from '@material-ui/core/Dialog';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class ResetPassword extends Component {

  state = {
    resetToken: '',
    formError: false,
    formErrorMessage: '',
    formSuccess: false,
    formdata: {
      password: {
        element: 'input',
        value: '',
        config: {
          name: 'password_input',
          type: 'password',
          placeholder: 'Enter your password',
        },
        validation: {
          required: false,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      confirmPassword: {
        element: 'input',
        value: '',
        config: {
          name: 'confirm_password_input',
          type: 'password',
          placeholder: 'Confirm your password',
        },
        validation: {
          required: true,
          confirm: 'password',
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
    },
  }

  static propTypes = {
    match: PropTypes.object,
    history: PropTypes.object,
  }

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'reset_password');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = e => {
    e.preventDefault();

    const { history } = this.props;
    const { formdata, resetToken } = this.state;
    let dataToSubmit = generateData(formdata, 'reset_password');
    let formIsValid = isFormValid(formdata, 'reset_password');

    if (formIsValid) {
      axios
        .post('/api/users/resetPassword', {
          ...dataToSubmit,
          resetToken,
        })
        .then(res => {
          const { success, message } = res.data;
          if (!success) {
            this.setState({
              formError: true,
              formErrorMessage: message
            });
          } else {
            this.setState({
              formError: false,
              formSuccess: true,
            });
            setTimeout(() => {
              history.push('/login');
            }, 3000);
          }
        });
    } else {
      this.setState({
        formError: true,
      });
    }
  }

  componentDidMount() {
    const { token: resetToken } = this.props.match.params;

    this.setState({ resetToken });
  }

  render() {
    const {
      formdata,
      formError,
      formErrorMessage,
      formSuccess
    } = this.state;

    return (
      <div className="container">
        <form onSubmit={e => this.submitForm(e)}>
          <h2>Reset password</h2>
          <FormField
            id="password"
            formdata={formdata.password}
            change={e => this.updateForm(e)}
          />

          <FormField
            id="confirmPassword"
            formdata={formdata.confirmPassword}
            change={e => this.updateForm(e)}
          />

          {
            formError ?
              <div className="error_label">
                {formErrorMessage}
              </div> :
              ''
          }

          <button
            type="button"
            className="button"
            onClick={e => this.submitForm(e)}
          >
            Reset
          </button>

        </form>
        <Dialog open={formSuccess}>
          <div className="dialog_alert">
            <h2>Alright!</h2>
            <p>Your password was resetted! You will redirect to login form in a few seconds</p>
          </div>
        </Dialog>
      </div>
    );
  }
}

export default ResetPassword;
