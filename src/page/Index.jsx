import axios from 'axios';
import React, { useState } from 'react'
import { toast } from 'react-toastify';

function Index() {
    const [formvalue, setFormvalue] = useState({
        id: "",
        email: "",
        password: "",
        status: "",
      });
    
      const getform = (e) => {
        setFormvalue({
          ...formvalue,
          id: new Date().getTime().toString(),
          status: "Unblock",
          [e.target.name]: e.target.value,
        });
        console.log(formvalue);
      };
    
      const validation = () => {
        var result = true;
        if (formvalue.email == "") {
          toast.error("Email Field is required");
          result = false;
          return false;
        }
        if (formvalue.password == "") {
          toast.error("Password Field is required");
          result = false;
          return false;
        }
        return result;
      };
    
      const submithandel = async (e) => {
        e.preventDefault(); // stop page reload
        if (validation()) {
          const res = await axios.post(`http://localhost:3000/user`, formvalue);
          //console.log(res);
          if (res.status == 201) {
            setFormvalue({
              ...formvalue,
              email: "",
              password: ""
            });
            return false;
          }
        }
      };

  return (
    <>
      <div className="login-container">
        <h2 className="text-center">Facebook</h2>
        <form action="" method="post" onSubmit={submithandel}>
          <div className="form-group">
            <label htmlFor="email">Email or Phone</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email or Phone"
              required
              name="email"
              value={formvalue.email}
              onChange={getform}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              required
              value={formvalue.password}
            onChange={getform}
            />
          </div>
          <button type="submit" className="btn btn-primary btn-block">
            Log In
          </button>
          <button type="button" className="btn facebook-btn btn-block mt-2">
            Log In with Facebook
          </button>
        </form>
        <div className="text-center mt-3">
          <a href="#">Forgotten password?</a>
        </div>
        <div className="text-center mt-3">
          <span>
            New to Facebook? <a href="#">Create an account</a>
          </span>
        </div>
      </div>
    </>
  );

}

export default Index