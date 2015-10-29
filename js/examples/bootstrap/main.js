import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../../../modules/Grid'
import data        from '../../../js/examples/testdata'

class BootstrapPagination extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { 
      range, 
      currentPage, 
      isFirstPage, 
      isLastPage, 
      firstPageIsVisible,
      lastPageIsVisible,
      onSelect, 
      styles 
    } = this.props
    return (
      <nav style={{
        position   : 'fixed',
        bottom     : 0,
        left       : 0,
        width      : '100%',
        padding    : '1em 0',
        background : '#fff',
        borderTop  : '1px solid #dcdcdc',
        textAlign  : 'center'
      }}>
        <ul className='pagination'>
          {!isFirstPage && (
            <li>
              <a href='#' onClick = {() => onSelect(currentPage - 1)}>
                <span>&laquo;</span>
              </a>
            </li>
          )}
          {!firstPageIsVisible && (
            <li className='disabled'>
              <a href='#' onClick = {() => {}}>
                <span>&hellip;</span>
              </a>
            </li>
          )}
          {range.map(page => {
            return (
              <li className={currentPage == page ? 'active' : ''} key={page}>
                <a href='#' onClick = {() => onSelect(page)}>
                  {page}
                </a>
              </li>
            )
          })}
          {!lastPageIsVisible && (
            <li className='disabled'>
              <a href='#' onClick = {() => {}}>
                <span>&hellip;</span>
              </a>
            </li>
          )}
          {!isLastPage && (
            <li>
              <a href='#' onClick = {() => onSelect(currentPage + 1)}>
                <span>&raquo;</span>
              </a>
            </li>
          )}
        </ul>
      </nav>
    )
  }
}

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
      <div className='panel panel-default'>
        <div className='panel-body'>
          <div className='input-group' style={{width: '100%'}}>
            <input 
              className      = 'form-control'
              style          = {{marginBottom: '1em'}}
              type           = 'text' 
              value          = {filter}
              onChange       = {this.handleFilterChange} 
              placeholder    = 'Filter by' />
          </div>
          <Grid 
            ref                 = 'grid'
            tableClassName      = 'table table-striped table-hover table-condensed'
            columns             = {['unitSize', 'name', 'sku', 'description']}
            columnWidths        = {['10%', '20%', '10%', '60%']}
            sortingEnabled      = {true}
            itemsPerPage        = {5}
            labels              = {{
              'unitSize'    : 'Unit size',
              'name'        : 'Product name',
              'sku'         : 'SKU',
              'description' : 'Description'
            }}
            filterColumns       = {['name', 'sku']}
            onRowSelected       = {row => { console.log(row) }}
            data                = {data} 
            paginationComponent = {BootstrapPagination} />
        </div>
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
