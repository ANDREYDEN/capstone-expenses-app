import React from "react"
import ReactDOM from "react-dom"

import "../styles/spreadSheetTabs.scss"

const allTab = {
  filterFn: (entry) => {
    return true
  },
  name: "All",
  id: "all"
}
const loggedTab = {
  filterFn: (entry) => {
    console.log(entry)
    return true
  },
  name: "Logged",
  id: "logged"
}
const unloggedTab = {
  filterFn: (entry) => {
    console.log(entry)
    return true
  },
  name: "Unlogged",
  id: "unlogged"
}

export default class SpreadSheetTabs extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      activeTab: "all"
    }
  }

  changeTab(id) {
    this.setState({ activeTab: id })
  }

  componentDidMount() {
  }

  render() {

    const tabHeders = [allTab, loggedTab, unloggedTab].map(tab => {
      return (
        <div 
          className={`tab-header ${this.state.activeTab === tab.id ? "active" : ""}`}
          onClick={this.changeTab.bind(this, tab.id)}
        >
          <span className="tab-name">{tab.name}</span>
        </div>
      )
    })
    const tabs = [allTab, loggedTab, unloggedTab].map(tab => {

    })

    return (
      <div id="spreadSheetTabs">
        <div className="headers">
          {tabHeders}
        </div>
      </div>
    )
  }
}
