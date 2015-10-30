import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../../../modules/Grid'
import data        from '../../../js/examples/data/users'

const columns = ['id', 'first_name', 'last_name', 'email', 'country', 'ip_address']

ReactDOM.render(
  <Grid columns={columns} data={data} />,
  document.getElementById('main')
)
