'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function AuthPage() {
  const [email, setEmail] = useState('')
  const [code, setCode]   = useState('')
  const [phase, setPhase] = useState('enter-email') // 'enter-email' | 'enter-code' | 'done'
  const [msg, setMsg]     = useState('')
  const [loading, setLoading] = useState(false)

  // If already signed in, show a quick message
  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setPhase('done')
    })
  }, [])

  async function sendCode(e) {
    e.preventDefault()
    setLoading(true); setMsg('')
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: { shouldCreateUser: true } // creates a user if it doesn't exist
    })
    setLoading(false)
    if (error) setMsg(error.message)
    else { setMsg('We emailed you a 6-digit code.'); setPhase('enter-code') }
  }

  async function verify(e) {
    e.preventDefault()
    setLoading(true); setMsg('')
    const { data, error } = await supabase.auth.verifyOtp({
      email: email.trim(),
      token: code.trim(),
      type: 'email'
    })
    setLoading(false)
    if (error) setMsg(error.message)
    else { setMsg('You are signed in.'); setPhase('done') }
  }

  async function signOut() {
    await supabase.auth.signOut()
    setPhase('enter-email'); setEmail(''); setCode(''); setMsg('Signed out.')
  }

  return (
    <main className="mx-auto max-w-sm space-y-4">
      <h1 className="text-2xl font-semibold">Sign in</h1>
      {msg && <p className="text-sm text-slate-600">{msg}</p>}

      {phase === 'enter-email' && (
        <form onSubmit={sendCode} className="space-y-3">
          <input
            type="email"
            placeholder="you@example.com"
            className="w-full rounded-lg border px-3 py-2"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Sending…' : 'Send code'}
          </button>
        </form>
      )}

      {phase === 'enter-code' && (
        <form onSubmit={verify} className="space-y-3">
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            placeholder="6-digit code"
            className="w-full rounded-lg border px-3 py-2"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            required
          />
          <button
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? 'Verifying…' : 'Verify code'}
          </button>

          <button
            type="button"
            onClick={() => setPhase('enter-email')}
            className="text-sm text-slate-600 underline"
          >
            Use a different email
          </button>
        </form>
      )}

      {phase === 'done' && (
        <div className="space-y-3">
          <p className="text-sm text-green-700">You are signed in.</p>
          <button
            onClick={signOut}
            className="w-full rounded-lg border px-4 py-2 hover:bg-slate-50"
          >
            Sign out
          </button>
        </div>
      )}
    </main>
  )
}