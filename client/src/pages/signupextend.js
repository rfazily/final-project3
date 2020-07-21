import React, { useState, useEffect } from "react";
import API from "../utils/API";
import Actioncard from "../components/actioncard";
import { useAuth } from "../context/auth";
import $ from "jquery";

function SignUp() {

    const [user, setUser] = useState([])

    useEffect(() => {
        loadUser()
    }, [])

    function loadUser() {

        const existingTokens = JSON.parse(localStorage.getItem("tokens"));
        var id = existingTokens;

        API.getDoctor(id)
          .then(res => {
              setUser(res.data);
            })
          .catch(err => console.log(err));
    };

    const officeName = $('input#officeName');
    const field = $('input#field');
    const hours = $('input#hours');
  

    function postSubmit() {
      console.log("Submit");
      const userData = {
        OfficeName: officeName.val().trim(),
        Field: field.val().trim(),
        Hours: hours.val().trim(),

      };

      signUpUser(userData.OfficeName, userData.Field, userData.Hours);
      officeName.val('');
      field.val('');
      hours.val('');
    };
  
    // Does a post to the signup route. If successful,
    // we are redirected to the members page Otherwise we log any errors
    function signUpUser(OfficeName, Field, Hours) {
      API.addExtend(user._id,{
       OfficeName,
       Field,
       Hours
      }).then(res => console.log(res))
        .catch(err => console.log(err));
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

                            <a className="nav-link collapsed" href="#" data-toggle="collapse" data-target="#collapsePages" aria-expanded="false" aria-controls="collapsePages">
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
                                        <a className="small text-white stretched-link" href="#">View Details</a>
                                        <div className="small text-white"><i className="fas fa-angle-right"></i></div>
                                    </div>
                                </div>
                            </div>    
                        </div>
                         <div className="card mb-4">
                             <div className="card-header">
                                 <i className="fas fa-table mr-1"></i>
                                <h3>Update Information</h3>
                             </div>
                             <form>
 
                             <div className="form-group p-3">
                                 <label>Office Name</label>
                                 <input type="name" className="form-control" placeholder="Alexandria Hospital" id="officeName"/>
                             </div>

                             <div className="form-group p-3">
                                 <label>Field Of Expertise</label>
                                 <input type="name" className="form-control" placeholder="Cardiology" id="field"/>
                             </div>

                             <div className="form-group p-3">
                                 <label>Hours of Operation</label>
                                 <input type="name" className="form-control" placeholder="Monday - Friday 9am - 7pm" id="hours"/>
                             </div>
 
                             <button type="button" className="btn btn-primary btn-block" id="subBtn" onClick={postSubmit}>Submit</button>
 
                             </form>
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
    export default SignUp;