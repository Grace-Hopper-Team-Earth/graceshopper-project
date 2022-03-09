import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { fetchSingleTea } from '../store/singleTea';
import { connect } from 'react-redux';
import { addTeaToCart } from '../store/cart';
const MySwal = withReactContent(Swal);

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
    MySwal.fire({
      title: 'Woohoo!',
      text: 'Item added to your cart!',
      icon: 'success',
      iconColor: '#1FA2F8',
      confirmButtonText: 'OK',
      confirmButtonColor: '#1FA2F8'
    })
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
        <div>Price: $ {tea.price}</div>
        <div>
          <button onClick={this.handleClick}>Add To Cart</button>
          {/* <button type="button"  onClick={() => this.props.tea.addTeaToCart(tea.id)}>Add to cart</button> */}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tea: state.singleTea.singleTea,
    isLoggedIn: !!state.auth.id
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleTea: (id) => dispatch(fetchSingleTea(id)),
    addTeaToCart: (id, isLoggedIn) => dispatch(addTeaToCart(id, isLoggedIn))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleTea);
