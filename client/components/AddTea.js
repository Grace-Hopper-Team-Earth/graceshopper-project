import React from 'react';
import { createTea } from '../store/teas';
import { connect } from 'react-redux';

class AddTea extends React.Component {
  constructor() {
    super();
    this.state = {
      name: '',
      description: '',
      price: 0,
      imageUrl: '',
    };
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
    this.props.createTea({ ...this.state });
  }

  render() {
    const { name, description, price, imageUrl } = this.state;
    console.log('this state: ', name, description);
    return (
      <div>
        <h2>You can add new product here!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              onChange={this.handleChange}
              value={name}
              placeholder='Enter the name of product'
            />
          </div>

          <div>
            <label htmlFor='description'>Description:</label>
            <input
              name='description'
              onChange={this.handleChange}
              value={description}
              placeholder='Enter the description of product'
            />
          </div>

          <div>
            <label htmlFor='price'>Price:</label>
            <input
              name='price'
              onChange={this.handleChange}
              value={price}
              placeholder='Enter the price of product'
            />
          </div>

          <div>
            <label htmlFor='imageUrl'>Image:</label>
            <input
              name='imageUrl'
              onChange={this.handleChange}
              value={imageUrl}
              placeholder='Enter the image of product'
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  // console.log('the props: ', this.props);
  return {
    createTea: (tea) => dispatch(createTea(tea)),
  };
};

export default connect(null, mapDispatchToProps)(AddTea);
