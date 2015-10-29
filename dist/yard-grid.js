'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _objectAssignDeep = require('object-assign-deep');

var _objectAssignDeep2 = _interopRequireDefault(_objectAssignDeep);

var DefaultPagination = (function (_React$Component) {
  _inherits(DefaultPagination, _React$Component);

  function DefaultPagination(props) {
    _classCallCheck(this, DefaultPagination);

    _get(Object.getPrototypeOf(DefaultPagination.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DefaultPagination, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var range = _props.range;
      var currentPage = _props.currentPage;
      var isFirstPage = _props.isFirstPage;
      var isLastPage = _props.isLastPage;
      var firstPageIsVisible = _props.firstPageIsVisible;
      var lastPageIsVisible = _props.lastPageIsVisible;
      var onSelect = _props.onSelect;
      var styles = _props.styles;

      return _react2['default'].createElement(
        'ul',
        { style: styles.pagination.ul },
        !isFirstPage && _react2['default'].createElement(
          'li',
          { style: styles.pagination.li },
          _react2['default'].createElement(
            'button',
            {
              style: styles.pagination.button,
              onClick: function () {
                return onSelect(currentPage - 1);
              } },
            '<'
          )
        ),
        !firstPageIsVisible && _react2['default'].createElement(
          'li',
          { style: styles.pagination.li },
          _react2['default'].createElement(
            'button',
            { disabled: true, style: styles.pagination.button },
            '…'
          )
        ),
        range.map(function (page) {
          return _react2['default'].createElement(
            'li',
            { style: styles.pagination.li, key: page },
            currentPage === page ? _react2['default'].createElement(
              'span',
              { style: styles.pagination.span },
              page
            ) : _react2['default'].createElement(
              'button',
              {
                style: styles.pagination.button,
                onClick: function () {
                  return onSelect(page);
                } },
              page
            )
          );
        }),
        !lastPageIsVisible && _react2['default'].createElement(
          'li',
          { style: styles.pagination.li },
          _react2['default'].createElement(
            'button',
            { disabled: true, style: styles.pagination.button },
            '…'
          )
        ),
        !isLastPage && _react2['default'].createElement(
          'li',
          { style: styles.pagination.li },
          _react2['default'].createElement(
            'button',
            {
              style: styles.pagination.button,
              onClick: function () {
                return onSelect(currentPage + 1);
              } },
            '>'
          )
        )
      );
    }
  }]);

  return DefaultPagination;
})(_react2['default'].Component);

var DefaultTable = (function (_React$Component2) {
  _inherits(DefaultTable, _React$Component2);

  function DefaultTable(props) {
    _classCallCheck(this, DefaultTable);

    _get(Object.getPrototypeOf(DefaultTable.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DefaultTable, [{
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var rows = _props2.rows;
      var header = _props2.header;
      var tableClassName = _props2.tableClassName;
      var columnWidths = _props2.columnWidths;
      var styles = _props2.styles;

      return _react2['default'].createElement(
        'table',
        { style: styles.grid.table, className: tableClassName },
        columnWidths && _react2['default'].createElement(
          'colgroup',
          { style: styles.grid.colgroup },
          columnWidths.map(function (width, i) {
            return _react2['default'].createElement('col', { style: styles.grid.col, key: i, width: width });
          })
        ),
        header && _react2['default'].createElement(
          'thead',
          { style: styles.grid.header.thead },
          _react2['default'].createElement(
            'tr',
            { style: styles.grid.header.tr },
            header
          )
        ),
        _react2['default'].createElement(
          'tbody',
          { style: styles.grid.body.tbody },
          rows
        )
      );
    }
  }]);

  return DefaultTable;
})(_react2['default'].Component);

var DefaultRow = (function (_React$Component3) {
  _inherits(DefaultRow, _React$Component3);

  function DefaultRow(props) {
    _classCallCheck(this, DefaultRow);

    _get(Object.getPrototypeOf(DefaultRow.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DefaultRow, [{
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var cells = _props3.cells;
      var onClick = _props3.onClick;
      var isClickable = _props3.isClickable;
      var styles = _props3.styles;

      return _react2['default'].createElement(
        'tr',
        { style: styles.grid.body.tr, onClick: onClick },
        cells.map(function (item, i) {
          return _react2['default'].createElement(
            'td',
            { key: i, style: styles.grid.body.td },
            item
          );
        })
      );
    }
  }]);

  return DefaultRow;
})(_react2['default'].Component);

var DefaultHeaderCell = (function (_React$Component4) {
  _inherits(DefaultHeaderCell, _React$Component4);

  function DefaultHeaderCell(props) {
    _classCallCheck(this, DefaultHeaderCell);

    _get(Object.getPrototypeOf(DefaultHeaderCell.prototype), 'constructor', this).call(this, props);
  }

  _createClass(DefaultHeaderCell, [{
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var label = _props4.label;
      var isActive = _props4.isActive;
      var isAscending = _props4.isAscending;
      var onClick = _props4.onClick;
      var sortingEnabled = _props4.sortingEnabled;
      var styles = _props4.styles;

      return _react2['default'].createElement(
        'th',
        { style: styles.grid.header.th, onClick: onClick },
        label,
        sortingEnabled && isActive && _react2['default'].createElement(
          'span',
          null,
          isAscending ? '▼' : '▲'
        )
      );
    }
  }]);

  return DefaultHeaderCell;
})(_react2['default'].Component);

var Grid = (function (_React$Component5) {
  _inherits(Grid, _React$Component5);

  function Grid(props) {
    _classCallCheck(this, Grid);

    _get(Object.getPrototypeOf(Grid.prototype), 'constructor', this).call(this, props);
    var initialSortBy = props.initialSortBy;
    var initialSortAscending = props.initialSortAscending;
    var sortingEnabled = props.sortingEnabled;

    var styles = {
      grid: {
        table: {},
        colgroup: {},
        col: {},
        header: {
          thead: {},
          tr: {},
          th: sortingEnabled ? { cursor: 'pointer' } : {}
        },
        body: {
          tbody: {},
          tr: 'function' === typeof props.onRowSelected ? { cursor: 'pointer' } : {},
          td: {}
        }
      },
      pagination: {
        ul: { listStyle: 'none', padding: 0 },
        li: { float: 'left' },
        button: { cursor: 'pointer' },
        span: {}
      }
    };
    this.state = {
      sortBy: initialSortBy,
      ascending: initialSortAscending,
      filterBy: '',
      page: 1,
      styles: props.styles ? (0, _objectAssignDeep2['default'])({}, styles, props.styles) : styles
    };
    this.handleSelectPage = this.handleSelectPage.bind(this);
    this.getPageRange = this.getPageRange.bind(this);
  }

  _createClass(Grid, [{
    key: 'handleSelectPage',
    value: function handleSelectPage(page) {
      this.setState({ page: page });
    }
  }, {
    key: 'setFilter',
    value: function setFilter(filterBy) {
      this.setState({ page: 1, filterBy: filterBy });
    }
  }, {
    key: 'setSortColumn',
    value: function setSortColumn(column) {
      var sortingEnabled = this.props.sortingEnabled;
      var _state = this.state;
      var ascending = _state.ascending;
      var sortBy = _state.sortBy;

      if (true !== sortingEnabled) {
        return;
      }
      if (column === sortBy) {
        this.setState({
          ascending: !ascending
        });
      } else {
        this.setState({
          sortBy: column
        });
      }
    }
  }, {
    key: 'getPageRange',
    value: function getPageRange(items) {
      var maxButtons = this.props.maxButtons;
      var page = this.state.page;

      var m = page - (maxButtons / 2 | 0);

      var _ref = items > maxButtons ? [maxButtons, m < 1 ? 1 : m + maxButtons > items ? items - maxButtons : m] : [items - 1, 1];

      var _ref2 = _slicedToArray(_ref, 2);

      var pages = _ref2[0];
      var from = _ref2[1];

      var to = from + pages;
      var range = [];
      for (var i = from; i <= to; i++) {
        range.push(i);
      }
      return range;
    }
  }, {
    key: 'sort',
    value: function sort(items) {
      var sortingEnabled = this.props.sortingEnabled;
      var _state2 = this.state;
      var ascending = _state2.ascending;
      var sortBy = _state2.sortBy;

      if (!sortBy || true !== sortingEnabled) {
        return items;
      }
      return items.slice().sort(function (a, b) {
        var fst = a[sortBy] || '';
        var snd = b[sortBy] || '';
        if (fst === snd) {
          return 0;
        } else {
          var compare = fst.toLowerCase() < snd.toLowerCase();
          return (ascending ? compare : !compare) ? -1 : 1;
        }
      });
    }
  }, {
    key: 'compile',
    value: function compile(items) {
      if (!items || !items.length) {
        return {
          items: [],
          pageCount: 1
        };
      }
      var _props5 = this.props;
      var itemsPerPage = _props5.itemsPerPage;
      var filterColumns = _props5.filterColumns;
      var _state3 = this.state;
      var page = _state3.page;
      var filterBy = _state3.filterBy;

      var filteredItems = !filterBy || !filterColumns || !filterColumns.length ? items : items.filter(function (item) {
        for (var i = 0; i < filterColumns.length; i++) {
          if (String(item[filterColumns[i]]).toLowerCase().indexOf(filterBy.toLowerCase()) > -1) {
            return true;
          }
        }
        return false;
      });
      if (!itemsPerPage || filteredItems.length <= itemsPerPage) {
        return {
          items: filteredItems,
          pageCount: 1
        };
      }
      var offs = itemsPerPage * (page - 1);
      return {
        items: filteredItems.slice(offs, offs + itemsPerPage),
        pageCount: Math.ceil(filteredItems.length / itemsPerPage)
      };
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var _props6 = this.props;
      var data = _props6.data;
      var columns = _props6.columns;
      var labels = _props6.labels;
      var onRowSelected = _props6.onRowSelected;
      var tableClassName = _props6.tableClassName;
      var columnWidths = _props6.columnWidths;
      var noResultsMessage = _props6.noResultsMessage;
      var maxButtons = _props6.maxButtons;
      var sortingEnabled = _props6.sortingEnabled;

      var PaginationComponent = this.props.paginationComponent;
      var HeaderCellComponent = this.props.headerCellComponent;
      var RowComponent = this.props.rowComponent;
      var TableComponent = this.props.tableComponent;
      var _state4 = this.state;
      var ascending = _state4.ascending;
      var sortBy = _state4.sortBy;
      var page = _state4.page;
      var styles = _state4.styles;

      var _compile = this.compile(this.sort(data));

      var items = _compile.items;
      var pageCount = _compile.pageCount;

      var range = this.getPageRange(pageCount);
      if (!items.length) {
        return noResultsMessage;
      }
      return _react2['default'].createElement(
        'div',
        null,
        _react2['default'].createElement(TableComponent, {
          styles: styles,
          tableClassName: tableClassName,
          columnWidths: columnWidths,
          rows: items.map(function (item, i) {
            var hasClickHandler = 'function' === typeof onRowSelected;
            return _react2['default'].createElement(RowComponent, {
              key: i,
              styles: styles,
              cells: columns.map(function (column, j) {
                var customComponents = _this.props.customComponents;

                var Component = customComponents ? customComponents[column] : null;
                return Component ? _react2['default'].createElement(Component, { row: item, data: item[column] }) : item[column];
              }),
              isClickable: hasClickHandler,
              onClick: hasClickHandler ? function () {
                return onRowSelected(item);
              } : function () {} });
          }),
          header: labels ? columns.map(function (column, i) {
            return _react2['default'].createElement(HeaderCellComponent, {
              styles: styles,
              key: i,
              label: labels[column],
              sortingEnabled: sortingEnabled,
              isActive: sortBy === column,
              isAscending: ascending,
              onClick: function () {
                return _this.setSortColumn(column);
              } });
          }) : null }),
        pageCount > 1 && _react2['default'].createElement(PaginationComponent, {
          styles: styles,
          range: range,
          currentPage: page,
          isFirstPage: 1 == page,
          isLastPage: range[range.length - 1] == page,
          firstPageIsVisible: 1 == range[0],
          lastPageIsVisible: pageCount == range[range.length - 1],
          onSelect: this.handleSelectPage })
      );
    }
  }]);

  return Grid;
})(_react2['default'].Component);

Grid.defaultProps = {
  filterColumns: [],
  itemsPerPage: 10,
  maxButtons: 10,
  sortingEnabled: true,
  initialSortBy: null,
  initialSortAscending: true,
  columnWidths: [],
  paginationComponent: DefaultPagination,
  tableComponent: DefaultTable,
  rowComponent: DefaultRow,
  headerCellComponent: DefaultHeaderCell,
  noResultsMessage: _react2['default'].createElement(
    'div',
    null,
    'There are no results to show.'
  )
};

exports['default'] = Grid;
module.exports = exports['default'];

//# sourceMappingURL=yard-grid.js.map