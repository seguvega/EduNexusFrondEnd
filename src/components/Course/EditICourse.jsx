import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CourseModel from "../../datasource/CourseModel";
import { update, read } from "../../datasource/api-course";
import CourseForm from "./CourseForm";

const EditICourse = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [course, setcourse] = useState(new CourseModel());
    const [errorMsg, setErrorMsg] = useState('')

    // When the component loads.
    useEffect(() => {
        read(id).then(data => {
            if (data) {
                setcourse(new CourseModel(
                    data.id,
                    data.name,
                    data.tags,
                    data.status
                ));
            } else {
                setErrorMsg(data.message);
            }

        }).catch(err => {
            setErrorMsg(err.message);
            console.log(err);
        });
    }, [id, navigate]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setcourse(formData => ({ ...formData, [name]: value }));
    }
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting course: ", course);

        const submitcourse = {
            id: course.id,
            name: course.name,
            tags: course.tags.toString(),
            status: course.status,
        };

        update(submitcourse, id)
            .then(data => {
                if (data && data.success) {
                    alert(data.message);
                    navigate("/course/list");
                } else {
                    setErrorMsg(data.message);
                }
            })
            .catch(err => {
                setErrorMsg(err.message);
                console.log(err);
            });
    }


    return (
        <div className="container" style={{ paddingTop: 10 }}>
            <div className="row">
                <div className="offset-md-3 col-md-6">
                    <h1>Edit Inventory Item</h1>
                    <p className="flash"><span>{errorMsg}</span></p>
                    <CourseForm
                        course={course}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default EditICourse;