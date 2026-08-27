import React, { useState, useMemo } from 'react';
import {
  Search,
  X,
  BookOpen,
  Users,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Clock,
  Award,
  Filter,
  ArrowRight,
  Sparkles,
  ChevronRight,
  Star,
  Layers
} from 'lucide-react';
import { Course, Faculty, WebinarEvent, CommunityCase, ClinicalGuidelineAlert, Specialty } from '../types';

interface GlobalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
  webinars: WebinarEvent[];
  communityCases: CommunityCase[];
  guidelines: ClinicalGuidelineAlert[];
  onSelectCourse: (course: Course) => void;
  onSelectWebinar: (webinar: WebinarEvent) => void;
  onSelectCommunityCase: (cCase: CommunityCase) => void;
  onSelectGuideline: (guide: ClinicalGuidelineAlert) => void;
}

export const GlobalSearchModal: React.FC<GlobalSearchModalProps> = ({
  isOpen,
  onClose,
  courses,
  webinars,
  communityCases,
  guidelines,
  onSelectCourse,
  onSelectWebinar,
  onSelectCommunityCase,
  onSelectGuideline,
}) => {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<'all' | 'courses' | 'experts' | 'events' | 'cases' | 'guidelines'>('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [selectedDuration, setSelectedDuration] = useState<string>('All');
  const [selectedLevel, setSelectedLevel] = useState<string>('All');
  const [showFilters, setShowFilters] = useState(false);

  const normalizedQuery = query.toLowerCase().trim();

  // Extract all unique faculty from courses & webinars
  const allFaculty = useMemo(() => {
    const map = new Map<string, Faculty>();
    courses.forEach((c) => map.set(c.faculty.id, c.faculty));
    webinars.forEach((w) => map.set(w.speaker.id, w.speaker));
    return Array.from(map.values());
  }, [courses, webinars]);

  // Filtered courses
  const filteredCourses = useMemo(() => {
    return courses.filter((c) => {
      const matchQuery =
        !normalizedQuery ||
        c.title.toLowerCase().includes(normalizedQuery) ||
        c.subtitle.toLowerCase().includes(normalizedQuery) ||
        c.topics?.some((t: any) => t.toLowerCase().includes(normalizedQuery)) ||
        c.faculty.name.toLowerCase().includes(normalizedQuery);

      const matchSpecialty = selectedSpecialty === 'All' || c.specialty === selectedSpecialty;
      const matchLevel = selectedLevel === 'All' || c.difficulty === selectedLevel;

      let matchDuration = true;
      if (selectedDuration === '5-10m') matchDuration = c.durationMinutes <= 15;
      else if (selectedDuration === '15-30m') matchDuration = c.durationMinutes >= 15 && c.durationMinutes <= 30;
      else if (selectedDuration === '30m+') matchDuration = c.durationMinutes > 30;

      return matchQuery && matchSpecialty && matchLevel && matchDuration;
    });
  }, [courses, normalizedQuery, selectedSpecialty, selectedLevel, selectedDuration]);

  // Filtered experts
  const filteredFaculty = useMemo(() => {
    return allFaculty.filter((f) => {
      const matchQuery =
        !normalizedQuery ||
        f.name.toLowerCase().includes(normalizedQuery) ||
        f.title.toLowerCase().includes(normalizedQuery) ||
        f.institution.toLowerCase().includes(normalizedQuery);
      const matchSpecialty = selectedSpecialty === 'All' || f.specialty === selectedSpecialty;
      return matchQuery && matchSpecialty;
    });
  }, [allFaculty, normalizedQuery, selectedSpecialty]);

  // Filtered events
  const filteredWebinars = useMemo(() => {
    return webinars.filter((w) => {
      const matchQuery =
        !normalizedQuery ||
        w.title.toLowerCase().includes(normalizedQuery) ||
        w.description.toLowerCase().includes(normalizedQuery) ||
        w.speaker.name.toLowerCase().includes(normalizedQuery);
      const matchSpecialty = selectedSpecialty === 'All' || w.specialty === selectedSpecialty;
      return matchQuery && matchSpecialty;
    });
  }, [webinars, normalizedQuery, selectedSpecialty]);

  // Filtered community cases
  const filteredCases = useMemo(() => {
    return communityCases.filter((cs) => {
      const matchQuery =
        !normalizedQuery ||
        cs.title.toLowerCase().includes(normalizedQuery) ||
        cs.presentingSymptoms.toLowerCase().includes(normalizedQuery) ||
        cs.tags.some((t) => t.toLowerCase().includes(normalizedQuery));
      const matchSpecialty = selectedSpecialty === 'All' || cs.specialty === selectedSpecialty;
      return matchQuery && matchSpecialty;
    });
  }, [communityCases, normalizedQuery, selectedSpecialty]);

  // Filtered guidelines
  const filteredGuidelines = useMemo(() => {
    return guidelines.filter((g) => {
      const matchQuery =
        !normalizedQuery ||
        g.title.toLowerCase().includes(normalizedQuery) ||
        g.issuingBody.toLowerCase().includes(normalizedQuery) ||
        g.summary.toLowerCase().includes(normalizedQuery);
      const matchSpecialty = selectedSpecialty === 'All' || g.relatedSpecialty === selectedSpecialty;
      return matchQuery && matchSpecialty;
    });
  }, [guidelines, normalizedQuery, selectedSpecialty]);

  const totalResults =
    filteredCourses.length +
    filteredFaculty.length +
    filteredWebinars.length +
    filteredCases.length +
    filteredGuidelines.length;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 sm:p-6 pt-12 sm:pt-20 bg-[#0A192F]/80 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/20 w-full max-w-3xl overflow-hidden flex flex-col max-h-[85vh] text-[#1A2B3B]">
        {/* Search Bar Input */}
        <div className="p-4 bg-[#0A192F] text-white flex items-center gap-3 border-b border-white/10">
          <Search className="w-5 h-5 text-teal-400 shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search across courses, clinical guidelines, faculty, live events, cases..."
            className="w-full bg-transparent border-0 text-sm sm:text-base text-white placeholder-teal-100/50 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-teal-100/60 hover:text-white p-1 rounded-lg hover:bg-white/10"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-100/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Category Tabs & Filter Toggle */}
        <div className="px-4 py-2.5 bg-[#F4F9F9] border-b border-teal-500/10 flex items-center justify-between gap-2 overflow-x-auto text-xs">
          <div className="flex items-center gap-1.5">
            {[
              { id: 'all', label: `All (${totalResults})` },
              { id: 'courses', label: `Courses (${filteredCourses.length})` },
              { id: 'experts', label: `Experts (${filteredFaculty.length})` },
              { id: 'events', label: `Events (${filteredWebinars.length})` },
              { id: 'cases', label: `Cases (${filteredCases.length})` },
              { id: 'guidelines', label: `Guidelines (${filteredGuidelines.length})` },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveCategory(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === tab.id
                    ? 'bg-[#0E9384] text-white shadow-2xs'
                    : 'text-slate-600 hover:bg-teal-50 hover:text-[#0A192F]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-2.5 py-1.5 rounded-lg font-semibold flex items-center gap-1 cursor-pointer transition-colors shrink-0 ${
              showFilters || selectedSpecialty !== 'All' || selectedDuration !== 'All' || selectedLevel !== 'All'
                ? 'bg-teal-100 text-[#0E9384]'
                : 'text-slate-500 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>

        {/* Expanded Filters Drawer */}
        {showFilters && (
          <div className="p-4 bg-white border-b border-teal-500/10 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs animate-in slide-in-from-top-2">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Specialty</label>
              <select
                value={selectedSpecialty}
                onChange={(e) => setSelectedSpecialty(e.target.value)}
                className="w-full p-2 bg-[#F4F9F9] border border-teal-500/10 rounded-lg text-xs"
              >
                <option value="All">All Specialties</option>
                <option value="Cardiology">Cardiology</option>
                <option value="Oncology">Oncology</option>
                <option value="Neurology">Neurology</option>
                <option value="Critical Care">Critical Care</option>
                <option value="Clinical Pharmacology">Clinical Pharmacology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Emergency Medicine">Emergency Medicine</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Duration</label>
              <select
                value={selectedDuration}
                onChange={(e) => setSelectedDuration(e.target.value)}
                className="w-full p-2 bg-[#F4F9F9] border border-teal-500/10 rounded-lg text-xs"
              >
                <option value="All">Any Duration</option>
                <option value="5-10m">5–15 min (Micro-Capsule)</option>
                <option value="15-30m">15–30 min (Case Lab)</option>
                <option value="30m+">30+ min (Masterclass)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Difficulty Level</label>
              <select
                value={selectedLevel}
                onChange={(e) => setSelectedLevel(e.target.value)}
                className="w-full p-2 bg-[#F4F9F9] border border-teal-500/10 rounded-lg text-xs"
              >
                <option value="All">All Levels</option>
                <option value="Foundational">Foundational</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced Clinical">Advanced Clinical</option>
                <option value="Fellowship Master">Fellowship Master</option>
              </select>
            </div>
          </div>
        )}

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {totalResults === 0 ? (
            <div className="text-center py-12 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-teal-50 text-[#0E9384] flex items-center justify-center mx-auto border border-teal-100">
                <Search className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-sm text-[#0A192F]">No matching medical resources found</h4>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Try broadening your search term or clearing specialty filters.
              </p>
            </div>
          ) : (
            <>
              {/* Courses Results */}
              {(activeCategory === 'all' || activeCategory === 'courses') && filteredCourses.length > 0 && (
                <div className="space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F]">
                    <BookOpen className="w-4 h-4 text-[#0E9384]" />
                    <span>CME Courses & Modules ({filteredCourses.length})</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredCourses.slice(0, 5).map((course) => (
                      <div
                        key={course.id}
                        onClick={() => {
                          onSelectCourse(course);
                          onClose();
                        }}
                        className="p-3 bg-[#F4F9F9] hover:bg-teal-50/70 border border-teal-500/10 hover:border-[#0E9384] rounded-xl flex items-center justify-between cursor-pointer transition-all group"
                      >
                        <div className="flex items-center gap-3">
                          <img
                            src={course.thumbnail}
                            alt={course.title}
                            referrerPolicy="no-referrer"
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div>
                            <div className="flex items-center gap-2 mb-0.5">
                              <span className="text-[10px] font-bold text-[#0E9384] bg-teal-500/10 px-1.5 py-0.5 rounded-sm">
                                {course.specialty}
                              </span>
                              <span className="text-[11px] text-slate-500 font-mono">
                                {course.credits} CME • {course.durationMinutes} min
                              </span>
                            </div>
                            <h4 className="font-bold text-xs sm:text-sm text-[#0A192F] group-hover:text-[#0E9384] transition-colors line-clamp-1">
                              {course.title}
                            </h4>
                            <p className="text-[11px] text-slate-500 line-clamp-1">
                              Faculty: {course.faculty.name} ({course.faculty.institution})
                            </p>
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-[#0E9384] transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Faculty Results */}
              {(activeCategory === 'all' || activeCategory === 'experts') && filteredFaculty.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F]">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span>Faculty & Medical Experts ({filteredFaculty.length})</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {filteredFaculty.map((fac) => (
                      <div
                        key={fac.id}
                        className="p-3 bg-[#F4F9F9] hover:bg-blue-50/50 border border-teal-500/10 rounded-xl flex items-center gap-3"
                      >
                        <img
                          src={fac.avatar}
                          alt={fac.name}
                          referrerPolicy="no-referrer"
                          className="w-10 h-10 rounded-full object-cover border border-teal-500/20"
                        />
                        <div className="overflow-hidden">
                          <h5 className="font-bold text-xs text-[#0A192F] truncate">{fac.name}</h5>
                          <p className="text-[11px] text-slate-500 truncate">{fac.title}</p>
                          <span className="text-[10px] text-blue-600 font-semibold">{fac.institution}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Guidelines Results */}
              {(activeCategory === 'all' || activeCategory === 'guidelines') && filteredGuidelines.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F]">
                    <AlertTriangle className="w-4 h-4 text-rose-500" />
                    <span>Clinical Practice Guidelines ({filteredGuidelines.length})</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredGuidelines.map((guide) => (
                      <div
                        key={guide.id}
                        onClick={() => {
                          onSelectGuideline(guide);
                          onClose();
                        }}
                        className="p-3 bg-rose-50/40 hover:bg-rose-50 border border-rose-200/60 rounded-xl flex items-center justify-between cursor-pointer transition-colors"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-rose-700 bg-rose-100 px-1.5 py-0.5 rounded-sm">
                              {guide.severity}
                            </span>
                            <span className="text-[11px] text-slate-500">{guide.issuingBody}</span>
                          </div>
                          <h5 className="font-bold text-xs text-[#0A192F]">{guide.title}</h5>
                          <p className="text-[11px] text-slate-600 line-clamp-1">{guide.summary}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Events & Webinars */}
              {(activeCategory === 'all' || activeCategory === 'events') && filteredWebinars.length > 0 && (
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-[#0A192F]">
                    <Calendar className="w-4 h-4 text-amber-500" />
                    <span>Live Grand Rounds & Webinars ({filteredWebinars.length})</span>
                  </div>

                  <div className="space-y-1.5">
                    {filteredWebinars.map((web) => (
                      <div
                        key={web.id}
                        onClick={() => {
                          onSelectWebinar(web);
                          onClose();
                        }}
                        className="p-3 bg-[#F4F9F9] hover:bg-amber-50/50 border border-teal-500/10 rounded-xl flex items-center justify-between cursor-pointer"
                      >
                        <div>
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-1.5 py-0.5 rounded-sm">
                              {web.status}
                            </span>
                            <span className="text-[11px] text-slate-500 font-mono">{web.date} • {web.timeString}</span>
                          </div>
                          <h5 className="font-bold text-xs text-[#0A192F]">{web.title}</h5>
                          <p className="text-[11px] text-slate-500">Speaker: {web.speaker.name}</p>
                        </div>
                        <span className="text-xs font-bold text-[#0E9384]">{web.credits} CME</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer info */}
        <div className="p-3 bg-[#F4F9F9] border-t border-teal-500/10 flex items-center justify-between text-[11px] text-slate-500">
          <span>Tip: Press ESC to close search</span>
          <span className="font-semibold text-[#0E9384]">All results ACCME verified</span>
        </div>
      </div>
    </div>
  );
};
