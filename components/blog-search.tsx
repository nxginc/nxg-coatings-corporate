"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { FancyButton } from "@/components/ui/fancy-button"
import { Search, X } from "lucide-react"
import type { BlogPostMeta } from "@/components/blog-card"
import Link from "next/link"
import Image from "next/image"
import { gsap } from "gsap"

interface BlogSearchProps {
  posts: BlogPostMeta[]
}

export default function BlogSearch({ posts }: BlogSearchProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [results, setResults] = useState<BlogPostMeta[]>([])
  const router = useRouter()
  const searchRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searchTerm.length > 2) {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setResults(filtered)
    } else {
      setResults([])
    }
  }, [searchTerm, posts])

  useEffect(() => {
    if (isOpen && searchRef.current) {
      // Animate search panel opening
      gsap.fromTo(searchRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" })

      // Focus the input
      if (inputRef.current) {
        inputRef.current.focus()
      }

      // Add event listener to close on escape key
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setIsOpen(false)
        }
      }

      document.addEventListener("keydown", handleEscape)
      return () => document.removeEventListener("keydown", handleEscape)
    }
  }, [isOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.length > 2) {
      router.push(`/blog?search=${encodeURIComponent(searchTerm)}`)
      setIsOpen(false)
    }
  }

  return (
    <>
      <FancyButton variant="outline" size="sm" className="gap-2" onClick={() => setIsOpen(true)}>
        <Search className="h-4 w-4" />
        Search
      </FancyButton>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-start justify-center pt-20">
          <div ref={searchRef} className="bg-white rounded-xl shadow-xl w-full max-w-3xl mx-4 overflow-hidden">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Search Articles</h3>
              <button onClick={() => setIsOpen(false)} className="p-1 rounded-full hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-4">
              <form onSubmit={handleSubmit}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <Input
                    ref={inputRef}
                    type="text"
                    placeholder="Search for articles..."
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </form>
            </div>

            <div className="max-h-[60vh] overflow-y-auto">
              {results.length > 0 ? (
                <div className="divide-y">
                  {results.map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      onClick={() => setIsOpen(false)}
                      className="flex gap-4 p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="relative h-16 w-24 flex-shrink-0">
                        <Image
                          src={post.coverImage || "/placeholder.svg?height=200&width=300"}
                          alt={post.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-brand-blue">{post.title}</h4>
                        <p className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : searchTerm.length > 2 ? (
                <div className="p-8 text-center text-gray-500">No results found for "{searchTerm}"</div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
