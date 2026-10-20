import { useEffect, useState } from "react";
import api from "../lib/api";


type Course = {
    id: number;
    title: string;
    trainer: { fullname: string };
    level: string;
    price: number;
    durationHours: number;
};
export default function MyCoursesPage(){

    const [courses , setCourses] = useState<Course[]>([]);
    const [loading , setLoading] = useState(true);
    const [error ,setError] = useState("");
    useEffect(() => {
        api.get("/courses/enrolled")
        .then((res)=>setCourses(res.data))
        .catch(() => setError("could not load your courses"))
        .finally(()=> setLoading(false))
    }, []);


  if (loading) return <p>Loading…</p>;
  if (error) return <p>{error}</p>;
  if (courses.length === 0) return <p>You're not enrolled in any course yet.</p>;

  return (
    <div>
        <h1>My courses</h1>
        <ul>
            {courses.map((c) => (
                <li key={c.id}>
                    <h2>{c.title}</h2>
                    <p>by {c.trainer.fullname} &middot; {c.level} &middot; {c.durationHours} &middot; ${c.price}</p>
                </li>
            ))}
        </ul>
    </div>
  );
}