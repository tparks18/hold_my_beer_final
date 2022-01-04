import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Error from "../components/Error";

const FormFieldElement = (props) => (
  <div className="col-md-6 standardized">
    <div className="form-group">{props.children}</div>
  </div>
);
const FormFieldButton = (props) => (
  <div className="row">
    <div className="col-md-12 standardized">
      <div className="form-group">{props.children}</div>
    </div>
  </div>
);

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Required"),
  password: Yup.string().required("Required"),
  passwordConfirmation: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  name: Yup.string().required("Required"),
  location: Yup.string().required("Required"),
});

const initialValues = {
  email: "",
  password: "",
  passwordConfirmation: "",
  name: "",
  location: "",
};

const styles = {
  error: { color: "red" },
};

export default function RegisterForm(props) {
  const handleSubmit = (values) => {
    props.setUserInfo(values);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={FormSchema}
      onSubmit={(values) => {
        handleSubmit(values);
      }}
    >
      {({ errors, touched }) => (
        <Form>
          <div className="row">
            <FormFieldElement>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder="Name"
              />
              {errors.name && touched.name ? (
                <Error error={errors.name} />
              ) : null}
            </FormFieldElement>
            <FormFieldElement>
              <Field
                type="text"
                name="location"
                className="form-control"
                placeholder="Location"
              />
              {errors.location && touched.location ? (
                <Error error={errors.location} />
              ) : null}
            </FormFieldElement>
          </div>
          <div style={{ marginTop: 15 }} className="row">
            {/* <FormFieldElement> */}
            <div className="col-12">
              <div className="form-group">
                <Field
                  type="e-mail"
                  name="email"
                  className="form-control"
                  placeholder="E-mail"
                />
                {errors.email && touched.email ? (
                  <Error error={errors.email} />
                ) : null}
              </div>
            </div>
            {/* </FormFieldElement> */}
          </div>

          <div style={{ marginTop: 15 }} className="row">
            <FormFieldElement>
              <>
                <Field
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Password"
                />
                {errors.password && touched.password ? (
                  <Error error={errors.password} />
                ) : null}
              </>
            </FormFieldElement>

            <FormFieldElement>
              <Field
                type="password"
                name="passwordConfirmation"
                className="form-control"
                placeholder="Confirm Password"
              />
              {errors.passwordConfirmation && touched.passwordConfirmation ? (
                <Error error={errors.passwordConfirmation} />
              ) : null}
            </FormFieldElement>
          </div>

          <FormFieldButton>
            <button
              style={{ marginTop: 15 }}
              type="submit"
              className="btn btn-primary btn-block"
            >
              Register
            </button>
          </FormFieldButton>
        </Form>
      )}
    </Formik>
  );
}
