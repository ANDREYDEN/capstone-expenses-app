import React from "react"
import ReactDOM from "react-dom"

export default class SpreadSheet extends React.Component {
  constructor(props) {
    super(props)

    this.members = props.memebrs
  }

  componentDidMount() {

  }

  render() {
    // const memberName = this.
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
          </tr>
        </thead>
      </table>
    )
  }
}
