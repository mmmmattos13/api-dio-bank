import  { Request, Response } from 'express';
import { UserService } from '../services/UserServices';


export class UserController {

    userService: UserService

    constructor(userService = new UserService()){
        this.userService = userService
    }

    createUser = (request: Request, response: Response) => () => {
      
        const user = request.body

        if(!user.name){
            return response.status(400).json({message: 'bad request'})
        }

        this.userService.createUser(user.name, user.email)  
        return response.status(201).json({message: 'Usuário criado'})
    }

    deleteUser = (request: Request, response: Response) => () => {
        const { id } = request.params

        if(!id){
            return response.status(400).json({message: 'bad request! Id obrigatório'})
        }

        const sucess = this.userService.deleteUser(id)

        if(!sucess){
            return response.status(400).json({message: 'Usuário não encontrado'})
        }

        return response.status(200).json({message: 'Usuário removido'})
    }

    getAllUsers = (request: Request, response: Response) => {    

        const users = this.userService.getAllUsers()

        return response.status(200).json(users)
    }
}