import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Award,
  Clock,
  Star,
  Users,
  Bookmark,
  Sparkles,
  ChevronRight,
  SlidersHorizontal,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  Stethoscope,
  X,
  TrendingUp,
  Flame,
  Zap,
  LayoutGrid,
  List,
  Compass,
  ArrowRight,
  ShieldCheck,
  Brain,
  Dna,
  HeartPulse,
  Pill,
  Baby,
  Activity,
  Layers
} from 'lucide-react';
import { Course, Specialty, CourseFormat, AccreditationType, UserProgress } from '../types';
import { ALL_SPECIALTIES_DATA, DEMO_LEARNING_JOURNEY_PATH } from '../data/coursesData';

interface CourseCatalogViewProps {
  courses: Course[];
  userProgress: Record<string, UserProgress>;
  bookmarks: string[];
  onSelectCourse: (course: Course) => void;
  onToggleBookmark: (courseId: string) => void;
  onOpenAiConsult: (specialty?: Specialty) => void;
}

export const CourseCatalogView: React.FC<CourseCatalogViewProps> = ({
  courses,
  userProgress,
  bookmarks,
  onSelectCourse,
  onToggleBookmark,
  onOpenAiConsult,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedFormat, setSelectedFormat] = useState<string>('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('All');
  const [selectedAccreditation, setSelectedAccreditation] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'rating' | 'credits' | 'duration' | 'popular'>('featured');
  const [viewLayout, setViewLayout] = useState<'shelves' | 'grid' | 'list'>('shelves');
  const [activeCatalogTab, setActiveCatalogTab] = useState<'all' | 'specialties' | 'track'>('all');
  const [selectedSpecialtyDetail, setSelectedSpecialtyDetail] = useState<string | null>(null);

  // Specialties data lookup
  const specialtiesList = ALL_SPECIALTIES_DATA;

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses
      .filter((c) => {
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchesTitle = c.title.toLowerCase().includes(q);
          const matchesSub = c.subtitle.toLowerCase().includes(q);
          const matchesFac = c.faculty?.name?.toLowerCase().includes(q);
          const matchesTags = c.tags?.some((t) => t.toLowerCase().includes(q));
          const matchesSpecialty = c.specialty.toLowerCase().includes(q);
          if (!matchesTitle && !matchesSub && !matchesFac && !matchesTags && !matchesSpecialty) {
            return false;
          }
        }

        // Specialty filter
        if (selectedSpecialty !== 'All' && c.specialty !== selectedSpecialty) {
          return false;
        }

        // Format filter
        if (selectedFormat !== 'All' && c.format !== selectedFormat) {
          return false;
        }

        // Difficulty filter
        if (selectedDifficulty !== 'All' && c.difficulty !== selectedDifficulty) {
          return false;
        }

        // Accreditation filter
        if (selectedAccreditation !== 'All' && !c.accreditationType.includes(selectedAccreditation)) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'featured') {
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        }
        if (sortBy === 'rating') {
          return b.rating - a.rating;
        }
        if (sortBy === 'credits') {
          return b.credits - a.credits;
        }
        if (sortBy === 'duration') {
          return a.durationMinutes - b.durationMinutes;
        }
        if (sortBy === 'popular') {
          return b.enrolledCount - a.enrolledCount;
        }
        return 0;
      });
  }, [courses, searchQuery, selectedSpecialty, selectedFormat, selectedDifficulty, selectedAccreditation, sortBy]);

  // Section categories for shelves view
  const recommendedCourses = useMemo(() => {
    return courses.filter((c) => c.specialty === 'Cardiology' || c.specialty === 'Critical Care' || c.featured);
  }, [courses]);

  const trendingCourses = useMemo(() => {
    return courses.filter((c) => c.trending || c.rating >= 4.95);
  }, [courses]);

  const newlyAddedCourses = useMemo(() => {
    return courses.filter((c) => c.difficulty === 'Advanced' || c.id.includes('105') || c.id.includes('303'));
  }, [courses]);

  const popularSpecialtyCourses = useMemo(() => {
    return courses.filter((c) => c.enrolledCount > 3500);
  }, [courses]);

  const quickTenMinuteCourses = useMemo(() => {
    return courses.filter((c) => c.durationMinutes <= 30 || c.format === 'Micro-Capsule' || c.format === 'Rapid Case Simulation');
  }, [courses]);

  const clinicalSkillsCourses = useMemo(() => {
    return courses.filter((c) => c.format === 'Interactive Case Lab' || c.tags.some(t => ['POCUS', 'Hemodynamics', 'Thrombectomy', 'Echocardiography', 'VExUS', 'Pediatric Emergency Resuscitation'].includes(t)));
  }, [courses]);

  const leadershipCourses = useMemo(() => {
    return courses.filter((c) => c.specialty === 'Healthcare Leadership & Informatics' || c.tags.some(t => t.toLowerCase().includes('communication') || t.toLowerCase().includes('ai') || t.toLowerCase().includes('leadership')));
  }, [courses]);

  const activeFiltersCount =
    (selectedSpecialty !== 'All' ? 1 : 0) +
    (selectedFormat !== 'All' ? 1 : 0) +
    (selectedDifficulty !== 'All' ? 1 : 0) +
    (selectedAccreditation !== 'All' ? 1 : 0);

  const clearAllFilters = () => {
    setSelectedSpecialty('All');
    setSelectedFormat('All');
    setSelectedDifficulty('All');
    setSelectedAccreditation('All');
    setSearchQuery('');
  };

  const getSpecialtyIcon = (name: string) => {
    switch (name) {
      case 'Cardiology': return Activity;
      case 'Oncology': return Dna;
      case 'Neurology': return Brain;
      case 'Critical Care': return HeartPulse;
      case 'Clinical Pharmacology': return Pill;
      case 'Pediatrics': return Baby;
      default: return Stethoscope;
    }
  };

  const renderCourseCard = (course: Course) => {
    const isBookmarked = bookmarks.includes(course.id);
    const progress = userProgress[course.id];
    const hasProgress = progress && progress.percentCompleted > 0;

    return (
      <div
        key={course.id}
        onClick={() => onSelectCourse(course)}
        className="group bg-white rounded-2xl border border-teal-500/10 hover:border-teal-500/30 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between cursor-pointer"
      >
        <div>
          {/* Thumbnail */}
          <div className="relative h-44 w-full overflow-hidden bg-slate-100">
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent" />

            {/* Badges on Thumbnail */}
            <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
              <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-[#0A192F]/85 backdrop-blur-xs text-teal-300 border border-teal-500/30">
                {course.credits} CME {course.accreditationType.includes('AMA') ? 'AMA' : 'Credits'}
              </span>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-white/90 text-slate-800 backdrop-blur-xs">
                {course.difficulty}
              </span>
            </div>

            {/* Bookmark button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleBookmark(course.id);
              }}
              className={`absolute top-3 right-3 p-2 rounded-lg backdrop-blur-xs transition-colors cursor-pointer ${
                isBookmarked
                  ? 'bg-teal-600 text-white'
                  : 'bg-slate-900/60 text-white/80 hover:bg-slate-900 hover:text-white'
              }`}
              title={isBookmarked ? 'Remove Bookmark' : 'Bookmark Course'}
            >
              <Bookmark className={`w-3.5 h-3.5 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>

            {/* Specialty tag bottom */}
            <div className="absolute bottom-2.5 left-3 text-xs font-semibold text-white flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#0E9384]" />
              <span>{course.specialty}</span>
            </div>

            {/* Duration pill bottom right */}
            <div className="absolute bottom-2.5 right-3 text-[11px] text-slate-200 flex items-center gap-1 bg-black/40 px-2 py-0.5 rounded">
              <Clock className="w-3 h-3 text-teal-300" />
              <span>{course.durationMinutes}m</span>
            </div>
          </div>

          {/* Card Body */}
          <div className="p-4 space-y-2.5">
            <div className="flex items-center justify-between text-xs text-slate-500">
              <span className="font-semibold text-teal-700 bg-teal-50 px-2 py-0.5 rounded text-[11px]">
                {course.format}
              </span>
              <div className="flex items-center gap-1 text-amber-500 font-bold text-xs">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{course.rating.toFixed(2)}</span>
                <span className="text-slate-400 font-normal text-[11px]">({course.ratingsCount})</span>
              </div>
            </div>

            <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2 group-hover:text-[#0E9384] transition-colors">
              {course.title}
            </h3>

            <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
              {course.subtitle}
            </p>

            {/* Instructor snippet */}
            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={course.faculty.avatar}
                  alt={course.faculty.name}
                  className="w-6 h-6 rounded-full object-cover border border-teal-500/20"
                />
                <div className="text-left">
                  <p className="text-[11px] font-semibold text-slate-800 leading-tight">
                    {course.faculty.name}
                  </p>
                  <p className="text-[10px] text-slate-400 truncate max-w-[140px]">
                    {course.faculty.institution}
                  </p>
                </div>
              </div>

              <div className="text-right text-[10px] text-slate-400 flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" />
                <span>{course.enrolledCount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Footer with Progress or Action */}
        <div className="p-3 bg-slate-50 border-t border-slate-100">
          {hasProgress ? (
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-[11px]">
                <span className="font-semibold text-teal-800">
                  {progress.percentCompleted === 100 ? 'Completed' : 'In Progress'}
                </span>
                <span className="font-bold text-teal-700">{progress.percentCompleted}%</span>
              </div>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden">
                <div
                  className="bg-[#0E9384] h-full rounded-full transition-all"
                  style={{ width: `${progress.percentCompleted}%` }}
                />
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-between text-xs text-slate-600 group-hover:text-[#0E9384] font-semibold">
              <span className="text-[11px]">Explore Curriculum & CME</span>
              <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </div>
          )}
        </div>
      </div>
    );
  };

  const renderHorizontalShelf = (title: string, subtitle: string, items: Course[], badge?: string, icon?: React.ReactNode) => {
    if (items.length === 0) return null;

    return (
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              {icon}
              {badge && (
                <span className="px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-teal-50 text-teal-800 border border-teal-200 rounded-md">
                  {badge}
                </span>
              )}
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              {title}
            </h2>
            <p className="text-xs text-slate-500">{subtitle}</p>
          </div>

          <button
            onClick={() => setViewLayout('grid')}
            className="text-xs font-semibold text-[#0E9384] hover:text-[#0b7a6d] flex items-center gap-1 cursor-pointer transition-colors"
          >
            <span>View All ({items.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {items.slice(0, 4).map((c) => renderCourseCard(c))}
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-[#0A192F] via-[#10243E] to-[#162C4E] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-white/10">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 border border-teal-500/30 text-xs font-bold">
                <ShieldCheck className="w-3.5 h-3.5" />
                ACCME Accredited Provider #00094821
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
                CME Course Catalog & Clinical Library
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/80 leading-relaxed">
                Evidence-based masterclasses, interactive bedside case labs, and rapid clinical micro-capsules taught by world-class academic clinicians.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => onOpenAiConsult()}
                className="px-4 py-2.5 bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Ask Medvora AI Assistant</span>
              </button>
            </div>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-white/10">
            <button
              onClick={() => setActiveCatalogTab('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                activeCatalogTab === 'all'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Compass className="w-3.5 h-3.5 text-teal-600" />
              <span>Explore Library</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('specialties')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                activeCatalogTab === 'specialties'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Stethoscope className="w-3.5 h-3.5 text-teal-600" />
              <span>Specialty Browser (12+)</span>
            </button>

            <button
              onClick={() => setActiveCatalogTab('track')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-2 ${
                activeCatalogTab === 'track'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-teal-600" />
              <span>Fellowship Learning Path</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ========================================================================= */}
        {/* TAB 1: ALL COURSES & MARKETPLACE */}
        {/* ========================================================================= */}
        {activeCatalogTab === 'all' && (
          <>
            {/* Search & Filter Bar */}
            <div className="bg-white p-4 sm:p-5 rounded-2xl border border-teal-500/10 shadow-xs space-y-4">
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by topic, clinical condition, drug class, faculty, trial, or specialty..."
                    className="w-full pl-10 pr-10 py-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-1 cursor-pointer"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* View Switcher & Sort */}
                <div className="flex items-center gap-2">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="px-3 py-2 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-xs font-semibold text-slate-700 focus:outline-hidden cursor-pointer"
                  >
                    <option value="featured">Sort: Featured & Guideline Priority</option>
                    <option value="rating">Sort: Highest Rated</option>
                    <option value="popular">Sort: Most Enrolled</option>
                    <option value="credits">Sort: Most CME Credits</option>
                    <option value="duration">Sort: Shortest Duration</option>
                  </select>

                  <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                    <button
                      onClick={() => setViewLayout('shelves')}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        viewLayout === 'shelves' ? 'bg-white text-[#0E9384] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Curated Shelves View"
                    >
                      <Layers className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewLayout('grid')}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        viewLayout === 'grid' ? 'bg-white text-[#0E9384] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="Full Grid View"
                    >
                      <LayoutGrid className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setViewLayout('list')}
                      className={`p-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                        viewLayout === 'list' ? 'bg-white text-[#0E9384] shadow-xs' : 'text-slate-500 hover:text-slate-800'
                      }`}
                      title="List View"
                    >
                      <List className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Specialty & Filter Pills */}
              <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100">
                <span className="text-xs font-bold text-slate-500 mr-1 flex items-center gap-1">
                  <Filter className="w-3.5 h-3.5" />
                  Specialty:
                </span>

                {['All', 'Cardiology', 'Oncology', 'Neurology', 'Critical Care', 'Clinical Pharmacology', 'Pediatrics', 'Emergency Medicine', 'Nephrology', 'Surgery & Anesthesia', 'Endocrinology'].map((spec) => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialty(spec)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      selectedSpecialty === spec
                        ? 'bg-[#0E9384] text-white shadow-xs'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {spec}
                  </button>
                ))}

                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearAllFilters}
                    className="ml-auto text-xs text-rose-600 hover:underline font-semibold cursor-pointer"
                  >
                    Clear Filters ({activeFiltersCount})
                  </button>
                )}
              </div>
            </div>

            {/* If user is using search query or active filter, show direct grid of matching results */}
            {(searchQuery.trim() !== '' || selectedSpecialty !== 'All' || viewLayout === 'grid') ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    {searchQuery ? `Search Results for "${searchQuery}"` : selectedSpecialty !== 'All' ? `${selectedSpecialty} Courses` : 'All Accredited Courses'} ({filteredCourses.length})
                  </h2>
                </div>

                {filteredCourses.length === 0 ? (
                  <div className="bg-white rounded-2xl p-12 text-center border border-teal-500/10 space-y-3">
                    <BookOpen className="w-10 h-10 text-slate-300 mx-auto" />
                    <h3 className="text-base font-bold text-slate-700">No courses match your filter</h3>
                    <p className="text-xs text-slate-400 max-w-sm mx-auto">
                      Try adjusting your search keywords, clear active specialty filters, or ask Medvora AI for related topics.
                    </p>
                    <button
                      onClick={clearAllFilters}
                      className="px-4 py-2 bg-[#0E9384] text-white text-xs font-semibold rounded-xl hover:bg-[#0b7a6d] cursor-pointer"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                    {filteredCourses.map((c) => renderCourseCard(c))}
                  </div>
                )}
              </div>
            ) : viewLayout === 'list' ? (
              <div className="bg-white rounded-2xl border border-teal-500/10 shadow-xs divide-y divide-slate-100 overflow-hidden">
                {filteredCourses.map((course) => {
                  const isBookmarked = bookmarks.includes(course.id);
                  return (
                    <div
                      key={course.id}
                      onClick={() => onSelectCourse(course)}
                      className="p-4 sm:p-5 hover:bg-teal-50/20 transition-colors cursor-pointer flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 group"
                    >
                      <div className="flex items-start gap-4">
                        <img
                          src={course.thumbnail}
                          alt={course.title}
                          className="w-20 h-20 rounded-xl object-cover shrink-0 border border-slate-100"
                        />
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                              {course.specialty}
                            </span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{course.credits} CME Credits ({course.accreditationType})</span>
                            <span className="text-xs text-slate-400">•</span>
                            <span className="text-xs text-slate-500">{course.durationMinutes} mins</span>
                          </div>
                          <h3 className="font-bold text-slate-900 text-sm group-hover:text-[#0E9384] transition-colors">
                            {course.title}
                          </h3>
                          <p className="text-xs text-slate-500 line-clamp-1">{course.subtitle}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500 pt-1">
                            <span>Faculty: <strong>{course.faculty.name}</strong> ({course.faculty.institution})</span>
                            <span>•</span>
                            <span className="text-amber-500 font-bold flex items-center gap-0.5">
                              <Star className="w-3 h-3 fill-amber-400" /> {course.rating.toFixed(2)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleBookmark(course.id);
                          }}
                          className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                            isBookmarked
                              ? 'bg-teal-50 border-teal-300 text-teal-700'
                              : 'bg-white border-slate-200 text-slate-400 hover:text-slate-600'
                          }`}
                        >
                          <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-teal-600' : ''}`} />
                        </button>
                        <button
                          onClick={() => onSelectCourse(course)}
                          className="px-4 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs"
                        >
                          Start Module
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              /* Curated Shelves View (All 7 required Sections) */
              <div className="space-y-12">
                {/* 1. Recommended For You */}
                {renderHorizontalShelf(
                  'Recommended For You',
                  'Personalized based on your clinical profile in Cardiology, Critical Care, and recent practice updates',
                  recommendedCourses,
                  'Tailored for You',
                  <Sparkles className="w-5 h-5 text-teal-600" />
                )}

                {/* 2. Trending This Week */}
                {renderHorizontalShelf(
                  'Trending This Week',
                  'Most completed masterclasses and case drills among licensed clinicians this week',
                  trendingCourses,
                  'High Engagement',
                  <TrendingUp className="w-5 h-5 text-indigo-600" />
                )}

                {/* 3. Quick 10-Minute Learning */}
                {renderHorizontalShelf(
                  'Quick 10-Minute Learning',
                  'High-yield clinical micro-capsules and rapid case drills designed for on-the-go rounds',
                  quickTenMinuteCourses,
                  'Micro-Capsules',
                  <Zap className="w-5 h-5 text-amber-500" />
                )}

                {/* 4. Clinical Skills & Diagnostic Mastery */}
                {renderHorizontalShelf(
                  'Clinical Skills & Diagnostic Mastery',
                  'Point-of-care ultrasound (POCUS), hemodynamic phenotyping, and acute catheter interventions',
                  clinicalSkillsCourses,
                  'Procedural & POCUS',
                  <HeartPulse className="w-5 h-5 text-rose-500" />
                )}

                {/* 5. Popular in Your Specialty */}
                {renderHorizontalShelf(
                  'Popular in Your Specialty',
                  'Top-rated clinical modules with highest peer discussions and CME verification rates',
                  popularSpecialtyCourses,
                  'Top Specialty Pick',
                  <Star className="w-5 h-5 text-amber-500" />
                )}

                {/* 6. Newly Added Clinical Guidelines */}
                {renderHorizontalShelf(
                  'Newly Added Clinical Guidelines',
                  'Recent 2025/2026 practice updates, drug safety advisories, and dual-incretin therapeutics',
                  newlyAddedCourses,
                  'Fresh 2025/2026 Updates',
                  <Flame className="w-5 h-5 text-orange-500" />
                )}

                {/* 7. Leadership & Professional Development */}
                {renderHorizontalShelf(
                  'Leadership & Professional Development',
                  'Clinical communication, digital health, AI tools in medical workflows, and health equity',
                  leadershipCourses,
                  'Professional Core',
                  <GraduationCap className="w-5 h-5 text-cyan-600" />
                )}
              </div>
            )}
          </>
        )}

        {/* ========================================================================= */}
        {/* TAB 2: SPECIALTY BROWSER (12+ Specialties) */}
        {/* ========================================================================= */}
        {activeCatalogTab === 'specialties' && (
          <div className="space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Medical Specialty Browser
                </h2>
                <p className="text-xs text-slate-500">
                  Select a clinical specialty to access tailored accredited modules, clinical practice guidelines, and leading faculty.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {specialtiesList.map((spec) => {
                const IconComponent = getSpecialtyIcon(spec.specialty);
                const isSelected = selectedSpecialtyDetail === spec.specialty;

                return (
                  <div
                    key={spec.specialty}
                    onClick={() => {
                      setSelectedSpecialty(spec.specialty);
                      setActiveCatalogTab('all');
                    }}
                    className="bg-white rounded-2xl border border-teal-500/10 hover:border-teal-500/30 p-6 shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-700 flex items-center justify-center group-hover:scale-105 transition-transform border border-teal-100">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <span className="text-[11px] font-bold text-teal-800 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-200">
                          {spec.courseCount} Courses
                        </span>
                      </div>

                      <div>
                        <h3 className="text-base font-bold text-slate-900 group-hover:text-[#0E9384] transition-colors">
                          {spec.specialty}
                        </h3>
                        <p className="text-xs text-slate-500 line-clamp-2 mt-1 leading-relaxed">
                          {spec.shortDescription}
                        </p>
                      </div>

                      {/* Top tags */}
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {spec.popularTopics.slice(0, 3).map((topic) => (
                          <span
                            key={topic}
                            className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-md font-medium"
                          >
                            {topic}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#0E9384]">
                      <span>{spec.courseCount * 1.5} Total CME Hours</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* TAB 3: FELLOWSHIP LEARNING PATH */}
        {/* ========================================================================= */}
        {activeCatalogTab === 'track' && (
          <div className="space-y-8">
            {/* Track Header Card */}
            <div className="bg-white rounded-3xl border border-teal-500/15 p-6 sm:p-8 shadow-sm space-y-6">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2 max-w-2xl">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200">
                      Curated Master Track
                    </span>
                    <span className="text-xs text-slate-500">6 Weeks • {DEMO_LEARNING_JOURNEY_PATH.totalCmeCredits} AMA PRA Category 1 Credits™</span>
                  </div>
                  <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                    {DEMO_LEARNING_JOURNEY_PATH.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {DEMO_LEARNING_JOURNEY_PATH.subtitle}
                  </p>
                </div>

                <div className="p-4 bg-[#0A192F] text-white rounded-2xl flex flex-col justify-center items-center text-center space-y-2 min-w-[200px]">
                  <Award className="w-8 h-8 text-teal-300" />
                  <span className="text-xs font-bold">Earn Master Fellow Certificate</span>
                  <span className="text-[10px] text-teal-200/80">ACCME & Board Verified</span>
                </div>
              </div>

              {/* Progress Stepper */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Weekly Curriculum & Milestone Modules
                </h3>

                <div className="space-y-4">
                  {DEMO_LEARNING_JOURNEY_PATH.milestones.map((m, index) => {
                    const matchedCourse = courses.find((c) => m.courseIds.includes(c.id)) || courses[0];

                    return (
                      <div
                        key={m.id}
                        className={`p-4 sm:p-5 rounded-2xl border transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 ${
                          m.completed
                            ? 'bg-emerald-50/50 border-emerald-200'
                            : index === 2
                            ? 'bg-teal-50/50 border-teal-300 ring-2 ring-teal-500/20'
                            : 'bg-slate-50/50 border-slate-200 opacity-80'
                        }`}
                      >
                        <div className="flex items-start gap-4">
                          <div
                            className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-bold text-xs ${
                              m.completed
                                ? 'bg-emerald-600 text-white'
                                : index === 2
                                ? 'bg-[#0E9384] text-white'
                                : 'bg-slate-200 text-slate-600'
                            }`}
                          >
                            {m.completed ? (
                              <CheckCircle2 className="w-5 h-5" />
                            ) : (
                              <span>W{m.weekNumber}</span>
                            )}
                          </div>

                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                                Week {m.weekNumber} • {m.estimatedHours}h
                              </span>
                              <span className="text-xs text-slate-300">•</span>
                              <span className="text-xs font-semibold text-teal-700">{m.phaseName}</span>
                            </div>
                            <h4 className="text-sm font-bold text-slate-900">{m.title}</h4>
                            <p className="text-xs text-slate-500">{m.description}</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-3 self-end md:self-center">
                          {matchedCourse && (
                            <button
                              onClick={() => onSelectCourse(matchedCourse)}
                              className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer shadow-xs ${
                                index === 2
                                  ? 'bg-[#0E9384] hover:bg-[#0b7a6d] text-white'
                                  : 'bg-white hover:bg-slate-100 text-slate-800 border border-slate-200'
                              }`}
                            >
                              {m.completed
                                ? 'Review Module'
                                : index === 2
                                ? 'Resume Milestone'
                                : 'Start Week ' + m.weekNumber}
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
