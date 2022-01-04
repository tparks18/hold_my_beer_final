import React from 'react'
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import Error from "../components/Error";

const FormFieldElement = (props) => 
(<div style={{ marginTop: 15 }} className="row">
    <div className="block standardized">
      <div className="form-group">
        {props.children}
      </div>
    </div>
  </div>)

const FormSubmitElement=(props)=>(
  <div className="row">
  <div className="col-md-12 standardized">
    <div className="form-group">
      {props.children}
    </div>
  </div>
</div>
)


  
  const FormSchema = Yup.object().shape({
    email: Yup.string()
    .email("Must be a valid e-mail format")
    .required("Required"),
    password: Yup.string().required("Required"),
  });
  
  const initialValues = {
    email: "",
    password: "",
  };

export default function LoginForm(props) {    
    const handleSubmit = ({email, password})=>{  
      props.setCreds({"password":password,"email":email.toLowerCase()})
    }
    return (
        <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={(values, {resetForm}) => {
          handleSubmit(values);
          resetForm(initialValues);
        }}
      >
        {({ errors, touched }) => (
          <Form>
            <FormFieldElement>
              <>
              <Field
                type="e-mail"
                name="email"
                className="form-control"
                placeholder="E-mail"
              />
              {errors.email && touched.email ? (
                <Error error={errors.email}/>
              ) : null}
              </>
            </FormFieldElement>
    
            <FormFieldElement>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Password"
              />
            </FormFieldElement>
            
            <FormSubmitElement>
                <>
                <button
                    style={{ marginTop: 15 }}
                    type="submit"
                    className="btn btn-primary btn-lg btn-block"
                >Login</button>
                <Error error={props.error}/>
                </>
            </FormSubmitElement>
          </Form>
        )}
      </Formik>
    )
}
