export interface User {
    name: string
    email: string
}
const db = [
    {
        name: "Sara",
        email: "sara@teste.com",
    }
]


export class UserService {

    db: User[]

    constructor(
        database = db
    ){
        this.db = database
    }

    createUser = (name: string, email: string) => {
        const user = {
            name,
            email
        }
        this.db.push(user)
        console.log("DB atualizado", this.db)
    }

    deleteUser = (email: string) => {
        const index = this.db.findIndex(user => user.email === email)

        if (index !== -1){
            this.db.splice(index, 1)
            return true
        }else{
            return false
        }
    }

    getAllUsers = () => {
        return this.db
    }
}