import { hashPassword } from "../../utils/hash";
import prisma from "../../utils/prisma"
import { CreateUserInput,} from "../../schema/users/users";



export async function createUser(input: CreateUserInput) {
    const { password, ...rest } = input;

    const {hash, salt} = hashPassword(password);

    const user = await prisma.user.create({
        data: {...rest, salt, password: hash},
    });

    return user;
}

export async function findUserByEmail(email: string) {
    return prisma.user.findUnique({
        where: {
            email,
        }
    })
}

export async function getAllUsers() {
    return prisma.user.findMany({
        select: {
            name: true,
            email: true,
            id: true,
        }
    })
    
}

export async function getUser(id: string) {
    return prisma.user.findUnique({
        select: {
            id: true, 
            name: true,
            email: true
        },
        where: {
            id,
        }

    })
}

export async function updateUser(id: string, name: string, email: string) {
    
    const user =  prisma.user.update({
        where:{
            id,     
        },
        data:{
            name,
            email,
        }
    })

    return user;
  
}

export async function deleteUser(id: string) {
    
    return prisma.user.delete({
        where:{
            id,     
        },
    })

  
  
}
