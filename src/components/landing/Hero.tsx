import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  BookOpen,
  Headphones,
  Bookmark,
  MessageCircle,
} from "lucide-react";

export default function Hero() {
  return (
    <div className="relative isolate overflow-hidden bg-background">
      <div className="absolute inset-x-0 top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80">
        <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6 pb-24 pt-10 sm:pb-32 lg:flex lg:px-8 lg:py-40">
        <div className="mx-auto max-w-2xl flex-shrink-0 lg:mx-0 lg:max-w-xl lg:pt-8">
          <div className="mt-24 sm:mt-32 lg:mt-16">
            <a href="#" className="inline-flex space-x-6">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold leading-6 text-primary ring-1 ring-inset ring-primary/10">
                🚀 Launch Offer
              </span>
              <span className="inline-flex items-center space-x-2 text-sm font-medium leading-6 text-muted-foreground">
                <span>Free Premium Access</span>
                <ArrowRight className="h-4 w-4" />
              </span>
            </a>
          </div>

          <h1 className="mt-10 text-4xl font-bold tracking-tight sm:text-6xl">
            Empower Your Entrepreneurial Journey
          </h1>
          <p className="mt-6 text-xl leading-8 text-muted-foreground">
            Unlock Knowledge. Gain Insights. Build Success. Join a thriving
            community of visionaries, innovators, and business leaders.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 max-w-xl">
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Curated Content</h3>
                <p className="text-sm text-muted-foreground">
                  Expert-curated articles and e-books from top business minds
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Headphones className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Audio Learning</h3>
                <p className="text-sm text-muted-foreground">
                  Podcasts and audiobooks for learning on the go
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <Bookmark className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Save & Organize</h3>
                <p className="text-sm text-muted-foreground">
                  Bookmark and track your progress effortlessly
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="rounded-lg bg-primary/10 p-2">
                <MessageCircle className="h-5 w-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Engage & Share</h3>
                <p className="text-sm text-muted-foreground">
                  Connect and share with like-minded entrepreneurs
                </p>
              </div>
            </div>
          </div>

          <div className="mt-10 flex items-center gap-x-6">
            <Button size="lg" className="gap-2">
              Sign Up for Free
            </Button>
            <Button variant="outline" size="lg">
              Explore Knowledge
            </Button>
          </div>
        </div>

        <div className="mx-auto mt-16 flex max-w-2xl sm:mt-24 lg:ml-10 lg:mr-0 lg:mt-0 lg:max-w-none lg:flex-none xl:ml-32">
          <div className="max-w-3xl flex-none sm:max-w-5xl lg:max-w-none rounded-xl bg-white/5 p-2 ring-1 ring-inset ring-white/10">
            <img
              src="https://images.unsplash.com/photo-1664575198308-3959904fa430?q=80&w=2940&auto=format&fit=crop"
              alt="Entrepreneurial workspace"
              className="w-[76rem] rounded-md shadow-2xl ring-1 ring-white/10"
            />
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]">
        <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-primary to-secondary opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"></div>
      </div>
    </div>
  );
}
