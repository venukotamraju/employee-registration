import { Link, NavLink, Outlet,Route,BrowserRouter as Router, Routes} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from 'axios';
import "./root.css";
import Button from '@mui/material/Button';

export default function Root() {
  const [tableData, setTableData]=useState(null);
  const [readyForRender, setReadyForRender] = useState(false)

  useEffect( () => {
      async function fetchTableData () {
        axios.get("http://localhost:4000")
          .then(res => {
            setTableData(res)
            setReadyForRender(true)
          })
      }
      fetchTableData();
    },[]
  );
  if (tableData){
  // console.log(tableData)
  const headersMap = tableData.data.fields.map((e)=><th key={e.name}>{e.name}</th>)
  
  const rowsMap = tableData.data.rows.map((e)=> (
    <tr>
      {Object.values(e).map((d)=><td key={d}>{d}</td>)}
    </tr>
  ))
  return (
      <>
      <marquee behavior="" direction="">
      <h2 style={{color:"red"}}>Please check your submitted entry...</h2>
      </marquee>
      <div className="container">
      <table>
        <thead className="table_head">
          <tr>
            {headersMap}
          </tr>
        </thead>
        <tbody className="table_body">
          {rowsMap}
        </tbody>
      </table>
      </div>
      {/* <Link to='/registration'> */}
       <div className="button_container">
        <Button variant="contained" disableElevation color="secondary" size="small">
          <NavLink to="/" style={{color:"white", textDecoration:"none"}}>Submit another entry</NavLink>
        </Button>
        </div>
      </>
    );
  }
}