import React from 'react'
import ReactDOM from 'react-dom'
import Layout from '../components/Layout'
import Notes from '../components/pages/Notes'

ReactDOM.render(<Layout page={<Notes />} />, document.getElementById('root'));