import prisma from "../lib/prisma.js";
import type { Request , Response } from "express";

export async function getCourses(req : Request,res:Response){

    const courses = await prisma.course.findMany({
        select :{
            id:true,
            title:true,
            description:true,
            price:true,
            durationHours:true,
            level:true,
            createdAt:true,
            trainer: {select:{fullname:true}}
        }
        
    });
    return res.status(200).json({courses});
    
}

export async function showCourse(req:Request, res:Response){
    
    const userId = req.user?.id;
    if (!userId){
        return res.status(401).json({Message: "You must be logged in to see this course"})
    }
    
    const courseId = Number(req.params.id);

    const course = await prisma.course.findUnique({
        where:{id: courseId},
        include: {trainer:true},
    });
    if (!course){
        return res.status(404).json({Message:"course doesn't exist anymore"});
    }
    

    const enrollment = await prisma.enrollment.findUnique({
        where:({
            studentId_courseId:{
                studentId: userId,
                courseId:courseId,

            }
        })
    });

    return res.json({
        course,
        alreadyEnrolled: enrollment !== null
    });

}
// Post /api/course/:id/enroll
export async function enrollCourse(req:Request,res:Response){
    const userId = req.user?.id
    if (!userId){
        return res.status(401).json({Message:"you have to be logged in"});
    }

    const CourseId = Number(req.params.id);
    // recheck the existing 3ala 5ater http is statless manach fi session kima symfony
    const course = await prisma.course.findUnique({
        where:{
            id:CourseId,
        },
        select:{id:true,title:true}
    })
    if(!course){
        return res.json("course no longer exist");
    }

    // if course exist then create enrollment 
    try{
        const enrollment = await prisma.enrollment.create({
            data:{
                studentId:userId,
                courseId:CourseId
                }
            });
        return res.status(201).json({enrollment});

        }catch(error:any){
            if (error?.code === "P2002") {
                return res.status(409).json({
                message: "already Enrolled",
            });
        }
    }



}