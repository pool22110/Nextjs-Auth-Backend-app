import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcryptjs from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);
    if (emailType === "Verify") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          verifyToken: hashedToken,
          verifyTokenExpiry: new Date (Date.now() + 360000),
        },
      });
    } else if (emailType === "Reset") {
      await User.findByIdAndUpdate(userId, {
        $set: {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: new Date (Date.now() + 360000),
        },
      });
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "caf0e3026928b6",
        pass: "6736c37f7d7a11",
      },
    });

    const mailOptions = {
      from: "maddison53@ethereal.email",
      to: email,
      subject:
        emailType === "Verify" ? "Verify your email" : "Reset your Password", // Subject line
      // text: "Hello world?", // plain text body
      html: `<p>
                Click <a href="${
                  process.env.DOMAIN
                }/verifyemail?token=${hashedToken}">here</a> to 
                  ${
                    emailType === "Verify"
                      ? "verify your mail"
                      : "reset your password"
                  }
                
                or copy and paste link given below yr browser.
                <br>${process.env.DOMAIN}/verifyemail?token=${hashedToken}
              </p>`, // html body
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
