import React, { useState } from 'react';
import {
  Bookmark,
  FileText,
  Download,
  Trash2,
  Play,
  Award,
  Clock,
  ChevronRight,
  Search,
  BookOpen,
  CheckCircle2,
  Sparkles,
  TrendingUp,
  RotateCcw,
  ShieldCheck,
  Calendar,
  Layers,
  MessageSquare,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';
import {
  Course,
  UserProgress,
  Certificate,
  UserProfile,
  CommunityPost,
  WebinarEvent,
  ClinicalGuidelineAlert
} from '../types';

interface BookmarksViewProps {
  bookmarkedCourses: Course[];
  allCourses?: Course[];
  userProgress?: Record<string, UserProgress>;
  certificates?: Certificate[];
  communityPosts?: CommunityPost[];
  webinars?: WebinarEvent[];
  guidelineAlerts?: ClinicalGuidelineAlert[];
  user?: UserProfile;
  onSelectCourse: (course: Course) => void;
  onRemoveBookmark: (courseId: string) => void;
  onBrowseCourses: () => void;
  onOpenCertificate?: (cert: Certificate) => void;
  onSelectWebinar?: (webinar: WebinarEvent) => void;
  onSelectPost?: (postId: string) => void;
}

type SavedFilter = 'all' | 'courses' | 'discussions' | 'webinars' | 'guidelines';

export const BookmarksView: React.FC<BookmarksViewProps> = ({
  bookmarkedCourses,
  allCourses = [],
  userProgress = {},
  certificates = [],
  communityPosts = [],
  webinars = [],
  guidelineAlerts = [],
  user,
  onSelectCourse,
  onRemoveBookmark,
  onBrowseCourses,
  onOpenCertificate,
  onSelectWebinar,
  onSelectPost,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<SavedFilter>('all');

  const savedPosts = communityPosts.filter((p) => p.saved);
  const registeredWebinars = webinars.filter((w) => w.registered);

  const filteredCourses = bookmarkedCourses.filter(
    (c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredPosts = savedPosts.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredWebinars = registeredWebinars.filter(
    (w) =>
      w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      w.specialty.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalSavedCount = bookmarkedCourses.length + savedPosts.length + registeredWebinars.length;

  return (
    <div id="bookmarks-view" className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0A192F] via-[#10243E] to-[#162C4E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 text-xs font-bold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg flex items-center gap-1.5">
                  <Bookmark className="w-3.5 h-3.5 fill-teal-300" />
                  Saved Protocols & Educational Hub
                </span>
                <span className="text-xs text-teal-100/70">
                  {totalSavedCount} Total Saved Items
                </span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Bookmarks & Saved Knowledge
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/80 max-w-2xl leading-relaxed">
                Access your bookmarked clinical curricula, peer case insights, and registered live symposia in one centralized workspace.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={onBrowseCourses}
                className="px-4 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Explore Catalog</span>
              </button>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-md relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search saved courses, clinical trials, or discussions..."
              className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-teal-100/40 focus:outline-hidden focus:ring-2 focus:ring-teal-400"
            />
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Category Filters */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {[
            { id: 'all', label: `All Items (${totalSavedCount})`, icon: Layers },
            { id: 'courses', label: `Saved Courses (${bookmarkedCourses.length})`, icon: BookOpen },
            { id: 'discussions', label: `Discussions & Insights (${savedPosts.length})`, icon: MessageSquare },
            { id: 'webinars', label: `Registered Grand Rounds (${registeredWebinars.length})`, icon: Calendar },
          ].map((cat) => {
            const Icon = cat.icon;
            const isActive = filterType === cat.id;

            return (
              <button
                key={cat.id}
                onClick={() => setFilterType(cat.id as SavedFilter)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-2 border ${
                  isActive
                    ? 'bg-[#0E9384] text-white border-[#0E9384] shadow-xs'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-[#0E9384]'}`} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Saved Courses Section */}
        {(filterType === 'all' || filterType === 'courses') && (
          <div className="mb-10 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#0E9384]" />
                <span>Saved Accredited Courses ({filteredCourses.length})</span>
              </h3>
            </div>

            {filteredCourses.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                <BookOpen className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No bookmarked courses yet</p>
                <button
                  onClick={onBrowseCourses}
                  className="text-xs text-[#0E9384] font-bold hover:underline cursor-pointer"
                >
                  Browse Course Catalog →
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredCourses.map((course) => {
                  const prog = userProgress[course.id];

                  return (
                    <div
                      key={course.id}
                      className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
                    >
                      <div className="relative h-40 bg-slate-900 overflow-hidden">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-full h-full object-cover opacity-90"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-0.5 text-[10px] font-bold bg-[#0A192F]/90 text-teal-300 rounded-md border border-white/10">
                            {course.specialty}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3">
                          <button
                            onClick={() => onRemoveBookmark(course.id)}
                            className="p-1.5 bg-black/50 hover:bg-rose-900/80 text-white rounded-lg transition-colors cursor-pointer"
                            title="Remove Bookmark"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                        <div className="absolute bottom-3 left-3 right-3">
                          <span className="text-xs font-bold text-white line-clamp-1">
                            {course.title}
                          </span>
                        </div>
                      </div>

                      <div className="p-4 space-y-3">
                        <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>
                        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100">
                          <span>{course.faculty.name}</span>
                          <span className="font-bold text-[#0E9384]">{course.credits} CME Credits</span>
                        </div>
                      </div>

                      <div className="p-3 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="w-full py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5" />
                          <span>{prog && prog.percentCompleted > 0 ? 'Continue Learning' : 'Start Course'}</span>
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* Saved Discussions Section */}
        {(filterType === 'all' || filterType === 'discussions') && (
          <div className="mb-10 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-[#0E9384]" />
              <span>Saved Discussions & Clinical Pearls ({filteredPosts.length})</span>
            </h3>

            {filteredPosts.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                <MessageSquare className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No saved community posts</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredPosts.map((post) => (
                  <div
                    key={post.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-2.5 hover:border-teal-500/40 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 text-[10px] font-bold bg-teal-50 text-[#0E9384] rounded-md">
                          {post.category}
                        </span>
                        <span className="text-xs font-semibold text-slate-700">{post.specialty}</span>
                        <span className="text-xs text-slate-400">• {post.author.name}</span>
                      </div>
                      <span className="text-xs text-slate-400">{post.timestamp}</span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900">{post.title}</h4>
                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">{post.content}</p>

                    {post.citation && (
                      <p className="text-[11px] text-[#0E9384] italic">Reference: {post.citation}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Registered Webinars Section */}
        {(filterType === 'all' || filterType === 'webinars') && (
          <div className="mb-10 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Calendar className="w-4 h-4 text-[#0E9384]" />
              <span>Registered Grand Rounds & Symposia ({filteredWebinars.length})</span>
            </h3>

            {filteredWebinars.length === 0 ? (
              <div className="p-8 bg-white rounded-2xl border border-slate-200 text-center space-y-2">
                <Calendar className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-600">No registered events yet</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredWebinars.map((webinar) => (
                  <div
                    key={webinar.id}
                    className="p-5 bg-white rounded-2xl border border-slate-200 shadow-xs space-y-3 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs">
                        <span className="px-2 py-0.5 font-bold bg-teal-50 text-[#0E9384] rounded-md">
                          {webinar.category || 'Webinar'}
                        </span>
                        <span className="font-bold text-slate-700">{webinar.credits} CME</span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{webinar.title}</h4>
                      <p className="text-xs text-slate-500">{webinar.speaker.name} • {webinar.date}</p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Registered
                      </span>
                      {onSelectWebinar && (
                        <button
                          onClick={() => onSelectWebinar(webinar)}
                          className="text-xs font-bold text-[#0E9384] hover:underline cursor-pointer"
                        >
                          View Room →
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
