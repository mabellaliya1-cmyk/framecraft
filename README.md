# Framecraft — Setup Guide

Everything is built. You just need to do two things before it's live:
1. Drop in your two Paystack keys
2. Deploy it (free, no command line)

## 1. Get your Paystack keys
In your Paystack dashboard, go to **Developers** (or Settings → API Keys & Webhooks on the old dashboard). You'll see two keys:

- **Public Key** (starts with `pk_`) — safe to put directly in the website code
- **Secret Key** (starts with `sk_`) — never put this in the website code. It goes into Vercel's settings only (step 3 below).

## 2. Add your Public Key
Open `index.html`, find this line near the bottom:

```
const PAYSTACK_PUBLIC_KEY = "pk_test_REPLACE_WITH_YOUR_PUBLIC_KEY";
```

Replace it with your real public key.

⚠️ Note: while your Paystack account is unverified, you'll only have a **test** key (`pk_test_...`). Test mode lets you check everything works using fake card numbers — it won't charge real money. Once Paystack approves your account (submitting your compliance documents), switch to your **live** key (`pk_live_...`) here.

## 3. Deploy on Vercel (free)
1. Create a free account at **vercel.com** (you can sign up with GitHub, Google, or email)
2. Create a free account at **github.com** if you don't have one
3. Upload this whole `framecraft` folder to a new GitHub repository (GitHub's website lets you drag-and-drop files to create a repo — no command line needed)
4. In Vercel, click **Add New → Project**, and import that GitHub repository
5. Before clicking deploy, open **Environment Variables** and add:
   - Name: `PAYSTACK_SECRET_KEY`
   - Value: your secret key from step 1 (`sk_test_...` for now, `sk_live_...` once you're live)
6. Click **Deploy**

Vercel will give you a free URL like `framecraft.vercel.app` — that's your live page, ready to put in your ad.

## 4. Test it before running ads
- Visit your live URL, enter your own email, and pay using one of [Paystack's test cards](https://paystack.com/docs/payments/test-payments/) while in test mode
- Confirm you land on the success page and the WhatsApp button appears and works
- Once confirmed, switch both keys (public in `index.html`, secret in Vercel's settings) to your live keys, and redeploy

## Where to find who paid
You don't need a separate list — every payment (with the buyer's email) shows up automatically in your Paystack dashboard under **Transactions**, and can be exported as a CSV anytime.

## If something looks off
- If the WhatsApp button doesn't appear after a real payment, double check the `PAYSTACK_SECRET_KEY` is set correctly in Vercel's project settings (not just in the code).
- If checkout doesn't open at all, double check the public key in `index.html` is correct and starts with `pk_`.
