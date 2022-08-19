const UserData = require("../database/user")
const SECRET = "thisissecretkeyfortwitterappcloneś"
const jwt = require("jsonwebtoken")



async function logUser(req,res){

    const { input, password } = req.body

    if(+input == input){
        
        try {
            
            let UserDetailsWithNumber = await UserData.findOne({phone_number:input})
                
            if(UserDetailsWithNumber){
                if(UserDetailsWithNumber.password === password){

                    let encryptionToken = jwt.sign({
                        id: UserDetailsWithNumber._id
                    }, SECRET)

                    return res.send({encryptionToken})
                }else{
                    return res.status(404).send("Incorrect Credentials")
                }
            }
            else if(UserDetailsWithNumber === null ){
                return res.status(404).send("Number not registered")
            }
    
        }
        catch (error) {
            return res.send(error)
        }

    }else{

        try {

            let UserDetails = await UserData.findOne({ $or:[ {user_name:input}, {email:input} ] })
                
            if(UserDetails){
                if(UserDetails.password === password){

                    let encryptionToken = jwt.sign({
                        id: UserDetails._id
                    }, SECRET)

                    return res.send({encryptionToken})
                }else{
                    return res.status(409).send("Incorrect Credentials")
                }
            }
            else if(UserDetails === null ){
                return res.status(409).send("Username / Email not registered")
            }
    
        }
        catch (error) {
            return res.send(error)
        }

    }

}






async function regUser(req,res){

    const { name , input, password } = req.body

    let body;
    let existingNumber = null
    let existingEmail = null

    if(+input === input){
        existingNumber = await UserData.findOne({ phone_number:input })

        body = {
            user_name:name,
            phone_number:input,
            password
        }
    }else{
        existingEmail = await UserData.findOne({ email:input })

        body = {
            user_name:name,
            email:input,
            password
        }
    }

    if(existingEmail === null && existingNumber === null){

        try {
            await UserData.create(body)

            try {
                let CreatedUserDetails = await UserData.findOne({user_name:name})

                let encryptionToken = jwt.sign({
                    id: CreatedUserDetails._id
                }, SECRET)
    
                return res.status(201).send({encryptionToken})
                
            } catch (error) {
                return res.status(500).send(error)
            }


        } catch (error) {

            if(error.code){
                return res.status(409).send("Name already exists")
            }
            else if(error.errors.user_name){
                return res.status(406).send("User name should not consist spaces")
            }
            else if(error.errors.password){
                return res.status(406).send("Password length should be more than 8")
            }
            else{
                res.send(error)
            }

        }

    }
    else if(existingEmail !== null && existingNumber === null){
        return res.status(409).send("Provided Email is already in use")
    }
    else if(existingEmail === null && existingNumber !== null){
        return res.status(409).send("Provided Number is already in use")
    }


}


module.exports = {
    logUser,
    regUser
}