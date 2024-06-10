
import { UserService } from "../services/UserServices";
import { UserController } from "./UserController";
import { makeMockRequest } from "../__mocks__/mockRequest.mock";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";
import { Request } from "express";


describe('UserController', () => {
    const mockUserService: Partial<UserService> = {
        createUser: jest.fn(),
        getAllUsers: jest.fn()
    }

    const userController = new UserController(mockUserService as UserService); 


    it('deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Matheus',
                email: 'matheus@teste.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        const response = userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({message:'Usuário criado'})
    })

    it('deve retornar o erro caso o usuário nçao informe o name', () => {
        const mockRequest ={
            body: {
                email: 'matheus@teste.com'
            }
        } as Request
        const mockResponse = makeMockResponse()
        userController.createUser(mockRequest, mockResponse)
        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({message: 'bad request  email obrigatório'})
    })

    it('deve chamar a função getAllUsers', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()
        userController.getAllUsers(mockRequest, mockResponse)
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })
})