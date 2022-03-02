import React from 'react'
import {fetchSingleTea} from '../store/singleTea'
inport {connect} from 'react-redux'


export class SingleTea extends React.Component {
  componentDidMount() {
    this.props.fetchSingleTea(this.props.match.params.id)
  }
  render () {
    const {tea} = this.props
    return (
      <div>
        <div>{tea.imageUrl}</div>
        <h1>{tea.name}</h1>
        <div>{tea.description}</div>
        <div>{tea.price}</div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    tea: state.tea
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSingleTea: (id) => dispatch(fetchSingleTea(id))
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SingleTea);