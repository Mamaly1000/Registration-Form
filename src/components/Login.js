import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./form.module.css";
import { validate } from "./validate";
import { toast } from "react-toastify";

const Login = () => {
  const [data, setData] = useState({
    name: "",
    password: "",
  });

  const changeHandler = (event) => {
    setData({ ...data, [event.target.name]: event.target.value });
  };
  const [touched, setTouched] = useState({});

  const [Errors, setErrors] = useState({});
  useEffect(() => {
    setErrors(validate(data, "Login"));
  }, [data, touched]);
  const focusHandler = (event) => {
    setTouched({ ...touched, [event.target.name]: true });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!Object.keys(Errors).length) {
      toast.success("you login successfully");
    } else {
      toast.error("invalid username or password");
      setTouched({
        name: true,
        password: true,
      });
    }
  };
  return (
    <div className={styles.container}>
      <form onSubmit={submitHandler} className={styles.form}>
        <h2 className={styles.header}>Sign Up</h2>
        <div className={styles.Username}>
          <label>Name</label>
          <input
            className={Errors.name && touched.name && styles.uncompleted}
            type="text"
            name="name"
            value={data.name}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {Errors.name && touched.name && <span>{Errors.name}</span>}
        </div>

        <div className={styles.Password}>
          <label>Password</label>
          <input
            className={
              Errors.password && touched.password && styles.uncompleted
            }
            type="password"
            name="password"
            value={data.password}
            onChange={changeHandler}
            onFocus={focusHandler}
          />
          {Errors.password && touched.password && (
            <span>{Errors.password}</span>
          )}
        </div>
        <div className={styles.formBtns}>
          <Link to="/signup">sign up</Link>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default Login;
