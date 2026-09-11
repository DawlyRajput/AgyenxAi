import proxy from "express-http-proxy"

export const proxyWithHeader =(serviceUrl)=>{
    return  proxy(
        serviceUrl,
        {
            proxyReqOptDecorator:(proxyReqOpt, srcReq)=>{
            if(srcReq.user){
               proxyReqOpt.headers["x-user-id"] = srcReq.user.userId
            }
            return proxyReqOpt
           
        }}
    );

}