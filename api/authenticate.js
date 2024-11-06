// /api/authenticate.js

export default async function handler(req, res) {
    if (req.method === 'GET') {
        const { mcid, recaptchaResponse } = req.query;

        // reCAPTCHAトークンの検証
        const secretKey = '6LdLoHYqAAAAAPSxJD0MTJBfiq8zdSrbR52UGYYW'; // reCAPTCHAのシークレットキーを設定
        const verificationUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`;

        try {
            const verificationResponse = await fetch(verificationUrl, { method: 'POST' });
            const verificationData = await verificationResponse.json();

            if (verificationData.success) {
                // MCIDが正常に認証された場合のメッセージ
                res.status(200).json({ message: `MCID: ${mcid} が正常に認証されました！` });
            } else {
                res.status(400).json({ message: 'reCAPTCHAの検証に失敗しました。再度お試しください。' });
            }
        } catch (error) {
            res.status(500).json({ message: 'サーバーエラーが発生しました。' });
        }
    } else {
        res.setHeader('Allow', ['GET']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
