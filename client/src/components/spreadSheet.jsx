import React from "react"
import ReactDOM from "react-dom"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)
    this.members = props.members
  }

  componentDidMount() {

  }

  render() {
    // const memberName = this.
    const memberHeaders = this.members.map(member => {
      return (
        <th>
          {member.name}
        </th>
      )
    })
    return (
      <table>
        <thead>
          <tr>
            <th>
              Item Name
            </th>
            <th>
              Prise
            </th>
            {memberHeaders}
          </tr>
        </thead>
      </table>
    )
  }
}
