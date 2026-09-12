// This runs on Vercel's server, never in the browser.
// It uses your PAYSTACK_SECRET_KEY (set in Vercel's project settings, not in this file)
// to ask Paystack directly: "did this payment really succeed?"
// Only if Paystack confirms success do we tell the front-end it's safe to show the WhatsApp link.

export default async function handler(req, res) {
  const { reference } = req.query;

  if (!reference) {
    return res.status(400).json({ verified: false, error: 'Missing reference' });
  }

  const secretKey = process.env.PAYSTACK_SECRET_KEY;
  if (!secretKey) {
    return res.status(500).json({ verified: false, error: 'Server not configured' });
  }

  try {
    const paystackRes = await fetch(
      `https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`,
      {
        headers: {
          Authorization: `Bearer ${secretKey}`,
        },
      }
    );

    const data = await paystackRes.json();

    const isSuccess =
      data && data.status === true && data.data && data.data.status === 'success';

    if (isSuccess) {
      return res.status(200).json({ verified: true });
    }

    return res.status(200).json({ verified: false });
  } catch (err) {
    return res.status(500).json({ verified: false, error: 'Verification failed' });
  }
}
