import React from 'react';
import PropTypes from 'prop-types';

const FormField = ({ formdata, change, id }) => {

  const {
    element,
    config,
    value,
    showLabel = false,
    validation,
    valid,
    validationMessage
  } = formdata;

  const showError = () => {
    let errorMessage = '';

    if (validation && !valid) {
      errorMessage = (
        <div className="error_label">
          {validationMessage}
        </div>
      );
    }

    return errorMessage;
  };


  const renderTemplate = () => {
    let formTemplate = '';

    switch (element) {
      case 'input':
        formTemplate = (
          <>
            <input
              {...config}
              value={value}
              onBlur={e => change({ e, id, blur: true })}
              onChange={e => change({ e, id })}
            />
            {showError()}
          </>
        );
        break;

      case 'textarea':
        formTemplate = (
          <>
            <textarea
              {...config}
              value={value}
              onBlur={e => change({ e, id, blur: true })}
              onChange={e => change({ e, id })}
            />
            {showError()}
          </>
        );
        break;

      case 'select':
        formTemplate = (
          <>
            <select
              value={value}
              onBlur={e => change({ e, id, blur: true })}
              onChange={e => change({ e, id })}
            >
              <option value="">Select a value</option>
              {
                config.options.map(item => (
                  <option
                    key={item.key}
                    value={item.key}
                  >
                    {item.value}
                  </option>
                ))
              }
            </select>
            {showError()}
          </>
        );
        break;

      default:
        formTemplate = null;
    }

    return formTemplate;
  };


  return (
    <div className="formBlock">
      {
        showLabel ?
          <div className="label_inputs">
            {config.label}
          </div> : ''
      }
      {renderTemplate()}
    </div>
  );
};

FormField.propTypes = {
  formdata: PropTypes.object,
  change: PropTypes.func,
  id: PropTypes.string,
};

export default FormField;
