import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function formikForm() {
  const initialValues = { username: "", email: "", password: "" };

  const validationSchema = Yup.object({
    username: Yup.string().required("Username is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, setStatus, resetForm }) => {
    setStatus({ success: "", error: "" });

    try {
      const res = await fetch("https://reqres.in/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (!res.ok) throw new Error("Failed to register");

      const data = await res.json();
      setStatus({ success: `Registered! id: ${data.id}`, error: "" });
      resetForm();
    } catch (err) {
      setStatus({ success: "", error: err.message });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ maxWidth: 400 }}>
      <h3>Formik Registration Form</h3>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form>
            {status && status.error && <div className="error">{status.error}</div>}
            {status && status.success && <div className="success">{status.success}</div>}

            <div>
              <label>Username</label>
              <Field name="username" type="text" />
              <ErrorMessage name="username" component="div" className="error" />
            </div>

            <div>
              <label>Email</label>
              <Field name="email" type="email" />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div>
              <label>Password</label>
              <Field name="password" type="password" />
              <ErrorMessage name="password" component="div" className="error" />
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Registering..." : "Register"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
