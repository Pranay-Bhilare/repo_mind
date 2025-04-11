'use client'
import React from 'react'
import { useUser } from '@clerk/nextjs'
const dashboardPage = () => {
    const { user } = useUser()
  return (
    <div>{user?.firstName}</div>
  )
}

export default dashboardPage