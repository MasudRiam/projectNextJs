import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/option";
import UserModel from "@/model/User";
import dbConnect from "@/lib/dbConnect";
import { User } from "next-auth";


export async function POST(request: Request) {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    const user = session?.user;

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {
            status: 401
        });
    }

    const userId = user._id;

    const { acceptMessages } = await request.json();

    try {
        const updatedUser = await UserModel.findByIdAndUpdate (
            userId,
            { isAcceptingMessage: acceptMessages },
            { new: true}
        )

         if (!updatedUser) {
            return Response.json({
                success: false,
                message: "User not found"
            }, {
                status: 404
            });
         }
        return Response.json({
            success: true,
            message: `User is now ${acceptMessages ? "accepting" : "not accepting"} messages`
        }, {
            status: 200});

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error accepting message"
        }, {
            status: 500
        });
        
    }
}


export async function GET(request: Request) {
    await dbConnect();
    
    const session = await getServerSession(authOptions);
    const user: User = session?.user as User;

    if (!session || !user) {
        return Response.json({
            success: false,
            message: "Unauthorized"
        }, {
            status: 401
        });
    }

    const userId = user._id;
    const { acceptMessages } = await request.json();

    try {
        
    } catch (error) {
        
    }

}