import {PrismaClient , Role ,Level} from '@prisma/client';

const prisma = new PrismaClient()

async function main() {

    const trainer = await prisma.trainer.create({
        data:{
            fullname: 'houssem',
            bio:'Expert on typescript ',
            photoUrl:'#'
        }
    });
    const user = await prisma.user.create({
        data: {
            email:"student1@email.com",
            fullname:"said souli",
            password:"saidpass",
            role:Role.USER
        },
    });
    const course = await prisma.course.create({
        data:{
            title: 'Prisma 101',
            description:'prisma for beginners',
            price:0.99,
            durationHours:2,
            level: Level.BEGINNER,
            trainerId: trainer.id,

        },
    });
    await prisma.enrollment.create({
        data: {
            studentId: user.id,
            courseId: course.id,
        },
    });
}

main()
    