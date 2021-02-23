import React from 'react'
import ReactDOM from 'react-dom'
import ExpenceSheetList from '../components/expenceSheetList.jsx'


export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <main>
        <ExpenceSheetList />
      </main>
    )
  }
}
