import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserLayout from '../../../hoc/user';
import Form from './Form';

import { update, reset, generateData, isFormValid, populateOptionFields } from '../../utils/Form/formActions';
import { getBrands, getWoods, addProduct, clearProduct } from '../../../store/actions/products';
import { connect } from 'react-redux';

class AddProduct extends Component {
  static propTypes = {
    products: PropTypes.object,
    userData: PropTypes.object,
    dispatch: PropTypes.func,
  }

  state = {
    formError: false,
    formSuccess: false,
    formdata: {
      name: {
        element: 'input',
        value: '',
        config: {
          label: 'Product name',
          name: 'name_input',
          type: 'text',
          placeholder: 'Enter product name',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      description: {
        element: 'textarea',
        value: '',
        config: {
          label: 'Product description',
          name: 'description_input',
          type: 'text',
          placeholder: 'Enter your description',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      price: {
        element: 'input',
        value: '',
        config: {
          label: 'Product price',
          name: 'price_input',
          type: 'number',
          placeholder: 'Enter your price',
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      brand: {
        element: 'select',
        value: '',
        config: {
          label: 'Product brand',
          name: 'brand_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      wood: {
        element: 'select',
        value: '',
        config: {
          label: 'Wood material',
          name: 'wood_input',
          options: [],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      frets: {
        element: 'select',
        value: '',
        config: {
          label: 'Frets',
          name: 'frets_input',
          options: [
            { key: 20, value: 20 },
            { key: 21, value: 21 },
            { key: 22, value: 22 },
            { key: 24, value: 24 },
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      shipping: {
        element: 'select',
        value: '',
        config: {
          label: 'Shipping',
          name: 'shipping_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      available: {
        element: 'select',
        value: '',
        config: {
          label: 'Available',
          name: 'available_input',
          options: [
            { key: true, value: 'Yes' },
            { key: false, value: 'No' }
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      publish: {
        element: 'select',
        value: '',
        config: {
          label: 'Publish',
          name: 'publish_input',
          options: [
            { key: true, value: 'Public' },
            { key: false, value: 'Hidden' }
          ],
        },
        validation: {
          required: true,
        },
        valid: false,
        touched: false,
        validationMessage: '',
        showLabel: true,
      },
      images: {
        value: [],
        validation: {
          required: false,
        },
        valid: true,
        touched: false,
        validationMessage: '',
        showLabel: false,
      },
    },
  }

  componentDidMount() {
    const { dispatch } = this.props;
    const { formdata } = this.state;

    dispatch(getBrands()).then(() => {
      const { products } = this.props;
      const newFormData = populateOptionFields(formdata, products.brands, 'brand');
      this.updateFields(newFormData);
    });

    dispatch(getWoods()).then(() => {
      const { products } = this.props;
      const newFormData = populateOptionFields(formdata, products.woods, 'wood');
      this.updateFields(newFormData);
    });
  }

  imagesHandler = imgs => {
    const { formdata } = this.state;
    const newFormdata = { ...formdata };

    if (formdata.images.value.length === imgs.length) return;
    newFormdata['images'].value = imgs;
    newFormdata['images'].valid = true;

    this.setState({ formdata: newFormdata });
  }

  resetFields = () => {
    const { dispatch } = this.props;
    const { formdata } = this.state;
    const newFormData = reset(formdata, 'products');

    this.setState({
      formdata: newFormData,
      formSuccess: true,
    });

    setTimeout(() => {
      this.setState({
        formSuccess: false,
      }, () => dispatch(clearProduct()));
    }, 3000);
  }

  updateFields = newFormdata => {
    this.setState({
      formdata: newFormdata,
    });
  }

  handleSubmit = e => {
    e.preventDefault();

    const { formdata } = this.state;
    const { dispatch } = this.props;
    let dataToSubmit = generateData(formdata, 'products');
    let formIsValid = isFormValid(formdata, 'products');

    if (formIsValid) {
      dispatch(addProduct(dataToSubmit))
        .then(() => {
          const { addProduct } = this.props.products;
          if (addProduct.success) {
            this.resetFields();
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

  updateForm = e => {
    const { formdata } = this.state;
    const newFormdata = update(e, formdata, 'products');

    this.setState({
      formError: false,
      formdata: newFormdata,
    });
  }

  render() {
    const { formError, formSuccess, formdata } = this.state;

    return (
      <UserLayout>
        <>
          <h1>Add product</h1>
          <Form
            handleSubmit={this.handleSubmit}
            updateForm={this.updateForm}
            imagesHandler={imgs => this.imagesHandler(imgs)}
            formError={formError}
            formSuccess={formSuccess}
            {...formdata}
          />
        </>
      </UserLayout>
    );
  }
}

const mapStateToProps = state => {
  return {
    products: state.products,
  };
};

export default connect(mapStateToProps)(AddProduct);
