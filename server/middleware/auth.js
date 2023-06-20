import jwt from 'jsonwebtoken';
import jwt_decode from 'jwt-decode'
const auth= async (req,res,next)=>{
    try{
        const token=req.headers.authorization.split(' ')[1];//token is in the form of Bearer token so we split it and take the second part
        const isCustomAuth=token.length<500;//if token is less than 500 then it is google auth token else it is custom auth token
        let decodedData='';
        // console.log(token);
        // console.log(1);
        // decodedData=jwt_decode(token);
        // console.log(decodedData.sub);
        if(token && isCustomAuth){//jwt normal
            // console.log(2);
            decodedData=jwt.verify(token,'test');//test is secret key
            // console.log(decodedData);
            req.userId=decodedData?.id;//if decodedData is not null then set req.userId to decodedData.id
        }else{
            // decData=jwt.decode(token)
            // console.log(decData);
            decodedData=jwt.decode(token)//if token is google auth token then we decode it
            // console.log(decodedData);
            req.userId=decodedData?.sub;//if decodedData is not null then set req.userId to decodedData.sub sub is google id
        }
        next();

    }catch(error){
        console.log(error);
    }
};
export default auth;