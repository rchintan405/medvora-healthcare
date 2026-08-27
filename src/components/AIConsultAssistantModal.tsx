import React, { useState } from 'react';
import {
  Sparkles,
  X,
  Send,
  Stethoscope,
  BookOpen,
  FileCheck,
  Zap,
  HelpCircle,
  Brain,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';
import { Specialty } from '../types';

interface AIConsultAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentSpecialty?: Specialty;
}

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  time: string;
  references?: string[];
  suggestedAction?: { label: string; actionText: string };
}

export const AIConsultAssistantModal: React.FC<AIConsultAssistantModalProps> = ({
  isOpen,
  onClose,
  currentSpecialty = 'Cardiology'
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm-1',
      sender: 'ai',
      text: `Hello Doctor. I am your Medvora AI Clinical Learning & Guideline Assistant. I can help you drill clinical cases, summarize 2024-2026 practice guidelines, calculate CME-relevant clinical scores (H2FPEF, CHA2DS2-VASc, NIHSS, VExUS), or formulate differential diagnoses. How can I assist your clinical development today?`,
      time: 'Just now',
      references: ['ACC/AHA 2024 Guidelines', 'ESMO Clinical Practice Guidelines', 'Surviving Sepsis Campaign 2023 Update']
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  if (!isOpen) return null;

  const quickPrompts = [
    'Explain the SGLT2i eGFR dip mechanism in HFpEF',
    'Summarize 2025 TNK stroke thrombolysis protocol',
    'Generate a 5-minute pediatric DKA clinical case drill',
    'What are the VExUS ultrasound score grades?'
  ];

  const handleSend = (textToSend?: string) => {
    const query = textToSend || input.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: query,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      let replyText = '';
      let refs: string[] = [];

      const lower = query.toLowerCase();
      if (lower.includes('sglt2') || lower.includes('egfr') || lower.includes('dip')) {
        replyText = `### SGLT2i Initial Hemodynamic eGFR Dip: Mechanism & Management\n\n1. **Hemodynamic Mechanism**: SGLT2 inhibitors block sodium-glucose cotransport in the proximal convoluted tubule. This increases distal sodium delivery to the *macula densa*, restoring tubuloglomerular feedback and causing **afferent arteriolar vasoconstriction**.\n\n2. **Expected Clinical Trajectory**:\n   - An acute transient reduction in eGFR of **15% to 30%** typically occurs within weeks 1–4.\n   - This dip reflects reduced intraglomerular hyperfiltration and intraglomerular pressure—the core mechanism of long-term nephron preservation.\n\n3. **Clinical Action Rule**:\n   - **Do NOT discontinue** the SGLT2i if eGFR drop is < 30% and patient is asymptomatic with stable potassium.\n   - eGFR trajectory typically stabilizes and preserves renal function far longer than standard care.`;
        refs = ['KDIGO 2024 Diabetes & CKD Guidelines', 'EMPEROR-Preserved Trial Renal Sub-Analysis', 'DELIVER Trial Outcomes'];
      } else if (lower.includes('stroke') || lower.includes('tnk') || lower.includes('tenecteplase')) {
        replyText = `### 2025 Tenecteplase (TNK) Acute Ischemic Stroke Protocol\n\n- **Dosing**: Tenecteplase **0.25 mg/kg** (maximum 25 mg) administered as a **single IV bolus over 5–10 seconds**.\n- **Treatment Window**: Within 4.5 hours of last known well (or extended window up to 24h with perfusion mismatch on CTP/MRI).\n- **Key Advantages Over Alteplase**:\n  1. Higher fibrin specificity & longer half-life\n  2. Rapid 5-second administration eliminates 1-hour pump dependence, accelerating door-to-groin time for thrombectomy.\n  3. Lower risk of major systemic bleeding complications.`;
        refs = ['AHA/ASA 2024 Guideline Update', 'AcT Trial (Lancet 2022)', 'EXTEND-IA TNK Trial'];
      } else if (lower.includes('dka') || lower.includes('pediatric') || lower.includes('case')) {
        replyText = `### Pediatric DKA Clinical Vignette & Decision Point\n\n**Patient**: 7yo male, newly diagnosed T1D, presents with severe dehydration, Kussmaul respirations, pH 7.10, Glucose 540 mg/dL.\n\n**Core Protocol Mastery**:\n1. **Initial Fluid**: 10–20 mL/kg of isotonic crystalloid (Plasmalyte or 0.9% NS) over 1 hour.\n2. **Two-Bag System Initiation**: Bag 1 (Isotonic crystalloid + 20-40 mEq/L KCl) vs Bag 2 (Same + 10% Dextrose) Y-connected.\n3. **Critical Red Flag**: If child develops sudden headache, bradycardia, or declining GCS, suspect **cerebral edema**. Administer 3% Hypertonic Saline (3 mL/kg) or Mannitol (0.5-1 g/kg) IV immediately without waiting for CT imaging.`;
        refs = ['ISPAD Clinical Consensus Guidelines 2022/2024', 'AAP Pediatric Emergency Resuscitation'];
      } else {
        replyText = `Based on peer-reviewed clinical consensus and current specialty guidelines:

1. **Evidence Summary**: Addressing "${query}", modern clinical pathways emphasize individual hemodynamic phenotyping, biomarker guidance, and early multi-pathway pharmacotherapy.
2. **Key Clinical Rule**: Ensure regular monitoring of renal thresholds, electrolyte balances, and patient-specific contraindications.
3. **CME Module Recommendation**: You can earn 1.5 AMA PRA Category 1 Credits™ in our comprehensive **${currentSpecialty} Masterclass** covering this clinical domain.`;
        refs = ['UpToDate Clinical Reviews 2026', 'Medvora Peer Review Board'];
      }

      const aiReply: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        references: refs
      };

      setMessages((prev) => [...prev, aiReply]);
      setIsTyping(false);
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0A192F]/60 backdrop-blur-xs">
      <div className="bg-white rounded-2xl shadow-2xl border border-teal-500/10 w-full max-w-2xl h-[640px] flex flex-col overflow-hidden animate-in fade-in zoom-in-95 duration-200 text-[#1A2B3B]">
        {/* Header */}
        <div className="px-5 py-4 bg-gradient-to-r from-[#0A192F] to-[#162C4E] text-white flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shadow-xs">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-base text-white">Medvora AI Clinical Assistant</h3>
                <span className="px-2 py-0.5 text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg">
                  Evidence-Grounded
                </span>
              </div>
              <p className="text-xs text-teal-100/70">
                Medical guidelines, case simulations & clinical pharmacology tutor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-teal-100/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Disclaimer Bar */}
        <div className="px-4 py-1.5 bg-amber-50 border-b border-amber-200/60 text-[11px] text-amber-800 flex items-center gap-1.5 font-medium">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
          <span>For medical education & CME learning simulation only. Always verify critical decisions with institutional protocols.</span>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#F4F9F9]/60">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex gap-3 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {m.sender === 'ai' && (
                <div className="w-8 h-8 rounded-lg bg-[#0E9384] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                  <Brain className="w-4 h-4" />
                </div>
              )}
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-sm ${
                  m.sender === 'user'
                    ? 'bg-[#0E9384] text-white rounded-tr-xs shadow-xs'
                    : 'bg-white text-slate-800 border border-teal-500/10 rounded-tl-xs shadow-xs'
                }`}
              >
                <div className="whitespace-pre-line leading-relaxed">{m.text}</div>
                {m.references && m.references.length > 0 && (
                  <div className="mt-3 pt-2 border-t border-teal-500/10 flex flex-wrap items-center gap-1.5">
                    <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1">
                      <ShieldCheck className="w-3 h-3 text-[#0E9384]" /> Evidence Citations:
                    </span>
                    {m.references.map((r, i) => (
                      <span
                        key={i}
                        className="text-[10px] bg-teal-50 text-teal-800 font-medium px-2 py-0.5 rounded-md border border-teal-200/60"
                      >
                        {r}
                      </span>
                    ))}
                  </div>
                )}
                <div
                  className={`text-[10px] mt-1.5 text-right ${
                    m.sender === 'user' ? 'text-teal-100' : 'text-slate-400'
                  }`}
                >
                  {m.time}
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-lg bg-[#0E9384] text-white flex items-center justify-center shrink-0">
                <Brain className="w-4 h-4 animate-pulse" />
              </div>
              <div className="bg-white border border-teal-500/10 rounded-2xl px-4 py-3 text-xs text-slate-500 flex items-center gap-2 shadow-xs">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-[#0E9384] animate-bounce" />
                  <span className="w-2 h-2 rounded-full bg-[#0E9384] animate-bounce [animation-delay:0.2s]" />
                  <span className="w-2 h-2 rounded-full bg-[#0E9384] animate-bounce [animation-delay:0.4s]" />
                </div>
                <span>Analyzing clinical guidelines & trials...</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Prompts */}
        <div className="px-4 py-2 bg-[#F4F9F9] border-t border-teal-500/10 overflow-x-auto flex gap-2 no-scrollbar">
          {quickPrompts.map((qp, idx) => (
            <button
              key={idx}
              onClick={() => handleSend(qp)}
              className="text-xs bg-white hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 border border-teal-500/10 text-slate-700 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors flex items-center gap-1 shadow-2xs cursor-pointer"
            >
              <Zap className="w-3 h-3 text-[#0E9384]" />
              {qp}
            </button>
          ))}
        </div>

        {/* Input Footer */}
        <div className="p-3 bg-white border-t border-teal-500/10 flex items-center gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Ask a clinical question, guideline citation, or request a case drill..."
            className="flex-1 px-4 py-2.5 bg-[#F4F9F9] border border-teal-500/10 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-teal-500 focus:bg-white transition-all"
          />
          <button
            onClick={() => handleSend()}
            disabled={!input.trim()}
            className="px-4 py-2.5 bg-[#0E9384] hover:bg-[#0b7a6d] disabled:opacity-50 text-white rounded-xl font-medium text-sm flex items-center gap-1.5 transition-colors shadow-xs cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>Send</span>
          </button>
        </div>
      </div>
    </div>
  );
};
