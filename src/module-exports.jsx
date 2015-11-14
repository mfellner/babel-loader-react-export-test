import React from 'react'

class Index extends React.Component {
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

Index.defaultProps = {
  message: 'no message provided'
}

module.exports = Index
