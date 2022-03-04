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
                <h2>What, no robots??</h2>
                <p>
                  It looks like we don't have any robots on staff right now.
                </p>
                <p>
                  Know some great robots? Add them to our database using the
                  form above.
                </p>
                <img
                  className="cartoon"
                  src="https://imgc.artprintimages.com/img/print/a-dusty-robot-plugs-itself-in-new-yorker-cartoon_u-l-pgqu1p0.jpg?artPerspective=n"
                  width="100%"
                  height="100%"
                />
                <Link to="/robotsjokes">Want more robot jokes?</Link>
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
