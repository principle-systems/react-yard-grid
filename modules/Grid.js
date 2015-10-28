import React from 'react'

//import { Pagination, Glyphicon }
//  from 'react-bootstrap'

class DefaultPagination extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <div style={{textAlign: 'center'}}>
        Hello pagination
      </div>
    )
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    const { initialSortBy, initialSortAscending } = props
    this.state = {
      filterBy  : '',
      sortBy    : initialSortBy,
      ascending : initialSortAscending,
      page      : 1
    }
  }
  handleSelectPage(event, item) {
    this.setState({
      page : item.eventKey
    })
  }
  filterBy(filterBy) {
    this.setState({ filterBy })
  }
  setSortColumn(event, column) {
    const { sortingEnabled } = this.props
    const { ascending, sortBy } = this.state
    if (true !== sortingEnabled) {
      return
    }
    if (column === sortBy) {
      this.setState({
        ascending : !ascending
      })
    } else {
      this.setState({
        sortBy : column
      })
    }
  }
  sort(items) {
    const { sortingEnabled } = this.props
    const { ascending, sortBy } = this.state
    if (!sortBy || true !== sortingEnabled) {
      return items
    }
    return items.slice().sort((a, b) => {
      const fst = a[sortBy] || ''
      const snd = b[sortBy] || ''
      if (fst === snd) {
        return 0
      } else {
        return (ascending ? fst < snd : fst > snd) ? -1 : 1
      }
    })
  }
  compile(items) {
    if (!items || !items.length) {
      return {
        items     : [],
        pageCount : 1
      }
    }
    const { itemsPerPage, filterColumns } = this.props
    const { page, filterBy } = this.state
    const filteredItems = !filterBy || !filterColumns || !filterColumns.length ? items : items.filter(item => {
      for (let i = 0; i < filterColumns.length; i++) {
        if (String(item[filterColumns[i]]).toLowerCase().indexOf(filterBy.toLowerCase()) > -1) {
          return true
        }
      }
      return false
    })
    if (!itemsPerPage || filteredItems.length <= itemsPerPage) {
      return {
        items     : filteredItems,
        pageCount : 1
      }
    }
    const offs = itemsPerPage * (page-1)
    return {
      items     : filteredItems.slice(offs, offs + itemsPerPage),
      pageCount : Math.ceil(filteredItems.length/itemsPerPage)
    }
  }
  render() {
    console.log(this.props)
    const { data, columns, labels, onRowSelected, tableClassName, columnWidths, noResultsMessage, maxButtons } = this.props
    const PaginationComponent = this.props.paginationComponent
    const { ascending, sortBy, page } = this.state
    const { items, pageCount } = this.compile(this.sort(data)) 
    if (!items.length) {
      return noResultsMessage
    }
    return (
      <div>
        <table className={tableClassName}>
          {columnWidths.map((width, i) => {
            return (
              <col key={i} width={width} />
            )
          })}
          {labels && (
            <thead>
              <tr>
                {columns.map((column, i) => {
                  return (
                    <th key={i}>
                      <a href='#' onClick={e => { 
                        e.preventDefault(); this.setSortColumn(e, column) 
                      }}>
                        {sortBy === column && (
                          <span>
                            <i className={`fa fa-arrow-${ascending ? 'down' : 'up'} fa-fw`} />&nbsp;
                          </span>
                        )}
                        {labels[column]}
                      </a>
                    </th>
                  )
                })}
              </tr>
            </thead>
          )}
          <tbody>
            {items.map((item, i) => {
              const cells = columns.map((column, j) => {
                const { customComponents } = this.props
                const Component = customComponents ? customComponents[column] : null
                return (
                  <td key={j}>
                    {Component ? <Component row={item} data={item[column]} /> : item[column]}
                  </td>
                )
              })
              return 'function' === typeof(onRowSelected) ? (
                <tr style={{cursor: 'pointer'}} onClick={() => onRowSelected(item)} key={i}>{cells}</tr>
              ) : (
                <tr key={i}>{cells}</tr>
              )
            })}
          </tbody>
        </table>
        {pageCount > 1 && (
          <PaginationComponent
            items      = {pageCount}
            activePage = {page}
            maxButtons = {maxButtons}
            onSelect   = {this.handleSelectPage} />
        )}
      </div>
    )
  }
}

Grid.defaultProps = {
  filterColumns        : [],
  itemsPerPage         : 10,
  maxButtons           : 10,
  sortingEnabled       : true,
  initialSortBy        : null,
  initialSortAscending : true,
  columnWidths         : [],
  paginationComponent  : DefaultPagination,
  noResultsMessage     : (
    <div>
      <hr style={{margin : '.5em 0 .6em'}} />
      <span style={{color : '#aaa'}}>
        [ x ] There are no results to show.
      </span>
    </div>
  )
}

export default Grid