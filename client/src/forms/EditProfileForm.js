import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Error from "../components/Error";
import usePutUser from "../hooks/useEditProfile";
const FormFieldElement = (props) => (
  <div className="col-md-6 standardized">
    <div className="form-group">{props.children}</div>
  </div>
);
const FormFieldElementWide = (props) => (
  <div className="col-md-12 standardized">
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
  email: Yup.string().email("Must be a valid e-mail format"),
  password: Yup.string(),
  passwordConfirmation: Yup.string().test(
    "passwords-match",
    "Passwords must match",
    function (value) {
      return this.parent.password === value;
    }
  ),
  name: Yup.string(),
  location: Yup.string(),
  twitter_link: Yup.string(),
  facebook_link: Yup.string(),
  instagram_link: Yup.string(),
  bio: Yup.string(),
  img: Yup.string().matches(
    /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/,
    "Must be a valid URL"
  ),
});

const initialValues = {
  password: "",
  passwordConfirmation: "",
  name: "",
  location: "",
  twitter_link: "",
  facebook_link: "",
  instagram_link: "",
  bio: "",
  img: "",
};

const styles = {
  error: { color: "red" },
};

export default function EditProfileForm(props) {
  const [editUserInfo, setEditUserInfo] = useState({});
  usePutUser(props.user.user_id, editUserInfo, props.user.token);

  const handleSubmit = (values) => {
    let changed_values = Object.fromEntries(
      Object.entries(values).filter(([_, v]) => v.trim() != "")
    );
    setEditUserInfo(changed_values);
    props.setUser({ ...props.user, ...changed_values });
    props.setDoEdit(false);
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
              <span>Username</span>
              <Field
                type="text"
                name="name"
                className="form-control"
                placeholder={props.user.name ?? "How do you have No Name?"}
              />
              {errors.name && touched.name ? (
                <Error error={errors.name} />
              ) : null}
            </FormFieldElement>

            <FormFieldElement>
              <span>Location</span>
              <Field
                type="text"
                name="location"
                className="form-control"
                placeholder={props.user.location ?? "BFE"}
              />
              {errors.location && touched.location ? (
                <Error error={errors.location} />
              ) : null}
            </FormFieldElement>
          </div>

          <div style={{ marginTop: 15 }} className="row">
            <FormFieldElement>
              <span>Profile Picture URL</span>
              <Field
                type="text"
                name="img"
                className="form-control"
                placeholder={props.user.img ?? "Add A URL to a Picture"}
              />
              {errors.img && touched.img ? <Error error={errors.img} /> : null}
            </FormFieldElement>

            <FormFieldElement>
              <span>Twitter Handle</span>
              <Field
                type="text"
                name="twitter_link"
                className="form-control"
                label="TwitterHandle"
                placeholder={props.user.twitter_link ?? "@TwitterHandle"}
              />
              {errors.twitter_link && touched.twitter_link ? (
                <Error error={errors.twitter_link} />
              ) : null}
            </FormFieldElement>
          </div>
          <div style={{ marginTop: 15 }} className="row">
            <FormFieldElement>
              <span>Facebook Handle</span>
              <Field
                type="text"
                name="facebook_link"
                className="form-control"
                placeholder={props.user.facebook_link ?? "@FacebookUserName"}
              />
              {errors.facebook_link && touched.facebook_link ? (
                <Error error={errors.facebook_link} />
              ) : null}
            </FormFieldElement>

            <FormFieldElement>
              <span>Instagram Handle</span>
              <Field
                type="text"
                name="instagram_link"
                className="form-control"
                placeholder={props.user.instagram_link ?? "@InstagramHandle"}
              />
              {errors.instagram_link && touched.instagram_link ? (
                <Error error={errors.instagram_link} />
              ) : null}
            </FormFieldElement>
          </div>
          <div style={{ marginTop: 15 }} className="row">
            <FormFieldElementWide>
              <>
                <span>Bio</span>
                <Field
                  component="textarea"
                  rows={3}
                  name="bio"
                  className="form-control"
                  placeholder={
                    props.user.bio ??
                    "Tell us what makes you bad ass?  You can show us later!"
                  }
                />
                {errors.password && touched.password ? (
                  <Error error={errors.password} />
                ) : null}
              </>
            </FormFieldElementWide>
          </div>
          <div style={{ marginTop: 15 }} className="row">
            <FormFieldElement>
              <>
                <span>Password</span>
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
              <span>Confirm Password</span>
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
              Edit Profile
            </button>
          </FormFieldButton>
        </Form>
      )}
    </Formik>
  );
}
