import { theme } from './theme';

export default function Home() {
  return (
    <main
      className="min-h-screen flex items-center justify-center p-4"
      style={{ background: theme.gradients.sky }}
    >
      <div className="max-w-4xl w-full text-center">
        {/* Hero Section */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-4 tracking-tight">
            Weather
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 font-light">
            Discover the beauty of Israel&apos;s skies
          </p>
        </div>

        {/* Search Section */}
        <div
          className="rounded-2xl p-8 shadow-2xl backdrop-blur-md"
          style={{
            background: theme.colors.cardBg,
            border: `1px solid ${theme.colors.cardBorder}`,
          }}
        >
          <h2 className="text-2xl font-semibold text-white mb-6">
            Check the weather in your city
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="text"
              placeholder="Enter city name..."
              className="flex-1 px-6 py-3 rounded-xl text-white placeholder-blue-200 border focus:outline-none focus:ring-2 focus:ring-white/50 focus:border-transparent backdrop-blur-sm"
              style={{
                background: theme.colors.inputBg,
                borderColor: theme.colors.cardBorder,
              }}
            />
            <button
              className="px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
              style={{
                background: theme.colors.buttonPrimary,
                color: theme.colors.buttonPrimaryText,
              }}
            >
              Search
            </button>
          </div>
        </div>

        {/* Features Preview */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-white">
          <div
            className="rounded-xl p-6 backdrop-blur-md"
            style={{
              background: theme.colors.cardBg,
              border: `1px solid ${theme.colors.cardBorder}`,
            }}
          >
            <div className="text-4xl mb-4">🌤️</div>
            <h3 className="text-lg font-semibold mb-2">Current Conditions</h3>
            <p className="text-blue-100 text-sm">Real-time weather updates</p>
          </div>
          <div
            className="rounded-xl p-6 backdrop-blur-md"
            style={{
              background: theme.colors.cardBg,
              border: `1px solid ${theme.colors.cardBorder}`,
            }}
          >
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-lg font-semibold mb-2">7-Day Forecast</h3>
            <p className="text-blue-100 text-sm">Plan ahead with accuracy</p>
          </div>
          <div
            className="rounded-xl p-6 backdrop-blur-md"
            style={{
              background: theme.colors.cardBg,
              border: `1px solid ${theme.colors.cardBorder}`,
            }}
          >
            <div className="text-4xl mb-4">🔔</div>
            <h3 className="text-lg font-semibold mb-2">Weather Alerts</h3>
            <p className="text-blue-100 text-sm">Stay informed and safe</p>
          </div>
        </div>
      </div>
    </main>
  );
}
