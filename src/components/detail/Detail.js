import React from 'react';
import { API_URL } from '../../config';
import Loading from "../common/Loading";
import { renderChangePercent } from '../../helpers';
import './Detail.css';

class Detail extends React.Component {
    constructor(props) {
        super();
        this.state = {
            loading:false,
            currency:{},
            error:""
        }
    }
  componentDidMount() {
        const currencyId = this.props.match.params.id;
        this.fetchCurrency(currencyId)
    }
  fetchCurrency(currencyId){
      this.setState({
          loading:true
      })
      fetch(`${API_URL}/cryptocurrencies/${currencyId}`)
      .then(resp => {
          return resp.json()
      })
      .then(data => {
          this.setState({
              loading:false,
              currency:data
          })
      })
      .catch(error => {
        this.setState({
          error,
          loading:false
        })
      })
    }
    componentWillReceiveProps(nextProps) {
      if (this.props.location.pathname !== nextProps.location.pathname) {
          const currencyId = nextProps.match.params.id;
          this.fetchCurrency(currencyId);
      }
  }
    
    render() {
        const {loading,currency} = this.state
        if(loading){  
            return (
                    <div className="loading-container">
                        <Loading />
                    </div>
            )
        }
        return (
            <div className="Detail">
            <h1 className="Detail-heading">
              {currency.name} ({currency.symbol})
            </h1>
            <div className="Detail-container">
              <div className="Detail-item">
                Price <span className="Detail-value">$ {currency.price}</span>
              </div>
              <div className="Detail-item">
                Rank <span className="Detail-value">{currency.rank}</span>
              </div>
              <div className="Detail-item">
                24H change
                <span className="Detail-value">
                  {renderChangePercent(currency.percentChange24h)}
                </span>
              </div>
              <div className="Detail-item">
                <span className="Detail-title">Market cap</span>
                <span className="Detail-dollar">$</span>
                {currency.marketCap}
              </div>
              <div className="Detail-item">
              <span className="Detail-title">24H Volume</span>
                <span className="Detail-dollar">$</span>
                {currency.volume24h}
              </div>
              <div className="Detail-item">
                <span className="Detail-title">Total supply</span>
                {currency.totalSupply}
              </div>
            </div>
          </div>
        )
    }
}
export default Detail