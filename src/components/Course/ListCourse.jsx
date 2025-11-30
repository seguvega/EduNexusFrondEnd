import React, { useEffect, useState } from 'react';
import { list } from '../../datasource/api-course.js';
import ListCourseCourse from './ListItemCourse.jsx';
import { Link } from 'react-router-dom';

const ListCourse = () => {
    const [CourseList, setCourseList] = useState([]);
    let [isLoading, setIsLoading] = useState(true);

    const loadInventory = () => {
        list().then((data) => {
            if (data) {
                setCourseList(data || []);

                setIsLoading(false);
            }
        }).catch(err => {
            alert(err.message);
            console.log(err);
        });
    }

    // When the component loads.
    useEffect(() => {
        loadInventory();
    }, []);

    // When a Course is removed.
    const handleRemove = () => {
        loadInventory();
    }

    return (
        <>
            <div>
                <Link to="/course/add" className="btn btn-primary align-self-end" role="button">
                    <i className="fas fa-plus-circle"></i>
                    Add a new Course
                </Link>
            </div>
            <div className="table-responsive" >
                {isLoading && <div>Loading...</div>}
                {!isLoading &&
                    <table className="table table-bordered table-striped table-hover">
                        <thead>
                            {/* -- Header Row-- */}
                            <tr>
                                <th className="text-center">Course</th>
                                <th className="text-center">Status</th>
                                <th className="text-center">Tags</th>
                                <th className="text-center" colSpan="3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* -- Repeatable Template Row -- */}
                            {CourseList.map(course =>
                                <ListCourseCourse
                                    key={course.id}
                                    course={course}
                                    onRemoved={handleRemove}
                                />
                            )}
                        </tbody>
                    </table>}
            </div>
        </>
    )
}

export default ListCourse;