import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


const ShowLawyers = ({ Lawyer }) => {

    return (
        <div style={{ backgroundColor: "#012780" }} className="card my-2">
            <div className="card-body">
                <div className="row align-items-center d-flex justify-content-around">
                    <div className="col-md-4 col-sm-4">
                        <img
                            src={Lawyer.photo}
                            alt={Lawyer.fullname}
                            style={{ border: `1px solid ` }}
                            className="img-fluid rounded"
                        />
                    </div>
                    <div className="col-md-7 col-sm-7">
                        <ul className="list-group">
                            <li className="list-group-item list-group-item-dark">
                                نام و نام خانوداگی :{"  "}
                                <span className="fw-bold">{Lawyer.fullname}</span>
                            </li>

                            <li className="list-group-item list-group-item-dark">
                                شماره موبایل :{"  "}
                                <span className="fw-bold">{Lawyer.Pnumber}</span>
                            </li>

                            <li className="list-group-item list-group-item-dark">
                                آدرس ایمیل :{"  "}
                                <span className="fw-bold">{Lawyer.Score}</span>
                            </li>
                        </ul>
                    </div>
                    <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">
                    </div>
                </div>
                <Link
                    to={`/Main/${Lawyer.id}`}
                    className="btn my-1"
                    style={{ backgroundColor: "red" }}
                >
                    <i className="fa fa-eye" />
                </Link>
            </div>
        </div>
    );
};

export default ShowLawyers;
