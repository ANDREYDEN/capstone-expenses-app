import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"


export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <main>
        <Router>
          <Route path="/">
            <ExpenseSheetList />
          </Route>
        </Router>
      </main>
    )
  }
}
