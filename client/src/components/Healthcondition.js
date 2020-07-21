import React, { Component } from "react";
import "../css/Search.css";


export default class Healthcondition extends Component {

  state = {
    searchValue: "",
    resources: []
  };

  handleOnChange = event => {
    this.setState({ searchValue: event.target.value });
  };

  handleSearch = () => {
    this.makeApiCall(this.state.searchValue);
  };

  makeApiCall = searchInput => {
    var searchUrl = `https://health.gov/myhealthfinder/api/v3/topicsearch.json?lang=en&keyword=${searchInput}`;
    fetch(searchUrl)
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.setState({ resources: jsonData.Result.Resources.Resource });
        console.log(jsonData)
      });

  

      };

      
  render() {


    return (

  
      <div id="main">
        <h1>Search a Health Topic</h1>
        <input
          name="text"
          type="text"
          placeholder="Search"
          onChange={event => this.handleOnChange(event)}
          value={this.state.searchValue}
        />
        <button onClick={this.handleSearch}>Search</button>
        <br />
        <br />

            {this.state.resources.map((resource, index) => 
             <div className="card p-5 m-5">
                <div className="row" key={index}>
                    <div className="row">
                      <div className="col-8">
                       
                        <h4>{resource.Title}</h4><br/><br/>
                        <a href={resource.AccessibleVersion} target="_blank" >
                          <button type="button" className="btn btn-success">More Information</button></a>
                      </div>

                      <div className="col-4"> 
                        <img alt={resource.ImageAlt} className="img-fluid" src={resource.ImageUrl} style={{ margin: "0 auto" }} />
                      </div>
                      </div>
                    </div>
            </div>
            )}
      </div>
    );
 }
};