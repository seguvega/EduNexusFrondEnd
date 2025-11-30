import React from "react";
import { useNavigate } from 'react-router-dom';

const CourseForm = ({ course = {}, handleChange, handleSubmit }) => {
    const navigate = useNavigate();

    return (
        <form onSubmit={handleSubmit} className="form card p-3">
            <input type="hidden" name="id" value={course.id || ""} />

            <div className="form-group">
                <label htmlFor="itemTextField">Course Name</label>
                <input
                    id="itemTextField"
                    name="name"
                    className="form-control"
                    placeholder="Enter the Course Name"
                    value={course.name || ""}
                    onChange={handleChange}
                    required
                />
            </div>

            <div className="form-group">
                <label htmlFor="statusTextField">Status</label>
                <input
                    id="statusTextField"
                    name="status"
                    className="form-control"
                    placeholder="Enter a status"
                    value={course.status || ""}
                    onChange={handleChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="tagTextArea">
                    Tags <span className="text-muted">[use , to separate tags]</span>
                </label>
                <textarea
                    id="tagTextArea"
                    name="tags"
                    className="form-control"
                    placeholder="Enter the tags of the item"
                    value={course.tags || ""}
                    onChange={handleChange}
                    required
                />
            </div>
            &nbsp;
            <button className="btn btn-primary" type="submit">
                <i className="fas fa-edit"></i> Submit
            </button>
            &nbsp;
            <button className="btn btn-warning" type="button" onClick={() => navigate(-1)} >
                <i className="fas fa-undo"></i>
                Cancel
            </button>
        </form>
    );
};

export default CourseForm;