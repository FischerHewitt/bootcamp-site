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
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .order('id', { ascending: true })
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
    <main className="space-y-6">
      <header className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Supabase Check</h1>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-green-500 inline-block" />
          <span className="text-sm text-slate-600">{status}</span>
        </div>
        {err && <p className="text-sm text-red-600">{err}</p>}
      </header>

      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <form onSubmit={addMessage} className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            placeholder="Type a message…"
            className="flex-1 rounded-lg border border-slate-300 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            disabled={saving}
            className="rounded-lg bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
          >
            {saving ? 'Saving…' : 'Add'}
          </button>
        </form>
      </section>

      <section className="rounded-2xl border bg-white p-4 shadow-sm">
        <h2 className="mb-3 font-medium text-slate-700">Messages</h2>
        {rows.length === 0 ? (
          <p className="text-sm text-slate-500">No messages yet.</p>
        ) : (
          <ul className="space-y-2">
            {rows.map((r) => (
              <li key={r.id} className="rounded-lg border bg-slate-50 px-3 py-2">
                <span className="mr-2 text-xs font-mono text-slate-500">#{r.id}</span>
                <span>{r.content}</span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  )
}