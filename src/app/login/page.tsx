
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="bg-zinc-900 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold mb-6 text-white text-center">Login</h1>
        <p className="text-gray-400 mb-6 text-center">Login form coming soon...</p>
        <Button asChild className="w-full">
          <Link href="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

