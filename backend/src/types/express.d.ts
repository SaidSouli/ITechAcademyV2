// bich nwariw ts ili req.user exist fi kol request
//  Express's Requent ma3andhech type user donc nzidouha lina
declare global {
    namespace Express {
        interface Request {
            user?: { id: number; role: string };
        }
    }
}

export {};