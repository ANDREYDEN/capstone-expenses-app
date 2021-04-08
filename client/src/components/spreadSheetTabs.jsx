import React from "react"
import ReactDOM from "react-dom"

import SpreadSheet from "../components/spreadSheet.jsx"

const alphabeticalComparator = (a, b) => {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}

const allTab = {
  filterFn: function(entry) {
    return true
  },
  sortFn: function(a, b) {
    if (a.userCheckedIds[this.userId] === undefined && b.userCheckedIds[this.userId] !== undefined) {
      return 1
    }
    if (b.userCheckedIds[this.userId] === undefined && a.userCheckedIds[this.userId] !== undefined) {
      return -1
    }
    return alphabeticalComparator(a, b)
  },
  name: "All",
  id: "all"
}
const loggedTab = {
  filterFn: function(entry) {
    return entry.userCheckedIds[this.userId] === undefined
  },
  sortFn: alphabeticalComparator,
  name: "Logged",
  id: "logged"
}
const unloggedTab = {
  filterFn: function(entry) {
    return entry.userCheckedIds[this.userId] !== undefined
  },
  sortFn: alphabeticalComparator,
  name: "Unlogged",
  id: "unlogged"
}

export default class SpreadSheetTabs extends React.Component {
  constructor(props) {
    super(props)
    console.log(props)
    this.userId = window.userId()
    this.state = {
      activeTab: allTab.id
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
        <li
          key={tab.id}
          className={`tab-header ${this.state.activeTab === tab.id ? "active" : ""}`}
          onClick={this.changeTab.bind(this, tab.id)}
        >
          <span className="tab-name">{tab.name}</span>
        </li>
      )
    })
    const tabs = [allTab, loggedTab, unloggedTab].map(tab => {
      const entries = this.props.entries
        .filter(tab.filterFn.bind(this))
        .sort(tab.sortFn.bind(this))
      return (<div
          className={`tab-content ${this.state.activeTab === tab.id ? "active" : ""}`}
          key={tab.id}
        >
          <SpreadSheet
            members={this.props.members}
            sheetId={this.props.sheetId}
            entries={entries}
          />
        </div>
      )
    })

    return (
      <div id="spreadSheetTabs">
        <ul className="headers">
          {tabHeders}
        </ul>
        <div className="tabs">
          {tabs}
        </div>
      </div>
    )
  }
}
