import React, { useState, useEffect} from "react";
import "./Register.scss";
import useFetch from '../../Hooks/useFetch';
import {useSelector } from 'react-redux';
import ColosseumLogo from "../../assets/Flixiy3.png";
import { TextField } from "@mui/material";
import Button from "../../Components/button/Button";
import { useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
const SignUp = () => {

	const [form, setForm] = useState({ email:"", name:"", password:"", repeatPassword:""   });

  const[background,setBackground]=useState("");


  const {data,loading}=useFetch("/movie/upcoming")
  const {url}=useSelector((state)=>state.home);

  useEffect(()=>{
    const bg = url.backdrop  +  data?.results?.[Math.floor(Math.random()*20)].backdrop_path;
    setBackground(bg);
  },[data]);


	const navigate = useNavigate();

	const inputChangeHandler=(event)=>{
		setForm({...form,[event.target.name]:event.target.value})
	}
		
	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			console.log(JSON.stringify({ name: form.name, email: form.email, password: form.password, confirmPassword: form.repeatPassword }));

			const response = await fetch('http://localhost:4000/api/v1/auth/signup', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name: form.name,
					email: form.email,
					password: form.password,
					confirmPassword: form.repeatPassword
				})
			});
				// Handle success response
				const data1= await response.json();
				// console.log(data1);
				toast.success('Signup successful, Kindly Login');
                navigate("/login");
		 if(!response) {
				// Handle error response
				toast.error("Enter Valid Credentials ")
			}
		} catch (error) {
			console.error('Error occurred during signup:', error);
		}
	};
	

	return (

   <div className="SignUp" style={{ backgroundImage:`url(${background})`, backgroundSize: "cover" }}>
			<img src={ColosseumLogo} alt="Logo" />
			<div className="SignUpCard">
				<h1>Sign Up</h1>
				<form onSubmit={handleSubmit}>
					<TextField
						name="name"
						className="textField"
						label="Name"
						variant="filled"
						type="text"
						style={{ backgroundColor: "#fff" }}
						color="secondary"
						value={form.name}
						onChange={inputChangeHandler}
						// onBlur={fieldBlurHandler}
						autoComplete="off"
						InputLabelProps={{
							style: { color: "black" },
						}}
					/>

					{/* {nameSpan} */}

					<TextField
						name="email"
						className="textField"
						label="Enter Email "
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
						InputLabelProps={{
							style: { color: "black" },
						}}
					/>

					{/* {passwordSpan} */}

					<TextField
						name="repeatPassword"
						className="textField"
						label="Repeat Your Password"
						variant="filled"
						type="password"
						style={{ backgroundColor: "#fff" }}
						color="secondary"
						value={form.repeatPassword}
						onChange={inputChangeHandler}
						// onBlur={fieldBlurHandler}
						InputLabelProps={{
							style: { color: "black" },
						}}
					/>

					{/* {repeatPasswordSpan} */}

					<Button height="45px" width="100%" backgroundColor="#e50914" textColor="#fff">
						Sign Up
					</Button>
				</form>

				<div className="HorizontalDiv">
					<span>Do you already have an account? </span>
					<span className="spanLink" onClick={() => navigate("/login")}>
						 {/* onClick={() => history.push("/login")} > */}
						Sign In
					</span>
				</div>
			</div>
		</div>
    
	);
};

export default SignUp;





