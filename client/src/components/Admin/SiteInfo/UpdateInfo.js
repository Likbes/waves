import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from '../../utils/Form/formField';

import { connect } from 'react-redux';
import {
  update,
  generateData,
  isFormValid,
  populateFields
} from '../../utils/Form/formActions';
import { getSiteData, updateSiteData } from '../../../store/actions/site';

class UpdateInfo extends Component {
  static propTypes = {
    dispatch: PropTypes.func,
    site: PropTypes.object,
  }

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      address: {
        element: 'input',
        value: '',
        config: {
          label: 'Address',
          name: 'address_input',
          type: 'text',
          placeholder: 'Enter the site address',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      hours: {
        element: 'input',
        value: '',
        config: {
          label: 'Working hours',
          name: 'hours_input',
          type: 'text',
          placeholder: 'Enter the site working hours',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      phone: {
        element: 'input',
        value: '',
        config: {
          label: 'Phone number',
          name: 'phone_input',
          type: 'tel',
          placeholder: 'Enter the phone number',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      email: {
        element: 'input',
        value: '',
        config: {
          label: 'Shop email',
          name: 'email_input',
          type: 'email',
          placeholder: 'Enter the email',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(getSiteData())
      .then(() => {
        const { siteData } = this.props.site;
        const { formdata } = this.state;
        const newFormdata = populateFields(formdata, siteData[0]);

        this.setState({
          formdata: newFormdata,
        });
      });
  }

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'site_info');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  submitForm = e => {
    e.preventDefault();

    const { formdata } = this.state;
    const { dispatch } = this.props;
    let dataToSubmit = generateData(formdata, 'site_info');
    let formIsValid = isFormValid(formdata, 'site_info');

    if (formIsValid) {
      dispatch(updateSiteData(dataToSubmit))
        .then(() => {
          this.setState({
            formSuccess: true,
          }, () => {
            setTimeout(() => {
              this.setState({ formSuccess: false });
            }, 2000);
          });
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
      <form onSubmit={e => this.submitForm(e)}>
        <h2>Site infomation</h2>

        <div className="form_block_two">
          <div className="block">
            <FormField
              id="address"
              formdata={formdata.address}
              change={e => this.updateForm(e)}
            />
          </div>

          <div className="block">
            <FormField
              id="hours"
              formdata={formdata.hours}
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
          Update
        </button>
      </form>
    );
  }
}

export default connect(state => {
  return {
    site: state.site,
  };
})(UpdateInfo);
