import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country: 'in',
    pageSize: 6,
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1
    }
    document.title = this.capitalizeFirstLetter((this.props.category));
  }

  async updateNews() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6352a8fc2ec4e9ebdebaede6d553f7d&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true })
    let data = await fetch(url);
    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }

  async componentDidMount() {
    this.updateNews();
  }

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6352a8fc2ec4e9ebdebaede6d553f7d&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
    this.setState({ page: this.state.page - 1 });
    this.setState({ loading: true })
    let data = await fetch(url);

    let parsedData = await data.json();
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    })
  }
  
  handleNextClick = async () => {
    if (!(this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize))) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=a6352a8fc2ec4e9ebdebaede6d553f7d&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
      this.setState({ page: this.state.page + 1 });
      this.setState({ loading: true })
      let data = await fetch(url);
      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles,
        totalResults: parsedData.totalResults,
        loading: false,
      })
    }
  }

  render() {
    return (
      <>
        <div className="container ">
          <h1 class="text-center" style={{marginTop: "100px"}}>NewsMonkey - Top {this.capitalizeFirstLetter((this.props.category))} Headlines</h1>
          {this.state.loading && <Spinner />}
          <div className="container">
            <div className="row">
              {!this.state.loading && this.state.articles.map((element) => {
                return <div className="col-md-4" key={element.url}>
                  <NewsItem title={element.title ? element.title : ""} desc={element.description} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
                </div>
              })};
            </div>
          </div>
          <div className="container d-flex justify-content-between my-5">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}> &larr;
              Previous</button>
            <button type="button" disabled={this.state.page + 1 > Math.ceil(this.state.totalResults / this.props.pageSize)} className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div>
        </div>
      </>
    )
  }
}

export default News