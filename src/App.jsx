
import React, { useState } from "react";
import { Send } from "lucide-react";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-slate-50 to-slate-100 text-slate-900">
      <Header />
      <main className="max-w-6xl mx-auto px-6 py-12">
        <Hero />
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <FeatureList />
          <DemoCard />
        </div>
        <Pricing />
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="py-6 px-6 sm:px-12 border-b border-slate-200 bg-white/70 backdrop-blur">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-indigo-500 to-emerald-400 flex items-center justify-center text-white font-bold">TV</div>
          <div>
            <h1 className="text-lg font-semibold">Tradvio</h1>
            <p className="text-xs text-slate-500 -mt-1">AI-driven trading insights</p>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-6 text-sm">
          <a className="hover:text-slate-700" href="#features">Features</a>
          <a className="hover:text-slate-700" href="#demo">Demo</a>
          <a className="hover:text-slate-700" href="#pricing">Pricing</a>
          <button className="ml-4 px-4 py-2 rounded-md bg-indigo-600 text-white text-sm shadow">Get started</button>
        </nav>

        <div className="md:hidden">
          <button className="p-2 rounded-md bg-slate-100">Menu</button>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
      <div>
        <h2 className="text-4xl font-extrabold leading-tight">AI insights for smarter trading</h2>
        <p className="mt-4 text-lg text-slate-600">Generate signals, analyze sentiment, and build strategies with a single AI-native workflow. Use our demo below to try the model.</p>

        <div className="mt-6 flex gap-3">
          <input className="w-72 px-4 py-3 border rounded-md bg-white" placeholder="Enter ticker or idea, e.g. AAPL" />
          <button className="px-4 py-3 rounded-md bg-emerald-500 text-white font-semibold">Analyze</button>
        </div>

        <div className="mt-6 flex items-center gap-4 text-sm text-slate-500">
          <span className="px-3 py-1 bg-slate-100 rounded-full">Real-time</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full">Backtests</span>
          <span className="px-3 py-1 bg-slate-100 rounded-full">API</span>
        </div>
      </div>

      <div className="hidden lg:block">
        <div className="bg-gradient-to-br from-white to-slate-50 border rounded-2xl p-6 shadow-lg">
          <h3 className="font-semibold text-slate-700">Live sample insights</h3>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <StatCard title="Signal" value="Bullish" />
            <StatCard title="Confidence" value="72%" />
            <StatCard title="Sentiment" value="Positive" />
            <StatCard title="Volatility" value="Low" />
          </div>

          <div className="mt-6 text-sm text-slate-500">This is a simulated live preview for demonstration only.</div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ title, value }) {
  return (
    <div className="p-3 bg-white border rounded-lg">
      <div className="text-xs text-slate-500">{title}</div>
      <div className="mt-2 font-semibold text-lg">{value}</div>
    </div>
  );
}

function FeatureList() {
  const features = [
    { title: "AI Signal Generation", desc: "Generate trade signals using our fine-tuned models and custom prompts." },
    { title: "Backtesting", desc: "Run strategy simulations on historical data and see performance metrics." },
    { title: "API First", desc: "Integrate with your stack using a clean REST API and webhooks." },
    { title: "Explainable AI", desc: "Get human-readable rationales for model suggestions." },
  ];

  return (
    <section id="features" className="space-y-6">
      <h3 className="text-2xl font-bold">What we offer</h3>
      <p className="text-slate-600">A complete toolset for systematic traders and analysts: signals, research, and execution tools powered by ML.</p>

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {features.map((f) => (
          <div key={f.title} className="p-4 bg-white border rounded-lg">
            <div className="font-semibold">{f.title}</div>
            <div className="mt-2 text-sm text-slate-500">{f.desc}</div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-semibold">Developer friendly</h4>
        <p className="mt-2 text-sm text-slate-500">Documentation, SDKs, and example notebooks — everything you need to integrate quickly.</p>
      </div>
    </section>
  );
}

function DemoCard() {
  return (
    <section id="demo" className="bg-white border rounded-2xl p-6 shadow">
      <h3 className="text-xl font-semibold">Interactive AI demo</h3>
      <p className="mt-2 text-sm text-slate-500">Ask the model about any ticker, strategy, or market event. This demo runs locally in your browser.</p>

      <AIChat />
    </section>
  );
}

function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, role: "assistant", text: "Hi — ask me about a ticker, e.g. 'What do you think about TSLA this week?'" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const send = async () => {
    if (!input.trim()) return;
    const userMsg = { id: Date.now(), role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const reply = await fakeModelReply(input);
      setMessages((m) => [...m, { id: Date.now() + 1, role: "assistant", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { id: Date.now() + 2, role: "assistant", text: "Sorry — an error occurred." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4 flex flex-col gap-4">
      <div className="max-h-64 overflow-auto p-3 border rounded-lg bg-slate-50">
        {messages.map((m) => (
          <div key={m.id} className={`mb-3 ${m.role === "user" ? "text-right" : "text-left"}`}>
            <div className={`inline-block p-2 rounded-md ${m.role === "user" ? "bg-emerald-100 text-emerald-900" : "bg-white text-slate-800 border"}`}>
              <div className="text-sm">{m.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input value={input} onChange={(e) => setInput(e.target.value)} disabled={loading} className="flex-1 px-4 py-3 border rounded-md" placeholder="Ask about a ticker, strategy, or market event" />
        <button onClick={send} disabled={loading} className="px-4 py-3 rounded-md bg-indigo-600 text-white flex items-center gap-2">
          <Send size={16} />
          <span>{loading ? "Thinking..." : "Send"}</span>
        </button>
      </div>
    </div>
  );
}

async function fakeModelReply(prompt) {
  await new Promise((r) => setTimeout(r, 800));
  const p = prompt.toLowerCase();
  if (p.includes("sell") || p.includes("bear")) return "Model view: Cautious. Consider reducing exposure and reviewing recent earnings.";
  if (p.includes("buy") || p.includes("bull")) return "Model view: Positive signal: momentum looks favorable — check sector strength and risk limits.";
  if (p.includes("tsla")) return "TSLA summary: Volatile, news-sensitive. If you trade it, tighten stop-loss and size positions conservatively.";
  if (p.includes("backtest")) return "Backtest summary: sample strategy returned CAGR 12% with max drawdown 18% over the sample period (simulated).";
  return "Model view: Mixed signals — suggest deeper analysis (volatility, correlation, fundamentals).";
}

function Pricing() {
  return (
    <section id="pricing" className="mt-12">
      <h3 className="text-2xl font-bold">Pricing</h3>
      <p className="text-slate-600 mt-2">Choose a plan that fits your workflow — free tier for experimentation, paid tiers for production use.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <PriceCard title="Starter" price="Free" bullets={["10 queries/day", "Community support"]} highlight={false} />
        <PriceCard title="Pro" price="$49/mo" bullets={["1,000 queries", "Priority support", "API access"]} highlight={true} />
        <PriceCard title="Enterprise" price="Custom" bullets={["Unlimited", "Dedicated account manager", "Onboarding"]} highlight={false} />
      </div>
    </section>
  );
}

function PriceCard({ title, price, bullets, highlight }) {
  return (
    <div className={`p-6 border rounded-lg ${highlight ? "bg-gradient-to-br from-indigo-600 to-emerald-400 text-white" : "bg-white"}`}>
      <div className="flex items-baseline justify-between">
        <div className="text-lg font-semibold">{title}</div>
        <div className="text-2xl font-bold">{price}</div>
      </div>
      <ul className={`mt-4 space-y-2 ${highlight ? "text-white/90" : "text-slate-600"}`}>
        {bullets.map((b) => (
          <li key={b}>• {b}</li>
        ))}
      </ul>
      <button className={`mt-6 w-full py-2 rounded-md ${highlight ? "bg-white text-indigo-700 font-semibold" : "bg-indigo-600 text-white"}`}>Choose</button>
    </div>
  );
}

function Footer() {
  return (
    <footer className="mt-16 border-t bg-white/60 backdrop-blur py-8">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-slate-600">© {new Date().getFullYear()} Tradvio — demo clone. Not affiliated with any other product.</div>
        <div className="flex gap-4">
          <a className="text-sm hover:underline" href="#">Terms</a>
          <a className="text-sm hover:underline" href="#">Privacy</a>
        </div>
      </div>
    </footer>
  );
}
