import React from 'react'

export default class Index extends React.Component {
  render() {
    return (
      <html lang="en">
        <body>
          <h1>{this.props.message}</h1>
        </body>
      </html>
    )
  }
}

Index.propTypes = {
  message: React.PropTypes.string
}
