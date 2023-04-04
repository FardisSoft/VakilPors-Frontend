import { useState, useEffect } from "react";
import { getlawyer } from "../../services/userService"
import { ContactContext } from "../../context/contactContext";

const Teacher_item = () => {

    const [getlawyerdetail, setlawyerdetail] = useState([]);


    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: Lawyerdata } = await getlawyer();
                setlawyerdetail(Lawyerdata);
                console.log(getlawyerdetail);
            } catch (err) {
                console.log(err.message);
            }
        };

        fetchData();
    }, []);

    return (
        <>
            <ContactContext.Provider
                value={{
                    getlawyerdetail,
                    setlawyerdetail,
                }}
            >
                <div className="col-md-6">
                    <div style={{ backgroundColor: "blue" }} className="card my-2">
                        <div className="card-body">
                            <div className="row align-items-center d-flex justify-content-around">
                                <div className="col-md-4 col-sm-4">
                                    <img
                                        style={{ border: `1px solid ` }}
                                        className="img-fluid rounded"
                                    />
                                </div>
                                <div className="col-md-7 col-sm-7">
                                    <ul className="list-group">
                                        <li className="list-group-item list-group-item-dark">
                                            نام و نام خانوداگی :{"  "}
                                            <span className="fw-bold">{getlawyerdetail.fullname}</span>
                                        </li>

                                        <li className="list-group-item list-group-item-dark">
                                            شماره موبایل :{"  "}
                                            <span className="fw-bold">{getlawyerdetail.Pnumber}</span>
                                        </li>

                                        <li className="list-group-item list-group-item-dark">
                                            آدرس ایمیل :{"  "}
                                            <span className="fw-bold">{getlawyerdetail.Score}</span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="col-md-1 col-sm-1 d-flex flex-column align-items-center">

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </ContactContext.Provider>
        </>
    );
}

export default Teacher_item;














