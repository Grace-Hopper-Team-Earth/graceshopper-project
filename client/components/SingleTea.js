import React from 'react';
import { fetchSingleTea } from '../store/singleTea';
import { connect } from 'react-redux';
import { addTeaToCart } from '../store/cart';

export class SingleTea extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
  }
  componentDidMount() {
    this.props.fetchSingleTea(this.props.match.params.id);
  }

  handleClick() {
    this.props.addTeaToCart(this.props.tea, this.props.isLoggedIn)
    alert('Item added to your cart!');
  }
  render() {
    console.log('this is props ____', this.props);
    const { tea } = this.props;
    return (
      <div>
        <img src={tea.imageUrl}  
            width="200"
            height="200"
            border-radius="30px" />
        <h1>{tea.name}</h1>
        <div>{tea.description}</div>
        <div>Price: ${tea.price}</div>
        <div>
          <button onClick={this.handleClick}>Add To Cart</button>
          {/* <button type="button"  onClick={() => this.props.tea.addTeaToCart(tea.id)}>Add to cart</button> */}
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
    addTeaToCart: (id) => dispatch(addTeaToCart(id))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTea);
