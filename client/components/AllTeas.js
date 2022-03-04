import React from 'react';
import { connect } from 'react-redux';
import { fetchAllTeas } from '../store/teas';
import { Link } from 'react-router-dom';
import TeaListCard from './TeaListCard';

export class AllTeas extends React.Component {
    componentDidMount() {
      this.props.fetchAllTeas();
    }

    render() {
      const teas = this.props.allTeas;
      console.log('this.props in render:', this.props)
      console.log('teas inside render:', teas)
      return (
        <div>
          <h2 className="section-title">Our Teas!</h2>
          {/* <ul> */}
          {teas && teas.length > 0 ? (
              teas.map((tea) => (
                <div key={tea.id}>
                  <TeaListCard
                    key={tea.id}
                    tea={tea}
                    teaid={tea.id}
                    history={this.props.history}
                  />
                </div>
              ))
            ) : (
              <div>
                <h2>Wait, where's all the tea??</h2>
                <p>
                  Oh no...we can't find our teas right now!
                </p>
                <p>
                  Please check back later!
                </p>

              </div>
            )}
            {/* {teas.map((tea) => (
              <li key={tea.id}>
                <div>
                  <h3>{tea.name}</h3>
                  <p>{tea.description}</p>
                  <Link to={`/teas/${tea.id}`} key={tea.id}>Single View</Link>
                </div>
              </li>
            ))} */}
          {/* </ul> */}
        </div>
      )
    }
}

const mapStateToProps = ({allTeas}) => ({
  //jess trying things...
  // teas: allTeas.allTeas
  allTeas: allTeas.allTeas
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTeas: () => dispatch(fetchAllTeas())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTeas);
