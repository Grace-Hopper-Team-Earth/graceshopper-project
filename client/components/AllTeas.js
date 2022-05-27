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
      
      return (
        <div className = 'allTeas-container'>
          {/* <h2 className="section-title">Our Teas!</h2> */}
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
        </div>
      )
    }
}

const mapStateToProps = ({allTeas}) => ({
  allTeas: allTeas.allTeas
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllTeas: () => dispatch(fetchAllTeas())
});

export default connect(mapStateToProps, mapDispatchToProps)(AllTeas);
