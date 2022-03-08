import React from 'react';
import { fetchSingleTea } from '../store/singleTea';
import { connect } from 'react-redux';
import UpdateTea from './UpdateTea';

export class AdminSingleTea extends React.Component {

  componentDidMount() {
    this.props.fetchSingleTea(this.props.match.params.id);
  }

  render() {
    const { tea } = this.props;
    return (
      <div>
        <img src={tea.imageUrl} width='200' height='200' border-radius='30px' />
        <h1>{tea.name}</h1>
        <div>{tea.description}</div>
        <div>Price: $ {tea.price}</div>
        <div>
          <UpdateTea {...this.props} />
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

export default connect(mapStateToProps, mapDispatchToProps)(AdminSingleTea);
