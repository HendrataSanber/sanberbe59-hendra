import nodemailer from "nodemailer";
import ejs from "ejs";
import path from "path";

const transporter = nodemailer.createTransport({
    service:"Zoho",//bebas
    host:"smtp.zoho.com",
    port:465,
    secure:true,
    auth:{
        user:process.env.MYEMAIL,
        pass:process.env.MYPASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // ignore self-signed certificate
    },
    // requireTLS:true,
});

const send=async ({to,subject,content}:{
    to:string|string[];subject:string;content:string;
})=>{
    const result=await transporter.sendMail({
        from:process.env.MYEMAIL,
        to,
        subject,
        html:content,
    });

    return result;
};

const render=async(template:string,data:any)=>{
    const content=await ejs.renderFile(
        path.join(__dirname,`template/${template}`

        ),
    data
);

    return content as string;
}

export default{
    send,
    render
}