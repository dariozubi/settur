'use client'

import { useErrorHandler } from '@/lib/hooks/useErrorHandler'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Card, { CardContent, CardHeader, CardTitle } from '../Card'

function AdminUsers() {
  const [admins, setAdmins] = useState([])
  const errorHandler = useErrorHandler()
  useEffect(() => {
    const getAdmins = async () => {
      try {
        const res = await axios.get('/api/admin')
        setAdmins(res.data.admins)
      } catch (e) {
        errorHandler(e)
      }
    }

    getAdmins()
  }, [errorHandler])
  return (
    <Card className="p-8">
      <CardHeader>
        <CardTitle>Los meros meros</CardTitle>
      </CardHeader>
      <CardContent>
        {admins.map((a: { id: string; email: string }) => (
          <span key={a.id}>{a.email}</span>
        ))}
      </CardContent>
    </Card>
  )
}

export default AdminUsers
