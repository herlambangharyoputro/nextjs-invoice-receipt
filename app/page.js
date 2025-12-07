'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [profiles, setProfiles] = useState([])
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    bio: ''
  })

  // Fetch profiles
  useEffect(() => {
    fetchProfiles()
  }, [])

  const fetchProfiles = async () => {
    const res = await fetch('/api/profiles')
    const data = await res.json()
    setProfiles(data)
  }

  // Create
  const handleSubmit = async (e) => {
    e.preventDefault()
    await fetch('/api/profiles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    })
    setForm({ name: '', email: '', phone: '', bio: '' })
    fetchProfiles()
  }

  // Delete
  const handleDelete = async (id) => {
    await fetch(`/api/profiles/${id}`, { method: 'DELETE' })
    fetchProfiles()
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">CV Management</h1>
      
      {/* Form Create */}
      <form onSubmit={handleSubmit} className="mb-8 p-6 border rounded">
        <h2 className="text-xl font-bold mb-4">Add Profile</h2>
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({...form, name: e.target.value})}
          required
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={(e) => setForm({...form, email: e.target.value})}
        />
        <input
          className="border p-2 mb-2 w-full"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({...form, phone: e.target.value})}
        />
        <textarea
          className="border p-2 mb-2 w-full"
          placeholder="Bio"
          value={form.bio}
          onChange={(e) => setForm({...form, bio: e.target.value})}
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Profile
        </button>
      </form>

      {/* List Profiles */}
      <div>
        <h2 className="text-xl font-bold mb-4">Profiles</h2>
        {profiles.map((profile) => (
          <div key={profile.id} className="border p-4 mb-4 rounded">
            <h3 className="font-bold">{profile.name}</h3>
            <p>{profile.email}</p>
            <p>{profile.phone}</p>
            <p className="mt-2">{profile.bio}</p>
            <button
              onClick={() => handleDelete(profile.id)}
              className="mt-2 bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}