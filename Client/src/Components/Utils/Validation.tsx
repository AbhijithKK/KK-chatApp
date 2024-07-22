import * as Yup from "yup";

export let userSchema = Yup.object({
  name: Yup.string().required("This field is required"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  number: Yup.string().min(10).max(10).required("This field is required"),
  password: Yup.string().min(4).required("This field is required"),
  cpassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("This field is required"),
});

export const loginScheema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Please enter a valid email address"),
  password: Yup.string().required("This field is required"),
});
