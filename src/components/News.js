import React, { Component } from 'react'
import Newsitem from './Newsitem';
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
    static DefaultPropTypes = {
        country: 'in',
        pageSize: 10,
        category: 'science',
        totalResults: 0,
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
        }
        const pageTitle = this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)
        document.title = `${pageTitle} - NewsHub`;
    }


    async updateNews() {
        this.props.setProgress(10);
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`
        this.setState({ loading: true })
        let data = await fetch(url);
        this.props.setProgress(40);
        let parseData = await data.json()
        this.props.setProgress(100);
        this.setState({
            articles: parseData.articles,
            totalResults: parseData.totalResults,
            loading: false
        })
    }

    // lifecycle method 
    async componentDidMount() {
        this.updateNews();
    }

    // handlePreviousClick = async () => {
    //     this.setState({ page: this.state.page - 1 })
    //     this.updateNews();
    // }
    // handleNextClick = async () => {
    //     this.setState({ page: this.state.page + 1 })
    //     this.updateNews();
    // }

    fetchMoreData = async() => {
       this.setState({page: this.state.page +1,})
       let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page+1}&pageSize=${this.props.pageSize}`
       let data = await fetch(url);
       let parseData = await data.json()
       this.setState({
           articles: this.state.articles.concat(parseData.articles),
           totalResults: parseData.totalResults,
       })
      };

      style = {
        '@media (maxWidth: 500px)': {
            lineHeight: '2.2',
        },
      };

    render() {
        return (
           <>
                <h1 style={{marginTop: '90px',marginBottom:'25px'}}>
                    <mark style={this.style}>NewsHub - Latest {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
                    </mark>
                </h1>

                <InfiniteScroll
                    dataLength={this.state.articles.length}
                    next={this.fetchMoreData}
                    hasMore={this.state.articles.length !== this.state.totalResults}
                    loader={<Spinner/>}
                >
                    <div className="container">
                    <div className="row">
                        {this.state.articles.map((element) => {
                            return <div className="col-md-4" key={element.url}>
                                <Newsitem title={element.title ? element.title : ''} description={element.description ? element.description.slice(0, 90) : ''} author={element.author} date={element.publishedAt} source={element.source.name} imageUrl={element.urlToImage} newsUrl={element.url} />
                            </div>
                        })}
                    </div>
                    </div>
                    </InfiniteScroll>
                    {/* <div className="container d-flex justify-content-between">
                    <button type="button" disabled={this.state.page <= 1} className="btn  btn-dark" onClick={this.handlePreviousClick}> &larr; previous</button>
                    <button type="button" disabled={this.state.page+1 > Math.ceil(this.state.totalResults/this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>next &rarr;</button>
                </div> */}
            </>
        )
    }
}
