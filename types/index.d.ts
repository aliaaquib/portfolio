import type { Icon } from "lucide-react"
import { Icons } from "@/components/icons"

export type NavItem = {
  title: string
  href: string
  icon?: keyof typeof Icons
  disabled?: boolean
  external?: boolean
}

export type SiteConfig = {
  name: string
  description: string
  url: string
  ogImage: string
  mailSupport: string
  links: {
    linkedin: string
    twitter: string
    github: string
  }
}

export type Project = {
  id: string
  name: string
  description: string
  url: string
}

export type Blog = {
  id: string
  title: string
  description: string
  url: string
}
