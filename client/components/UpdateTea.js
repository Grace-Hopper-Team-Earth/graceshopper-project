import React from 'react';
import { connect } from 'react-redux';
import { updateTea } from '../store/teas';
import { gotSingleTea, fetchSingleTea } from '../store/singleTea';

class UpdateTea extends React.Component {
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

  componentDidMount() {
    console.log('props inside componentDidMount', this.props);
    console.log('this.props.match.params.id', this.props.match.params.id);
    this.props.fetchSingleTea(this.props.match.params.id);
  }

  componentWillUnmount() {
    this.props.clearTea();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.tea.id !== this.props.tea.id) {
      this.setState({
        name: this.props.tea.name || '',
        description: this.props.tea.description || '',
        price: this.props.price || 0,
        imageUrl: this.props.imageUrl || '',
      });
    }
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value,
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.props.updateTea({ ...this.props.tea, ...this.state });
  }
  render() {
    return (
      <div>
        <h2>You can update product here!</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label htmlFor='name'>Name:</label>
            <input
              name='name'
              onChange={this.handleChange}
              value={this.state.name}
              placeholder='Enter the name of product'
            />
          </div>

          <div>
            <label htmlFor='description'>Description:</label>
            <input
              name='description'
              onChange={this.handleChange}
              value={this.state.description}
              placeholder='Enter the description of product'
            />
          </div>

          <div>
            <label htmlFor='price'>Price:</label>
            <input
              name='price'
              onChange={this.handleChange}
              value={this.state.price}
              placeholder='Enter the price of product'
            />
          </div>

          <div>
            <label htmlFor='imageUrl'>Image:</label>
            <input
              name='imageUrl'
              onChange={this.handleChange}
              value={this.state.imageUrl}
              placeholder='Enter the image of product'
            />
          </div>
          <button type='submit'>Submit</button>
        </form>
      </div>
    );
  }
}

// const mapStateToProps = (state) => ({
//   tea: state.singleTea,
// });

const mapStateToProps = ({ singleTea }) => ({
  singleTea,
});

const mapDispatchToProps = (dispatch, { history }) => ({
  updateTea: (tea) => dispatch(updateTea(tea, history)),
  fetchSingleTea: (id) => dispatch(fetchSingleTea(id)),
  clearTea: () => dispatch(gotSingleTea({})),
});

export default connect(mapStateToProps, mapDispatchToProps)(UpdateTea);
