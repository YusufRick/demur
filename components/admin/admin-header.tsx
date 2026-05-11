'use client'

import Link from 'next/link'
import { LogOut, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface AdminHeaderProps {
  userEmail: string
  onSignOut: () => void
}

export function AdminHeader({ userEmail, onSignOut }: AdminHeaderProps) {
  return (
    <header className="bg-card border-b border-border">
      <div className="flex items-center justify-between px-6 py-4 max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-6">
          <h1 className="text-xl font-bold tracking-widest">
            <span className="text-foreground">YEE</span>
            <span className="text-primary">ZY</span>
            <span className="text-muted-foreground ml-2 text-sm font-normal">Admin</span>
          </h1>
          
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            View Store <ExternalLink className="w-3 h-3" />
          </Link>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm text-muted-foreground hidden md:block">
            {userEmail}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={onSignOut}
            className="text-muted-foreground hover:text-foreground"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  )
}
