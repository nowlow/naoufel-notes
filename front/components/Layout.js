import React from 'react'
import styled from 'styled-components'
import Header from '../components/Header'
import responsive from '../responsive'

const Content_ = styled.section`
    margin-top: 100px;
    width: 100%;
    min-height: calc(100vh - 100px);
    padding: 50px;
    box-sizing: border-box;

    @media screen and (max-width: ${responsive.width}px) and (min-height: ${responsive.height}px) {
        margin-top: 150px;
        min-height: calc(100vh - 150px);
    }
`

class Layout extends React.Component {
    render() {
        return (
            <div style={{ width: '100%', height: '100%' }}>
                <Header />
                <Content_>{this.props.page}</Content_>
            </div>
        )
    }
}

export default Layout
