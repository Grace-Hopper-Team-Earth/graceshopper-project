import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTeas } from '../store/teas';
import { Link } from 'react-router-dom';

export class AllTeas extends React.Component {
    componentDidMount() {
      this.props.fetchAllTeas();
    }

    render() {
      const teas = this.props.teas;
      console.log('this.props in render:', this.props)
      console.log('teas inside render:', teas)
      return (
        <div>
          <h2 className="section-title">Our Teas!</h2>
          <ul>
            {teas.map((tea) => (
              <li key={tea.id}>
                <div>
                  <h3>{tea.name}</h3>
                  <p>{tea.description}</p>
                  <Link to={`/teas/${tea.id}`} key={tea.id}>Single View</Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )
    }
}

const mapStateToProps = (state) => ({
  teas: state.teas
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTeas: () => dispatch(fetchAllTeas())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTeas);
