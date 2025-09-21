import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { currentUser } from "@clerk/nextjs/server";
import { ArrowRight, Feather, BookOpen, Bot } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const user = await currentUser();

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2">
          <Feather className="h-6 w-6 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">
            StoryGenPro
          </h1>
        </Link>
        <div>
          {user ? (
            <Link href="/dashboard">
              <Button>Go to Dashboard</Button>
            </Link>
          ) : (
            <div className="flex gap-2">
              <Link href="/sign-in">
                <Button variant="outline">Sign In</Button>
              </Link>
              <Link href="/sign-up">
                <Button>Sign Up</Button>
              </Link>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-grow">
        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 dark:text-white">
            Build Your Story Like a Game
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500 dark:text-gray-400">
            Visual, addictive, and always yours. StoryGenPro helps you craft
            compelling narratives with powerful tools and AI-driven insights.
          </p>
          <div className="mt-8">
            <Link href={user ? "/dashboard" : "/sign-up"}>
              <Button size="lg">
                Get Started for Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-white dark:bg-gray-800 py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold">Features</h3>
              <p className="text-gray-500 dark:text-gray-400">
                Everything you need to bring your story to life.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <BookOpen className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>Visual Story Planner</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Organize your scenes, characters, and plot points on an
                    interactive timeline. Drag, drop, and reorder with ease.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Bot className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>AI-Powered Analysis</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Get insights on your story's pacing, character arcs, and
                    potential plot holes with our Gemini-powered analyzer.
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-col items-center text-center">
                  <Feather className="h-10 w-10 text-blue-600 mb-4" />
                  <CardTitle>Gamified Writing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p>
                    Stay motivated with daily streaks, achievements, and
                    progress tracking. Make writing a rewarding habit.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} StoryGenPro. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}