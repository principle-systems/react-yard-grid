import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../modules/Grid'
import data        from '../js/examples/testdata'

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
          style          = {{margin: '1em 0'}}
          type           = 'text' 
          value          = {filter} 
          onChange       = {this.handleFilterChange} 
          placeholder    = 'Filter by' />
        <Grid 
          ref            = 'grid'
          columns        = {['unitSize', 'name', 'sku', 'description']}
          columnWidths   = {['10%', '20%', '10%', '60%']}
          sortingEnabled = {true}
          itemsPerPage   = {7}
          labels         = {{
            'unitSize'    : 'Unit size',
            'name'        : 'Product name',
            'sku'         : 'SKU',
            'description' : 'Description'
          }}
          filterColumns  = {['name', 'sku']}
          onRowSelected  = {row => { console.log(row) }}
          data           = {data}
          styles         = {{
            grid : {
              table : { border: '1px solid #dedede' },
              body : {
                td : { border: '1px solid #dedede' }
              }
            },
            pagination : {
              span : {
                display    : 'block',
                float      : 'left',
                padding    : '.3em .5em',
              },
              button : {
                background : 'none',
                border     : '1px solid #dedede',
                padding    : '.3em .5em',
                fontSize   : '1em',
                cursor     : 'pointer'
              }
            }
          }} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
