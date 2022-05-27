import React from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSingleTea} from '../store/singleTea';
import { addTeaToCart } from '../store/cart';
import { fetchSingleUser } from '../store/users';
const MySwal = withReactContent(Swal);


const cardStyles = {
  container: {
    display: 'flex',
    width: 325,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 30,
    padding: 10,
    borderRadius: 10,
    border: '1px solid #cec7c759',
    boxShadow: '0 0 1px 1px #cec7c759',
  },
  imageWrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  profilePicture: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'right',
    color: 'white',
    height: 150,
    width: 150,
    borderRadius: '50%',
    padding: 10,
    margin:10,
    fontWeight: 'bold',
  },
  teaName: {
    margin: 10
  },
  teaDescription: {
    color: '#584C56', 
    margin: 10
  },
  button: {
    borderRadius: '10px',
    border: 'none',
    backgroundColor: '#1FA2F8',
    color: 'white',
    height: '25px'
  }
};



class TeaCard extends React.Component{
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
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
    return (
        <div style={cardStyles.container}>
          <Link to={`/teas/${this.props.tea.id}`}>
            <span style={cardStyles.imageWrapper}>
              <img
                style={cardStyles.profilePicture}
                src={this.props.tea.imageUrl}
                width="50"
                height="50"
                border-radius="30px"
              />
            </span>
            <span>
              <h3 style={cardStyles.teaName}>{this.props.tea.name}</h3>
              <p style={cardStyles.teaDescription}>{this.props.tea.description}</p>
            </span>
          </Link>
          <div>
            <button style={cardStyles.button} onClick={this.handleClick}>Add To Cart</button>
          </div>
        </div>
    );
  }}

  const mapStateToProps = (state) => {
    return {
      singleTea: state.singleTea.singleTea,
      isLoggedIn: !!state.auth.id
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchSingleTea: (id) => dispatch(fetchSingleTea(id)),
      addTeaToCart: (id, isLoggedIn) => dispatch(addTeaToCart(id, isLoggedIn)),
      fetchSingleUser: (id) => dispatch(fetchSingleUser(id))
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TeaCard);
  