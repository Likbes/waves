import React, { Component } from 'react';
import PropTypes from 'prop-types';
import PaypalExpressBtn from 'react-paypal-express-checkout';

class Paypal extends Component {
  static propTypes = {
    toPay: PropTypes.number,
    onSuccess: PropTypes.func,
  }

  render() {
    const { toPay } = this.props;

    const onSuccess = payment => {
      const { onSuccess } = this.props;

      onSuccess(payment);
    };

    const onCancel = data => {
      // eslint-disable-next-line no-console
      console.log(data);
    };

    const onError = err => {
      // eslint-disable-next-line no-console
      console.log(err);
    };

    let env = 'sandbox';
    let currency = 'USD';
    let total = toPay;

    const client = {
      sandbox: 'AeLna9Px8kcGw4g_9a6VOzu4QN61kD5Omg_LV4x1sz-dUWyHbcNjKSb0LNMNLT-i_EUggN3Il0ddQ8DJ',
      production: '',
    };

    return (
      <PaypalExpressBtn
        env={env}
        client={client}
        currency={currency}
        total={total}
        onError={onError}
        onSuccess={onSuccess}
        onCancel={onCancel}
        style={{
          size: 'large',
          color: 'blue',
          shape: 'rect',
          label: 'checkout'
        }}
      />
    );
  }
}

export default Paypal;
