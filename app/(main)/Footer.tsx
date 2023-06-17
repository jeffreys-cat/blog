import React from 'react'

import { CursorClickIcon, UsersIcon } from '~/assets'
import { Container } from '~/components/ui/Container'
import { kvKeys } from '~/config/kv'
import { env } from '~/env.mjs'
import { prettifyNumber } from '~/lib/math'
import { redis } from '~/lib/redis'

import { Newsletter } from './Newsletter'

async function TotalPageViews() {
  let views: number
  if (env.VERCEL_ENV === 'production') {
    views = await redis.incr(kvKeys.totalPageViews)
  } else {
    views = 345678
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <UsersIcon className="h-4 w-4" />
      <span title={`${Intl.NumberFormat('en-US').format(views)}次浏览`}>
        总浏览量&nbsp;
        <span className="font-medium">{prettifyNumber(views, true)}</span>
      </span>
    </span>
  )
}

type VisitorGeolocation = {
  country: string
  city?: string
  flag: string
}
async function LastVisitorInfo() {
  let lastVisitor: VisitorGeolocation | undefined = undefined
  if (env.VERCEL_ENV === 'production') {
    const [lv, cv] = await redis.mget<VisitorGeolocation[]>(
      kvKeys.lastVisitor,
      kvKeys.currentVisitor
    )
    lastVisitor = lv
    await redis.set(kvKeys.lastVisitor, cv)
  }

  if (!lastVisitor) {
    lastVisitor = {
      country: 'US',
      flag: '🇺🇸',
    }
  }

  return (
    <span className="flex items-center justify-center gap-1 text-xs text-zinc-500 dark:text-zinc-400 md:justify-start">
      <CursorClickIcon className="h-4 w-4" />
      <span>
        最近访客来自&nbsp;
        {[lastVisitor.city, lastVisitor.country].filter(Boolean).join(', ')}
      </span>
      <span className="font-medium">{lastVisitor.flag}</span>
    </span>
  )
}

export function Footer() {
  return (
    <footer className="mt-32 border-t border-zinc-100 pb-16 pt-10 dark:border-zinc-700/40">
      <Container.Outer>
        <div className="flex flex-col justify-between sm:flex-row">
          <div>
            <Container.Inner>
              {/* <div className="mx-auto mb-8 max-w-md">
                <Newsletter showIntro={false} />
              </div> */}
              <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
                <p className="text-sm text-zinc-500/80 dark:text-zinc-400/80">
                  &copy; {new Date().getFullYear()} Jeffrey
                </p>
              </div>
            </Container.Inner>
            <Container.Inner className="mt-6">
              <div className="flex flex-col items-center justify-start gap-2 sm:flex-row">
                <React.Suspense>
                  <TotalPageViews />
                </React.Suspense>
                <React.Suspense>
                  <LastVisitorInfo />
                </React.Suspense>
              </div>
            </Container.Inner>
          </div>
          <div className="px-4 lg:px-12">
            <Newsletter />
          </div>
        </div>
      </Container.Outer>
    </footer>
  )
}
