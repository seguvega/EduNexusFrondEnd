import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseModel from "../../datasource/CourseModel";
import { create } from "../../datasource/api-course";
import CourseForm from "./CourseForm";

const AddCourse = () => {
    const navigate = useNavigate();
    const [course, setCourse] = useState(new CourseModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setCourse(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting course: ", course);

        const submitcourse = {
            id: course.id,
            name: course.name,
            tags: course.tags.toString(),
            status: course.status
        };

        create(submitcourse)
            .then(data => {
                if (data && data.id) {
                    alert(`Item added with the id ${data.id}`);
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
                <div className="offset-md-1 col-md-15">
                    <h1>Add Course Item</h1>
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

export default AddCourse;