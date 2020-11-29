import React, {Component} from 'react'

import "./Home.css"

import API from "../../utils/API";

import SearchForm from '../../components/SearchForm';
import Container from '../../components/Container';
import ResultsContainer from '../../components/ResultsContainer';
// import SearchFilter from '../../components/SearchFilter';

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

    componentDidMount(){
        this.getArticles();
    }

    componentDidUpdate(){
        if (this.state.searchResults === []){
            this.getArticles();
        }
    }

    componentWillMount() {
        this.getArticles();
        const selected = this.state.searchResults.filter(article => {
            return article.selected === true
        }) 

        this.setState({ selectedResult: selected})
    }

    getArticles = () => {
        API.getAllArticles()
            .then(res => {
                console.log("RES", res.data);
                this.setState({
                    searchResults: res.data   
                })
            })
            .catch(err => console.log(err));
    };

    handleArticleSave = () => {
        for (let article of this.state.searchResults){
            API.saveArticle(article);
        }
        // API.saveArticle(this.state.searchResults[0]);
    };

    // handleArticleSave = id => {
    //     const article = this.state.articles.find(article => article._id === id);
    //     API.saveArticle(article).then(res => this.getArticles());
    // };

    handleFormSubmit = event => {
        // event.preventDefault();
        // this.getArticles();
        // console.log("i made it")
    };

    handleSelected = (event) => {
        this.setState(() => {
            return {
                selectedResult: {} 
            }
        })
        const id = event.target.closest(".Result").dataset.id;
        console.log(id);

        API.getSelectedArticle(id)
            .then(res => {
                console.log("selected RES", res);

                API.getScrapedArticle(id).then(res => {
                    if(res.data.id == id){
                        this.setState(() => {
                            return {
                                selectedResult: res.data 
                            }
                        })
                    }
                })

            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className="Home">
                <SearchForm 
                    className="SearchForm" 
                    handleArticleSave={this.handleArticleSave}
                    submit={this.handleFormSubmit}
                />
                <Container className="Container">
                    {/* <SearchFilter /> */}
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


