import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

class Checkout extends React.Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // this.props.updateTea({ ...this.props.tea, ...this.state });
  }

  render() {
    return (
      <div>
        <div>
          <h2>Enter Information</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>First Name</label>
              <input
                type='text'
                name='firstname'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Last Name</label>
              <input type='text' name='lastname' onChange={this.handleChange} />
            </div>

            <div>
              <label>Phone Number</label>
              <input type='text' name='phone' onChange={this.handleChange} />
            </div>

            <div>
              <label>Email Address</label>
              <input type='text' name='email' onChange={this.handleChange} />
            </div>

            <div>
              <label>Shipping Address</label>
              <input type='text' name='address' onChange={this.handleChange} />
            </div>
          </form>
        </div>

        <div>
          <h2>Billing Information</h2>
          <form onSubmit={this.handleSubmit}>
            <div>
              <label>Name On Card</label>
              <input
                type='text'
                name='nameOnCard'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Card Number</label>
              <input
                type='text'
                name='cardNumber'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Expiration Date</label>
              <input
                type='text'
                name='expiration'
                onChange={this.handleChange}
              />
            </div>

            <div>
              <label>Secure Code</label>
              <input
                type='text'
                name='secureCode'
                onChange={this.handleChange}
              />
            </div>
          </form>
        </div>

        {/* <button>Place Order</button> */}
        <Link to='/checkout/done'>Place Order</Link>
      </div>
    );
  }
}

export default Checkout;
