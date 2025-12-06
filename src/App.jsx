import React, { useState } from 'react';
import {
  Bot,
  CalendarDays,
  ChefHat,
  Crown,
  Dumbbell,
  Flame,
  Medal,
  MessageCircle,
  Play,
  Shield,
  Sparkles,
  Trophy,
  Users,
  UtensilsCrossed,
  Video,
  Briefcase,
} from 'lucide-react';

const GEMINI_API_KEY = 'YOUR_GEMINI_API_KEY';
const GEMINI_ENDPOINT =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

const navItems = [
  { key: 'mats', label: 'Mats', icon: Dumbbell },
  { key: 'events', label: 'Events', icon: CalendarDays },
  { key: 'comms', label: 'Comms', icon: MessageCircle },
  { key: 'study', label: 'Study', icon: Play },
];

const heroFeature = {
  title: 'Pressure Passing',
  subtitle: 'Smash through the toughest guards with Professor Galvao.',
  belt: 'Guard Passing',
  duration: '32:18',
  coach: 'Professor Galvao',
  tag: 'Trending in Academy',
  image:
    'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?auto=format&fit=crop&w=1600&q=80',
};

const drillQueue = [
  { title: 'Spider Guard', belt: 'No-Gi', length: 'Episode 3', progress: 0.7 },
  { title: 'Heel Hooks', belt: 'Advanced', length: '10m left', progress: 0.4 },
  { title: 'Guard Recovery', belt: 'All Levels', length: '05:12', progress: 0.2 },
];

const badges = [
  { name: 'Iron Man', detail: '10 sessions streak', icon: Dumbbell },
  { name: 'Tap Collector', detail: '8 subs this week', icon: Flame },
  { name: 'Wall of Frames', detail: '0 guard passes allowed', icon: Shield },
  { name: 'Little Champ', detail: 'Kids class MVP', icon: Crown },
];

const leaderboard = [
  { name: 'Ava “Storm” Kim', hours: 12.5, streak: 21 },
  { name: 'Diego Silva', hours: 11.3, streak: 18 },
  { name: 'Maya Rios', hours: 9.7, streak: 14 },
];

const dojoEvents = [
  { title: 'Dawn Smash Open Mat', date: 'Sat, Dec 9', time: '7:00 AM', type: 'Open Mat' },
  { title: 'Gi Sharks Seminar', date: 'Sun, Dec 10', time: '10:00 AM', type: 'Seminar' },
  { title: 'Stripe Check + Belt Ties', date: 'Wed, Dec 13', time: '6:00 PM', type: 'Belt Ceremony' },
];

const tournaments = [
  { title: 'Pan Kids Prep Camp', date: 'Jan 6', time: 'All Day', type: 'Camp' },
  { title: 'Submission Only Superfight', date: 'Jan 20', time: '5:00 PM', type: 'Superfight' },
  { title: 'Winter Open IBJJF', date: 'Feb 2', time: '8:00 AM', type: 'Tournament' },
];

const channels = [
  { name: 'Mat Savages', members: 128, matsOpen: true },
  { name: 'Coach Mendez', members: 42, matsOpen: false },
  { name: 'Kids Squad', members: 36, matsOpen: true },
  { name: 'No-Gi Sharks', members: 57, matsOpen: false },
];

const recipes = [
  { name: 'Acai Bowl', details: 'Guarana-free acai, banana, bee pollen', macros: '35C / 20P / 12F' },
  { name: 'Sambo Scramble', details: 'Egg whites, spinach, smoked salmon', macros: '10C / 34P / 14F' },
  { name: 'Oss Recovery Shake', details: 'Cocoa, creatine, almond butter', macros: '25C / 32P / 15F' },
];

const heatmapData = [
  0, 1, 2, 3, 2, 1, 0, 2, 3, 4, 3, 1, 0, 1, 2, 2, 3, 4, 3, 2, 1, 0, 1, 3, 4, 4, 3, 2, 1, 0, 1, 2, 3, 2, 1,
];

const StudyVideo = {
  title: 'System: Leg Lock Entries',
  instructor: 'Prof. Danaher',
  runtime: '18:22',
};

const timeOfDay = () => {
  const hour = new Date().getHours();
  if (hour < 12) return 'Morning';
  if (hour < 18) return 'Afternoon';
  return 'Evening';
};

const statusColors = ['bg-zinc-800', 'bg-red-900', 'bg-red-800', 'bg-red-700', 'bg-red-600'];

function App() {
  const [userType, setUserType] = useState('Adult');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('mats');
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [drillIdeas, setDrillIdeas] = useState('');
  const [mealPlan, setMealPlan] = useState('');
  const [eventView, setEventView] = useState('dojo');
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState('');
  const [chatLoading, setChatLoading] = useState(false);
  const [drillLoading, setDrillLoading] = useState(false);
  const [fuelLoading, setFuelLoading] = useState(false);
  const [aiMessages, setAiMessages] = useState([
    { role: 'assistant', content: 'Osu. Professor AI online. Keep your frames sharp and your breath steady.' },
  ]);

  const greeting = `${timeOfDay()}, ${userType === 'Adult' ? 'Warrior' : 'Little Champ'}`;

  const callGemini = async (prompt) => {
    if (!GEMINI_API_KEY || GEMINI_API_KEY === 'YOUR_GEMINI_API_KEY') {
      return [
        'Set GEMINI_API_KEY to call Gemini.',
        '- Example drill: Shadow wrestle into guard pull, focus on posture breaks.',
        '- Example plan: Hydrate, light carbs pre-roll, lean protein post-roll.',
      ].join('\n');
    }

    try {
      const response = await fetch(`${GEMINI_ENDPOINT}?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }], role: 'user' }],
        }),
      });

      const data = await response.json();
      const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
      return text || 'Professor is silent right now.';
    } catch (error) {
      console.error(error);
      return 'Could not reach Gemini. Check your key or connection.';
    }
  };

  const handleLogin = (event) => {
    event.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setIsLoggedIn(true);
    }, 900);
  };

  const handleGenerateDrills = async () => {
    setDrillLoading(true);
    const prompt = `You are a Brazilian Jiu-Jitsu instructor. Generate 4 concise drills (one per line) for ${heroFeature.title}. Include focus points, reps, and mat etiquette. Keep it crisp.`;
    const ideas = await callGemini(prompt);
    setDrillIdeas(ideas);
    setDrillLoading(false);
  };

  const handleMealPlan = async () => {
    setFuelLoading(true);
    const prompt =
      'Create a 1-day weight cut meal plan for a BJJ athlete 5 days out from competition. Give 4 meals with timing, hydration, and sodium notes. Keep it under 120 words.';
    const plan = await callGemini(prompt);
    setMealPlan(plan);
    setFuelLoading(false);
  };

  const handleSendChat = async () => {
    if (!chatInput.trim()) return;
    const message = chatInput.trim();
    setAiMessages((prev) => [...prev, { role: 'user', content: message }]);
    setChatInput('');
    setChatLoading(true);

    const prompt = [
      'You are Professor AI, a wise, tough Brazilian Jiu-Jitsu Black Belt.',
      'Always use terms like "Osu", "frames", "leverage", and keep advice sharp and concise.',
      'Encourage disciplined breathing and posture.',
      `User says: ${message}`,
    ].join('\n');

    const reply = await callGemini(prompt);
    setAiMessages((prev) => [...prev, { role: 'assistant', content: reply }]);
    setChatLoading(false);
  };

  const loginScreen = (
    <div className="min-h-screen relative flex items-center justify-center px-4 pb-6">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1400&q=80"
          alt="Academy wall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>
      <div className="relative max-w-md w-full rounded-[28px] bg-black/80 border border-white/10 p-8 space-y-6 shadow-2xl backdrop-blur-xl">
        <div className="space-y-1">
          <h1 className="text-4xl font-black text-red-600">MATFLIX</h1>
          <p className="uppercase text-[11px] tracking-[0.32em] text-zinc-400">Unlimited Rolls.</p>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-semibold tracking-[0.2em] text-zinc-500">GRAPPLER PROFILE</p>
          <div className="flex gap-2">
            {['Adult', 'Little Champ'].map((type) => (
              <button
                key={type}
                onClick={() => setUserType(type)}
                className={`flex-1 rounded-xl py-3 px-4 border text-sm font-semibold transition ${
                  userType === type
                    ? 'bg-white text-black border-white shadow-glow'
                    : 'bg-zinc-900 border-zinc-700 text-white hover:border-red-500/50'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-3">
          <input
            type="text"
            placeholder="Gracie Academy HQ"
            className="bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="email"
            required
            placeholder="Email or Member ID"
            className="bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
          />
          <input
            type="password"
            required
            placeholder="Password"
            className="bg-zinc-900/80 border border-zinc-700 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white font-semibold rounded-xl py-3 shadow-glow hover:bg-red-500 transition flex items-center justify-center gap-2"
            disabled={isLoggingIn}
          >
            {isLoggingIn && <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />}
            {isLoggingIn ? 'Entering...' : 'Enter Academy'}
          </button>
        </form>
        <p className="text-xs text-zinc-400 text-center">
          Forgot your belt? <span className="text-white">Recover Account</span>
        </p>
      </div>
    </div>
  );

  const renderHeatmap = () => (
    <div className="rounded-3xl bg-black border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mat Time Consistency</h3>
        <span className="text-xs text-zinc-400">LAST 3 MONTHS</span>
      </div>
      <div className="grid grid-cols-7 gap-1.5 place-items-center">
        {heatmapData.map((level, idx) => (
          <div
            key={idx}
            className={`w-3.5 h-3.5 md:w-4 md:h-4 rounded-full ${statusColors[level] || 'bg-zinc-800'}`}
            title={`Day ${idx + 1}: intensity ${level}`}
          />
        ))}
      </div>
    </div>
  );

  const renderDrills = () => (
    <div className="rounded-3xl bg-black border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Continue Drilling</h3>
        <Sparkles className="text-red-500" size={20} />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-2">
        {drillQueue.map((drill, idx) => (
          <div
            key={drill.title}
            className={`min-w-[190px] rounded-2xl p-4 text-white ${
              idx === 0 ? 'bg-gradient-to-br from-red-700 to-black' : 'bg-zinc-900'
            }`}
          >
            <p className="text-xs text-zinc-200">{drill.belt}</p>
            <p className="font-semibold mt-2">{drill.title}</p>
            <p className="text-xs text-zinc-400">{drill.length}</p>
            <div className="h-1 rounded-full bg-zinc-800 mt-4 overflow-hidden">
              <div className="h-full bg-red-500" style={{ width: `${drill.progress * 100}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBadges = () => (
    <div className="rounded-3xl bg-black border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Belt Progression</h3>
        <Trophy className="text-red-500" size={20} />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {badges.map((badge) => {
          const Icon = badge.icon;
          return (
            <div
              key={badge.name}
              className="min-w-[160px] bg-zinc-900 border border-white/10 rounded-2xl p-4 flex flex-col gap-3 items-start"
            >
              <Icon className="text-red-500" size={22} />
              <div>
                <p className="font-semibold text-sm">{badge.name}</p>
                <p className="text-xs text-zinc-400">{badge.detail}</p>
              </div>
              <div className="w-full h-1 rounded-full bg-zinc-800">
                <div className="h-full bg-red-500 w-3/4 rounded-full" />
              </div>
            </div>
          );
        })}
      </div>
      <div className="w-full h-1 rounded-full bg-zinc-900">
        <div className="h-full bg-red-500 w-4/5 rounded-full" />
      </div>
    </div>
  );

  const renderLeaderboard = () => (
    <div className="rounded-3xl bg-black border border-white/10 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Mat Enforcers</h3>
        <Medal className="text-red-500" size={20} />
      </div>
      <div className="space-y-3">
        {leaderboard.map((athlete, index) => (
          <div
            key={athlete.name}
            className="bg-zinc-900 rounded-2xl px-4 py-3 flex items-center justify-between border border-white/5"
          >
            <div className="flex items-center gap-3">
              <div className="text-xl font-bold text-red-500">{index + 1}</div>
              <div>
                <p className="font-semibold">{athlete.name}</p>
                <p className="text-xs text-zinc-400">{athlete.streak}-day streak</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-red-400 font-semibold">{athlete.hours} Hrs Mat Time</p>
              <p className="text-[11px] text-zinc-500">Black Belt</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderFuel = () => (
    <div className="rounded-3xl bg-black border border-white/10 p-4 space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Fuel Up</h3>
        <UtensilsCrossed className="text-red-500" size={18} />
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1">
        {recipes.map((recipe) => (
          <div
            key={recipe.name}
            className="min-w-[190px] bg-zinc-900 border border-white/10 rounded-2xl p-4 space-y-2"
          >
            <p className="font-semibold">{recipe.name}</p>
            <p className="text-xs text-zinc-400">{recipe.details}</p>
            <p className="text-xs text-red-300">{recipe.macros}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMats = () => (
    <div className="space-y-6">
      <div className="relative overflow-hidden rounded-3xl border border-white/10 shadow-glow">
        <img
          src={heroFeature.image}
          alt="Hero technique"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />
        <div className="relative p-6 md:p-8 space-y-4">
          <div className="flex gap-2">
            <span className="px-3 py-1 rounded-full bg-red-600 text-black text-xs font-semibold shadow-glow">
              {heroFeature.tag}
            </span>
            <span className="px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold border border-white/15">
              {heroFeature.belt}
            </span>
          </div>
          <div className="space-y-1">
            <h2 className="text-3xl md:text-4xl font-black">{heroFeature.title}</h2>
            <p className="text-base text-zinc-200 max-w-xl">{heroFeature.subtitle}</p>
            <p className="text-sm text-zinc-300">{heroFeature.coach}</p>
          </div>
          <div className="flex gap-3">
            <button className="bg-white text-black px-5 py-3 rounded-xl flex items-center gap-2 font-semibold shadow-lg">
              <Play size={18} className="text-black" /> Study
            </button>
            <button className="bg-zinc-900/90 text-white px-5 py-3 rounded-xl border border-white/10 flex items-center gap-2">
              <Shield size={18} /> Rank
            </button>
          </div>
        </div>
      </div>

      <div className="space-y-5">
        {renderDrills()}
        {renderHeatmap()}
        {renderBadges()}
        {renderLeaderboard()}
        {renderFuel()}
      </div>
    </div>
  );

  const renderEvents = () => (
    <div className="space-y-6">
      <div className="rounded-3xl bg-black border border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Academy Events</h3>
        </div>
        <div className="flex gap-2 bg-zinc-900 p-1 rounded-full border border-white/10">
          {[
            { key: 'dojo', label: 'MY DOJO' },
            { key: 'tournaments', label: 'TOURNAMENTS' },
          ].map((item) => (
            <button
              key={item.key}
              onClick={() => setEventView(item.key)}
              className={`flex-1 rounded-full py-2 text-xs font-semibold ${
                eventView === item.key ? 'bg-white text-black shadow-glow' : 'text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
        <div className="space-y-3">
          {(eventView === 'dojo' ? dojoEvents : tournaments).map((event, idx) => (
            <div
              key={event.title}
              className={`rounded-3xl px-4 py-5 border border-white/10 flex items-center justify-between ${
                idx % 2 === 0 ? 'bg-[#1a0f10]' : 'bg-zinc-900'
              }`}
            >
              <div className="space-y-1">
                <span className="text-[11px] px-2 py-1 rounded-md bg-red-600 text-black font-semibold">
                  {event.type}
                </span>
                <p className="text-lg font-semibold">{event.title}</p>
                <p className="text-xs text-zinc-400">
                  {event.date} • {event.time}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center text-zinc-300">
                →
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderComms = () => (
    <div className="space-y-4">
      <div className="rounded-3xl bg-black border border-white/10 p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold">Comms</h3>
          <span className="px-3 py-1 rounded-full bg-white/10 text-xs flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-500" />
            Mats Open
          </span>
        </div>
        <div className="space-y-3">
          {channels.map((channel) => (
            <div
              key={channel.name}
              className="bg-zinc-900 rounded-2xl p-4 flex items-center justify-between border border-white/5"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600/90 flex items-center justify-center text-white font-semibold">
                  {channel.name
                    .split(' ')
                    .map((p) => p[0])
                    .join('')
                    .slice(0, 2)}
                </div>
                <div>
                  <p className="font-semibold">{channel.name}</p>
                  <p className="text-xs text-zinc-400">{channel.members} grapplers</p>
                </div>
              </div>
              <span className="text-xs text-zinc-400">{channel.matsOpen ? '10:42 AM' : 'Offline'}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderStudy = () => (
    <div className="space-y-6">
      <div className="rounded-3xl bg-black border border-white/10 overflow-hidden">
        <div className="aspect-video bg-[#0f0f0f] flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center shadow-glow">
            <Play className="text-white" />
          </div>
        </div>
        <div className="p-5 space-y-3 border-t border-white/10">
          <h3 className="text-2xl font-bold">{StudyVideo.title}</h3>
          <div className="flex items-center gap-3 text-sm text-zinc-300">
            <span className="text-green-400 font-semibold">NO-GI</span>
            <span className="px-2 py-1 rounded-md border border-white/15 text-xs">Advanced</span>
            <span className="px-2 py-1 rounded-md border border-white/15 text-xs">HD</span>
          </div>
          <p className="text-zinc-300">
            Professor Danaher breaks down entries into Ashi Garami from open guard. Essential viewing for modern
            competition.
          </p>
          <button
            onClick={handleGenerateDrills}
            className="w-full bg-gradient-to-r from-red-500 to-red-700 text-white font-semibold rounded-xl py-3 shadow-glow flex items-center justify-center gap-2"
            disabled={drillLoading}
          >
            {drillLoading && (
              <span className="h-3 w-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            Generate Drills with AI
          </button>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-3 min-h-[110px] text-sm text-zinc-200 whitespace-pre-line">
            {drillIdeas || 'Hit generate to get precision drills tailored to this technique.'}
          </div>
          <button
            onClick={handleMealPlan}
            className="w-full bg-zinc-900 text-white font-semibold rounded-xl py-3 border border-white/15 hover:border-red-400/60 flex items-center justify-center gap-2"
            disabled={fuelLoading}
          >
            <ChefHat size={18} className="text-red-400" />
            {fuelLoading ? 'Dialing it in...' : 'View Weight Cut Plan'}
          </button>
          <div className="bg-zinc-900 border border-white/10 rounded-xl p-3 min-h-[110px] text-sm text-zinc-200 whitespace-pre-line">
            {mealPlan || 'Get a 1-day comp-ready plan.'}
          </div>
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'events':
        return renderEvents();
      case 'comms':
        return renderComms();
      case 'study':
        return renderStudy();
      default:
        return renderMats();
    }
  };

  if (!isLoggedIn) return loginScreen;

  return (
    <div className="min-h-screen pb-28 bg-gradient-to-b from-black via-black to-zinc-950">
      <header className="max-w-5xl mx-auto px-4 pt-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-black leading-tight">Good {greeting}</h1>
            <p className="text-sm text-zinc-400">Let’s get after it today.</p>
          </div>
          <div className="w-12 h-12 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-sm font-semibold">
            ME
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 mt-4">{renderTab()}</main>

      <div className="fixed bottom-24 right-6">
        <button
          onClick={() => setChatOpen(true)}
          className="rounded-full bg-white text-black p-4 shadow-xl border border-white/20 flex items-center justify-center"
        >
          <Briefcase size={20} />
        </button>
      </div>

      <nav className="fixed bottom-0 left-0 right-0 bg-black/90 border-t border-white/10 backdrop-blur-xl">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = activeTab === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setActiveTab(item.key)}
                className={`flex-1 flex flex-col items-center gap-1 py-2 ${
                  active ? 'text-white' : 'text-zinc-500'
                }`}
              >
                <Icon size={22} strokeWidth={active ? 2.5 : 2} />
                <span className="text-xs">{item.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      {chatOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl z-50 flex items-center justify-center px-4">
          <div className="bg-zinc-950 border border-white/10 rounded-3xl max-w-xl w-full max-h-[80vh] flex flex-col shadow-2xl">
            <div className="flex items-center justify-between p-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white">
                  <Bot size={18} />
                </div>
                <div>
                  <p className="font-semibold">Professor AI</p>
                  <p className="text-[11px] text-green-400 flex items-center gap-1">
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    ONLINE
                  </p>
                </div>
              </div>
              <button
                onClick={() => setChatOpen(false)}
                className="text-zinc-400 hover:text-white border border-white/10 rounded-xl px-3 py-1"
              >
                ✕
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-black/40">
              {aiMessages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                      msg.role === 'user' ? 'bg-red-600 text-black' : 'bg-zinc-900 text-white border border-white/10'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{msg.content}</p>
                  </div>
                </div>
              ))}
              {chatLoading && (
                <div className="flex justify-start">
                  <div className="px-4 py-2 rounded-2xl bg-zinc-900 border border-white/10 text-sm text-zinc-300">
                    Professor is thinking...
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-white/10 flex gap-2 bg-black">
              <input
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder='Ask about a technique...'
                className="flex-1 bg-zinc-900 border border-white/10 rounded-xl px-3 py-3 text-sm focus:outline-none focus:border-red-500"
              />
              <button
                onClick={handleSendChat}
                className="bg-white text-black px-4 py-3 rounded-xl border border-white/10"
                disabled={chatLoading}
              >
                ➤
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
