import React, { useState, useEffect, Component } from "react";
import Actioncard from "../components/actioncard";
import Locationcard from "../components/locationcard";
import { ZoomMtg } from '@zoomus/websdk';
import API from "../utils/API";
import $ from "jquery";
import { useAuth } from "../context/auth";
import 'bootstrap/dist/css/bootstrap.min.css';


var signatureEndpoint = 'http://localhost:4000/'
var apiKey = 'rCTS33F9QzaWz2z_KtB2MA'
const API_KEY = "rCTS33F9QzaWz2z_KtB2MA";
const API_SECRET = "rI2T6cwPVk9rWd4BxSQufKpsOunvJvH7mjWU";
var meetingNumber = "3356527600"
var role = "1"
var leaveUrl = 'http://localhost:3000/drzoom'
var userName = 'WebSDK'
var userEmail = ''
var passWord = '5HYqGY'
var signa;

const signature = ZoomMtg.generateSignature({
    meetingNumber: meetingNumber,
    apiKey: API_KEY,
    apiSecret: API_SECRET,
    role: role,
    success: function (res) {
      console.log(res.result);
      signa = res.result;
    },
  });



let zoomMeeting = document.getElementById("zmmtg-root").style.display="none";



function PtDashboard() {

    const [user, setUser] = useState([])

    useEffect(() => {
        loadUser()
      }, [])

      function loadUser() {

        const existingTokens = JSON.parse(localStorage.getItem("tokens"));
        var id = existingTokens;

        API.getDoctor(id)
          .then(res => {setUser(res.data)})
          .catch(err => console.log(err));

      };

      function zoomCall() {

        zoomMeeting = document.getElementById("zmmtg-root").style.display="block";
    
        console.log("hi");
        ZoomMtg.setZoomJSLib('https://source.zoom.us/1.7.9/lib', '/av');
    
    
            ZoomMtg.preLoadWasm();
            ZoomMtg.prepareJssdk();
    
    
    
    
    
    ZoomMtg.init({
        leaveUrl: leaveUrl,
        isSupportAV: true,
        success: (success) => {
          console.log(success)
      
          ZoomMtg.join({
            signature: signature,
            apiKey: apiKey,
            meetingNumber: meetingNumber,
            userName: userName,
            userEmail: userEmail,
            passWord: passWord,
            success: (success) => {
              console.log("Success")
            },
            error: (error) => {
              console.log(error)
            }
          })
      
        },
        error: (error) => {
          console.log(error)
        }
      })
    
    }
      

        const { setAuthTokens } = useAuth();
      
        function logOut() {
        setAuthTokens("");
    }


        return (
            <div>
               <div className="sb-nav-fixed">
               <nav className="sb-topnav navbar navbar-expand navbar-dark bg-dark">
                <a className="navbar-brand" href="/drdashboard">HealthApp</a>
                <button className="btn btn-link btn-sm order-1 order-lg-0" id="sidebarToggle" href="#"><i className="fas fa-bars"></i></button>
                {/* <!-- Navbar Search--> */}
                <form className="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0">
                    <div className="input-group">
                   
                    </div>
                </form>
                {/* <!-- Navbar--> */}
                <ul className="navbar-nav ml-auto ml-md-0">
                <li className="nav-item dropdown">
          
                            <button className="btn btn-primary" type="button" onClick={logOut}>Logout</button>
                        {/* </div> */}
                    </li>
                </ul>
            </nav>
            <div id="layoutSidenav">
                <div id="layoutSidenav_nav">
                <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
                        <div className="sb-sidenav-menu">
                            <div className="nav">
                                <div className="sb-sidenav-menu-heading">Menu</div>
                                <a className="nav-link" href="/drdashboard">
                                    <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                                    Dashboard
                                </a>
                                <div className="sb-sidenav-menu-heading">Interface</div>
                                <a className="nav-link collapsed" href="/drappointment" data-toggle="collapse" data-target="#collapseLayouts" aria-expanded="false" aria-controls="collapseLayouts">
                                    <div className="sb-nav-link-icon"><i className="fas fa-columns"></i></div>
                                    Schedule
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="collapse" id="collapseLayouts" aria-labelledby="headingOne" data-parent="#sidenavAccordion">
                                    <nav className="sb-sidenav-menu-nested nav">
                                        <a className="nav-link" href="layout-static.html">Schedule Appointment</a>
                                        <a className="nav-link" href="layout-sidenav-light.html">Virtual Appointment</a>
                                    </nav>
                                </div>
                                <a className="nav-link collapsed" href="/recordentry" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Medical Records
      
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
    
                                <a className="nav-link collapsed" href="/drzoom" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
                                    <div className="sb-nav-link-icon"><i className="fas fa-book-open"></i></div>
                                    Start Meeting
      
                                    <div className="sb-sidenav-collapse-arrow"><i className="fas fa-angle-down"></i></div>
                                </a>
                                <div className="sb-sidenav-menu-heading">Tools</div>
                          
                                
                                <a className="nav-link" href="/signupextend">
                                    <div className="sb-nav-link-icon"><i className="fas fa-chart-area"></i></div>
                                    Settings
                                </a>
                            
                            </div>
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Logged in as:</div>
                            Dr. {user.Name +" "+ user.Surname}
                        </div>
                        <div className="sb-sidenav-footer">
                            <div className="small">Doctor ID:</div>
                            {user._id}
                        </div>
                    </nav>
                </div>
                <div id="layoutSidenav_content">
                    <main className="bg-light">
                        <div className="container-fluid bg-light">
                            <h1 className="mt-4">Physician Dashboard</h1>
                            <ol className="breadcrumb mb-4">
                                <li className="breadcrumb-item active">Welcome, Dr. {user.Name +" "+ user.Surname}</li>
                            </ol>
                            <div className="row">
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-primary text-white mb-4">
                                        <div className="card-body">Search a Patient</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="/patientSearch" >View Details</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-warning text-white mb-4">
                                        <div className="card-body">Upcoming Appointments</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="/drapp">View Details</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-success text-white mb-4">
                                        <div className="card-body">Schedule Appointment</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="/drappointment">View Details</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-xl-3 col-md-6">
                                    <div className="card bg-info text-white mb-4">
                                        <div className="card-body">Start Virtual Appointment</div>
                                        <div className="card-footer d-flex align-items-center justify-content-between">
                                            <a className="small text-white stretched-link" href="/drzoom">View Details</a>
                                            <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                        </div>
                                    </div>
                                </div>                        </div>
                         
                       
                            <div class="card">
                                <div class="card-body">
                                    <h3>Join Patient Meeting</h3>
                                    <p>Click the 'Start Meeting' button below to join the virtual appointment scheduled with your patient.</p>
                                    <button type="button" class="btn btn-info btn-lg" id="join_iframe" onClick={zoomCall}>Start Meeting</button>
                                </div>
                            </div>
                        </div>
                    </main>
                    <footer className="py-4 bg-light mt-auto">
                        <div className="container-fluid">
                            <div className="d-flex align-items-center justify-content-between small">
                                <div className="text-muted">Copyright &copy; HealthApp 2020</div>
                                <div>
                                    <a href="#">Privacy Policy</a>
                                    &middot;
                                    <a href="#">Terms &amp; Conditions</a>
                                </div>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
    );
    }
    

export default PtDashboard;
