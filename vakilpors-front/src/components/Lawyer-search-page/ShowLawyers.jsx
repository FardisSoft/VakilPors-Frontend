import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../css/ShowLawyers.css';


const ShowLawyers = ({ Lawyer }) => {

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12">
            <div class="teachers-list" >
                <div class="row">
                    <div class="teacher-item">
                        <div class="box-shadow teacher-box-size"  >
                            <a class="img-layer lazy" href="/masters/AdminUser">
                                <img class="" src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Better_Call_Saul_season_6.jpg/220px-Better_Call_Saul_season_6.jpg" alt="ایمان مدائنی" style={{ display: "block" }} />
                            </a>
                            <h2 className="align-center"> 
                            <p class="my-2">نام و نام خانوادگی : </p>
                                <a title={Lawyer.fullname} href="/masters/AdminUser" >
                                    <i class="zmdi zmdi-account ">
                                    </i> {Lawyer.fullname} </a>
                            </h2>
                            <h2>
                            <p class="my-2">شماره پروانه وکالت: </p>
                                <a title={Lawyer.Pnumber} href="/masters/AdminUser" >
                                    <i class="zmdi zmdi-account">
                                    </i> {Lawyer.Pnumber} </a>
                            </h2>
                            <h2>
                            <p class="my-2">میزان امتیاز کسب شده: </p>
                                <a title={Lawyer.Score} href="/masters/AdminUser" >
                                    <i class="zmdi zmdi-account " >
                                    </i> {Lawyer.Score} </a>
                            </h2>
                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ShowLawyers;
