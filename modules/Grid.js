import React from 'react'

class DefaultPagination extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { range, currentPage, onSelect } = this.props
    return (
      <ul>
        {range.map(page => {
          return (
            <li key={page}>
              {currentPage === page ? (
                <span>{page}</span>
              ) : (
                <a href='#' onClick={() => onSelect(page)}>{page}</a>
              )}
            </li>
          )
        })}
      </ul>
    )
  }
}

class DefaultTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <table />
    ) 
  }
}

class DefaultRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <tr>
        <td>
          hello
        </td>
      </tr>
    ) 
  }
}

class DefaultHeaderCell extends React.Component {
  constructor(props) {
    super(props)
  }
  handleClickEvent(event) {
    event.preventDefault()
    this.props.onClickEvent()
  }
  render() {
    const { label, isActive, isAscending } = this.props
    return (
      <span>
        {isActive ? (
          <span>{label}
            <a href='#' onClick={this.handleClickEvent.bind(this)}>{isAscending ? '[asc]' : '[desc]'}</a>
          </span>
        ) : (
          <a href='#' onClick={this.handleClickEvent.bind(this)}>{label}</a>
        )}
      </span>
    ) 
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    const { initialSortBy, initialSortAscending } = props
    this.state = {
      sortBy    : initialSortBy,
      ascending : initialSortAscending,
      filterBy  : '',
      page      : 1
    }
    this.handleSelectPage = this.handleSelectPage.bind(this)
    this.getPageRange = this.getPageRange.bind(this)
  }
  handleSelectPage(page) {
    this.setState({ page })
  }
  setFilter(filterBy) {
    this.setState({ page : 1, filterBy })
  }
  setSortColumn(column) {
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
  getPageRange(items) {
    const { maxButtons } = this.props
    const { page } = this.state
    const m = page - (maxButtons/2 | 0)
    const [ pages, from ] = items > maxButtons 
      ? [ maxButtons, m < 1 ? 1 : (m + maxButtons > items ? items - maxButtons : m) ] 
      : [ items, 1 ]
    const to = from + pages
    let range = []
    for (let i = from; i <= to; i++) {
      range.push(i)
    }
    return range
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
    const { data, columns, labels, onRowSelected, tableClassName, columnWidths, noResultsMessage, maxButtons } = this.props
    const PaginationComponent = this.props.paginationComponent
    const HeaderCellComponent = this.props.headerCellComponent
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
                      <HeaderCellComponent 
                        label             = {labels[column]}
                        isActive          = {sortBy === column}
                        isAscending       = {ascending}
                        onClickEvent      = {() => this.setSortColumn(column)} />
                      {/*
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
                      */}
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
            range       = {this.getPageRange(pageCount)}
            currentPage = {page}
            onSelect    = {this.handleSelectPage} />
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
  tableComponent       : DefaultTable,
  rowComponent         : DefaultRow,
  headerCellComponent  : DefaultHeaderCell,
  noResultsMessage     : (
    <div>
      There are no results to show.
    </div>
  )
}

export default Grid
