import React from 'react'
import ReactDOMServer from 'react-dom/server'
import Index from './export-default.jsx'

const Component = React.createFactory(Index)
const element = Component({message: 'Hello, export-default'})
export const html = ReactDOMServer.renderToStaticMarkup(element)
