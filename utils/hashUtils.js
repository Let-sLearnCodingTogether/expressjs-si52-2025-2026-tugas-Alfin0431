import bcrypt from "bcrypt"

export const hash = (plaintext) => {
    return bcrypt.hashSync(plaintext, 10)
}

export const compare = (plaintext, hashtext) =>{
    return bcrypt.compareSync(plaintext, hashtext)
}