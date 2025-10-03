'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Check() {
  const [status, setStatus] = useState('Checking…')
  const [rows, setRows] = useState([])
  const [err, setErr] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { data, error } = await supabase.from('messages').select('*').limit(5)
      if (error) { setErr(error.message); setStatus('❌ Error') }
      else { setRows(data ?? []); setStatus('✅ Connected') }
    })()
  }, [])

  return (
    <main style={{ padding: 24 }}>
      <h1>Supabase Check</h1>
      <p>{status}</p>
      {err && <pre>{err}</pre>}
      <pre>{JSON.stringify(rows, null, 2)}</pre>
    </main>
  )
}