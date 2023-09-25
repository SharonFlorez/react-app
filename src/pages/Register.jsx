import * as Yup from "yup";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

const Register = () => {
  const { user } = useUserContext();
  useRedirectActiveUser(user, "/dashboard");

  const onSubmit = async (
    { email, password },
    { setSubmitting, setErrors, resetForm }
  ) => {
    try {
      await register({ email, password });
      resetForm();
    } catch (error) {
      console.log(error);
      error.code === "auth/email-already-in-use" &&
        setErrors({
          email: "Este correo ya está registrado.",
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
      <h1>Register</h1>
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
              Register
            </button>
            <p className="my-4">
              ¿Ya tienes una cuenta?
              <NavLink to="/">Inicia sesión</NavLink>
            </p>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default Register;
