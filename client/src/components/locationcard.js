import React, { Component } from "react";

export default class Locationcard extends Component {
 

    render() {
        return (
            <div className="card mb-4 pl-4">

                <br/>
                <h4>Details About Your Upcoming Appointment</h4>
                <table class="table">
                <thead>
                    <tr>
                    
                    <th scope="col">Your Provider</th>
                    <th scope="col">Office Information</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
             

                {this.props.doctor ? (
                       <tbody>
                        <tr>

                        <td>Dr. {this.props.doctor}</td>
                        <td>{this.props.officename}</td>
                        <td></td>
                        </tr>
                        <tr>

                        <td>{this.props.specialty}</td>
                        <td>{this.props.address1}</td>
                        {/* <td><button type="button" class="btn btn-warning">Get Directions</button> */}
                        {/* </td> */}
                        </tr>
                        <tr>

                        <td></td>
                        <td> {this.props.phone}<br />
                        {this.props.hours} </td>
                        <td></td>
                        </tr>
                        </tbody>
                ) : (
                    <h3>No results</h3>
                   
                )}

                
                </table>

            </div>


        );
    }
}



