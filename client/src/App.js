import { 
  BrowserRouter as Router,
  Route,
  Routes,
  Outlet,
} from "react-router-dom";
import Root from "./routes/Root";
import ErrorPage from "./ErrorPage"
import HeaderComponent from "./components/employeeForm/miniComponents/headerComponent/HeaderComponent"
import MainFormComponent from "./components/employeeForm/miniComponents/mainFormComponent/MainFormComponent";


function App() {


  const NotFound = () => <h1>The page you are looking for is not found</h1>
  return (
    <Router>
      <div className="App">
        <HeaderComponent />
        <Routes>
          <Route exact path="/" element={<MainFormComponent />} ></Route>
          <Route exact path="/registrations" element={<Root />}></Route>
          <Route path="*" errorElement={<ErrorPage />} element={<NotFound />}></Route>
        </Routes>
    </div>
      </Router>
  );
}

export default App;
