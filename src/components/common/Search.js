import React from 'react';
import { API_URL } from '../../config';
import Loading from "./Loading"
import { withRouter } from 'react-router-dom';
import './Search.css';
class Search extends React.Component {
    constructor() {
        super();
        this.state = {
            loading: false,
            searchQuery: '',
            searchResults: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.renderSearchResult = this.renderSearchResult.bind(this);
        this.handleRedirect = this.handleRedirect.bind(this)
    }
    handleChange(e) {
        const searchQuery = e.target.value;
        this.setState({searchQuery});
        this.setState({loading: true});
        searchQuery && fetch(`${API_URL}/autocomplete?searchQuery=${searchQuery}`)
        .then((resp) => resp.json())
        .then(result => {
            this.setState({
                searchResults: result,
                loading: false
            })
        })
    }

    handleRedirect(id) {
        this.props.history.push(`/currency/${id}`)
        this.setState({searchQuery:"",searchResults:""})
    }

    renderSearchResult() {
        const { loading, searchQuery, searchResults } = this.state;
        if(!searchQuery) {  
            return ''
        }
        if(searchResults.length > 0) {
            return (
                <div className={'Search-result-container'}>
                    {
                        searchResults.map(result => {
                            return (
                                <div
                                    onClick={() => this.handleRedirect(result.id)}
                                    className={'Search-result'}
                                    key={result.id}
                                >
                                    {result.name} ({result.symbol})
                                </div>
                            )
                        })
                    }
                </div>
            )
        }
        if(!loading){
            return(
                <div className="Search-result-container">
                        <div className="Search-no-result">
                                No results found
                        </div>
                </div>
            )
        }
    }
    render() {
        const { loading, searchQuery} = this.state;
        console.log(this.state);
        return (
            <div className={'Search'}>
                <div>
                    <span className={'Search-icon'} />
                    <input 
                        type={'text'}
                        className={'Search-input'}
                        placeholder={'Search name'}
                        onChange={this.handleChange}
                        value={searchQuery}
                    />
                    {
                        loading && (
                            <div className="Search-loading">
                                <Loading/>
                            </div>
                        )
                    }
                </div>
                {this.renderSearchResult()}
            </div>
        )
    }
};
export default withRouter(Search);