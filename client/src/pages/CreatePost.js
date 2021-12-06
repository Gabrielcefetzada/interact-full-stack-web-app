import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import api from '../variables/api'
import { useHistory } from "react-router-dom"

function CreatePost() {

  let history = useHistory()

  const initialValues = {
    title: "",
    postText: "",
    username: localStorage.getItem("currentUser")
  };

  const validationSchema = Yup.object().shape({
    title: Yup.string().required("You must input a Title!"),
    postText: Yup.string().required(),
    username: Yup.string().required(),
  });

  const onSubmit = async (data) => {
    try {
        await api.post('posts', data, { headers: {accessToken: localStorage.getItem('accessToken') }}) // esse data vem do validation schema
        history.push("/")
    } catch {
        console.log("error");
    }
  };

  return (
    <div className="createPostPage">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainer">
          <label>Title: </label>
          <ErrorMessage name="title" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="title"
            placeholder="(Ex. Title...)"
          />
          <label>Post: </label>
          <ErrorMessage name="postText" component="span" />
          <Field
            autocomplete="off"
            id="inputCreatePost"
            name="postText"
            placeholder="(Ex. Post...)"
          />
          <button type="submit"> Create Post</button>
        </Form>
      </Formik>
    </div>
  );
}

export default CreatePost;