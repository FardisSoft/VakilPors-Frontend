import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../css/ShowLawyers.css';


const ShowLawyers = ({ Lawyer }) => {

    return (
        <div className="col-lg-3 col-md-6 col-sm-12 col-xs-12 my-5">
            <div class="teachers-list" >
                <div class="teacher-item">
                    <div class="box-shadow teacher-box-size"  >
                        <a class="img-layer lazy">
                            <img src={Lawyer.photo} alt={Lawyer.parvandeNo} style={{ display: "block" }} />
                        </a>
                        <Link to={`${Lawyer.id}`}>
                            <h2 className="align-center">
                                <p class="my-2">نام و نام خانوادگی : </p>
                                <a title={Lawyer.parvandeNo} href="/Lawyer-search-page/:LawyerId" >
                                    <i class="zmdi zmdi-account ">
                                    </i> {Lawyer.parvandeNo} </a>
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
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )

};

export default ShowLawyers;
