import React       from 'react'
import ReactDOM    from 'react-dom'
import Grid        from '../modules/Grid'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    return (
      <Grid />
    )
  }
}

ReactDOM.render(
  <App />,
  document.getElementById('main')
)
