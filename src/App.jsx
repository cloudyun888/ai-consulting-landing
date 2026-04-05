import { useState, useEffect, useRef } from "react";
import {
  Brain, Cpu, BarChart3, Shield, Zap, Code2, Globe, Activity,
  ChevronDown, ChevronRight, ArrowRight, Check, Star, Mail,
  Bot, Layers, GitBranch, Database, Monitor, Terminal,
  TrendingUp, Target, Rocket, Clock, MessageSquare, Users,
  Sparkles, ExternalLink, Play, CircleDot
} from "lucide-react";
import {
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis,
  Radar, ResponsiveContainer, Legend
} from "recharts";

// ── Intersection Observer Hook ──
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.unobserve(el); } },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Animated Counter ──
function Counter({ end, suffix = "", duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [ref, visible] = useInView();
  useEffect(() => {
    if (!visible) return;
    let start = 0;
    const step = end / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= end) { setCount(end); clearInterval(timer); }
      else setCount(Math.floor(start));
    }, 16);
    return () => clearInterval(timer);
  }, [visible, end, duration]);
  return <span ref={ref}>{count}{suffix}</span>;
}

// ── Section Wrapper with reveal ──
function Section({ children, className = "", id }) {
  const [ref, visible] = useInView(0.08);
  return (
    <section
      id={id}
      ref={ref}
      className={`${className}`}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.8s cubic-bezier(0.16,1,0.3,1), transform 0.8s cubic-bezier(0.16,1,0.3,1)"
      }}
    >
      {children}
    </section>
  );
}

// ── Glassmorphism Card ──
function GlassCard({ children, className = "", hover = true }) {
  return (
    <div
      className={`relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl ${hover ? "transition-all duration-500 hover:border-cyan-500/40 hover:bg-white/[0.08] hover:shadow-lg hover:shadow-cyan-500/10 hover:-translate-y-1" : ""} ${className}`}
    >
      {children}
    </div>
  );
}

// ── FAQ Item ──
function FAQItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div
      className="border border-white/10 rounded-xl overflow-hidden transition-all duration-300"
      style={{ background: open ? "rgba(6,182,212,0.05)" : "rgba(255,255,255,0.02)" }}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left text-white/90 hover:text-cyan-400 transition-colors duration-300"
      >
        <span className="text-base font-medium pr-4">{q}</span>
        <ChevronDown
          className="w-5 h-5 flex-shrink-0 transition-transform duration-300"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0)" }}
        />
      </button>
      <div
        className="overflow-hidden transition-all duration-500"
        style={{ maxHeight: open ? "300px" : "0", opacity: open ? 1 : 0 }}
      >
        <p className="px-5 pb-5 text-white/60 text-sm leading-relaxed">{a}</p>
      </div>
    </div>
  );
}

// ── Radar Chart Data ──
const radarData = [
  { subject: "Code Quality", before: 25, after: 78 },
  { subject: "Test Coverage", before: 10, after: 72 },
  { subject: "Architecture", before: 30, after: 80 },
  { subject: "Monitoring", before: 15, after: 75 },
  { subject: "Performance", before: 20, after: 70 },
  { subject: "Reliability", before: 20, after: 82 },
];

// ── Main Component ──
export default function AIConsultingLanding() {
  const [scrollY, setScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Services", href: "#services" },
    { label: "Case Study", href: "#case-study" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Process", href: "#process" },
    { label: "FAQ", href: "#faq" },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white antialiased overflow-x-hidden">
      {/* ── Background Grid ── */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(6,182,212,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.03) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[1000px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      </div>

      {/* ── NAV ── */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrollY > 50 ? "rgba(10,10,15,0.85)" : "transparent",
          backdropFilter: scrollY > 50 ? "blur(20px)" : "none",
          borderBottom: scrollY > 50 ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg tracking-tight">Canales<span className="text-cyan-400">AI</span></span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="text-sm text-white/60 hover:text-cyan-400 transition-colors duration-300">
                {l.label}
              </a>
            ))}
            <a
              href="#contact"
              className="px-5 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg shadow-cyan-500/20"
            >
              Book a Call
            </a>
          </div>
          <button className="md:hidden text-white/70" onClick={() => setMobileMenu(!mobileMenu)}>
            <div className="w-6 flex flex-col gap-1.5">
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenu ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenu ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all duration-300 ${mobileMenu ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>
        {/* Mobile menu */}
        <div
          className="md:hidden overflow-hidden transition-all duration-500"
          style={{ maxHeight: mobileMenu ? "300px" : "0", opacity: mobileMenu ? 1 : 0 }}
        >
          <div className="px-6 pb-4 flex flex-col gap-3 bg-[#0a0a0f]/95 backdrop-blur-xl border-t border-white/5">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} onClick={() => setMobileMenu(false)} className="text-sm text-white/60 hover:text-cyan-400 py-2">
                {l.label}
              </a>
            ))}
            <a href="#contact" onClick={() => setMobileMenu(false)} className="mt-2 text-center px-5 py-2.5 rounded-full text-sm font-medium bg-gradient-to-r from-cyan-500 to-blue-600">
              Book a Call
            </a>
          </div>
        </div>
      </nav>

      {/* ━━━ HERO ━━━ */}
      <header className="relative z-10 min-h-screen flex items-center justify-center px-6 pt-16">
        {/* Animated orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div
            className="absolute w-96 h-96 rounded-full opacity-30"
            style={{
              background: "radial-gradient(circle, rgba(6,182,212,0.3), transparent 70%)",
              top: "10%", left: "15%",
              animation: "float 8s ease-in-out infinite",
            }}
          />
          <div
            className="absolute w-72 h-72 rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, rgba(59,130,246,0.3), transparent 70%)",
              bottom: "20%", right: "10%",
              animation: "float 10s ease-in-out infinite reverse",
            }}
          />
        </div>
        <style>{`
          @keyframes float { 0%,100%{transform:translateY(0) scale(1)} 50%{transform:translateY(-30px) scale(1.05)} }
          @keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(6,182,212,0.3)} 50%{box-shadow:0 0 40px rgba(6,182,212,0.6)} }
          @keyframes gradient-x { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
          @keyframes shimmer { 0%{background-position:-200% 0} 100%{background-position:200% 0} }
        `}</style>

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-400 text-xs font-medium mb-8 tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            AI SYSTEMS ARCHITECTURE & CONSULTING
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-6">
            <span className="block text-white">We Build AI</span>
            <span className="block text-white">Systems That</span>
            <span
              className="block bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(135deg, #06b6d4, #3b82f6, #8b5cf6, #06b6d4)",
                backgroundSize: "300% 300%",
                animation: "gradient-x 6s ease infinite",
              }}
            >
              Actually Work
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-4 leading-relaxed">
            From prototype to production — enterprise AI systems that deliver measurable ROI. Built by engineers, not prompt hobbyists.
          </p>

          {/* Stat callout */}
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-10">
            <Activity className="w-4 h-4" />
            <span>95% of AI pilots fail.</span>
            <span className="text-white font-semibold">We fix that.</span>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#contact"
              className="group px-8 py-4 rounded-full font-semibold text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2"
            >
              Book a Free Discovery Call
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="#case-study"
              className="px-8 py-4 rounded-full font-semibold text-base border border-white/15 text-white/80 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all duration-300 flex items-center gap-2"
            >
              <Play className="w-4 h-4" />
              See Case Study
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="mt-20 flex flex-col items-center gap-2 text-white/20 text-xs">
            <span>Scroll to explore</span>
            <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
              <div
                className="w-1 h-2 rounded-full bg-cyan-400"
                style={{ animation: "float 2s ease-in-out infinite" }}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ━━━ CREDIBILITY BAR ━━━ */}
      <Section className="relative z-10 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-xs text-white/30 uppercase tracking-[0.2em] mb-8">Proven across platforms & scale</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            {[
              { icon: <Bot className="w-5 h-5" />, label: "Claude Max" },
              { icon: <Cpu className="w-5 h-5" />, label: "GPT-4 / Codex" },
              { icon: <Sparkles className="w-5 h-5" />, label: "Gemini Pro" },
              { icon: <Globe className="w-5 h-5" />, label: "15+ Domains" },
              { icon: <Zap className="w-5 h-5" />, label: "10M+ Tokens/Day" },
              { icon: <Shield className="w-5 h-5" />, label: "Production Grade" },
            ].map((item, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 px-5 py-3 rounded-xl border border-white/[0.06] bg-white/[0.02] text-white/50 text-sm font-medium hover:border-cyan-500/30 hover:text-cyan-400 hover:bg-cyan-500/5 transition-all duration-500"
              >
                {item.icon}
                {item.label}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ SERVICES ━━━ */}
      <Section id="services" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">What We Do</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">AI That Moves the Needle</h2>
            <p className="text-white/40 mt-4 max-w-xl mx-auto">Three engagement models — from diagnosing opportunities to running your AI infrastructure.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <Target className="w-7 h-7" />,
                title: "AI Audit",
                price: "$5–10K",
                desc: "We analyze your operations and pinpoint where AI saves you 20+ hours per week. Detailed roadmap with ROI projections.",
                features: ["Process analysis", "Opportunity mapping", "ROI framework", "Priority ranking"],
                accent: "from-cyan-500/20 to-cyan-500/0",
                border: "hover:border-cyan-500/40",
              },
              {
                icon: <Rocket className="w-7 h-7" />,
                title: "AI Implementation",
                price: "$15–50K",
                desc: "We build and deploy custom AI systems — not demos, production systems with monitoring, testing, and documentation.",
                features: ["Custom architecture", "Full deployment", "CI/CD pipeline", "Load testing"],
                accent: "from-blue-500/20 to-blue-500/0",
                border: "hover:border-blue-500/40",
                featured: true,
              },
              {
                icon: <Activity className="w-7 h-7" />,
                title: "Managed AI",
                price: "$2–5K/mo",
                desc: "Ongoing optimization, monitoring, and new automations. Your AI keeps getting smarter while you focus on growth.",
                features: ["24/7 monitoring", "Monthly optimizations", "New automations", "Priority support"],
                accent: "from-violet-500/20 to-violet-500/0",
                border: "hover:border-violet-500/40",
              },
            ].map((card, i) => (
              <GlassCard
                key={i}
                className={`p-8 flex flex-col ${card.border} ${card.featured ? "md:-translate-y-4 border-blue-500/20 ring-1 ring-blue-500/10" : ""}`}
              >
                {card.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-xs font-semibold tracking-wide">
                    MOST POPULAR
                  </div>
                )}
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-b ${card.accent} border border-white/10 flex items-center justify-center text-cyan-400 mb-6`}>
                  {card.icon}
                </div>
                <h3 className="text-xl font-bold mb-1">{card.title}</h3>
                <p className="text-cyan-400 font-semibold text-lg mb-4">{card.price}</p>
                <p className="text-white/50 text-sm leading-relaxed mb-6 flex-grow">{card.desc}</p>
                <ul className="space-y-2.5 mb-8">
                  {card.features.map((f, j) => (
                    <li key={j} className="flex items-center gap-2.5 text-sm text-white/60">
                      <Check className="w-4 h-4 text-cyan-400 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#contact"
                  className={`text-center py-3 rounded-xl text-sm font-semibold transition-all duration-300 ${card.featured ? "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 shadow-lg shadow-cyan-500/20" : "border border-white/15 text-white/70 hover:text-white hover:border-white/30 hover:bg-white/5"}`}
                >
                  Get Started
                </a>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ CASE STUDY ━━━ */}
      <Section id="case-study" className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">Case Study</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Quant Platform Transformation</h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              A 15-domain algorithmic trading platform — rebuilt from a 2.5/10 to a 7.5/10 production-grade system in a single session.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 items-start">
            {/* Radar Chart */}
            <GlassCard className="p-6 sm:p-8" hover={false}>
              <h3 className="text-lg font-semibold mb-6 text-center">Before vs After</h3>
              <div className="w-full" style={{ height: 320 }}>
                <ResponsiveContainer>
                  <RadarChart data={radarData} cx="50%" cy="50%" outerRadius="70%">
                    <PolarGrid stroke="rgba(255,255,255,0.08)" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar name="Before" dataKey="before" stroke="#ef4444" fill="#ef4444" fillOpacity={0.15} strokeWidth={2} />
                    <Radar name="After" dataKey="after" stroke="#06b6d4" fill="#06b6d4" fillOpacity={0.2} strokeWidth={2} />
                    <Legend
                      wrapperStyle={{ fontSize: 12, color: "rgba(255,255,255,0.6)" }}
                    />
                  </RadarChart>
                </ResponsiveContainer>
              </div>
              {/* Score badges */}
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-red-400">2.5<span className="text-lg text-white/30">/10</span></div>
                  <div className="text-xs text-white/40 mt-1">Before</div>
                </div>
                <ArrowRight className="w-6 h-6 text-white/20" />
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">7.5<span className="text-lg text-white/30">/10</span></div>
                  <div className="text-xs text-white/40 mt-1">After</div>
                </div>
              </div>
            </GlassCard>

            {/* Metrics */}
            <div className="space-y-4">
              {[
                { num: 33, suffix: "", label: "Critical Bugs Fixed", icon: <Shield className="w-5 h-5" />, color: "text-red-400" },
                { num: 126, suffix: "", label: "Tests Added", icon: <Check className="w-5 h-5" />, color: "text-emerald-400" },
                { num: 15, suffix: "", label: "Domains Integrated", icon: <Globe className="w-5 h-5" />, color: "text-blue-400" },
                { num: 5, suffix: "", label: "Sports Leagues Live", icon: <TrendingUp className="w-5 h-5" />, color: "text-violet-400" },
              ].map((m, i) => (
                <GlassCard key={i} className="p-5 flex items-center gap-5">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center ${m.color}`}>
                    {m.icon}
                  </div>
                  <div>
                    <div className="text-2xl font-bold"><Counter end={m.num} suffix={m.suffix} /></div>
                    <div className="text-sm text-white/40">{m.label}</div>
                  </div>
                </GlassCard>
              ))}
              <GlassCard className="p-5 flex items-center gap-5" hover={false}>
                <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                  <Zap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-cyan-400">Telegram Alerts Live</div>
                  <div className="text-sm text-white/40">Real-time monitoring & notifications</div>
                </div>
              </GlassCard>
              <div className="flex items-center gap-2 text-xs text-white/30 pt-2 pl-1">
                <Clock className="w-3.5 h-3.5" />
                Completed in one session
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* ━━━ PORTFOLIO ━━━ */}
      <Section id="portfolio" className="relative z-10 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">Portfolio</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Projects That Ship</h2>
            <p className="text-white/40 mt-4 max-w-2xl mx-auto">
              Real systems in production — not demos. Every project built with testing, monitoring, and documentation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
            {[
              {
                name: "Quant Platform",
                domain: "FinTech",
                tagline: "15-strategy algorithmic trading platform",
                metrics: ["2.5 → 7.5 Score", "280+ Tests", "20 Packages"],
                desc: "Multi-domain quant system with real-time Telegram alerts, comprehensive monitoring, and 15 integrated trading strategies.",
                accent: "#06b6d4",
              },
              {
                name: "Haven",
                domain: "Consumer Safety",
                tagline: "AI-powered child safety platform",
                metrics: ["87 Endpoints", "190 Tests", "6 AI Features"],
                desc: "Full-stack parental control platform with COPPA/KOSA compliance, content filtering, and real-time threat monitoring.",
                accent: "#10b981",
              },
              {
                name: "PriorTox",
                domain: "Healthcare",
                tagline: "5-agent oncology prior auth engine",
                metrics: ["5 AI Agents", "RAG System", "Oncology-Grade"],
                desc: "Multi-agent system automating prior authorization for cancer treatments with deep clinical knowledge retrieval.",
                accent: "#8b5cf6",
              },
              {
                name: "Med Adherence",
                domain: "Digital Health",
                tagline: "ML-driven patient intervention system",
                metrics: ["HIPAA/TCPA", "XGBoost ML", "CMS-Ready"],
                desc: "Intelligent medication adherence with predictive modeling and compliant patient outreach automation.",
                accent: "#3b82f6",
              },
              {
                name: "StormOS CRM",
                domain: "SaaS",
                tagline: "21-feature AI roofing CRM",
                metrics: ["21 Features", "4-Week Ship", "Vercel Live"],
                desc: "End-to-end contractor management with AI job estimation, weather integration, and client portal.",
                accent: "#f59e0b",
              },
              {
                name: "Trading Bots",
                domain: "Systems / Rust",
                tagline: "Sub-millisecond market making engine",
                metrics: ["Sub-ms Latency", "Lock-Free", "Rust-Native"],
                desc: "High-frequency market making with lock-free concurrency, zero-copy deserialization, and real-time order management.",
                accent: "#ef4444",
              },
              {
                name: "Content Intelligence",
                domain: "AI / Media",
                tagline: "3-platform scraping & analysis pipeline",
                metrics: ["3 Platforms", "Gemini AI", "Auto Pipeline"],
                desc: "Automated content intelligence pipeline with multi-platform scraping, Gemini-powered analysis, and trend detection.",
                accent: "#ec4899",
              },
              {
                name: "Antigravity",
                domain: "Generative AI",
                tagline: "Autonomous AI influencer factory",
                metrics: ["Full Autonomy", "Multi-Platform", "AI Content"],
                desc: "Autonomous content generation and publishing system creating AI-driven influencer content across social platforms.",
                accent: "#6366f1",
              },
            ].map((project, i) => (
              <div
                key={i}
                className="group relative rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-6 transition-all duration-500 hover:-translate-y-2 cursor-default"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = project.accent + "66";
                  e.currentTarget.style.boxShadow = `0 20px 40px -12px ${project.accent}25, 0 0 20px ${project.accent}15`;
                  e.currentTarget.style.background = `linear-gradient(135deg, ${project.accent}08 0%, transparent 60%)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background = "rgba(255,255,255,0.03)";
                }}
              >
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-px opacity-60 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)` }}
                />

                {/* Domain tag */}
                <div
                  className="inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase mb-4"
                  style={{
                    background: project.accent + "15",
                    color: project.accent,
                    border: `1px solid ${project.accent}30`,
                  }}
                >
                  {project.domain}
                </div>

                {/* Project name & tagline */}
                <h3 className="text-lg font-bold text-white mb-1 group-hover:text-white transition-colors">{project.name}</h3>
                <p className="text-sm text-white/40 mb-4 leading-snug">{project.tagline}</p>

                {/* Metrics */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.metrics.map((metric, j) => (
                    <span
                      key={j}
                      className="px-2.5 py-1 rounded-md text-[10px] font-semibold tracking-wide bg-white/[0.06] border border-white/[0.06] transition-all duration-500"
                      style={{ color: project.accent + "cc" }}
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                {/* Description */}
                <p className="text-xs text-white/35 leading-relaxed">{project.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ CAPABILITIES ━━━ */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">Capabilities</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Deep Expertise, Wide Range</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: <Brain className="w-6 h-6" />, label: "Multi-Agent Systems" },
              { icon: <Layers className="w-6 h-6" />, label: "ML Pipeline Architecture" },
              { icon: <TrendingUp className="w-6 h-6" />, label: "Trading Infrastructure" },
              { icon: <BarChart3 className="w-6 h-6" />, label: "Sports Analytics" },
              { icon: <Sparkles className="w-6 h-6" />, label: "Biotech / FDA Catalysts" },
              { icon: <Target className="w-6 h-6" />, label: "Smart Money Tracking" },
              { icon: <MessageSquare className="w-6 h-6" />, label: "Content Generation" },
              { icon: <Database className="w-6 h-6" />, label: "Enterprise Architecture" },
              { icon: <GitBranch className="w-6 h-6" />, label: "CI/CD & DevOps" },
              { icon: <Monitor className="w-6 h-6" />, label: "Real-time Monitoring" },
            ].map((cap, i) => (
              <GlassCard key={i} className="p-5 flex flex-col items-center text-center gap-3">
                <div className="text-cyan-400">{cap.icon}</div>
                <span className="text-xs sm:text-sm font-medium text-white/70">{cap.label}</span>
              </GlassCard>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ HOW WE WORK ━━━ */}
      <Section id="process" className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">How We Work</h2>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
            <div className="grid md:grid-cols-4 gap-8 md:gap-6">
              {[
                { step: "01", title: "Discovery Call", time: "Free", desc: "30-minute call to understand your operations, goals, and where AI fits.", icon: <MessageSquare className="w-5 h-5" /> },
                { step: "02", title: "AI Audit", time: "2 weeks", desc: "Deep dive into your processes. Deliverable: ranked opportunity map with ROI estimates.", icon: <Target className="w-5 h-5" /> },
                { step: "03", title: "Implementation", time: "4–8 weeks", desc: "Build, test, and deploy. Production-grade with monitoring, docs, and training.", icon: <Code2 className="w-5 h-5" /> },
                { step: "04", title: "Optimization", time: "Ongoing", desc: "Continuous improvement. New automations, performance tuning, scaling support.", icon: <TrendingUp className="w-5 h-5" /> },
              ].map((s, i) => (
                <div key={i} className="relative flex flex-col items-center text-center">
                  <div
                    className="w-16 h-16 rounded-2xl bg-gradient-to-b from-cyan-500/20 to-transparent border border-cyan-500/20 flex items-center justify-center text-cyan-400 mb-5 relative z-10"
                    style={{ animation: "pulse-glow 4s ease-in-out infinite", animationDelay: `${i * 0.5}s` }}
                  >
                    {s.icon}
                  </div>
                  <div className="text-[10px] text-cyan-400/60 font-mono tracking-widest mb-2">{s.step}</div>
                  <h3 className="text-lg font-bold mb-1">{s.title}</h3>
                  <div className="text-xs text-cyan-400 font-medium mb-3">{s.time}</div>
                  <p className="text-sm text-white/40 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* ━━━ TECH STACK ━━━ */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">Tech Stack</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Battle-Tested Tools</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "Claude", "GPT-4", "Gemini", "Python", "TypeScript", "Docker",
              "PostgreSQL", "Redis", "Prometheus", "Grafana", "GitHub Actions",
              "TradingView", "Telegram", "FastAPI", "React", "AWS",
            ].map((tool, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-xl border border-white/[0.06] bg-white/[0.02] text-sm text-white/50 font-medium hover:text-cyan-400 hover:border-cyan-500/30 hover:bg-cyan-500/5 transition-all duration-500 cursor-default"
              >
                {tool}
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ━━━ TESTIMONIAL ━━━ */}
      <Section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <GlassCard className="p-10 sm:p-14 text-center" hover={false}>
            <div className="flex justify-center gap-1 mb-6">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 fill-cyan-400 text-cyan-400" />
              ))}
            </div>
            <blockquote className="text-xl sm:text-2xl font-medium text-white/80 leading-relaxed mb-8 italic">
              "We went from a broken prototype to a production system processing millions of data points across 15 domains. The transformation was unlike anything I've seen in 20 years of tech."
            </blockquote>
            <div className="flex items-center justify-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-sm font-bold">
                JC
              </div>
              <div className="text-left">
                <div className="text-sm font-semibold">Jose Canales</div>
                <div className="text-xs text-white/40">Quant Systems Architect</div>
              </div>
            </div>
          </GlassCard>
        </div>
      </Section>

      {/* ━━━ FAQ ━━━ */}
      <Section id="faq" className="relative z-10 py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-cyan-400 text-sm font-medium tracking-wide uppercase mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">Common Questions</h2>
          </div>
          <div className="space-y-3">
            <FAQItem
              q="How is this different from ChatGPT wrappers?"
              a="We don't wrap APIs and call it a product. We architect end-to-end systems with proper data pipelines, error handling, monitoring, testing, and deployment infrastructure. Our systems process millions of tokens daily across multi-agent architectures — that's not something you get from a prompt template."
            />
            <FAQItem
              q="What industries do you serve?"
              a="Our core expertise spans quantitative finance, sports analytics, biotech, and enterprise operations. But our multi-agent architecture and ML pipeline skills transfer across any domain that needs intelligent automation — from content generation to supply chain optimization."
            />
            <FAQItem
              q="How fast can you deliver?"
              a="An AI audit takes about 2 weeks. Full implementation runs 4–8 weeks depending on complexity. But we've completed major platform overhauls — including 33 critical bug fixes, 126 tests, and 15-domain integration — in a single intensive session when the situation calls for it."
            />
            <FAQItem
              q="Do you offer guarantees?"
              a="We guarantee measurable outcomes. Every engagement starts with defined KPIs and success criteria. If the audit doesn't identify at least 20 hours/week of potential savings, we refund it. For implementations, we don't ship until the system passes our production readiness checklist."
            />
            <FAQItem
              q="Can you work with our existing tech stack?"
              a="Absolutely. We're fluent across Claude, GPT-4, Gemini, and most major frameworks and cloud providers. We integrate with what you have rather than forcing a rewrite. Our quant platform spans Python, Docker, PostgreSQL, Redis, Prometheus, and more — we meet you where you are."
            />
          </div>
        </div>
      </Section>

      {/* ━━━ CTA FOOTER ━━━ */}
      <Section id="contact" className="relative z-10 py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Glow effect */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at center, rgba(6,182,212,0.08) 0%, transparent 60%)",
            }}
          />
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 relative">
            Ready to Stop{" "}
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #ef4444, #f97316)" }}>
              Failing
            </span>
            {" "}at AI?
          </h2>
          <p className="text-lg text-white/40 max-w-xl mx-auto mb-10 relative">
            Book a free 30-minute discovery call. No pitch deck, no fluff — just a conversation about where AI can move the needle for your business.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 relative mb-10">
            <a
              href="mailto:jcanales07@gmail.com?subject=AI%20Consulting%20Inquiry"
              className="group px-10 py-4 rounded-full font-semibold text-base bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-xl shadow-cyan-500/25 hover:shadow-cyan-500/40 flex items-center gap-2"
            >
              <Mail className="w-5 h-5" />
              Get in Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
            </a>
            <a
              href="mailto:jcanales07@gmail.com"
              className="text-white/40 hover:text-cyan-400 text-sm transition-colors duration-300"
            >
              jcanales07@gmail.com
            </a>
          </div>

          {/* Stats bar */}
          <div className="flex flex-wrap justify-center gap-8 sm:gap-12 pt-10 border-t border-white/[0.06] relative">
            {[
              { value: <Counter end={15} suffix="+" />, label: "Domains" },
              { value: <Counter end={10} suffix="M+" />, label: "Tokens / Day" },
              { value: <Counter end={126} suffix="" />, label: "Tests Written" },
              { value: <Counter end={33} suffix="" />, label: "Bugs Squashed" },
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-cyan-400">{s.value}</div>
                <div className="text-xs text-white/30 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ── Footer ── */}
      <footer className="relative z-10 border-t border-white/[0.06] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Brain className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm font-semibold">Canales<span className="text-cyan-400">AI</span></span>
          </div>
          <p className="text-xs text-white/25">&copy; {new Date().getFullYear()} Canales AI Consulting. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}