import React from 'react'
import styled from 'styled-components'
import responsive from '../../responsive'

const Article_ = styled.section`
padding: 20px;
border: 1px solid rgba(200, 200, 200, 1);
border-radius: 5px;
width: 40%;
box-sizing: border-box;

transition: width .2s ease-in-out;

h3 {
    font-weight: bold;
    margin-bottom: 10px;
}

.date {
    margin-top: 10px;
    color: rgb(150, 150, 150);
    font-size: 0.7em;
}

@media screen and (max-width: 1200px) {
    width: 80%;
}

@media screen and (max-width: ${responsive.width}px) and (min-height: ${responsive.height}px) {
    width: 100%;
    padding: 40px;

    h3 {
        font-size: 4em;
        margin-bottom: 30px;
    }

    p {
        font-size: 3em;
    }

    .date {
        font-size: 2em;
        margin-top: 30px;
    }
}

@media screen and (max-width: 700px) {
    width: 100%;
}
`

class Article extends React.Component {
    constructor() {
        super()
        this.state = { isMounted: false, date: null }
    }

    componentWillMount() {
        this.setState({ date: new Date(this.props.date), isMounted: true })
    }

    componentWillUnmount() {
        this.setState({ isMounted: false })
    }

    getFormatedDate() {
        return (this.state.date.getUTCDay() + '/' + this.state.date.getMonth() + '/' + this.state.date.getFullYear() + ' ' + this.state.date.getHours() + ':' + this.state.date.getMinutes() )
    }

    render() {
        if (this.state.isMounted) {
            return (
                <Article_>
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    <div className="date">{ this.getFormatedDate() }</div>
                </Article_>
            )
        } else {
            return(
                <div>Error</div>
            )
        }
    }
}

export default Article