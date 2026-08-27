import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  RotateCcw,
  FastForward,
  Award,
  CheckCircle2,
  Clock,
  BookOpen,
  FileText,
  MessageSquare,
  HelpCircle,
  Sparkles,
  ChevronRight,
  Send,
  Plus,
  Trash2,
  Bookmark,
  Share2,
  Download,
  AlertCircle
} from 'lucide-react';
import { Course, VideoChapter } from '../types';

interface VideoLearningPlayerProps {
  course: Course;
  onOpenAssessment: () => void;
  onBookmarkToggle: () => void;
  isBookmarked: boolean;
  onBackToCatalog: () => void;
}

export const VideoLearningPlayer: React.FC<VideoLearningPlayerProps> = ({
  course,
  onOpenAssessment,
  onBookmarkToggle,
  isBookmarked,
  onBackToCatalog,
}) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(course.durationMinutes * 60);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'chapters' | 'transcript' | 'pearls' | 'notes' | 'qa'>('chapters');

  // Checkpoint popup state
  const [activeCheckpoint, setActiveCheckpoint] = useState<{
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  } | null>(null);
  const [checkpointAnswer, setCheckpointAnswer] = useState<number | null>(null);
  const [showCheckpointRationale, setShowCheckpointRationale] = useState(false);

  // Notes state
  const [notes, setNotes] = useState<{ id: string; timestamp: string; text: string }[]>([
    {
      id: 'n1',
      timestamp: '04:12',
      text: 'Remember to check baseline NT-proBNP; adiposity suppresses values significantly.',
    },
  ]);
  const [newNoteText, setNewNoteText] = useState('');

  // Q&A state
  const [questions, setQuestions] = useState([
    {
      id: 'q1',
      author: 'Dr. Michael Chang, MD',
      question: 'Is there a specific cutoff for eGFR before withholding Finerenone?',
      answer: 'Per FIDELIO-DKD, Finerenone can be initiated down to eGFR 25 mL/min as long as serum potassium is ≤ 4.8 mEq/L.',
      answeredBy: course.faculty.name,
      time: '1 day ago',
    },
  ]);
  const [newQuestionText, setNewQuestionText] = useState('');

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const curr = videoRef.current.currentTime;
    setCurrentTime(curr);

    // Update active chapter based on timestamp
    if (course.chapters && course.chapters.length > 0) {
      let currentIdx = 0;
      for (let i = course.chapters.length - 1; i >= 0; i--) {
        const parts = course.chapters[i].timestamp.split(':');
        const chapterSeconds = parseInt(parts[0]) * 60 + parseInt(parts[1]);
        if (curr >= chapterSeconds) {
          currentIdx = i;
          break;
        }
      }
      setActiveChapterIndex(currentIdx);
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    setCurrentTime(time);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  };

  const jumpToChapter = (index: number) => {
    if (!videoRef.current || !course.chapters[index]) return;
    const parts = course.chapters[index].timestamp.split(':');
    const secs = parseInt(parts[0]) * 60 + parseInt(parts[1]);
    videoRef.current.currentTime = secs;
    setCurrentTime(secs);
    setActiveChapterIndex(index);
    if (!isPlaying) {
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  const triggerCheckpoint = (chapter: VideoChapter) => {
    if (chapter.checkpointQuestion) {
      videoRef.current?.pause();
      setIsPlaying(false);
      setActiveCheckpoint(chapter.checkpointQuestion);
      setCheckpointAnswer(null);
      setShowCheckpointRationale(false);
    }
  };

  const handleSpeedChange = () => {
    const speeds = [1, 1.25, 1.5, 1.75, 2];
    const nextIdx = (speeds.indexOf(playbackRate) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackRate(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
  };

  const handleAddNote = () => {
    if (!newNoteText.trim()) return;
    setNotes((prev) => [
      ...prev,
      {
        id: `note-${Date.now()}`,
        timestamp: formatTime(currentTime),
        text: newNoteText.trim(),
      },
    ]);
    setNewNoteText('');
  };

  const handleAskQuestion = () => {
    if (!newQuestionText.trim()) return;
    setQuestions((prev) => [
      ...prev,
      {
        id: `q-${Date.now()}`,
        author: 'Dr. Sarah Chen, MD (You)',
        question: newQuestionText.trim(),
        answer: 'Thank you for your question. Dr. Jenkins and our faculty review board typically respond within 4–6 hours.',
        answeredBy: 'Faculty Review Queue',
        time: 'Just now',
      },
    ]);
    setNewQuestionText('');
  };

  return (
    <div className="min-h-screen bg-[#071324] text-slate-100 flex flex-col">
      {/* Top Learning Navigation Bar */}
      <div className="bg-[#0A192F] border-b border-white/10 px-4 sm:px-6 py-3 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={onBackToCatalog}
            className="text-xs font-semibold text-teal-100/70 hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
          >
            ← Back to Catalog
          </button>
          <div className="h-4 w-px bg-white/10" />
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 text-[11px] font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg">
              {course.credits} CME Credits
            </span>
            <span className="text-xs font-medium text-teal-100/70 hidden md:inline-block">
              {course.accreditationType}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onBookmarkToggle}
            className={`p-2 rounded-xl border text-xs flex items-center gap-1.5 transition-colors cursor-pointer ${
              isBookmarked
                ? 'bg-teal-500/20 border-teal-500/40 text-teal-300'
                : 'bg-[#0A192F] border-white/10 text-teal-100/70 hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4" />
            <span className="hidden sm:inline">{isBookmarked ? 'Bookmarked' : 'Save Protocol'}</span>
          </button>

          <button
            onClick={onOpenAssessment}
            className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
          >
            <Award className="w-4 h-4 text-teal-200" />
            <span>Complete CME Assessment</span>
          </button>
        </div>
      </div>

      {/* Main Player & Interactive Panels Container */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left: Video Stage */}
        <div className="flex-1 flex flex-col bg-black relative">
          <div className="relative flex-1 flex items-center justify-center min-h-[300px] sm:min-h-[440px] bg-[#071324]">
            <video
              ref={videoRef}
              src={course.fullVideoUrl}
              poster={course.bannerImage}
              onTimeUpdate={handleTimeUpdate}
              onLoadedMetadata={() => {
                if (videoRef.current) setDuration(videoRef.current.duration);
              }}
              className="w-full h-full max-h-[70vh] object-contain cursor-pointer"
              onClick={togglePlay}
            />

            {/* Checkpoint Modal Overlay if triggered */}
            {activeCheckpoint && (
              <div className="absolute inset-0 bg-[#0A192F]/90 backdrop-blur-md flex items-center justify-center p-6 z-30 animate-in fade-in">
                <div className="bg-[#0A192F] border border-teal-500/40 rounded-2xl p-6 max-w-lg w-full shadow-2xl text-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2.5 py-0.5 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Clinical Checkpoint Decision
                    </span>
                  </div>
                  <h4 className="text-sm font-semibold mb-4 text-white">
                    {activeCheckpoint.question}
                  </h4>

                  <div className="space-y-2 mb-4">
                    {activeCheckpoint.options.map((opt, i) => (
                      <button
                        key={i}
                        disabled={showCheckpointRationale}
                        onClick={() => {
                          setCheckpointAnswer(i);
                          setShowCheckpointRationale(true);
                        }}
                        className={`w-full text-left p-3 rounded-xl border text-xs transition-colors flex items-center gap-2.5 cursor-pointer ${
                          showCheckpointRationale
                            ? i === activeCheckpoint.correctIndex
                              ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200 font-semibold'
                              : checkpointAnswer === i
                              ? 'bg-rose-950/80 border-rose-500 text-rose-200'
                              : 'bg-white/5 border-white/10 text-slate-400'
                            : 'bg-white/5 border-white/10 hover:border-teal-500 text-slate-200'
                        }`}
                      >
                        <span className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold">
                          {String.fromCharCode(65 + i)}
                        </span>
                        <span>{opt}</span>
                      </button>
                    ))}
                  </div>

                  {showCheckpointRationale && (
                    <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 text-xs mb-4">
                      <p className="font-semibold text-teal-300 mb-1">Clinical Rationale:</p>
                      <p className="text-slate-300">{activeCheckpoint.explanation}</p>
                    </div>
                  )}

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => {
                        setActiveCheckpoint(null);
                        videoRef.current?.play();
                        setIsPlaying(true);
                      }}
                      className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Resume Clinical Lecture</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Custom Controls Bar */}
          <div className="bg-[#0A192F] px-4 py-3 border-t border-white/10 flex flex-col gap-2">
            {/* Scrubber */}
            <div className="flex items-center gap-3">
              <span className="text-[11px] font-mono text-teal-100/70 w-10">
                {formatTime(currentTime)}
              </span>
              <input
                type="range"
                min="0"
                max={duration || 100}
                value={currentTime}
                onChange={handleSeek}
                className="flex-1 h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-[#0E9384]"
              />
              <span className="text-[11px] font-mono text-slate-500 w-10 text-right">
                {formatTime(duration)}
              </span>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlay}
                  className="p-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl transition-colors cursor-pointer shadow-xs"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime -= 10;
                    }
                  }}
                  className="p-1.5 text-teal-100/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Rewind 10s"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    if (videoRef.current) {
                      videoRef.current.currentTime += 10;
                    }
                  }}
                  className="p-1.5 text-teal-100/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                  title="Forward 10s"
                >
                  <FastForward className="w-4 h-4" />
                </button>

                <button
                  onClick={() => {
                    setIsMuted(!isMuted);
                    if (videoRef.current) videoRef.current.muted = !isMuted;
                  }}
                  className="p-1.5 text-teal-100/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleSpeedChange}
                  className="px-2.5 py-1 bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white rounded-lg text-xs font-mono font-medium transition-colors cursor-pointer"
                >
                  {playbackRate}x
                </button>

                <button
                  onClick={() => {
                    if (!document.fullscreenElement) {
                      videoRef.current?.requestFullscreen?.();
                    } else {
                      document.exitFullscreen?.();
                    }
                  }}
                  className="p-1.5 text-teal-100/70 hover:text-white rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
                >
                  <Maximize className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Module Title & Faculty Header */}
          <div className="p-4 sm:p-5 bg-[#0A192F] border-t border-white/10">
            <h1 className="text-base sm:text-lg font-bold text-white mb-2 leading-snug">
              {course.title}
            </h1>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <img
                  src={course.faculty.avatar}
                  alt={course.faculty.name}
                  className="w-10 h-10 rounded-full object-cover border border-teal-500/40"
                />
                <div>
                  <div className="text-sm font-semibold text-slate-200">
                    {course.faculty.name}
                  </div>
                  <div className="text-xs text-teal-100/70">
                    {course.faculty.institution}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-lg border border-white/10">
                  Specialty: <strong className="text-teal-300">{course.specialty}</strong>
                </span>
                <span className="text-xs bg-white/5 text-slate-300 px-3 py-1 rounded-lg border border-white/10">
                  Level: <strong className="text-teal-300">{course.difficulty}</strong>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Interactive Tabs Sidebar */}
        <div className="w-full lg:w-96 bg-[#0A192F] border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col h-[500px] lg:h-auto overflow-hidden">
          {/* Tab Headers */}
          <div className="flex border-b border-white/10 bg-[#071324] overflow-x-auto no-scrollbar shrink-0">
            <button
              onClick={() => setActiveTab('chapters')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'chapters'
                  ? 'border-[#0E9384] text-teal-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Chapters ({course.chapters.length})
            </button>
            <button
              onClick={() => setActiveTab('pearls')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'pearls'
                  ? 'border-[#0E9384] text-teal-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Clinical Pearls
            </button>
            <button
              onClick={() => setActiveTab('notes')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'notes'
                  ? 'border-[#0E9384] text-teal-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              My Notes ({notes.length})
            </button>
            <button
              onClick={() => setActiveTab('qa')}
              className={`px-4 py-3 text-xs font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === 'qa'
                  ? 'border-[#0E9384] text-teal-300'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              Faculty Q&A
            </button>
          </div>

          {/* Tab Content Panes */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {/* Chapters Tab */}
            {activeTab === 'chapters' && (
              <div className="space-y-2.5">
                {course.chapters.map((ch, idx) => {
                  const isActive = activeChapterIndex === idx;
                  return (
                    <div
                      key={ch.id}
                      onClick={() => jumpToChapter(idx)}
                      className={`p-3.5 rounded-xl border text-xs cursor-pointer transition-all ${
                        isActive
                          ? 'bg-teal-950/60 border-teal-500 text-white shadow-xs'
                          : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20 hover:bg-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="font-mono text-[11px] text-teal-300 font-bold">
                          {ch.timestamp}
                        </span>
                        {ch.checkpointQuestion && (
                          <span
                            onClick={(e) => {
                              e.stopPropagation();
                              triggerCheckpoint(ch);
                            }}
                            className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-2 py-0.5 rounded-md flex items-center gap-1 hover:bg-indigo-500/30"
                          >
                            <Sparkles className="w-3 h-3" /> Checkpoint
                          </span>
                        )}
                      </div>
                      <h4 className="font-semibold text-sm mb-1 leading-snug">{ch.title}</h4>
                      <p className="text-[11px] text-teal-100/70 line-clamp-2">{ch.summary}</p>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Clinical Pearls Tab */}
            {activeTab === 'pearls' && (
              <div className="space-y-3">
                <div className="p-3 bg-teal-950/40 border border-teal-500/30 rounded-xl text-xs text-teal-200">
                  Key evidence-based takeaways curated by {course.faculty.name} for bedside application.
                </div>

                {course.clinicalPearls.map((pearl, i) => (
                  <div key={i} className="p-3.5 bg-white/5 border border-white/10 rounded-xl text-xs space-y-2">
                    <div className="flex items-center gap-1.5 text-teal-300 font-bold text-[11px]">
                      <Sparkles className="w-3.5 h-3.5" /> Pearl #{i + 1}
                    </div>
                    <p className="text-slate-200 leading-relaxed">{pearl}</p>
                  </div>
                ))}

                {course.downloadableProtocols.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-xs font-bold text-teal-100/70 uppercase tracking-wider mb-2">
                      Accompanying PDF Protocols
                    </h5>
                    {course.downloadableProtocols.map((proto, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-between text-xs mb-2"
                      >
                        <div>
                          <div className="font-semibold text-slate-200">{proto.title}</div>
                          <div className="text-[10px] text-teal-100/60">{proto.size} • {proto.type}</div>
                        </div>
                        <button className="p-2 bg-white/10 hover:bg-[#0E9384] text-white rounded-lg transition-colors cursor-pointer">
                          <Download className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <div className="flex items-center justify-between text-xs text-teal-100/70">
                    <span>Add Note at {formatTime(currentTime)}</span>
                    <Clock className="w-3.5 h-3.5 text-teal-300" />
                  </div>
                  <textarea
                    rows={2}
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                    placeholder="Type clinical reflection or dosing reminder..."
                    className="w-full bg-[#071324] border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-teal-500"
                  />
                  <button
                    onClick={handleAddNote}
                    disabled={!newNoteText.trim()}
                    className="w-full py-2 bg-[#0E9384] hover:bg-[#0b7a6d] disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save Timestamped Note</span>
                  </button>
                </div>

                <div className="space-y-2.5">
                  {notes.map((n) => (
                    <div key={n.id} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-mono text-[10px] text-teal-300 font-bold bg-teal-950/80 px-2 py-0.5 rounded-md border border-teal-800">
                          {n.timestamp}
                        </span>
                        <button
                          onClick={() => setNotes((prev) => prev.filter((item) => item.id !== n.id))}
                          className="text-slate-500 hover:text-rose-400 p-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <p className="text-slate-200 leading-relaxed">{n.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Q&A Tab */}
            {activeTab === 'qa' && (
              <div className="space-y-4">
                <div className="p-3 bg-white/5 border border-white/10 rounded-xl space-y-2">
                  <span className="text-xs text-slate-300 font-semibold block">
                    Ask Faculty / Peer Panel
                  </span>
                  <textarea
                    rows={2}
                    value={newQuestionText}
                    onChange={(e) => setNewQuestionText(e.target.value)}
                    placeholder="Submit a question regarding trial interpretation or dosing..."
                    className="w-full bg-[#071324] border border-white/10 rounded-lg p-2.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-hidden focus:border-teal-500"
                  />
                  <button
                    onClick={handleAskQuestion}
                    disabled={!newQuestionText.trim()}
                    className="w-full py-2 bg-[#0E9384] hover:bg-[#0b7a6d] disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Question</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {questions.map((q) => (
                    <div key={q.id} className="p-3 bg-white/5 border border-white/10 rounded-xl text-xs space-y-2">
                      <div className="flex items-center justify-between text-[11px] text-teal-100/70">
                        <span className="font-semibold text-slate-300">{q.author}</span>
                        <span>{q.time}</span>
                      </div>
                      <p className="text-slate-200 font-medium">{q.question}</p>
                      <div className="pl-3 border-l-2 border-[#0E9384] text-slate-300 text-[11px] space-y-1 bg-[#071324] p-2 rounded-r-lg">
                        <span className="font-bold text-teal-300 block">{q.answeredBy}</span>
                        <p>{q.answer}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action in sidebar */}
          <div className="p-4 bg-[#0A192F] border-t border-white/10 shrink-0">
            <button
              onClick={onOpenAssessment}
              className="w-full py-3 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors cursor-pointer"
            >
              <Award className="w-4 h-4 text-teal-200" />
              <span>Take CME Quiz & Claim {course.credits} Credits</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
