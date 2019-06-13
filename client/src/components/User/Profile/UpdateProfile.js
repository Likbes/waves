import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from '../../utils/Form/formField';

import { connect } from 'react-redux';
import { updateProfile, clearUpdateProfile } from '../../../store/actions/user';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/Form/formActions';

class UpdateProfile extends Component {

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter your name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
      lastname: {
        element: 'input',
        value: '',
        config: {
          name: 'lastname_input',
          type: 'text',
          placeholder: 'Enter your lastname',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
      },
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
      phone: {
        element: 'input',
        value: '',
        config: {
          name: 'phone_input',
          type: 'tel',
          placeholder: 'Enter your phone',
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

  static propTypes = {
    user: PropTypes.object,
    dispatch: PropTypes.func,
  }

  componentDidMount() {
    const { userData } = this.props.user;
    const { formdata } = this.state;
    const newFormdata = populateFields(formdata, userData);

    this.setState({
      formdata: newFormdata,
    });
  }

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'profile');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = e => {
    e.preventDefault();

    const { formdata } = this.state;
    const { dispatch } = this.props;
    let dataToSubmit = generateData(formdata, 'profile');
    let formIsValid = isFormValid(formdata, 'profile');

    if (formIsValid) {
      dispatch(updateProfile(dataToSubmit))
        .then(() => {
          const { updateProfile } = this.props.user;
          if (updateProfile.success) {
            this.setState({
              formSuccess: true,
            }, () => setTimeout(() => {
              dispatch(clearUpdateProfile());
              this.setState({
                formSuccess: false,
              });
            }, 2000));
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
    const { formError, formdata, formSuccess } = this.state;

    return (
      <form onSubmit={e => this.submitForm(e)}>
        <h2>Personal information</h2>

        <div className="form_block_two">
          <div className="block">
            <FormField
              id="name"
              formdata={formdata.name}
              change={e => this.updateForm(e)}
            />
          </div>

          <div className="block">
            <FormField
              id="lastname"
              formdata={formdata.lastname}
              change={e => this.updateForm(e)}
            />
          </div>
        </div>

        <div className="form_block_two">
          <div className="block">
            <FormField
              id="email"
              formdata={formdata.email}
              change={e => this.updateForm(e)}
            />
          </div>

          <div className="block">
            <FormField
              id="phone"
              formdata={formdata.phone}
              change={e => this.updateForm(e)}
            />
          </div>
        </div>
        {
          formSuccess ?
            <div className="form_success">
              Success
            </div> : ''
        }
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
          Update profile
        </button>
      </form>
    );
  }
}

export default connect(state => {
  return {
    user: state.user,
  };
})(UpdateProfile);
