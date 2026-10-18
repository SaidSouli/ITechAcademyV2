import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import api from '../lib/api';

type Trainer = { id: number; fullname: string; bio: string; photoUrl: string };
type Course = {
  id: number;
  title: string;
  description: string;
  price: string;
  durationHours: number;
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED';
  trainer: Trainer;
};

export default function CourseShow() {
  const { id } = useParams<{ id: string }>();
  const [data, setData] = useState<{ course: Course; alreadyEnrolled: boolean } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [enrolling, setEnrolling] = useState(false);

  useEffect(() => {
    api.get(`/courses/${id}`)
      .then((response) => {setData(response.data)})
      .catch((err) => setError(err.response?.data?.error ?? 'Failed to load course'))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleEnroll() {
    setEnrolling(true);
    if (!data){
        return;
    }
    try {
      
        await api.post(`/courses/${data.course.id}/enroll`);
        const updatedData = {...data , alreadyEnrolled:true}
        setData(updatedData);

    } catch (err: any) {
      alert(err.response?.data?.error ?? 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  }

  if (loading) return <div className="container mt-4">Loading…</div>;
  if (error)   return <div className="container mt-4 text-danger">Error: {error}</div>;
  if (!data)   return null;

  const { course, alreadyEnrolled } = data;

  return (
    <div className="container mt-4">
      <Link to="/courses">&larr; back to courses</Link>
      <h1 className="mt-3">{course.title}</h1>
      <p className="text-muted">
        {course.level} &middot; {course.durationHours} hours &middot; {course.price} €
      </p>
      <p>{course.description}</p>
      <h3>Trainer</h3>
      <p><strong>{course.trainer.fullname}</strong></p>
      <p>{course.trainer.bio}</p>
      <h1>
        {alreadyEnrolled ? (
          <button className="btn btn-success" disabled>Already enrolled</button>
        ) : (
          <button className="btn btn-primary" onClick={handleEnroll} disabled={enrolling}>
            {enrolling ? 'Enrolling…' : 'Enroll'}
          </button>
        )}
      </h1>
    </div>
  );
}