const crypto=require('crypto')
const dotenv=require('dotenv')
dotenv.config();

exports.pbkdf2=(password)=>{
    const salt=process.env.SALT
    const iterations=parseInt(process.env.iteration);
    const keyLength=64
    try {
        const derivedKey = crypto.pbkdf2Sync(password, salt, iterations, keyLength, 'sha256')
        const hashedPassword=derivedKey.toString('hex');
        return hashedPassword;
    }catch(err){
        console.log(err);
    }
}