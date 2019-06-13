import React, { Component } from 'react';
import axios from 'axios';

import FormField from '../utils/Form/formField';
import { update, generateData, isFormValid } from '../utils/Form/formActions';

class EnterEmail extends Component {

  state = {
    formError: false,
    formSuccess: false,
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
    },
  }

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'enter_email');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = e => {
    e.preventDefault();

    const { formdata } = this.state;
    let dataToSubmit = generateData(formdata, 'enter_email');
    let formIsValid = isFormValid(formdata, 'enter_email');

    if (formIsValid) {
      axios
        .post('/api/users/enterEmailToReset', dataToSubmit)
        .then(res => {
          const { success } = res.data;

          if (success) {
            this.setState({ formSuccess: true });
            setTimeout(() => this.setState({ formSuccess: false }), 2000);
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
    const { formdata, formError, formSuccess } = this.state;
    return (
      <div className="container">
        <h1>Reset password</h1>
        <form onSubmit={e => this.submitForm(e)}>
          <FormField
            id="email"
            formdata={formdata.email}
            change={e => this.updateForm(e)}
          />
          {
            formSuccess ?
              <div className="form_success">
                Success
              </div> : ''
          }

          {
            formError ?
              <div className="error_label">
                Check entered email
              </div> :
              ''
          }

          <button
            type="button"
            className="button"
            onClick={e => this.submitForm(e)}
          >
            Send email to reset
          </button>
        </form>
      </div>
    );
  }
}

export default EnterEmail;
