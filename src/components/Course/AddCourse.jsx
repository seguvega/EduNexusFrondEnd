import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CourseModel from "../../datasource/CourseModel";
import { create } from "../../datasource/api-course";
import CourseForm from "./CourseForm";

const AddCourse = () => {
    const navigate = useNavigate();
    const [product, setProduct] = useState(new CourseModel());
    const [errorMsg, setErrorMsg] = useState('')

    const handleChange = (event) => {
        const { name, value } = event.target;
        setProduct(formData => ({ ...formData, [name]: value }));
    }
    
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Submitting course: ", product);

        const submitProduct = {
            id: product.id,
            name: product.name,
            tags: product.tags.toString(),
            status: product.status
        };

        create(submitProduct)
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
                        product={product}
                        handleChange={handleChange}
                        handleSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
}

export default AddCourse;