import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  Award,
  Users,
  Video,
  Play,
  Send,
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Share2,
  X,
  Radio,
  Vote,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
  Download,
  ExternalLink,
  BookOpen,
  CalendarCheck,
  CalendarPlus,
  Layers
} from 'lucide-react';
import { WebinarEvent, WebinarCategory, Faculty, Course } from '../types';

interface WebinarsEventsViewProps {
  webinars: WebinarEvent[];
  onRegisterToggle: (id: string) => void;
  activeLiveWebinar: WebinarEvent | null;
  onCloseLiveRoom: () => void;
  onOpenLiveRoom: (webinar: WebinarEvent) => void;
  onSelectCourse?: (course: Course) => void;
}

const WEBINAR_CATEGORIES: { id: WebinarCategory | 'All'; label: string; icon: any }[] = [
  { id: 'All', label: 'All Events', icon: Layers },
  { id: 'Webinars', label: 'Webinars', icon: Video },
  { id: 'Live Sessions', label: 'Live Sessions', icon: Radio },
  { id: 'Expert Talks', label: 'Expert Talks', icon: Sparkles },
  { id: 'Conferences', label: 'Conferences', icon: Calendar },
];

export const WebinarsEventsView: React.FC<WebinarsEventsViewProps> = ({
  webinars,
  onRegisterToggle,
  activeLiveWebinar,
  onCloseLiveRoom,
  onOpenLiveRoom,
  onSelectCourse,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<WebinarCategory | 'All'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedWebinarForDetail, setSelectedWebinarForDetail] = useState<WebinarEvent | null>(null);

  // Live Room simulated interactive chat & poll state
  const [chatMessages, setChatMessages] = useState<{
    id: string;
    author: string;
    role: string;
    text: string;
    time: string;
  }>([
    {
      id: 'c1',
      author: 'Dr. Jennifer Scott, MD',
      role: 'Cardiac Electrophysiologist',
      text: 'Are you seeing sustained blood pressure drops beyond 36 months in your cohort?',
      time: '12:08 PM',
    },
    {
      id: 'c2',
      author: 'Dr. Kevin Zhao, MD',
      role: 'Cardiology Fellow',
      text: 'Great demonstration of the spiral catheter placement technique.',
      time: '12:12 PM',
    },
    {
      id: 'c3',
      author: 'Dr. Sarah Chen, MD (Faculty)',
      role: 'Interventional Cardiology Chair',
      text: 'In the SPYRAL HTN-ON MED trial, 24-hour ambulatory systolic drop was sustained at -9.9 mmHg at 36 months.',
      time: '12:15 PM',
    },
  ]);
  const [inputChat, setInputChat] = useState('');

  // Live Poll state
  const [pollVoted, setPollVoted] = useState<number | null>(null);
  const [pollOptions, setPollOptions] = useState([
    { label: 'Renal Denervation (Radiofrequency/Ultrasound)', votes: 68 },
    { label: 'Add 4th-line agent (Finerenone / Spironolactone)', votes: 32 },
    { label: 'Referral for baroreflex activation therapy', votes: 11 },
  ]);

  // Calendar sync toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const filteredWebinars = webinars.filter((w) => {
    if (selectedCategory !== 'All' && w.category !== selectedCategory) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        w.title.toLowerCase().includes(q) ||
        w.description.toLowerCase().includes(q) ||
        w.specialty.toLowerCase().includes(q) ||
        w.speaker.name.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const handleSendChat = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputChat.trim()) return;
    setChatMessages((prev) => [
      ...prev,
      {
        id: `chat-${Date.now()}`,
        author: 'Dr. Sarah Chen, MD (You)',
        role: 'Interventional Cardiology',
        text: inputChat.trim(),
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setInputChat('');
  };

  const handleVotePoll = (index: number) => {
    if (pollVoted !== null) return;
    setPollVoted(index);
    setPollOptions((prev) =>
      prev.map((opt, i) => (i === index ? { ...opt, votes: opt.votes + 1 } : opt))
    );
  };

  const totalPollVotes = pollOptions.reduce((acc, opt) => acc + opt.votes, 0);

  const handleAddToCalendar = (webinar: WebinarEvent) => {
    showToast(`Added "${webinar.title}" to calendar (.ics / Google Calendar format) with reminder set.`);
  };

  return (
    <div id="webinars-view" className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CalendarCheck className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full flex items-center gap-1.5">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              Live & On-Demand Clinical Symposia
            </span>
            <span className="text-xs text-teal-100/70">ACCME Accredited Grand Rounds</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
            Events, Webinars & Expert Symposia
          </h1>
          <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl">
            Participate in real-time multidisciplinary case panels, interactive Q&A with guideline chairs, and earn verified live CME credits directly.
          </p>

          {/* Search Bar */}
          <div className="pt-2 max-w-xl">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search symposium topic, guideline speaker, or medical specialty..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-teal-100/40 focus:outline-hidden focus:ring-2 focus:ring-teal-400"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Category Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {WEBINAR_CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'All'
                ? webinars.length
                : webinars.filter((w) => w.category === cat.id).length;

            return (
              <button
                key={cat.id}
                id={`webinar-cat-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0E9384] text-white border-[#0E9384] shadow-sm'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#0E9384]'}`} />
                <span>{cat.label}</span>
                <span
                  className={`px-1.5 py-0.2 text-[10px] rounded-full font-bold ${
                    isActive ? 'bg-white/25 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Webinars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWebinars.map((webinar) => {
            const isLive = webinar.status === 'live';
            const isRegistered = webinar.registered;

            return (
              <div
                key={webinar.id}
                id={`webinar-card-${webinar.id}`}
                className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Thumbnail / Header Banner */}
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={webinar.thumbnail}
                      alt={webinar.title}
                      className="w-full h-full object-cover opacity-85 group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />

                    {/* Status & Credits Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-1.5">
                      {isLive ? (
                        <span className="px-2.5 py-1 text-xs font-extrabold bg-rose-600 text-white rounded-md flex items-center gap-1.5 animate-pulse shadow-md">
                          <Radio className="w-3.5 h-3.5" />
                          LIVE NOW
                        </span>
                      ) : (
                        <span className="px-2.5 py-1 text-[11px] font-bold bg-[#0A192F]/90 text-teal-300 rounded-md border border-white/10 backdrop-blur-xs">
                          {webinar.category || 'Webinar'}
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 text-[11px] font-extrabold bg-[#0E9384] text-white rounded-md shadow-md flex items-center gap-1">
                        <Award className="w-3 h-3" />
                        {webinar.credits} CME
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 text-white">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 block">
                        {webinar.specialty}
                      </span>
                      <div className="flex items-center gap-2 text-xs text-slate-200">
                        <Calendar className="w-3.5 h-3.5 text-teal-400" />
                        <span>{webinar.date} • {webinar.time} {webinar.timeZone || 'EST'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 space-y-3">
                    <h3 className="text-sm sm:text-base font-bold text-slate-900 leading-snug line-clamp-2">
                      {webinar.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {webinar.description}
                    </p>

                    {/* Speaker Info */}
                    <div className="pt-2 border-t border-slate-100 flex items-center gap-3">
                      <img
                        src={webinar.speaker.avatar}
                        alt={webinar.speaker.name}
                        className="w-10 h-10 rounded-full object-cover border border-teal-500/20"
                      />
                      <div className="text-xs">
                        <div className="font-bold text-slate-900 flex items-center gap-1">
                          <span>{webinar.speaker.name}</span>
                          <ShieldCheck className="w-3 h-3 text-teal-600" />
                        </div>
                        <p className="text-[11px] text-slate-500 line-clamp-1">
                          {webinar.speaker.role} • {webinar.speaker.institution}
                        </p>
                      </div>
                    </div>

                    {/* Attendees & Duration */}
                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
                      <span className="flex items-center gap-1">
                        <Users className="w-3 h-3 text-slate-400" />
                        {webinar.attendeesCount.toLocaleString()} clinicians registered
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        {webinar.durationMinutes} mins
                      </span>
                    </div>
                  </div>
                </div>

                {/* Card Actions */}
                <div className="p-4 bg-slate-50/80 border-t border-slate-100 flex items-center gap-2">
                  <button
                    onClick={() => setSelectedWebinarForDetail(webinar)}
                    className="flex-1 py-2 bg-white hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center"
                  >
                    Details & Agenda
                  </button>

                  {isLive ? (
                    <button
                      onClick={() => onOpenLiveRoom(webinar)}
                      className="flex-1 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer text-center shadow-xs flex items-center justify-center gap-1.5 animate-pulse"
                    >
                      <Radio className="w-3.5 h-3.5" />
                      <span>Join Live Stream</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => onRegisterToggle(webinar.id)}
                      className={`flex-1 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-xs ${
                        isRegistered
                          ? 'bg-teal-50 text-[#0E9384] border border-teal-200 font-bold'
                          : 'bg-[#0E9384] hover:bg-[#0b7a6d] text-white'
                      }`}
                    >
                      {isRegistered ? (
                        <>
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9384]" />
                          <span>Registered</span>
                        </>
                      ) : (
                        <>
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span>Register Free</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Webinar Detail & Agenda Modal */}
      {selectedWebinarForDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-5 bg-[#0A192F] text-white flex items-start justify-between">
              <div className="space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-md">
                    {selectedWebinarForDetail.category || 'Clinical Symposium'}
                  </span>
                  <span className="px-2.5 py-0.5 text-xs font-bold bg-[#0E9384] text-white rounded-md">
                    {selectedWebinarForDetail.credits} AMA PRA Category 1 Credits™
                  </span>
                </div>
                <h2 className="text-base sm:text-xl font-bold text-white leading-snug">
                  {selectedWebinarForDetail.title}
                </h2>
                <div className="flex items-center gap-3 text-xs text-teal-100/70">
                  <span>{selectedWebinarForDetail.date}</span>
                  <span>•</span>
                  <span>{selectedWebinarForDetail.time} {selectedWebinarForDetail.timeZone || 'EST'}</span>
                  <span>•</span>
                  <span>{selectedWebinarForDetail.durationMinutes} Minutes</span>
                </div>
              </div>

              <button
                onClick={() => setSelectedWebinarForDetail(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6 overflow-y-auto flex-1 text-xs">
              {/* Overview & Description */}
              <div className="space-y-2">
                <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Symposium Clinical Scope & Objectives
                </h3>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedWebinarForDetail.description}
                </p>
              </div>

              {/* Speaker Profile */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-2">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
                  <span>Keynote Faculty & Session Chair</span>
                </h4>
                <div className="flex items-center gap-3 pt-1">
                  <img
                    src={selectedWebinarForDetail.speaker.avatar}
                    alt={selectedWebinarForDetail.speaker.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-teal-500/20"
                  />
                  <div>
                    <h5 className="font-bold text-slate-900 text-xs">
                      {selectedWebinarForDetail.speaker.name}
                    </h5>
                    <p className="text-[11px] text-slate-600">{selectedWebinarForDetail.speaker.role}</p>
                    <p className="text-[11px] text-slate-500">{selectedWebinarForDetail.speaker.institution}</p>
                  </div>
                </div>
              </div>

              {/* Detailed Agenda Timeline */}
              {selectedWebinarForDetail.agenda && selectedWebinarForDetail.agenda.length > 0 && (
                <div className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-[#0E9384]" />
                    <span>Symposium Agenda Timeline</span>
                  </h3>
                  <div className="space-y-2.5">
                    {selectedWebinarForDetail.agenda.map((item, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 bg-white border border-slate-200/90 rounded-xl space-y-1"
                      >
                        <div className="flex items-center justify-between text-[11px]">
                          <span className="font-bold text-[#0E9384] bg-teal-50 px-2 py-0.5 rounded-md">
                            {item.time}
                          </span>
                          {item.speaker && (
                            <span className="font-semibold text-slate-500">{item.speaker}</span>
                          )}
                        </div>
                        <h4 className="font-bold text-slate-900 text-xs pt-1">{item.title}</h4>
                        {item.description && (
                          <p className="text-slate-600 text-[11px] leading-relaxed">
                            {item.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={() => handleAddToCalendar(selectedWebinarForDetail)}
                className="px-4 py-2 bg-white border border-slate-300 text-slate-700 rounded-xl text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer flex items-center gap-1.5"
              >
                <CalendarPlus className="w-3.5 h-3.5" />
                <span>Add to Calendar (.ics)</span>
              </button>

              <div className="flex items-center gap-2">
                {selectedWebinarForDetail.status === 'live' ? (
                  <button
                    onClick={() => {
                      const w = selectedWebinarForDetail;
                      setSelectedWebinarForDetail(null);
                      onOpenLiveRoom(w);
                    }}
                    className="px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                  >
                    <Radio className="w-3.5 h-3.5" />
                    <span>Enter Live Room</span>
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      onRegisterToggle(selectedWebinarForDetail.id);
                      setSelectedWebinarForDetail((prev) =>
                        prev ? { ...prev, registered: !prev.registered } : null
                      );
                    }}
                    className={`px-5 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs ${
                      selectedWebinarForDetail.registered
                        ? 'bg-teal-50 text-[#0E9384] border border-teal-200'
                        : 'bg-[#0E9384] hover:bg-[#0b7a6d] text-white'
                    }`}
                  >
                    {selectedWebinarForDetail.registered ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#0E9384]" />
                        <span>Registered (Confirmed)</span>
                      </>
                    ) : (
                      <>
                        <CalendarPlus className="w-3.5 h-3.5" />
                        <span>Confirm Free Registration</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Live Stream Room Modal */}
      {activeLiveWebinar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/80 backdrop-blur-md">
          <div className="bg-[#0A192F] text-white w-full max-w-6xl h-[92vh] rounded-2xl border border-white/10 shadow-2xl overflow-hidden flex flex-col">
            {/* Top Bar */}
            <div className="px-6 py-3.5 bg-slate-900/90 border-b border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="px-2.5 py-1 text-xs font-extrabold bg-rose-600 text-white rounded-md flex items-center gap-1.5 animate-pulse">
                  <Radio className="w-3.5 h-3.5" />
                  LIVE BROADCAST
                </span>
                <h3 className="text-sm sm:text-base font-bold text-white line-clamp-1">
                  {activeLiveWebinar.title}
                </h3>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-xs text-teal-300 font-semibold flex items-center gap-1">
                  <Users className="w-3.5 h-3.5" />
                  1,482 Live Attendees
                </span>
                <button
                  onClick={onCloseLiveRoom}
                  className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Broadcast Layout: Video on Left, Chat & Polls on Right */}
            <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 overflow-hidden">
              {/* Left Column: Video Player & Session Details */}
              <div className="lg:col-span-2 flex flex-col bg-black overflow-y-auto">
                {/* Simulated High-Res Video Feed */}
                <div className="relative aspect-video bg-slate-950 flex items-center justify-center border-b border-white/10">
                  <img
                    src={activeLiveWebinar.thumbnail}
                    alt={activeLiveWebinar.title}
                    className="w-full h-full object-cover opacity-60"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />

                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-black/60 backdrop-blur-xs text-teal-300 text-[11px] font-bold rounded-md border border-teal-500/30">
                      1080p 60fps • Ultra Low Latency
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img
                        src={activeLiveWebinar.speaker.avatar}
                        alt={activeLiveWebinar.speaker.name}
                        className="w-9 h-9 rounded-full border border-teal-400"
                      />
                      <div>
                        <p className="font-bold text-white">{activeLiveWebinar.speaker.name}</p>
                        <p className="text-[11px] text-teal-200/80">{activeLiveWebinar.speaker.role}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => showToast('CME Attendance verification code registered for this session.')}
                      className="px-3.5 py-1.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-lg font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
                    >
                      <Award className="w-3.5 h-3.5" />
                      <span>Verify Attendance ({activeLiveWebinar.credits} CME)</span>
                    </button>
                  </div>
                </div>

                {/* Session Highlights below video */}
                <div className="p-5 space-y-3 bg-[#0A192F]/90 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 bg-teal-500/20 text-teal-300 rounded-md font-bold">
                      {activeLiveWebinar.specialty}
                    </span>
                    <span className="text-teal-100/60">•</span>
                    <span className="text-teal-100/80">ACCME Accredited Grand Rounds</span>
                  </div>
                  <p className="text-teal-100/90 leading-relaxed">
                    {activeLiveWebinar.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Interactive Chat & Real-Time Audience Poll */}
              <div className="flex flex-col bg-[#0D213F] border-l border-white/10 h-full overflow-hidden text-xs">
                {/* Live Poll Section */}
                <div className="p-4 bg-slate-900/80 border-b border-white/10 space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-teal-300 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
                      <Vote className="w-3.5 h-3.5 text-teal-400" />
                      Live Audience Clinical Poll
                    </span>
                    <span className="text-[10px] text-teal-100/60">{totalPollVotes} votes</span>
                  </div>
                  <p className="text-xs font-semibold text-white">
                    Which next-step intervention would you recommend for this patient with refractory stage 2 HTN?
                  </p>
                  <div className="space-y-1.5 pt-1">
                    {pollOptions.map((opt, idx) => {
                      const percent = totalPollVotes > 0 ? Math.round((opt.votes / totalPollVotes) * 100) : 0;
                      const hasVotedThis = pollVoted === idx;

                      return (
                        <button
                          key={idx}
                          disabled={pollVoted !== null}
                          onClick={() => handleVotePoll(idx)}
                          className={`w-full text-left p-2 rounded-lg text-xs transition-all relative overflow-hidden border ${
                            hasVotedThis
                              ? 'border-teal-400 bg-teal-900/40 text-white font-bold'
                              : 'border-white/10 bg-white/5 hover:bg-white/10 text-slate-200'
                          }`}
                        >
                          <div
                            className="absolute top-0 bottom-0 left-0 bg-teal-500/20"
                            style={{ width: `${percent}%` }}
                          />
                          <div className="relative flex items-center justify-between gap-2">
                            <span className="line-clamp-1">{opt.label}</span>
                            <span className="font-bold text-teal-300 text-[11px] shrink-0">
                              {percent}%
                            </span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Live Chat Message Stream */}
                <div className="flex-1 p-4 overflow-y-auto space-y-3">
                  <div className="text-[10px] text-center text-teal-100/50 uppercase tracking-wider py-1 border-b border-white/5">
                    Live Clinician Discussion Stream
                  </div>
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="space-y-0.5 text-xs">
                      <div className="flex items-center justify-between text-[11px]">
                        <span className="font-bold text-teal-300">{msg.author}</span>
                        <span className="text-teal-100/40 text-[10px]">{msg.time}</span>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{msg.text}</p>
                    </div>
                  ))}
                </div>

                {/* Send Chat Box */}
                <form onSubmit={handleSendChat} className="p-3 bg-slate-900 border-t border-white/10 flex gap-2">
                  <input
                    type="text"
                    value={inputChat}
                    onChange={(e) => setInputChat(e.target.value)}
                    placeholder="Ask keynote faculty or share observation..."
                    className="flex-1 px-3 py-2 text-xs bg-white/10 border border-white/20 rounded-xl text-white placeholder-teal-100/40 focus:outline-hidden focus:ring-1 focus:ring-teal-400"
                  />
                  <button
                    type="submit"
                    disabled={!inputChat.trim()}
                    className="px-3 py-2 bg-[#0E9384] disabled:bg-white/10 text-white rounded-xl font-bold cursor-pointer transition-colors flex items-center gap-1"
                  >
                    <Send className="w-3 h-3" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
