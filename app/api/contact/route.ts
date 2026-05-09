import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
    }

    // If you add Resend: uncomment and add RESEND_API_KEY to .env.local
    // const resend = new Resend(process.env.RESEND_API_KEY)
    // await resend.emails.send({
    //   from: 'portfolio@yourdomain.com',
    //   to: 'wambugualexander09@gmail.com',
    //   subject: `Portfolio contact from ${name}`,
    //   text: `From: ${name} <${email}>\n\n${message}`,
    // })

    // Fallback: just log + 200 so the frontend shows success
    console.log('Contact form submission:', { name, email, message })

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error(err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
