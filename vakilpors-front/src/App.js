import { Link, Outlet } from "react-router-dom";
import Login from './components/Login';

const App = () => {
  return (
    <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <a class="navbar-brand" href="#">وکیل پرس!</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarSupportedContent" style={{backgroundColor:"turquoise"}}>
        <form class="form-inline my-2 my-lg-0">
          <Link to="/Login" class="mx-3">ورود</Link>
          <Link to="/Register"class="mx-2">ثبت نام</Link>
          <Link to="/LawyerPage"class="mx-2">صفحه مشاهده وکیل</Link>
          <Link to="/dashboard" class="mx-3">فروم</Link>
          {/**
           *  <button class="btn btn-primary my-3 mx-2 my-sm-0" type="submit">Login</button>
           */}
        </form>
      </div>
    </nav>
     <Outlet />
     </div>
       );
}

export default App;
