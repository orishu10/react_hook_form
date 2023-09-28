import { useForm, FieldValues, SubmitHandler,Controller } from "react-hook-form";


interface FormData {
  username: string;
  email: string;
  password:string;
}

function RegularForm() {

  const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]).{8,}$/;
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: FormData) => {
    console.log(data);
    const Data = {
      ...data,
    };
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit as SubmitHandler<FieldValues>)}>
        <p>
      <p> <label htmlFor="userName">user name</label>  </p>    
          {" "}
          <input
            placeholder="userName"
            {...register("userName", { required: true,
              validate: {
                maxLength: (v) =>
                  v.length >= 2 ||
                  "The userName should have at least 2 characters"
}})} 
                 />
        </p>
        <p>
      <p> <label htmlFor="email">email</label></p> 

          <input
            placeholder="email"
            {...register("email", {
              required: true,
              validate: {
                maxLength: (v) =>
                  v.length <= 50 ||
                  "The email should have at most 50 characters",
                matchPattern: (v) =>
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) ||
                  "Email address must be a valid address",
              },
            })}
          />
        </p>

      <p>
         <p>   <label htmlFor="password">password</label>  </p>
         <input
            placeholder="password"
            {...register("password", {
              required: true,
              validate: {
               matchPattern: (v) =>
                passwordPattern.test(v) ||
                  "password  must be a valid ",
                }
              })}
            />
           </p>
        {errors.username?.type === "required" && (
    <small>Username is required</small>
  )}
  {errors.username?.type === "minLength" && (
    <small>The username should have at least 2 characters</small>
  )}
        {errors.email?.type === "required" && (
    <small>email is required</small>
  )}

  {errors.email?.type === "minLength" && (
    <small>The email should have at least 8 characters</small>
  )}
  {errors.email?.type === "matchPattern" && (
    <small>"Email address must be a valid address"</small>
  )}
        {errors.password?.type === "required" && (
    <small>password is required</small>
  )}
  {errors.password?.type === "matchPattern" && (
    <small>"password  must be a valid "</small>
  )}
        <input type="submit" />
      </form>
    </>
  );
}

export default RegularForm;
