import * as Yup from "yup";
import { Formik } from "formik";
import { NavLink } from "react-router-dom";
import { register } from "../config/firebase";
import { useUserContext } from "../context/UserContext";
import { useRedirectActiveUser } from "../hooks/useRedirectActiveUser";

import { Avatar, Box, Button, TextField, Typography } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import { LoadingButton } from "@mui/lab";

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
    <Box sx={{ mt: 8, maxWidth: "400px", mx: "auto", textAlign: "center" }}>
      <Avatar sx={{ mx: "auto", bgcolor: "#69c1f7", marginBottom: 2 }}>
        <PersonIcon />
      </Avatar>

      <Typography variant="h5" component="h1">
        Crear cuenta
      </Typography>

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
          <Box
            onSubmit={handleSubmit}
            sx={{
              padding: "24px 8px",
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
            component="form"
          >
            <TextField
              type="text"
              placeholder="example@example.com"
              value={values.email}
              onChange={handleChange}
              name="email"
              onBlur={handleBlur}
              id="email"
              label="Ingrese email"
              fullWidth
              error={errors.email && touched.email}
              helperText={errors.email && touched.email && errors.email}
            />
            <TextField
              type="password"
              placeholder="Ingrese contraseña"
              value={values.password}
              onChange={handleChange}
              name="password"
              onBlur={handleBlur}
              id="password"
              label="Ingrese contraseña"
              fullWidth
              error={errors.password && touched.password}
              helperText={
                errors.password && touched.password && errors.password
              }
            />
            <LoadingButton
              type="submit"
              disabled={isSubmitting}
              loading={isSubmitting}
              variant="contained"
              fullWidth
            >
              Register
            </LoadingButton>
            <Button fullWidth component={NavLink} to="/">
              ¿Ya tienes una cuenta? Inicia sesión
            </Button>
          </Box>
        )}
      </Formik>
    </Box>
  );
};

export default Register;
