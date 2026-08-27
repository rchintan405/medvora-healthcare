import React, { useState } from 'react';
import {
  Bell,
  CheckCircle2,
  Award,
  Calendar,
  AlertTriangle,
  MessageSquare,
  Sparkles,
  X,
  ChevronRight,
  ShieldCheck,
  Trash2,
  Check
} from 'lucide-react';
import { NotificationItem, NotificationType } from '../types';

interface NotificationCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: NotificationItem[];
  onMarkAsRead: (id: string) => void;
  onMarkAllAsRead: () => void;
  onNavigateToItem: (actionLink?: string) => void;
}

type FilterCategory = 'all' | 'cme' | 'community' | 'webinars' | 'guidelines';

export const NotificationCenterModal: React.FC<NotificationCenterModalProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onMarkAllAsRead,
  onNavigateToItem,
}) => {
  const [filter, setFilter] = useState<FilterCategory>('all');

  if (!isOpen) return null;

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'all') return true;
    if (filter === 'cme') return item.type === 'cme_earned';
    if (filter === 'community') return item.type === 'community_reply';
    if (filter === 'webinars') return item.type === 'webinar_live';
    if (filter === 'guidelines') return item.type === 'fda_alert' || item.type === 'guideline_update';
    return true;
  });

  const getIconForType = (type: NotificationType) => {
    switch (type) {
      case 'cme_earned':
        return <Award className="w-4 h-4 text-[#0E9384]" />;
      case 'webinar_live':
        return <Calendar className="w-4 h-4 text-rose-500" />;
      case 'fda_alert':
        return <AlertTriangle className="w-4 h-4 text-amber-500" />;
      case 'community_reply':
        return <MessageSquare className="w-4 h-4 text-indigo-500" />;
      default:
        return <Sparkles className="w-4 h-4 text-teal-500" />;
    }
  };

  const handleItemClick = (item: NotificationItem) => {
    onMarkAsRead(item.id);
    if (item.linkAction) {
      onNavigateToItem(item.linkAction);
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-end p-4 sm:p-6 bg-slate-900/50 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] mt-12 animate-in slide-in-from-top-4">
        {/* Header */}
        <div className="px-5 py-4 bg-[#0A192F] text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-teal-400" />
            <div>
              <h3 className="text-sm font-bold text-white">Notification Center</h3>
              <p className="text-[11px] text-teal-100/70">
                {unreadCount > 0 ? `${unreadCount} unread clinical updates` : 'All notifications caught up'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={onMarkAllAsRead}
                className="text-[11px] text-teal-300 hover:text-teal-200 font-semibold px-2 py-1 rounded-lg hover:bg-white/10 transition-colors cursor-pointer"
              >
                Mark all read
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Filter Categories */}
        <div className="px-4 py-2 bg-slate-50 border-b border-slate-200 flex items-center gap-1.5 overflow-x-auto text-[11px] font-semibold scrollbar-none">
          <button
            onClick={() => setFilter('all')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'all'
                ? 'bg-[#0E9384] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            All ({notifications.length})
          </button>
          <button
            onClick={() => setFilter('cme')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'cme'
                ? 'bg-[#0E9384] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            CME & Credits
          </button>
          <button
            onClick={() => setFilter('community')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'community'
                ? 'bg-[#0E9384] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Discussions
          </button>
          <button
            onClick={() => setFilter('webinars')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'webinars'
                ? 'bg-[#0E9384] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Webinars
          </button>
          <button
            onClick={() => setFilter('guidelines')}
            className={`px-2.5 py-1 rounded-lg transition-colors cursor-pointer whitespace-nowrap ${
              filter === 'guidelines'
                ? 'bg-[#0E9384] text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
            }`}
          >
            Guidelines
          </button>
        </div>

        {/* Notification List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100">
          {filteredNotifications.length === 0 ? (
            <div className="p-8 text-center space-y-2">
              <Bell className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-600">No notifications in this category</p>
            </div>
          ) : (
            filteredNotifications.map((item) => (
              <div
                key={item.id}
                onClick={() => handleItemClick(item)}
                className={`p-4 transition-colors cursor-pointer flex items-start gap-3 hover:bg-slate-50 relative ${
                  !item.read ? 'bg-teal-50/40' : 'bg-white'
                }`}
              >
                {!item.read && (
                  <span className="w-2 h-2 rounded-full bg-[#0E9384] absolute top-4 left-2" />
                )}

                <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center shrink-0 mt-0.5">
                  {getIconForType(item.type)}
                </div>

                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <h4
                      className={`text-xs leading-snug line-clamp-1 ${
                        !item.read ? 'font-bold text-slate-900' : 'font-semibold text-slate-700'
                      }`}
                    >
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-slate-400 shrink-0">{item.timestamp}</span>
                  </div>
                  <p className="text-[11px] text-slate-600 line-clamp-2 leading-relaxed">
                    {item.message}
                  </p>
                  {item.linkAction && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-[#0E9384] pt-0.5">
                      <span>View in {item.linkAction}</span>
                      <ChevronRight className="w-3 h-3" />
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between text-xs text-slate-500">
          <span>Medvora Notification Sync</span>
          <span className="text-[10px] bg-teal-50 text-[#0E9384] px-2 py-0.5 rounded-md font-bold">
            Real-Time
          </span>
        </div>
      </div>
    </div>
  );
};
