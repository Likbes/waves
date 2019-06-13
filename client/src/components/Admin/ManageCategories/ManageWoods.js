import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormField from '../../utils/Form/formField';
import { update, generateData, isFormValid, reset } from '../../utils/Form/formActions';

import { connect } from 'react-redux';
import { getWoods, addWood } from '../../../store/actions/products';

class ManageWoods extends Component {

  static propTypes = {
    dispatch: PropTypes.func,
    products: PropTypes.object,
  }

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
          placeholder: 'Enter the wood'
        },
        validation: {
          required: true
        },
        valid: false,
        touched: false,
        validationMessage: ''
      },
    }
  }

  showCategoryItems = () => {
    const { products } = this.props;

    return products.woods ?
      products.woods.map(item => (
        <div className="category_item" key={item._id}>
          {item.name}
        </div>
      ))
      : '';
  }

  updateForm = (element) => {
    const { formdata } = this.state;
    const newFormdata = update(element, formdata, 'woods');
    this.setState({
      formError: false,
      formdata: newFormdata
    });
  }

  resetFieldsHandler = () => {
    const { formdata } = this.state;
    const newFormData = reset(formdata, 'woods');

    this.setState({
      formdata: newFormData,
      formSuccess: true
    });
  }

  submitForm = (event) => {
    event.preventDefault();

    const { dispatch, products } = this.props;
    const { formdata } = this.state;

    let dataToSubmit = generateData(formdata, 'woods');
    let formIsValid = isFormValid(formdata, 'woods');
    let existingWoods = products.woods;

    if (formIsValid) {
      dispatch(addWood(dataToSubmit, existingWoods)).then(res => {
        if (res.payload.success) {
          this.resetFieldsHandler();
        } else {
          this.setState({ formError: true });
        }
      });
    } else {
      this.setState({
        formError: true
      });
    }
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getWoods());
  }

  render() {
    const { formError, formdata } = this.state;

    return (
      <div className="admin_category_wrapper">
        <h1>Woods</h1>
        <div className="admin_two_column">
          <div className="left">
            <div className="brands_container">
              {this.showCategoryItems()}
            </div>
          </div>
          <div className="right">
            <form onSubmit={(e) => this.submitForm(e)}>
              <FormField
                id='name'
                formdata={formdata.name}
                change={(e) => this.updateForm(e)}
              />

              {formError ?
                <div className="error_label">
                  Please check your data
                </div>
                : ''
              }

              <button
                type="button"
                className="button"
                onClick={(e) => this.submitForm(e)}
              >
                Add wood
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    products: state.products
  };
};


export default connect(mapStateToProps)(ManageWoods);
