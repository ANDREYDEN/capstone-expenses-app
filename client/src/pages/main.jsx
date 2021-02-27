import React from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom"
import ExpenseSheetList from "../components/expenseSheetList.jsx"
import ExpenseSheet from "../pages/expenseSheet.jsx"


export default class Main extends React.Component {
  componentDidMount() {
  }

  render() {
    return (
      <main>
        <Router>
          <Route exact path="">
            <ExpenseSheetList />
          </Route>
          <Route exact path="/sheets/:id" component={ExpenseSheet} />
        </Router>
      </main>
    )
  }
}
