import React from 'react';
import { Link } from 'react-router-dom';
import {connect} from 'react-redux';
import {fetchSingleTea} from '../store/singleTea';

const cardStyles = {
  container: {
    display: 'flex',
    height: 200,
    alignItems: 'center',
    justifyContent: 'space-between',
    margin: 10,
    padding: 10,
    borderRadius: 10,
    boxShadow: '0 0 1px 1px #cec7c759',
  },
  profilePicture: {
    display: 'flex',
    justifyContent: 'right',
    alignItems: 'right',
    color: 'white',
    height: 100,
    width: 100,
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
};



class TeaCard extends React.Component{
  handleClick() {
    alert('Item added to your cart!');
  }
  
  render() {
    console.log('this is props in card', this.props)
    return (
      <div style={cardStyles.container}>
        <Link to={`/teas/${this.props.tea.id}`}>
          <span>
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
          <button onClick={this.handleClick}>Add To Cart</button>
        </div>
      </div>
    );
  }}

  const mapStateToProps = ({singleTea}) => {
    return {
      singleTea: singleTea.singleTea
    };
  };
  
  const mapDispatchToProps = (dispatch) => {
    return {
      fetchSingleTea: (id) => dispatch(fetchSingleTea(id)),
    };
  };
  
  export default connect(mapStateToProps, mapDispatchToProps)(TeaCard);