import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../lib/api";

type Course = {
    id: number;
    title: string;
    trainer: { fullname: string };
    level: string;
    price: number;
    durationHours: number;
};

export default function CoursesPage() {
    const [courses, setCourses] = useState<Course[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    
    useEffect(() => {
        api.get("/courses")
            .then((res) => setCourses(res.data.courses))
            .catch((err) => setError(err.response?.data?.message ?? "Couldn't load courses"));
    }, []);

    
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!courses) return <p className="text-muted">Loading...</p>;

    return (
        <div>
            <h1>Our courses</h1>

            
            {courses.length === 0 ? (
                <p className="text-muted">No courses available for now</p>
            ) : (
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Trainer</th>
                            <th>Level</th>
                            <th>Duration</th>
                            <th>Price</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        
                        {courses.map((course) => (
                            <tr key={course.id}>
                                <td>{course.title}</td>
                                <td>{course.trainer.fullname}</td>
                                <td>{course.level}</td>
                                <td>{course.durationHours}h</td>
                                <td>{course.price}</td>
                                <td>
                                    <Link
                                        to={`/courses/${course.id}`}
                                        className="btn btn-sm btn-primary"
                                    >
                                        View
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}