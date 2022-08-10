import React, { Component } from 'react'

export default class Newsitem extends Component {
    render() {
        let { title, description, imageUrl, newsUrl,author,date,source } = this.props;
        return (
        
                <div className='container my-4'>
                    <div className="card">
                        <img src={imageUrl ? imageUrl : 'https://robbreport.com/wp-content/uploads/2022/08/Bezos_Megayacht.png?w=1000'} className="card-img-top" alt="..." />
                        <div className="card-body">
                            <h5 className="card-title">{title}... <span className="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left:'50%',zIndex:'1'}}>
                                {source}<span className="visually-hidden"> </span></span></h5>
                            <p className="card-text">{description}...</p>
                            <p className="card-text"><small className="text-muted ">by {author?author:"Unknown"} on {new Date(date).toGMTString( )}</small></p>
                            <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read more...</a>
                        </div>
                    </div>
                </div>
            
        )
    }
}
