'use client'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useEffect, useState } from 'react'

function Custom404() {
  const [countdown, setCountdown] = useState(10)

  useEffect(() => {
    // Set up a countdown timer
    const timer = setInterval(() => {
      setCountdown(previous => previous - 1)
    }, 1000)

    // Redirect after 10 seconds
    const redirectTimer = setTimeout(() => {
      redirect('/')
    }, 10_000)

    // Clean up both timers on component unmount
    return () => {
      clearTimeout(redirectTimer)
      clearInterval(timer)
    }
  }, [])

  return (
    <main className="mx-8 mt-[30vh] flex flex-col items-center justify-center text-center">
      <h1 className="mb-4 text-3xl font-bold text-primary-300">
        404 - 页面迷路啦 (；′⌒`)
      </h1>
      <p className="mb-6 text-base leading-7">
        抱歉，您要找的页面已经不见了，或者它从未存在过 🔍
        <br />
        <span className="text-secondary-300">{countdown}</span>
        {' '}
        秒后将自动返回首页
      </p>
      <Link
        href="/"
        className="rounded-sm bg-secondary-300 px-4 py-2 text-white no-underline transition-all-500 hover:scale-110 bg-hover-secondary hover:text-black"
      >
        返回首页
      </Link>
    </main>
  )
}

export default Custom404
