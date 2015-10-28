import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../modules/Grid'

const data = [
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
  }
  render() {
    return (
      <div>
        hello
        <Grid 
          columns = {['name']}
          data    = {data} />
      </div>
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
