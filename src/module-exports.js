import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Index from './module-exports.jsx'

const Component = React.createFactory(Index)
const element = Component({message: 'Hello, module-exports'})
export const html = ReactDOMServer.renderToStaticMarkup(element)
