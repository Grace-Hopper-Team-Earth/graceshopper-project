import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTeas, deleteTea } from '../store/teas';
import { Link } from 'react-router-dom';

export class AdminTeas extends React.Component {
    constructor(props) {
      super(props);
    }

    componentDidMount() {
      this.props.fetchAllTeas();
    }

    render() {
      const teas = this.props.allTeas;
      return (
        <div>
          <h2 className="section-title">Current Tea Inventory:</h2>
          <Link to='/adminportal/add'><h2>Add New Tea</h2></Link>
          {teas && teas.length > 0 ? (
              teas.map((tea) => (
                <div key={tea.id}>
                  <div>
                    <h3>{tea.name}</h3>
                    <span><h4>{tea.description}</h4> Price: $ {tea.price}</span>
                    <p>
                    <Link to={`/adminteas/${tea.id}`}>Edit This Product</Link>
                    <button
                      type='submit'
                      onClick={() => this.props.deleteTea(tea.id)}
                    >
                    Delete This Item
                    </button>
                    </p>
                  </div>
                </div>
              )
            )) : (
          <div>
            <h2>Wait, where's all the tea??</h2>
            <p>Oh no...we can't find our teas right now!</p>
            <p>Please check back later!</p>
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = ({ allTeas }) => ({
  allTeas: allTeas.allTeas
})

const mapDispatchToProps = (dispatch, { history }) => ({
  fetchAllTeas: () => dispatch(fetchAllTeas()),
  deleteTea: (id) => dispatch(deleteTea(id, history))
});

export default connect(mapStateToProps, mapDispatchToProps)(AdminTeas);
