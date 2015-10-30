import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../../../modules/Grid'
import data        from '../../../js/examples/data/users'

const columns = ['id', 'first_name', 'last_name', 'email', 'country', 'ip_address']

class FilterComponent extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter : ''
    }
  }
  handleFilterUpdate(event) {
    const filter = event.target.value
    this.setState({filter}) 
    this.refs.grid.setFilter(filter)
  }
  render() {
    const { filter } = this.state
    return (
      <div>
        <input 
          type          = 'text'
          value         = {filter}
          onChange      = {this.handleFilterUpdate.bind(this)} />
        <Grid
          ref           = 'grid'
          columns       = {columns}
          filterColumns = {['first_name', 'last_name']}
          data          = {data} />
      </div>
    )
  }
}

ReactDOM.render(
  <FilterComponent />,
  document.getElementById('main')
)
