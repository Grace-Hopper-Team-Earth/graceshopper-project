import React from 'react';
import { fetchSingleTea } from '../store/singleTea';
import { connect } from 'react-redux';

export class SingleTea extends React.Component {
  componentDidMount() {
    this.props.fetchSingleTea(this.props.match.params.id);
  }

  handleClick() {
    alert('Item added to your cart!');
  }
  render() {
    console.log('this is props ____', this.props);
    const { tea } = this.props;
    return (
      <div>
        <img src={tea.imageUrl} />
        <h1>{tea.name}</h1>
        <div>{tea.description}</div>
        <div>Price: ${tea.price}</div>
        <div>
          <button onClick={this.handleClick}>Add To Cart</button>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ singleTea }) => {
  return {
    tea: singleTea.singleTea,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleTea: (id) => dispatch(fetchSingleTea(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTea);
