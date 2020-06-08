import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import config from '../config'
import Notes from '../components/pages/Notes'
import Article from '../components/pages/Article'
import NewNote from '../components/pages/NewNote'
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams
} from 'react-router-dom'

const Content_ = styled.section`
    margin-top: 100px;
    width: 100%;
    min-height: calc(100vh - 100px);
    padding: 50px;
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr;

    ${config.responsive.query} {
        margin-top: 150px;
        min-height: calc(100vh - 150px);
    }
`

class Unknown extends React.Component {
    render() {
        return(
            <div style={{
                width: '100%',
                textAlign: 'center',
                fontWeight: 'bold'
            }}>404</div>
        )
    }
}

class Layout extends React.Component {
    render() {
        return (
            <Router>
                <div style={{ width: '100%', height: '100%' }}>
                    <Header />
                    <Content_>
                        <Switch>
                            <Route path="/" exact>
                                <Notes />
                            </Route>

                            <Route path="/new-note">
                                <NewNote />
                            </Route>

                            <Route path="/article">
                                <Notes />
                                <Article></Article>
                            </Route>

                            <Route children={<Unknown />} />
                        </Switch>
                    </Content_>
                </div>
            </Router>
        )
    }
}

export default Layout
