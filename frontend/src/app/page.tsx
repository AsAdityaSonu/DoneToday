import Button from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-center text-center">
        <h1 className="text-4xl font-bold mb-8">
          Welcome to DoneToday
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Track your daily accomplishments and stay productive
        </p>
        <div className="flex gap-4 justify-center">
          <Button variant="primary">
            Get Started
          </Button>
          <Button variant="secondary">
            Learn More
          </Button>
        </div>
      </div>
    </main>
  )
}