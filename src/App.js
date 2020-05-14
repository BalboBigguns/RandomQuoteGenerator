import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import './index.css';

library.add(fab);

class QuoteBox extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            quote: '',
            author: ''
        }

        this.fetchQuote = this.fetchQuote.bind(this);
    }

    componentDidMount() {
        this.fetchQuote();
    }

    fetchQuote() {
        fetch("https://andruxnet-random-famous-quotes.p.rapidapi.com/?cat=famous&count=1", {
            "method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "x-rapidapi-host": "andruxnet-random-famous-quotes.p.rapidapi.com",
                "x-rapidapi-key": "ae2b4d05a6mshbdca3299f032ae0p1a348ajsn99b5b7a63f43"
            }
        })
        .then(res => res.json())
        .then(body => {
            this.setState({
                quote: body[0].quote,
                author: body[0].author
            });

            console.log(body[0]);
        })
        .catch(err => {
            console.log(err);
        });
    }

    render() {
        const shareContent = encodeURIComponent(`"${this.state.quote}" ${this.state.author} #quotes`);
        const twitterLink = `https://twitter.com/intent/tweet?text=${shareContent}`;

        return (
            <div className="QuoteBox" id="quote-box">
                <div id="text"> {this.state.quote}</div>
                <div id="author"> - {this.state.author}</div>
                <div className="buttons">
                    <a title="Tweet this quote!" href={twitterLink} target="blank" id="tweet-quote"><FontAwesomeIcon icon={['fab', 'twitter-square']}/></a>
                    <button id="new-quote" onClick={this.fetchQuote}>New quote</button>
                </div>
            </div>
        );
    }
}

export default QuoteBox;
