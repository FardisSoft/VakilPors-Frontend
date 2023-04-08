import { useState, useEffect, useContext } from "react";

import { Link, useParams } from "react-router-dom";


import { getlawyer } from "../../services/userService";

const ViewContact = () => {
  const { LawyerId } = useParams();

  const [state, setState] = useState({
    Lawyer: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      try {

        const { data: LawyerData } = await getlawyer(LawyerId);

        setState({
          ...state,
          Lawyer : LawyerData,
        });
      } catch (err) {
        console.log(err.message);

      }
    };

    fetchData();
  }, []);

  const { Lawyer } = state;

  return (
    <>
      <section className="view-contact-intro p3">
        <div className="container">
          <div className="row my-2 text-center">
            <p className="h3 fw-bold" style={{ color: "#012780" }}>
              اطلاعات مخاطب
            </p>
          </div>
        </div>
      </section>

      <hr style={{ backgroundColor: "black" }} />
        <>
          {Object.keys(Lawyer).length > 0 && (
            <section className="view-contact mt-e">
              <div
                className="container p-2"
                style={{ borderRadius: "1em", backgroundColor: "#012780" }}
              >
                <div className="row align-items-center">
                  <div className="col-md-3">
                    <img
                      src={Lawyer.photo}
                      alt=""
                      className="img-fluid rounded"
                      style={{ border: `1px solid ` }}
                    />
                  </div>
                  <div className="col-md-9">
                    <ul className="list-group">
                      <li className="list-group-item list-group-item-dark">
                        نام و نام خانوادگی :{" "}
                        <span className="fw-bold">{Lawyer.fullname}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        شماره موبایل :{" "}
                        <span className="fw-bold">{Lawyer.Pnumber}</span>
                      </li>
                      <li className="list-group-item list-group-item-dark">
                        ایمیل : <span className="fw-bold">{Lawyer.Score}</span>
                      </li>

                    </ul>
                  </div>
                </div>
                <div className="row my-2">
                  <div className="d-grid gap-2 col-6 mx-auto">
                    <Link
                      to={"/Main"}
                      className="btn"
                      style={{ backgroundColor: "#ABC0C0" }}
                    >
                      برگشت به صفحه اصلی
                    </Link>
                  </div>
                </div>
              </div>
            </section>
          )}
        </>
    </>
  );
};

export default ViewContact;
