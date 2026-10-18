// bich nwariw ts ili req.user exist fi kol request
//  Express's Request ma3andhech type user donc nzidouha lina to prevent compile errors
declare global {
    namespace Express {
        interface Request {
            user?: { id: number; role: string };
        }
    }
}

export {};