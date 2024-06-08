import React from 'react'
import {useForm} from "react-hook-form";
import * as yup from "yup";
import {yupResolver} from "@hookform/resolvers/yup";

const ValidForm = () => {
  function onSubmit(data){
    console.log(data);
  }
  
  const schema = yup.object().shape({
    fullName: yup.string("Can't be Empty").required("Required Field"),
    email: yup.string("Invalid Email").email("Invalid Email").required("Required Field"),
    age: yup.number("Invalid Age").positive("Age can't be negative").integer("Invalid Age").min(18,"Must be atleast 18").required("Required Field"),
    password: yup.string().min(4,"Password must containe atleast 4 characters").required("Required Field"),
    confirmPassword: yup.string().oneOf([yup.ref("password"),null],"Passwords Don't Match").required("Required Field")
  });
  
  const {register,handleSubmit,formState:{errors}} = useForm({
    resolver: yupResolver(schema)
  });

  return (
    <div className="form-component">
      <h1 className="form-heading">Valid Form</h1>
      <form className="form-container" onSubmit={handleSubmit(onSubmit)}>
        <div className="form-fields">
          <label className="input-labels">Full Name : </label>
          <input type="text" placeholder="Enter Name" {...register("fullName")} className="input-box"/>
          <p className="input-errors">{errors.fullName?.message}</p>

          <label className="input-labels">Email : </label>
          <input type="text" placeholder="Enter Email" {...register("email")} className="input-box"/>
          <p className="input-errors">{errors.email?.message}</p>

          <label className="input-labels">Age : </label>
          <input type="number" placeholder="Enter Age" {...register("age")} className="input-box"/>
          <p className="input-errors">{errors.age?.message}</p>

          <label className="input-labels">Password : </label>
          <input type="password" placeholder="Enter Password" {...register("password")} className="input-box"/>
          <p className="input-errors">{errors.password?.message}</p>

          <label className="input-labels">Confirm Password : </label>  
          <input type="password" placeholder="Enter Password" {...register("confirmPassword")} className="input-box"/>
          <p className="input-errors">{errors.confirmPassword?.message}</p>
        </div>

        <input type="submit" className="submit-button"/>
      </form>
    </div>
  )
}

export default ValidForm