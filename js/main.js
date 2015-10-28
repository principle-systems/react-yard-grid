import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../modules/Grid'

const data = [
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Palak Paneer'
  },
  {
    name : 'Kadai Veg'
  }
]

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      filter : ''
    }
    this.handleFilterChange = this.handleFilterChange.bind(this)
  }
  handleFilterChange(event) {
    const filter = event.target.value
    this.setState({ filter })
    this.refs.grid.setFilter(filter)
  }
  render() {
    const { filter } = this.state
    return (
      <div>
        <input 
          type          = 'text' 
          value         = {filter} 
          onChange      = {this.handleFilterChange} 
          placeholder   = 'Filter by' />
        <Grid 
          ref           = 'grid'
          columns       = {['name']}
          filterColumns = {['name']}
          data          = {data} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
