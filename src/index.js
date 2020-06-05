import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

const responsiveHeight = '1020'
const responsiveWidth = '1000'

const HeaderComponent = styled.section`
    width: 100%;
    height: 100px;
    position: fixed;
    background-color: black;
    top: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 50px;
    box-sizing: border-box;

    h1::before {
        content: 'NaoufelNotes';
    }

    .new-note {
        color: white;
        padding: 10px;
        border: 1px solid white;
        border-radius: 5px;
        text-decoration: none;
    }

    @media screen and (max-width: ${responsiveWidth}px) and (min-height: ${responsiveHeight}px) {
        height: 250px;
        font-size: 3em;

        h1::before {
            content: 'NN';
        }

        .new-note {
            padding: 20px;
        }
    }
`

const page = {
    width: '100%',
    height: '100%'
}

const ArticleComponent = styled.section`
    padding: 20px;
    border: 1px solid rgba(200, 200, 200, 1);
    border-radius: 5px;
    width: 40%;

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

    @media screen and (max-width: ${responsiveWidth}px) and (min-height: ${responsiveHeight}px) {
        font-size: 4em;

        h3 {
            margin-bottom: 20px;
        }

        .date {
            margin-top: 20px;
        }
    }

    @media screen and (max-width: 700px) {
        width: 100%;
    }
`

const Page = styled.section`
    margin-top: 100px;
    width: 100%;
    min-height: calc(100vh - 100px);
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: center;
    padding: 50px;
    box-sizing: border-box;

    > * {
        margin: 10px;
    }

    @media screen and (max-width: ${responsiveWidth}px) and (min-height: ${responsiveHeight}px) {
        margin-top: 250px;
        min-height: calc(100vh - 250px);
    }
`

class Article extends React.Component {
    render() {
        return <ArticleComponent>
            <h3>{this.props.title}</h3>
            <p>{this.props.description}</p>
            <div className="date"><Date></Date></div>
        </ArticleComponent>
    }
}

class Header extends React.Component {
    render() {
        return (
            <HeaderComponent>
                <h1 style={{color: 'white'}}></h1>
                <a href="#" className="new-note">New Note</a>
            </HeaderComponent>
        )
    }
}

const articles = [
    {
        title: "Rascism in official functions",
        description: "Do you think that racism should be treated as a mental issue and if yes, does the people who apply for official jobs (police officer, president...) should pass a test?"
    },
    {
        title: "salut",
        description: "Hi, I am naoufel"
    },
    {
        title: "yo",
        description: "Hi, I am naoufel"
    },
    {
        title: "wesh",
        description: "Hi, I am naoufel"
    },
    {
        title: "salam",
        description: "Hi, I am naoufel"
    }
]

class Layout extends React.Component {
    render() {
        return (
            <div style={page}>
                <Header />
                <Page>
                    {articles.map((article) => {
                        return <Article key={article.title} title={article.title} description={article.description}></Article>
                    })}
                </Page>
            </div>
        )
    }
}

ReactDOM.render(
    <Layout />
, document.getElementById('root'));