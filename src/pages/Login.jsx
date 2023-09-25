import * as Yup from "yup";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { login } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Login = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await login({ email, password });
      resetForm();
    } catch (error) {
      console.log(error);
      error.code === "auth/invalid-login-credentials" &&
        setErrors({
          email: "El usuario y/o contraseña son inválidos",
          password: "El usuario y/o contraseña son inválidos",
        });
    } finally {
      setSubmitting(false);
    }
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Email no válido").required("Email requerido"),
    password: Yup.string()
      .trim()
      .min(6, "Mínimo 6 caráteres")
      .required("Password requerida"),
  });

  return (
    <div className="p-3">
      <h1>Login</h1>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        {({
          values,
          handleSubmit,
          handleChange,
          errors,
          touched,
          handleBlur,
          isSubmitting,
        }) => (
          <form className="d-flex gap-2 flex-column" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Ingrese email"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
            />
            {errors.email && touched.email && errors.email}
            <input
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
            />
            {errors.password && touched.password && errors.password}
            <button
              className="btn btn-warning"
              type="submit"
              disabled={isSubmitting}
            >
              Login
            </button>

            <NavLink className="my-4" to="/register">
              Registrarme
            </NavLink>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Login;
