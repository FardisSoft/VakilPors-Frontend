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
          Lawyer: LawyerData,
        });
      } catch (err) {
        console.log(err.message);

      }
    };

    fetchData();
  }, []);

  const { Lawyer } = state;

  return (
    <div className="container" style={{marginRight : "500px"}}>
      <div className="row">
        <div className="col-lg-4 col-md-4 col-sm-4 col-xs-4 my-5">
          <div class="teachers-list" >
            <div class="teacher-item">
              <div class="box-shadow teacher-box-size"  >
                <a class="img-layer lazy" href="/masters/AdminUser">
                  <img src={Lawyer.photo} alt={Lawyer.fullname} style={{ display: "block" }} />
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
    </div>
  );
};

export default ViewContact;
