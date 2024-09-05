const passwordResetLinkTemplate = async (resetToken,userName)=>{
    let template = `
    <div style="background-color: #e0e1e6;padding: 20px;">
    <table style="width: 100%; margin: auto;border-spacing: 0;max-width: 600px;">
        <tr>
            <td style="padding: 0;">
                <table
                    style=" padding: 20px; font-family: sans-serif; width: 100%;text-align: center;margin: auto;background-color: white;">
                    <tbody>
                        <tr style="text-align: center; padding: 20px 0; width: 100%; ">
                            <!-- <td style="width: 100%; text-align: center; padding: 20px 0;"><img style="margin: auto; width: 120px;" src="" alt="logo"></td> -->
                            INFLUENTIA
                       </tr>
                        <tr>
                            <td style="text-align: center;font-size: 22px;font-weight: 800;">Password
                                Reset!</td>
                        </tr>
                        <tr>
                            <td style="text-align: center; color: grey; padding-bottom: 20px;">Hello ${userName}!! seems you have forgotten
                                Password.</td>
                        </tr>
                     
                        <tr>
                            <td>
                               Your one time password is : ${resetToken}
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 200px;color: #666363;padding-top: 20px;padding-bottom: 20px;">If you didn't request this, you
                                may ignore this mail or let us know. Your password
                                won't change untill you create a new password.</td>
                        </tr>

                    </tbody>
                </table>
            </td>
        </tr>
    </table>
</div>`
return template
}

module.exports = {
    passwordResetLinkTemplate
}