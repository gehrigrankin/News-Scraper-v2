import React, { Component } from 'react'

import Navbar from '../../components/Navbar'
import Container from '../../components/Container';
import ResultsContainer from '../../components/ResultsContainer';

import API from "../../utils/API";

import "./Home.css"

class Home extends Component {
    state = {
        searchResults: [],
        selectedResult: {},
        filters: {
            searchTopic: "Recent",
            startYear: "1900",
            endYear: "1920"
        }
    }

    componentDidMount() {
        this.getArticles();
    }

    getArticles = () => {
        API.getArticles()
            .then(res => {
                this.setState({
                    searchResults: res.data
                }, () => {
                    API.getSelectedArticle(res.data[0])
                        .then(res => {
                            this.setState(() => {
                                return {
                                    selectedResult: res.data
                                }
                            })
                        })
                        .catch(err => console.log(err))
                })
            })
            .catch(err => console.log(err));
    };

    handleFormSubmit = event => {
        event.preventDefault();
        this.getArticles();
    };

    handleSelected = (event) => {
        const src = event.target.closest(".Result").dataset.src;
        const result = this.state.searchResults.find(result => result.src == src);

        API.getSelectedArticle(result)
            .then(res => {
                this.setState(() => {
                    return {
                        selectedResult: res.data
                    }
                })
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="Home">
                <Navbar />
                <Container className="Container">
                    <ResultsContainer
                        results={this.state.searchResults}
                        selected={this.state.selectedResult}
                        topic={this.state.filters.searchTopic}
                        timeRange={this.state.filters.timeRange}
                        handleSelected={this.handleSelected}
                    />
                </Container>

            </div>
        )
    }
}

export default Home;
