import React, { useState } from 'react';
import {
  MessageSquare,
  ThumbsUp,
  Award,
  ShieldCheck,
  Stethoscope,
  Sparkles,
  Search,
  Filter,
  Send,
  Plus,
  X,
  FileText,
  Bookmark,
  Share2,
  CheckCircle2,
  AlertCircle,
  UserPlus,
  UserCheck,
  Tag,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  BookOpen,
  Calendar,
  Layers,
  Heart
} from 'lucide-react';
import {
  CommunityPost,
  CommunityCategory,
  Specialty,
  UserProfile,
  CommunityComment
} from '../types';
import { SPECIALTY_CATEGORIES } from '../data/mockData';

interface CommunityForumViewProps {
  communityPosts?: CommunityPost[];
  posts?: CommunityPost[];
  user: UserProfile;
  facultyList?: any[];
  onAddPost: (newPost: CommunityPost) => void;
  onToggleLike?: (postId: string) => void;
  onLikePost?: (postId: string) => void;
  onToggleSave?: (postId: string) => void;
  onSavePost?: (postId: string) => void;
  onToggleFollow?: (authorId: string) => void;
  onFollowAuthor?: (authorId: string) => void;
  onAddComment: (postId: string, commentText: string, citation?: string) => void;
  onLikeComment?: (postId: string, commentId: string) => void;
  onSelectFacultyProfile?: (facultyId: string) => void;
  onOpenAiConsult?: (specialty?: Specialty, prompt?: string) => void;
}

const CATEGORIES: { id: CommunityCategory | 'All'; label: string; description: string; icon: any }[] = [
  { id: 'All', label: 'All Feeds', description: 'Complete multidisciplinary clinical stream', icon: Layers },
  { id: 'Discussions', label: 'Discussions', description: 'Clinical workflows, technology & practice questions', icon: MessageSquare },
  { id: 'Clinical Insights', label: 'Clinical Insights', description: 'Evidence summaries, trials & guideline takeaways', icon: Sparkles },
  { id: 'Case Discussions', label: 'Case Discussions', description: 'Challenging patient vignettes & diagnostic dilemmas', icon: Stethoscope },
  { id: 'Expert Conversations', label: 'Expert Conversations', description: 'Panel consensus, keynote takeaways & debates', icon: Award },
];

export const CommunityForumView: React.FC<CommunityForumViewProps> = ({
  communityPosts,
  posts,
  user,
  facultyList = [],
  onAddPost,
  onToggleLike,
  onLikePost,
  onToggleSave,
  onSavePost,
  onToggleFollow,
  onFollowAuthor,
  onAddComment,
  onLikeComment,
  onSelectFacultyProfile,
  onOpenAiConsult,
}) => {
  const allCommunityPosts = communityPosts || posts || [];
  const handleLike = onToggleLike || onLikePost || (() => {});
  const handleSave = onToggleSave || onSavePost || (() => {});
  const handleFollow = onToggleFollow || onFollowAuthor || (() => {});
  const [selectedCategory, setSelectedCategory] = useState<CommunityCategory | 'All'>('All');
  const [selectedSpecialty, setSelectedSpecialty] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Post Form State
  const [postTitle, setPostTitle] = useState('');
  const [postCategory, setPostCategory] = useState<CommunityCategory>('Discussions');
  const [postSpecialty, setPostSpecialty] = useState<Specialty>('Cardiology');
  const [postContent, setPostContent] = useState('');
  const [postCitation, setPostCitation] = useState('');
  const [postTags, setPostTags] = useState('');
  // Optional clinical vignette fields for case discussions
  const [patientAgeGender, setPatientAgeGender] = useState('');
  const [patientVitals, setPatientVitals] = useState('');
  const [patientKeyLabs, setPatientKeyLabs] = useState('');

  // Expanded comment states per post
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({
    'post-1': true,
    'post-3': true,
  });
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [citationInputs, setCitationInputs] = useState<Record<string, string>>({});
  const [showCitationInput, setShowCitationInput] = useState<Record<string, boolean>>({});

  // Toast feedback
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const filteredPosts = allCommunityPosts.filter((post) => {
    if (selectedCategory !== 'All' && post.category !== selectedCategory) return false;
    if (selectedSpecialty !== 'All' && post.specialty !== selectedSpecialty) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = post.title?.toLowerCase().includes(q);
      const matchContent = post.content?.toLowerCase().includes(q);
      const matchAuthor = post.author?.name?.toLowerCase().includes(q);
      const matchTags = post.tags?.some((t) => t.toLowerCase().includes(q));
      return matchTitle || matchContent || matchAuthor || matchTags;
    }
    return true;
  });

  const handleToggleComments = (postId: string) => {
    setExpandedComments((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }));
  };

  const handleCommentSubmit = (postId: string, e: React.FormEvent) => {
    e.preventDefault();
    const text = commentInputs[postId]?.trim();
    if (!text) return;
    const citation = citationInputs[postId]?.trim();

    onAddComment(postId, text, citation);
    setCommentInputs((prev) => ({ ...prev, [postId]: '' }));
    setCitationInputs((prev) => ({ ...prev, [postId]: '' }));
    setShowCitationInput((prev) => ({ ...prev, [postId]: false }));
    showToast('Your peer comment was published.');
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postContent.trim()) return;

    const newPost: CommunityPost = {
      id: `post-${Date.now()}`,
      title: postTitle.trim(),
      content: postContent.trim(),
      category: postCategory,
      specialty: postSpecialty,
      author: {
        id: user.id || 'user-current',
        name: user.name,
        role: user.role,
        credentials: user.role.includes('MD') ? 'MD' : user.role.includes('NP') ? 'MSN, NP' : 'PharmD',
        specialty: user.primarySpecialty,
        institution: user.institution,
        avatar: user.avatar,
        verified: true,
        followersCount: 142,
        isFollowing: false,
      },
      timestamp: 'Just now',
      likesCount: 1,
      hasLiked: true,
      commentsCount: 0,
      saved: false,
      tags: postTags
        ? postTags.split(',').map((t) => t.trim().replace(/^#/, ''))
        : [postSpecialty.replace(/\s+/g, ''), 'ClinicalPeer'],
      citation: postCitation.trim() || undefined,
      patientVignette:
        postCategory === 'Case Discussions' && (patientAgeGender || patientVitals || patientKeyLabs)
          ? {
              ageGender: patientAgeGender || 'Adult Patient',
              vitals: patientVitals || 'Vitals pending',
              keyLabs: patientKeyLabs || 'Standard laboratory panel',
            }
          : undefined,
      comments: [],
    };

    onAddPost(newPost);
    setShowAddModal(false);
    showToast('Clinical discussion created and published.');

    // Reset Form
    setPostTitle('');
    setPostContent('');
    setPostCitation('');
    setPostTags('');
    setPatientAgeGender('');
    setPatientVitals('');
    setPatientKeyLabs('');
  };

  return (
    <div id="community-view" className="min-h-screen bg-[#F4F9F9] pb-24 text-[#1A2B3B]">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#0A192F] text-white px-4 py-3 rounded-xl shadow-xl border border-teal-500/30 flex items-center gap-2 text-xs font-semibold animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-teal-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-[#0A192F] text-white py-10 px-4 sm:px-6 lg:px-8 border-b border-teal-500/20">
        <div className="max-w-7xl mx-auto space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold border border-teal-500/30">
                <Stethoscope className="w-3.5 h-3.5" />
                <span>Verified Peer Healthcare Network</span>
              </div>
              <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-white">
                Clinical Community & Case Discussions
              </h1>
              <p className="text-xs sm:text-sm text-teal-100/70 max-w-2xl">
                Engage with licensed physicians, APRNs, and pharmacists on clinical dilemmas, practice-changing trials, and diagnostic case puzzles.
              </p>
            </div>

            <button
              id="start-discussion-btn"
              onClick={() => setShowAddModal(true)}
              className="self-start md:self-auto px-5 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl text-xs sm:text-sm font-bold transition-all shadow-md hover:shadow-teal-900/30 cursor-pointer flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Start Discussion</span>
            </button>
          </div>

          {/* Search & Specialty Filter */}
          <div className="pt-2 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search discussions, trials, case dilemmas, authors, or clinical tags..."
                className="w-full pl-10 pr-4 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-white placeholder-teal-100/40 focus:outline-hidden focus:ring-2 focus:ring-teal-400"
              />
            </div>
            <select
              value={selectedSpecialty}
              onChange={(e) => setSelectedSpecialty(e.target.value)}
              aria-label="Filter discussions by clinical specialty"
              className="px-3.5 py-2.5 bg-white/10 border border-white/20 rounded-xl text-xs sm:text-sm text-teal-100 focus:outline-hidden focus:ring-2 focus:ring-teal-400 cursor-pointer"
            >
              <option value="All" className="bg-[#0A192F] text-white">All Specialties</option>
              {SPECIALTY_CATEGORIES.map((spec) => (
                <option key={spec} value={spec} className="bg-[#0A192F] text-white">
                  {spec}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* Navigation Category Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 scrollbar-none">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const isActive = selectedCategory === cat.id;
            const count =
              cat.id === 'All'
                ? allCommunityPosts.length
                : allCommunityPosts.filter((p) => p.category === cat.id).length;

            return (
              <button
                key={cat.id}
                id={`cat-tab-${cat.id.toLowerCase().replace(/\s+/g, '-')}`}
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

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Feed Column */}
          <div className="lg:col-span-2 space-y-6">
            {filteredPosts.length === 0 ? (
              <div className="bg-white p-12 rounded-2xl border border-slate-200 text-center space-y-3">
                <MessageSquare className="w-10 h-10 text-slate-300 mx-auto" />
                <h3 className="text-base font-bold text-slate-800">No discussions match your filter</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try clearing your search query or selecting a different specialty category.
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory('All');
                    setSelectedSpecialty('All');
                    setSearchQuery('');
                  }}
                  className="px-4 py-2 bg-teal-50 text-[#0E9384] rounded-xl text-xs font-bold hover:bg-teal-100 transition-colors cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredPosts.map((post) => {
                const isExpanded = !!expandedComments[post.id];
                const commentCount = post.comments?.length || post.commentsCount || 0;

                return (
                  <article
                    key={post.id}
                    id={`post-card-${post.id}`}
                    className="bg-white rounded-2xl border border-slate-200/80 shadow-xs hover:shadow-md transition-shadow overflow-hidden"
                  >
                    {/* Post Header */}
                    <div className="p-5 sm:p-6 pb-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex items-center gap-3">
                          <img
                            src={post.author.avatar}
                            alt={post.author.name}
                            className="w-11 h-11 rounded-full object-cover border border-teal-500/20 shadow-xs"
                          />
                          <div>
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <h4 className="text-xs sm:text-sm font-bold text-slate-900">
                                {post.author.name}
                              </h4>
                              {post.author.credentials && (
                                <span className="px-1.5 py-0.2 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md">
                                  {post.author.credentials}
                                </span>
                              )}
                              {post.author.verified && (
                                <ShieldCheck className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                              )}
                            </div>
                            <p className="text-[11px] text-slate-500">
                              {post.author.specialty} • {post.author.institution}
                            </p>
                          </div>
                        </div>

                        {/* Author Follow Button */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleFollow(post.author.id || post.author.name)}
                            className={`px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                              post.author.isFollowing
                                ? 'bg-teal-50 text-[#0E9384] border border-teal-200'
                                : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                            }`}
                          >
                            {post.author.isFollowing ? (
                              <>
                                <UserCheck className="w-3 h-3 text-[#0E9384]" />
                                <span>Following</span>
                              </>
                            ) : (
                              <>
                                <UserPlus className="w-3 h-3 text-slate-500" />
                                <span>Follow</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>

                      {/* Badges & Timestamp */}
                      <div className="flex items-center gap-2 mt-3 text-[11px]">
                        <span className="px-2 py-0.5 rounded-md font-bold bg-teal-50 text-[#0E9384] border border-teal-100">
                          {post.category}
                        </span>
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-slate-100 text-slate-600">
                          {post.specialty}
                        </span>
                        <span className="text-slate-400 ml-auto">{post.timestamp}</span>
                      </div>

                      {/* Post Title & Content */}
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 mt-3 leading-snug">
                        {post.title}
                      </h3>

                      <div className="mt-2 text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
                        {post.content}
                      </div>

                      {/* Clinical Case Vignette Box */}
                      {post.patientVignette && (
                        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-xl space-y-1.5 text-xs">
                          <div className="flex items-center gap-1.5 text-slate-700 font-bold">
                            <Stethoscope className="w-3.5 h-3.5 text-[#0E9384]" />
                            <span>Patient Vignette & Clinical Presentation:</span>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-1 text-[11px] text-slate-600">
                            <div>
                              <span className="font-semibold text-slate-800">Demographics:</span> {post.patientVignette.ageGender}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800">Vitals:</span> {post.patientVignette.vitals}
                            </div>
                            <div>
                              <span className="font-semibold text-slate-800">Key Labs:</span> {post.patientVignette.keyLabs}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* Evidence / Citation Callout */}
                      {post.citation && (
                        <div className="mt-3.5 p-3 bg-teal-50/70 border border-teal-100 rounded-xl flex items-start gap-2 text-xs text-slate-700">
                          <BookOpen className="w-3.5 h-3.5 text-[#0E9384] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-slate-900">Clinical Reference: </span>
                            <span className="italic text-slate-700">{post.citation}</span>
                          </div>
                        </div>
                      )}

                      {/* Tags */}
                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap items-center gap-1.5 mt-3 pt-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 text-[10px] font-semibold bg-slate-100 text-slate-600 rounded-md hover:bg-teal-50 hover:text-[#0E9384] cursor-pointer transition-colors"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Action Bar (Likes, Comments, Save, Share) */}
                    <div className="px-5 sm:px-6 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-600">
                      <div className="flex items-center gap-4">
                        {/* Like Button */}
                        <button
                          id={`like-post-${post.id}`}
                          onClick={() => handleLike(post.id)}
                          className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                            post.hasLiked
                              ? 'text-[#0E9384] font-bold'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          <ThumbsUp
                            className={`w-4 h-4 ${post.hasLiked ? 'fill-[#0E9384] text-[#0E9384]' : ''}`}
                          />
                          <span>{post.likesCount} {post.likesCount === 1 ? 'Peer Agree' : 'Peer Agrees'}</span>
                        </button>

                        {/* Comment Button */}
                        <button
                          id={`comment-toggle-${post.id}`}
                          onClick={() => handleToggleComments(post.id)}
                          className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                        >
                          <MessageSquare className="w-4 h-4" />
                          <span>{commentCount} {commentCount === 1 ? 'Comment' : 'Comments'}</span>
                          {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Save Button */}
                        <button
                          id={`save-post-${post.id}`}
                          onClick={() => handleSave(post.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer flex items-center gap-1 text-xs ${
                            post.saved
                              ? 'text-[#0E9384] bg-teal-50 font-bold'
                              : 'text-slate-500 hover:text-slate-800 hover:bg-slate-100'
                          }`}
                          title="Save Discussion"
                        >
                          <Bookmark
                            className={`w-3.5 h-3.5 ${post.saved ? 'fill-[#0E9384]' : ''}`}
                          />
                          <span className="hidden sm:inline">{post.saved ? 'Saved' : 'Save'}</span>
                        </button>
                      </div>
                    </div>

                    {/* Expandable Comment Thread */}
                    {isExpanded && (
                      <div className="p-5 sm:p-6 bg-slate-50/50 border-t border-slate-200/80 space-y-4">
                        {/* Existing Comments */}
                        {post.comments && post.comments.length > 0 ? (
                          <div className="space-y-3">
                            {post.comments.map((comm) => (
                              <div
                                key={comm.id}
                                className="p-3.5 bg-white border border-slate-200/80 rounded-xl space-y-1.5 shadow-2xs"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <div className="flex items-center gap-2">
                                    <img
                                      src={comm.author.avatar}
                                      alt={comm.author.name}
                                      className="w-6 h-6 rounded-full object-cover border border-teal-500/20"
                                    />
                                    <span className="text-xs font-bold text-slate-900">
                                      {comm.author.name}
                                    </span>
                                    {comm.author.credentials && (
                                      <span className="text-[10px] px-1 py-0.2 bg-slate-100 text-slate-600 rounded-sm">
                                        {comm.author.credentials}
                                      </span>
                                    )}
                                    <span className="text-[10px] text-slate-400">
                                      • {comm.author.specialty}
                                    </span>
                                  </div>
                                  <span className="text-[10px] text-slate-400">{comm.timestamp}</span>
                                </div>
                                <p className="text-xs text-slate-700 leading-relaxed pl-8">
                                  {comm.content}
                                </p>
                                {comm.citation && (
                                  <p className="text-[11px] text-[#0E9384] italic pl-8">
                                    Ref: {comm.citation}
                                  </p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-xs text-slate-400 italic">
                            No comments yet. Share your clinical perspective below.
                          </p>
                        )}

                        {/* Add Comment Box */}
                        <form onSubmit={(e) => handleCommentSubmit(post.id, e)} className="space-y-2 pt-2">
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={commentInputs[post.id] || ''}
                              onChange={(e) =>
                                setCommentInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                              }
                              placeholder="Write a peer response or clinical insight..."
                              className="flex-1 px-3.5 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                            />
                            <button
                              type="submit"
                              disabled={!commentInputs[post.id]?.trim()}
                              className="px-4 py-2 bg-[#0E9384] disabled:bg-slate-200 text-white rounded-xl text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5"
                            >
                              <Send className="w-3 h-3" />
                              <span>Reply</span>
                            </button>
                          </div>

                          {/* Optional citation row */}
                          <div className="flex items-center justify-between text-[11px] text-slate-500">
                            <button
                              type="button"
                              onClick={() =>
                                setShowCitationInput((prev) => ({
                                  ...prev,
                                  [post.id]: !prev[post.id],
                                }))
                              }
                              className="text-[#0E9384] hover:underline font-semibold cursor-pointer"
                            >
                              {showCitationInput[post.id] ? '- Remove citation' : '+ Add journal citation'}
                            </button>
                            <span>Adheres to Medvora Peer Review Standards</span>
                          </div>

                          {showCitationInput[post.id] && (
                            <input
                              type="text"
                              value={citationInputs[post.id] || ''}
                              onChange={(e) =>
                                setCitationInputs((prev) => ({ ...prev, [post.id]: e.target.value }))
                              }
                              placeholder="Journal citation (e.g., NEJM 2025; 392:812-824)"
                              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-hidden focus:ring-1 focus:ring-[#0E9384]"
                            />
                          )}
                        </form>
                      </div>
                    )}
                  </article>
                );
              })
            )}
          </div>

          {/* Right Sidebar Column (Trending Topics, Guidelines, Top Contributors) */}
          <div className="space-y-6">
            {/* Community Standards Card */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#0E9384]" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Community Standards
                </h4>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                All discussions require evidence citations when asserting treatment protocols. Patient identifying data must remain de-identified in adherence with HIPAA/GDPR guidelines.
              </p>
              <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#0E9384]" />
                  <span>Licensed peer moderation</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3 h-3 text-[#0E9384]" />
                  <span>Automated PubMed citation linking</span>
                </div>
              </div>
            </div>

            {/* Trending Discussion Tags */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs space-y-3">
              <div className="flex items-center gap-2">
                <Tag className="w-4 h-4 text-[#0E9384]" />
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Trending Topics
                </h4>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[
                  'ClinicalAI',
                  'GLP1RA',
                  'HeartFailure',
                  'VTStorm',
                  'ICANS',
                  'Tenecteplase',
                  'MicrovascularIschemia',
                  'PediatricDKA',
                  'ERASPathways',
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSearchQuery(tag)}
                    className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-teal-50 hover:text-[#0E9384] text-slate-700 font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Discussion Prompt Ideas */}
            <div className="bg-gradient-to-br from-[#0A192F] to-[#132845] p-5 rounded-2xl text-white space-y-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-teal-400" />
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider">
                  Featured Case Prompt
                </h4>
              </div>
              <p className="text-xs text-teal-100/90 leading-relaxed">
                Have an ambiguous imaging pattern or refractory clinical case? Start a peer discussion to gather multidisciplinary input from fellow specialists.
              </p>
              <button
                onClick={() => {
                  setPostCategory('Case Discussions');
                  setPostSpecialty('Cardiology');
                  setShowAddModal(true);
                }}
                className="w-full py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white text-xs font-bold rounded-xl transition-colors cursor-pointer"
              >
                Submit Clinical Vignette
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Start Discussion Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95">
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#0A192F] text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare className="w-5 h-5 text-teal-400" />
                <h3 className="text-base font-bold text-white">Start Clinical Discussion</h3>
              </div>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleCreatePost} className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              {/* Category & Specialty */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Discussion Stream</label>
                  <select
                    value={postCategory}
                    onChange={(e) => setPostCategory(e.target.value as CommunityCategory)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  >
                    <option value="Discussions">Discussions (Practice & Workflows)</option>
                    <option value="Clinical Insights">Clinical Insights (Trials & Guidelines)</option>
                    <option value="Case Discussions">Case Discussions (Patient Vignettes)</option>
                    <option value="Expert Conversations">Expert Conversations (Consensus)</option>
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Clinical Specialty</label>
                  <select
                    value={postSpecialty}
                    onChange={(e) => setPostSpecialty(e.target.value as Specialty)}
                    className="w-full px-3 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384]"
                  >
                    {SPECIALTY_CATEGORIES.map((spec) => (
                      <option key={spec} value={spec}>
                        {spec}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Title */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussion Title *</label>
                <input
                  type="text"
                  required
                  value={postTitle}
                  onChange={(e) => setPostTitle(e.target.value)}
                  placeholder="e.g., How are you adapting clinical workflows to AI-assisted documentation?"
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs font-semibold"
                />
              </div>

              {/* Content / Narrative */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Discussion Body & Clinical Narrative *</label>
                <textarea
                  required
                  rows={4}
                  value={postContent}
                  onChange={(e) => setPostContent(e.target.value)}
                  placeholder="Elaborate on the clinical challenge, methodology, trial dilemma, or question for fellow practitioners..."
                  className="w-full px-3.5 py-2.5 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs leading-relaxed"
                />
              </div>

              {/* Optional Case Discussion Vignette Box */}
              {postCategory === 'Case Discussions' && (
                <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
                  <div className="flex items-center gap-1.5 text-slate-800 font-bold">
                    <Stethoscope className="w-3.5 h-3.5 text-[#0E9384]" />
                    <span>Patient Profile & Key Diagnostic Data</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Age / Gender / Baseline</label>
                      <input
                        type="text"
                        value={patientAgeGender}
                        onChange={(e) => setPatientAgeGender(e.target.value)}
                        placeholder="e.g., 64yo Male, Ischemic CM"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Presenting Vitals</label>
                      <input
                        type="text"
                        value={patientVitals}
                        onChange={(e) => setPatientVitals(e.target.value)}
                        placeholder="e.g., BP 92/58, HR 168 (VT)"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                    <div>
                      <label className="font-semibold text-slate-600 block mb-1">Key Diagnostic Labs</label>
                      <input
                        type="text"
                        value={patientKeyLabs}
                        onChange={(e) => setPatientKeyLabs(e.target.value)}
                        placeholder="e.g., K+ 4.8, Troponin 0.84"
                        className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Journal Reference Citation */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Journal Citation / Clinical Guideline Reference</label>
                <input
                  type="text"
                  value={postCitation}
                  onChange={(e) => setPostCitation(e.target.value)}
                  placeholder="e.g., JAMA. 2024; 332(11):921-928 or ACC/AHA 2026 Guidelines"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">Clinical Tags (comma separated)</label>
                <input
                  type="text"
                  value={postTags}
                  onChange={(e) => setPostTags(e.target.value)}
                  placeholder="e.g., ClinicalAI, HealthInformatics, WorkflowOptimization"
                  className="w-full px-3.5 py-2 bg-white border border-slate-300 rounded-xl focus:outline-hidden focus:ring-2 focus:ring-[#0E9384] text-xs"
                />
              </div>

              {/* Modal Footer Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#0E9384] hover:bg-[#0b7a6d] text-white rounded-xl font-bold transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Discussion</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
