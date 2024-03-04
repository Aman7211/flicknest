import React, { useState, useEffect } from "react";
import "./Login.scss";
import Button from "../../Components/button/Button";
// import { loginSuccess } from "../../Redux/Slices/authSlice";
import "./Login.scss";
import useFetch from '../../Hooks/useFetch';
import {useSelector } from 'react-redux';
import ColosseumLogo from "../../assets/Flixiy3.png";
import {TextField} from '@mui/material';
// import FormControlLabel from "@material-ui/core/FormControlLabel";
import {FormControlLabel} from '@mui/material';
// import {Checkbox} from "@mui/material";
import {Checkbox} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();


  const inputChangeHandler=(event)=>{
	setForm({...form,[event.target.name]:event.target.value})
}

  const[background,setBackground]=useState("");
  const {data}=useFetch("/movie/upcoming")
//   console.log(data);
  const {url}=useSelector((state)=>state.home);
//   const {token}=useSelector((state)=>state.auth);

  useEffect(()=>{
	const bg = url.backdrop  +  data?.results?.[Math.floor(Math.random()*20)].backdrop_path;
	// console.log(bg);
	setBackground(bg);
	// console.log(bg);
  },[data])

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior
	console.log(JSON.stringify({ email: form.email, password: form.password }))
    try {
      const response = await fetch(`http://localhost:4000/api/v1/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: form.email,
          password: form.password
        })
      });
        const data = await response.json();

		if (data.success) {
            localStorage.setItem("userEmail", form.email);
            localStorage.setItem("authToken",data.token);
			localStorage.setItem("username", data.user.name);

            console.log(localStorage.getItem("authToken"));
            navigate("/home");
			toast.success("Login SuccessFul");
		}


	  if (!response) {
        console.error("Login failed");
        // Handle login failure, e.g., display error message
      }
    } catch (error) {
      console.error("Error occurred during login:", error);
      // Handle error, e.g., display error message
    }
  };

  return (
	<div className="Login" style={{ backgroundImage:`url(${background})`, backgroundSize: "cover" }}>
	<img src={ColosseumLogo} alt="Logo" />
	<div className="LoginCard">
		<h1>Sign In</h1>
		<form onSubmit={handleSubmit}>
			<TextField
				name="email"
				className="textField"
				label="Enter Email"
				variant="filled"
				type="text"
				style={{ backgroundColor: "#fff" }}
				color="secondary"
				value={form.email}
				onChange={inputChangeHandler}
				// onBlur={fieldBlurHandler}
				autoComplete="off"
				InputLabelProps={{
					style: { color: "black" },
				}}
			/>

			{/* {emailSpan} */}

			<TextField
				name="password"
				className="textField"
				label="Password"
				variant="filled"
				type="password"
				style={{ backgroundColor: "#fff" }}
				color="secondary"
				value={form.password}
				onChange={inputChangeHandler}
				// onBlur={fieldBlurHandler}
				autoComplete="off"
				InputLabelProps={{
					style: { color: "black" },
				}}
			/>

			{/* {passwordSpan} */}

			<Button height="45px" width="100%" backgroundColor="#e50914" textColor="#fff">
				Sign In
			</Button>
		</form>

		<div className="HorizontalDiv">
			<FormControlLabel
				style={{ marginLeft: "-12px" }}
				control={<Checkbox style={{ color: "rgb(229, 9, 20)" }} name="checkedB" />}
				label="Remember Me"
			/>
			<span>Need help ?</span>
		</div>
		<div className="HorizontalDiv">
			<span>New user </span>
			<span className="spanLink" onClick={() => navigate("/")}>
				Register Here
			</span>
		</div>
	</div>
</div>
  );
};

export default Login;
