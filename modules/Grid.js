import React from 'react'
import assignDeep from 'object-assign-deep'

class DefaultPagination extends React.Component {
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
      <ul style={styles.pagination.ul}>
        {!isFirstPage && (
          <li style={styles.pagination.li}>
            <button 
              style   = {styles.pagination.button}
              onClick = {() => onSelect(currentPage - 1)}>
              &lt;
            </button>
          </li>
        )}
        {!firstPageIsVisible && (
          <li style={styles.pagination.li}>
            <button disabled style={styles.pagination.button}>&hellip;</button>
          </li>
        )}
        {range.map(page => {
          return (
            <li style={styles.pagination.li} key={page}>
              {currentPage === page ? (
                <span style={styles.pagination.span}>{page}</span>
              ) : (
                <button 
                  style   = {styles.pagination.button} 
                  onClick = {() => onSelect(page)}>
                  {page}
                </button>
              )}
            </li>
          )
        })}
        {!lastPageIsVisible && (
          <li style={styles.pagination.li}>
            <button disabled style={styles.pagination.button}>&hellip;</button>
          </li>
        )}
        {!isLastPage && (
          <li style={styles.pagination.li}>
            <button 
              style   = {styles.pagination.button}
              onClick = {() => onSelect(currentPage + 1)}>
              &gt;
            </button>
          </li>
        )}
      </ul>
    )
  }
}

class DefaultTable extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { rows, header, tableClassName, columnWidths, styles } = this.props
    return (
      <table style={styles.grid.table} className={tableClassName}>
        {columnWidths && (
          <colgroup style={styles.grid.colgroup}>
            {columnWidths.map((width, i) => <col style={styles.grid.col} key={i} width={width} />)}
          </colgroup>
        )}
        {header && (
          <thead style={styles.grid.header.thead}>
            <tr style={styles.grid.header.tr}>
              {header}
            </tr>
          </thead>
        )}
        <tbody style={styles.grid.body.tbody}>{rows}</tbody>
      </table>
    ) 
  }
}

class DefaultRow extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { cells, onClick, isClickable, styles } = this.props
    return (
      <tr style={styles.grid.body.tr} onClick={onClick}>
        {cells.map((item, i) => {
          return (
            <td key={i} style={styles.grid.body.td}>
              {item}
            </td>
          )
        })}
      </tr>
    ) 
  }
}

class DefaultHeaderCell extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    const { 
      label, 
      isActive, 
      isAscending, 
      onClick,
      sortingEnabled,
      styles
    } = this.props
    return (
      <th style={styles.grid.header.th} onClick={onClick}>
        {label}
        {sortingEnabled && isActive && <span>{isAscending ? '\u25bc' : '\u25b2'}</span>}
      </th>
    ) 
  }
}

class Grid extends React.Component {
  constructor(props) {
    super(props)
    const { initialSortBy, initialSortAscending, sortingEnabled } = props
    const styles = {
      grid : {
        table    : {},
        colgroup : {},
        col      : {},
        header   : {
          thead  : {},
          tr     : {},
          th     : sortingEnabled ? { cursor : 'pointer' } : {}
        },
        body     : {
          tbody  : {},
          tr     : 'function' === typeof props.onRowSelected ? { cursor : 'pointer' } : {},
          td     : {}
        }
      },
      pagination : {
        ul       : { listStyle : 'none', padding : 0 },
        li       : { float : 'left' },
        button   : { cursor : 'pointer' },
        span     : {}
      }
    }
    this.state = {
      sortBy    : initialSortBy,
      ascending : initialSortAscending,
      filterBy  : '',
      page      : 1,
      styles    : props.styles ? assignDeep({}, styles, props.styles) : styles
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
        const compare = fst.toLowerCase() < snd.toLowerCase()
        return (ascending ? compare : !compare) ? -1 : 1
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
      pageCount : filteredItems.length/itemsPerPage | 0
    }
  }
  render() {
    const { data, columns, labels, onRowSelected, tableClassName, columnWidths, noResultsMessage, maxButtons, sortingEnabled } = this.props
    const PaginationComponent = this.props.paginationComponent
    const HeaderCellComponent = this.props.headerCellComponent
    const RowComponent = this.props.rowComponent
    const TableComponent = this.props.tableComponent
    const { ascending, sortBy, page, styles } = this.state
    const { items, pageCount } = this.compile(this.sort(data)) 
    const range = this.getPageRange(pageCount)
    if (!items.length) {
      return noResultsMessage
    }
    return (
      <div>
        <TableComponent 
          styles         = {styles}
          tableClassName = {tableClassName}
          columnWidths   = {columnWidths}
          rows = {items.map((item, i) => {
            const hasClickHandler = 'function' === typeof onRowSelected
            return (
              <RowComponent 
                key         = {i}
                styles      = {styles}
                cells       = {columns.map((column, j) => {
                  const { customComponents } = this.props
                  const Component = customComponents ? customComponents[column] : null
                  return Component ? <Component row={item} data={item[column]} /> : item[column]
                })}
                isClickable = {hasClickHandler}
                onClick     = {hasClickHandler ? () => onRowSelected(item) : () => {}} />
            )
          })}
          header = {labels ? columns.map((column, i) => {
            return (
              <HeaderCellComponent 
                styles         = {styles}
                key            = {i}
                label          = {labels[column]}
                sortingEnabled = {sortingEnabled}
                isActive       = {sortBy === column}
                isAscending    = {ascending}
                onClick        = {() => this.setSortColumn(column)} />
            )
          }) : null} />
        {pageCount > 1 && (
          <PaginationComponent
            styles             = {styles}
            range              = {range}
            currentPage        = {page}
            isFirstPage        = {1 == page}
            isLastPage         = {range[range.length-1] == page}
            firstPageIsVisible = {1 == range[0]}
            lastPageIsVisible  = {pageCount == range[range.length-1]}
            onSelect           = {this.handleSelectPage} />
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
