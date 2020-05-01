import React from "react";
import { API_URL } from "../../config";
import Table from "./Table";
import Loading from ".././common/Loading";
import Pagination from './Pagination';
import Select from "./Select"
import "./Table.css";

class List extends React.Component {
  constructor() {
    super();
    this.state = {
      loading: false,
      currencies: [],
      error: null,
      perPage: 20,
      page:1,
      totalPages:0,
    };
    this.handlePaginationClick = this.handlePaginationClick.bind(this)
    this.handleChangeSelect = this.handleChangeSelect.bind(this)
  }
  fetchCurrencies(){
    const { perPage,page } = this.state;
    this.setState({
      loading: true,
    });
    fetch(`${API_URL}/cryptocurrencies/?page=${page}&perPage=${perPage}`)
      .then(resp => {
        return resp.json().then(data => {
          if(resp.ok) {
              return data
          }else {
            return Promise.reject(data)
          }
        })
      })
      .then(data => {
        this.setState({
          loading: false,
          currencies: data.currencies,
          totalPages: data.totalPages
        })
      })
      .catch((err)=>{
          console.log(err, 'bhjwbvhjfbvhjkbfv')
      })
  }
  handlePaginationClick(direction){
    let nextPage = this.state.page;
    nextPage = direction === "next" ? nextPage+1 : nextPage-1;
    this.setState({
      page:nextPage
    },()=>this.fetchCurrencies()) 
  }
  componentDidMount() {
    this.fetchCurrencies()
  }
  handleChangeSelect (e) {
    this.setState({
      perPage:e.target.value
    },()=>this.fetchCurrencies())
  }
  render() {
    const { loading, currencies, error, page, totalPages,perPage } = this.state;
    if (loading) {
      return (
        <div className="loading-container">
          <Loading 
              width={"56px"}
              height={"56px"}
          />
        </div>
      );
    }
    if(error){
      return(
        <div>
          
        </div>
      )
    }
    return (
      <div>
        <Select perPage={perPage} handleChangeSelect={this.handleChangeSelect}/>
        <Table currencies={currencies}/>
        <Pagination page={page} totalPages={totalPages} handlePaginationClick={this.handlePaginationClick}/>
      </div>
    );
  }
}
export default List;