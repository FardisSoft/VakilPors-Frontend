import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">وکیل پرس!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{backgroundColor:"turquoise"}}>
        <form className="form-inline my-2 my-lg-0">
          <Link to="/Login" className="mx-3">ورود</Link>
          <Link to="/Register"className="mx-2">ثبت نام</Link>
          <Link to="/LawyerPage"className="mx-2">صفحه مشاهده وکیل</Link>
          {/**
           *  <button className="btn btn-primary my-3 mx-2 my-sm-0" type="submit">Login</button>
           */}
        </form>
      </div>
    </nav>
     <Outlet />
     </div>
       );
}

export default App;
