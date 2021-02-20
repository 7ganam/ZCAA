import React, { Fragment, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EDITOR_JS_TOOLS } from './EditorComponent/editorJsTools'
import EditorComponent from "./EditorComponent/EditorComponent"
import "./News_form.css"


export default function News_form() {


    const [Sendin_data, setSendin_data] = useState(false)
    const [FetchError, setFetchError] = useState(null)
    const [SubmitFailed, setSubmitFailed] = useState(false)
    const [EditorData, setEditorData] = useState()


    const news_post_submit_handler = async data => {
        try {
            setSendin_data(true)
            // -----  sending the json data 


            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/news/new_post`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // Authorization: this.context.token ? ('Bearer ' + this.context.token) : ""
                },
                body: JSON.stringify(data)
            });

            const responseData = await response.json();

            if (!response.ok) {
                setSubmitFailed(true)
                throw new Error(responseData.message);
            }

            setSubmitFailed(false)


        } catch (err) {
            setSendin_data(false)
            setFetchError(err.message)
        }

    };





    const formik = useFormik({
        initialValues: {
            Title: '',
            thumbnail_text: '',
        },
        validationSchema: Yup.object({
            Title: Yup.string()
                .min(10, 'Must be at least 10 characters ')
                .required('Required'),
            thumbnail_text: Yup.string()
                .min(10, 'Must be at least 10 characters ')
                .required('Required'),
        }),
        onSubmit: values => {
            const news_data = { meta_values: values, EditorData: EditorData }
            console.log({ news_data })
            news_post_submit_handler(news_data);
        },
    });







    return (
        <Fragment>
            <form onSubmit={formik.handleSubmit}>

                <div className="form_entry">
                    <div className="label_div" style={{}}>
                        <label className="meta_label" htmlFor="Title">Title</label>
                    </div>

                    <div className="input_div" style={{}}>
                        <input className="meta_input"
                            id="Title"
                            name="Title"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.Title}
                        />
                    </div >

                    {formik.touched.Title && formik.errors.Title ? (
                        <div className="form_error_text">{formik.errors.Title}</div>
                    ) : null}
                </div>

                <div className="form_entry">
                    <div className="label_div" style={{}}>
                        <label className="meta_label" htmlFor="thumbnail_text">Thumbnail text</label>
                    </div>

                    <div className="input_div" style={{}}>
                        <input
                            className="meta_input"
                            id="thumbnail_text"
                            name="thumbnail_text"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.thumbnail_text}
                        />
                    </div >
                    {formik.touched.thumbnail_text && formik.errors.thumbnail_text ? (
                        <div className="form_error_text">{formik.errors.thumbnail_text}</div>
                    ) : null}
                </div>

                <EditorComponent pass_data_up={setEditorData} />

                <button style={{ marginBottom: "100px" }} type="submit" className="btn btn-primary" disabled={!formik.isValid} >
                    {!formik.isValid ? "form data not valid" : "Submit"}
                </button>

            </form>
            <div>
                {JSON.stringify(formik.values, null, 2)}
            </div>
        </Fragment>
    );
};

