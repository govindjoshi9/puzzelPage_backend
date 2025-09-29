const time = "10 minutes";
const companyName = "DK";
const companyURL = "https://dhirajkarangale.netlify.app";
const unsubscribeURL = "https://unsubscribe-service.vercel.app";

function Login(otp) {
    const body = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap');

        body {
            font-family: 'Press Start 2P', cursive;
            background: #1a1a1a;
            margin: 0;
            padding: 0;
            color: #ffffff;
        }
        .email-container {
            max-width: 600px;
            margin: 50px auto;
            background: #1a1a1a;
            padding: 30px;
            border-radius: 15px;
            border: 5px solid #00f6ff;
            box-shadow: 
                0 4px 6px rgba(0, 0, 0, 0.4), 
                inset 0 -6px 12px rgba(0, 246, 255, 0.2);
        }
        h1 {
            color: #ffd700;
            font-size: 26px;
            text-align: center;
            margin-bottom: 20px;
            text-shadow: 0 4px 8px rgba(255, 215, 0, 0.7);
        }
        p {
            color: #e0e0e0;
            font-size: 14px;
            line-height: 1.6;
            text-align: center;
        }
        .otp {
            display: block;
            font-size: 28px;
            font-weight: bold;
            color: #1a1a1a;
            background: linear-gradient(145deg, #00f6ff, #ffd700);
            padding: 20px 25px;
            border-radius: 10px;
            letter-spacing: 8px;
            margin: 30px auto;
            text-align: center;
            max-width: 220px;
            box-shadow: 0 4px 15px rgba(0, 246, 255, 0.8);
        }
        .company {
            color: #00f6ff;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            text-shadow: 0 2px 5px rgba(0, 246, 255, 0.8);
        }
        a.company-link {
            text-decoration: none;
        }
        a.company-link .company {
            color: #00f6ff;
            font-weight: bold;
            font-size: 16px;
            text-align: center;
            margin-top: 20px;
            text-shadow: 0 2px 5px rgba(0, 246, 255, 0.8);
        }
        a.company-link:hover .company {
            color: #ffd700;
        }
        .footer {
            margin-top: 30px;
            font-size: 12px;
            color: #b0b0b0;
            text-align: center;
        }
        .footer a {
            color: #ffd700;
            text-decoration: none;
        }
        .footer a:hover {
            color: #00f6ff;
        }
        .email-container:hover {
            transform: translateY(-5px);
            transition: all 0.3s ease;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <h1>Login to Your Adventure</h1>
        <p>Use the one-time password (OTP) to begin your adventure. The code will expire in <strong>${time}</strong>, so act fast!</p>
        <div class="otp">${otp}</div>
        <p>Keep this code secure and don't share it with anyone else.</p>
        <p>The adventure begins with <a class="company-link" href="${companyURL}"><span class="company">${companyName}</span></a>.</p>
        <div class="footer">
            <p>&copy; ${new Date().getFullYear()} <a href="${companyURL}">${companyName}</a>. All rights reserved.</p>
            <p>If you wish to unsubscribe, click <a href="${unsubscribeURL}">here</a>.</p>
        </div>
    </div>
</body>
</html>
`;

    return { subject: `${companyName} Login OTP`, body: body };
}

function emailContent(otp, type) {
    let body = "";
    let subject = "";

    switch (type) {
        case "Login":
            const content = Login(otp)
            subject = content.subject;
            body = content.body;
            break;
        default:
            subject = "Type not found";
            body = "Type not found";
            break;
    }

    return { subject: subject, body: body };
}

module.exports = { emailContent }