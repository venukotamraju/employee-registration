import { Formik, Form, Field, ErrorMessage} from "formik";
import "../miniComponents.css";
import Button from '@mui/material/Button';
import { NavLink } from "react-router-dom";
import { useState } from "react";

const validate = (values) => {
  // code for validation and errors
  const errors = {};

  // for email
  if (!values.email) {
    errors.email = "Enter your email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  // for first name
  if (!values.firstName) {
    errors.firstName = "Please enter your first name";
  } else if (values.firstName.length > 15) {
    errors.firstName = "Must be 15 characters or less !";
  }
  // for last name
  if (!values.lastName) {
    errors.lastName = "Please enter your last name";
  } else if (values.lastName.length > 20) {
    errors.lastName = "Must be 20 characters or less !";
  }
  // for dateOfBirth
  if (!values.dateOfBirth) {
    errors.dateOfBirth = "Please enter date of birth";
  }
  // for employee id
  if (!values.employeeId) {
    errors.employeeId = "Required";
  } else if (values.employeeId.length !== 10) {
    errors.employeeId = "Must be 10 digits";
  }
  // for phone number
  if (!values.phoneNo) {
    errors.phoneNo = "Required";
  } else if (values.phoneNo.length !== 10) {
    errors.phoneNo = "Must be 10 digits";
  }
  return errors;
};

const onSubmitFunction = async (values) => {
    const response = await fetch("http://localhost:4000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
    })
}

function MainFormComponent() {
   const [submitted,setSubmitted] = useState(false); 
   const initialValues= {
      email: "",
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      employeeId: "",
      phoneNo: "",
    };
  return (
    <>
    <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values,{resetForm}) => {
            onSubmitFunction(values);
            resetForm();
            setSubmitted(true)
        }}
    >
      <Form>
        <div className="main">
          {submitted?<div style={{color:"white", backgroundColor:"black", width:"15%", textAlign:"center", fontSize:"larger", padding:"10px", fontFamily:"monospace"}}>Submitted successfully!</div>:<div style={{color:"red", width:"15%", textAlign:"center", fontSize:"larger", padding:"10px", fontFamily:"monospace"}}>please enter your details</div>}
        <label htmlFor="firstName">First name</label>
        <Field
          type="text"
          name="firstName"
          id="firstName"
          placeholder="firstName"
          c
        />
        <span><ErrorMessage name="firstName"/></span>
        <br />
        <label htmlFor="lastName">Last name</label>
        <Field
          type="text"
          name="lastName"
          id="lastName"
          placeholder="lastName"
          
        />
        <span><ErrorMessage name="lastName"/></span>
        <br />
        <label htmlFor="dateOfBirth">Date of birth</label>
        <Field
          type="date"
          name="dateOfBirth"
          id="dateOfBirth"
          
        />
        <span><ErrorMessage name="dateOfBirth"/></span>
        <br />
        <label htmlFor="phoneNo">Phone number</label>
        <Field
          type="text"
          name="phoneNo"
          id="phoneNo"
          placeholder="1234567890"
          
        />
        <span><ErrorMessage name="phoneNo" /></span>
        <br />
        <label htmlFor="email">E-mail</label>
        <Field
          type="email"
          name="email"
          id="email"
          placeholder="xxxxx@x.com"
          
        />
        <span><ErrorMessage name="email" /></span>
        <br />
        <label htmlFor="employeeId">Employee Id</label>
        <Field
          type="text"
          name="employeeId"
          id="employeeId"
          placeholder="xxxxxxxxxx"
          
        />
        <span><ErrorMessage name="employeeId"/></span>
        <br />
        <Button type="submit" size="medium" variant="outlined">Submit</Button>
        </div>
      </Form>
    </Formik>
      <div style={{width:"100%", textAlign:"center", marginBottom:"10px"}}>
      <Button size="medium" variant="outlined">
        <NavLink to="/registrations" style={{textDecoration:"none"}}>view submissions</NavLink>
      </Button> 
      </div>
    </>
  );
}

export default MainFormComponent;
