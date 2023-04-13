import { Link, Outlet } from "react-router-dom";

const App = () => {
  return (
    <div>
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="/">وکیل پرس!</a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{backgroundColor:"turquoise"}}>
        <form class="form-inline my-2 my-lg-0">
          <Link to="/Login" class="mx-3">ورود</Link>
          <Link to="/Register"class="mx-2">ثبت نام</Link>
          <Link to="/LawyerPage"class="mx-2">صفحه مشاهده وکیل</Link>
          <Link to="/dashboard" class="mx-3">فروم</Link>
          <Link to="/Lawyer-search-page" class="mx-3">جست و جوی وکیل</Link>
          <Link to="/edit_lawyer" class="mx-3">edit_lawyer</Link>
          <Link to="/edit" class="mx-3">edit</Link>
          <Link to="/display-profile" class="mx-3">display-profile</Link>
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
