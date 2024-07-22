import nodemailer from 'nodemailer';

export default async function (files: FileList, params?: any): Promise<FileList> {

 const user = process.env.EMAIL_USER;
 const pass = process.env.EMAIL_PASS;
 const from = process.env.EMAIL_USER;
 const host = process.env.EMAIL_HOST;
 const port = process.env.EMAIL_PORT;
 const to = params?.emailTo;

 const envs = [];
 if (!user) {
  envs.push('EMAIL_USER');
 }
 if (!pass) {
  envs.push('EMAIL_PASS');
 }
 if (!host) {
  envs.push('EMAIL_HOST');
 }
 if (!port) {
  envs.push('EMAIL_PORT');
 }
 if (envs.length > 0) {
  throw new Error(`Environment variables not set: ${envs.join(', ')}`);
 }
 if (!to) {
  throw new Error('emailTo not set.');
 }
 let transporter = nodemailer.createTransport({
  pool: true,
  host,
  port: parseInt(port!),
  secure: false,
  auth: {
   user,
   pass,
  },
 });


 const attachments = await Promise.all(Array.from(files).map(async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  return {
   filename: file.name,
   content: buffer
  };
 }
 ));
 const mailOptions = {
  from,
  to,
  subject: 'FilesWorkflow files sending notification',
  text: '',
  html: `
   <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
    <h1 style="color: #2c3e50; border-bottom: 2px solid #3498db; padding-bottom: 10px;">FilesWorkflow file sending notification</h1>
    <p style="font-weight: bold; font-size: 18px; color: #e74c3c;">This is an automatically generated email, please do not reply.</p>
    <p>Hello,</p>
    <p>This is an automatic notification email from the <strong>FilesWorkflow</strong> service. We would like to inform you that the files you need have been sent to you through our service.</p>
    <p style="background-color: #f1c40f; padding: 10px; border-radius: 5px;">
        <strong>Important Note:</strong> Please check the email attachment, where you will find the files you need.
    </p>
    <hr style="border: none; border-top: 1px solid #3498db; margin: 20px 0;">
    <p style="font-size: 12px; color: #7f8c8d;">If you need more information or encounter any issues, please visit our website at   <a href="https://www.filesworkflow.com" target="_blank">https://www.filesworkflow.com</a>. Please note that this is an automatically generated email address, please do not reply directly to this email.</p>
    <p style="font-size: 12px; color: #7f8c8d;">Thank you for using FilesWorkflow service!</p>
</body>`,
  attachments
 };

 await new Promise<void>((resolve, reject) => {
  transporter.sendMail(mailOptions, function (error, info) {
   if (error) {
    reject(new Error(error.message));
   } else {
    resolve();
   }
  });
 });
 return files;
};