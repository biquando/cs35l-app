import React, { Component } from 'react';
import Table from 'react-bootstrap/Table';
//import 'bootstrap/dist/css/bootstrap.min.css';
import "../styles/landingpage.css";

class LandingPage extends Component{

    render(){

        return(
                   <div style = {{width:'87%',margin:'auto'}}>


                    <Table striped bordered hover>

                      <tbody>
                        <tr>
                          <td>Monday 28</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Tuesday 29</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Wednesday 30</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Thursday 31</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Friday 1</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Saturday 2</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Saturday 3</td>
                          <td></td>
                        </tr>

                      </tbody>
                    </Table>



               </div>





            );
    }


}
export default LandingPage;