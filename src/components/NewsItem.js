import React, { Component } from 'react'
import '../App.css'
export class NewsItem extends Component {
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    return (
      <div className="card my-5 bg-transparent text-white border border-white">
        <div style={{display: 'flex', justifyContent: 'flex-end', position: 'absolute', right:'0'}}>
        <span class="badge rounded-pill bg-danger newsfrom">{source}</span>
        </div>
        <img src={!imageUrl ? "https://www.techexplorist.com/wp-content/uploads/2023/04/astronaut-working-with-one-of-the-experiments.jpg" : imageUrl} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="card-title">{title}...</h5>
          <p className="card-text">{description}</p>
          <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on {new Date(date).toUTCString()}</small></p>
          <a rel="noreferrer" href={newsUrl} target="_blank" className="btn btn-dark">Read more</a>
        </div>
      </div>
    )
  }
}

export default NewsItem