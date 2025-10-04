'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Check() {
  const [status, setStatus] = useState('Checking…')
  const [rows, setRows] = useState([])
  const [err, setErr] = useState(null)
  const [msg, setMsg] = useState('')
  const [saving, setSaving] = useState(false)

  async function load() {
    const { data, error } = await supabase.from('messages').select('*').order('id', { ascending: true })
    if (error) { setErr(error.message); setStatus('❌ Error') }
    else { setRows(data ?? []); setStatus('✅ Connected') }
  }

  useEffect(() => { load() }, [])

  async function addMessage(e) {
    e.preventDefault()
    if (!msg.trim()) return
    setSaving(true)
    const { error } = await supabase.from('messages').insert([{ content: msg.trim() }])
    if (error) setErr(error.message)
    setMsg('')
    setSaving(false)
    await load()
  }

  return (
    <main style={{ padding: 24, maxWidth: 600, margin: '0 auto' }}>
      <h1>Supabase Check</h1>
      <p>{status}</p>
      {err && <pre style={{ color: 'crimson' }}>{err}</pre>}

      <form onSubmit={addMessage} style={{ display: 'flex', gap: 8, margin: '16px 0' }}>
        <input
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
          placeholder="Type a message…"
          style={{ flex: 1, padding: 8, border: '1px solid #ddd', borderRadius: 6 }}
        />
        <button disabled={saving} style={{ padding: '8px 14px', borderRadius: 6 }}>
          {saving ? 'Saving…' : 'Add'}
        </button>
      </form>

      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </main>
  )
}