import Link from 'next/link';
import { Shield, CheckCircle, Database, ArrowRight, Activity, FileCheck, Lock, Sparkles, ChevronRight } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-4 max-w-7xl mx-auto space-y-32 overflow-hidden">
      
      {/* Premium Hero Section */}
      <section className="text-center space-y-10 max-w-5xl mt-12 relative">
        {/* Animated Background Orbs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-amber-500/20 via-teal-500/10 to-blue-500/20 blur-[120px] rounded-full -z-10 animate-pulse-glow"></div>
        
        {/* Badge */}
        <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-slate-900/60 border border-amber-500/30 text-amber-400 text-sm font-bold tracking-widest uppercase backdrop-blur-xl shadow-[0_0_30px_rgba(245,158,11,0.15)] hover:shadow-[0_0_40px_rgba(245,158,11,0.25)] transition-all cursor-default">
          <Sparkles size={16} className="text-amber-300 animate-pulse" /> 
          Next-Gen Privacy Protocol
        </div>
        
        {/* Massive Typography */}
        <h1 className="text-7xl md:text-[7rem] font-extrabold tracking-tighter text-slate-100 drop-shadow-2xl leading-[1.05]">
          Verify Claims.<br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 inline-block mt-2">
            Reveal Nothing.
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-light leading-relaxed">
          The first decentralized insurance layer built on <span className="text-amber-400 font-semibold border-b border-amber-400/30 pb-0.5">Midnight Network</span>. 
          Mathematical certainty through Zero-Knowledge Proofs, completely shielding user data.
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-12 relative z-20">
          <Link 
            href="/login" 
            className="group relative inline-flex items-center justify-center font-bold rounded-full px-12 h-16 text-lg transition-all bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 hover:from-amber-400 hover:to-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.3)] hover:shadow-[0_0_60px_rgba(245,158,11,0.5)] hover:-translate-y-1 overflow-hidden"
          >
            <div className="absolute inset-0 bg-white/20 w-full translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
            Launch App <ArrowRight className="ml-3 group-hover:translate-x-1.5 transition-transform" size={24} />
          </Link>
          <Link 
            href="#architecture" 
            className="group inline-flex items-center justify-center font-semibold rounded-full px-10 h-16 text-lg transition-all bg-slate-900/80 backdrop-blur-xl border border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-amber-500/50 hover:-translate-y-1 shadow-[0_0_20px_rgba(0,0,0,0.5)] hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
          >
            Explore Architecture <ChevronRight className="ml-2 text-slate-500 group-hover:text-amber-400 transition-colors" size={22} />
          </Link>
        </div>
      </section>

      {/* Premium Features Grid */}
      <section className="grid md:grid-cols-3 gap-8 w-full relative z-10 mt-20">
        {[
          { icon: Shield, title: "Absolute Privacy", desc: "Sensitive data never leaves your device. Prove eligibility locally.", color: "text-amber-400", border: "hover:border-amber-500/50", glow: "hover:shadow-[0_0_40px_rgba(245,158,11,0.2)]" },
          { icon: Lock, title: "Cryptographic Trust", desc: "100% mathematical certainty for insurers using advanced ZK-SNARKs.", color: "text-teal-400", border: "hover:border-teal-500/50", glow: "hover:shadow-[0_0_40px_rgba(45,212,191,0.2)]" },
          { icon: Database, title: "Immutable Audits", desc: "Tamper-proof verification logs stored securely for regulatory compliance.", color: "text-blue-400", border: "hover:border-blue-500/50", glow: "hover:shadow-[0_0_40px_rgba(59,130,246,0.2)]" }
        ].map((feature, i) => (
          <div key={i} className={`group relative glass-panel p-10 rounded-[2rem] space-y-6 transition-all duration-500 hover:-translate-y-3 border border-slate-800/80 ${feature.border} ${feature.glow} overflow-hidden bg-gradient-to-b from-slate-900/60 to-slate-950/80`}>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-[40px] -mr-10 -mt-10 transition-opacity group-hover:opacity-100 opacity-0"></div>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center bg-slate-900 border border-slate-700 shadow-inner group-hover:scale-110 transition-transform duration-500 ${feature.color}`}>
              <feature.icon size={32} />
            </div>
            <h3 className="text-3xl font-bold tracking-tight text-slate-100 group-hover:text-white transition-colors">{feature.title}</h3>
            <p className="text-slate-400 leading-relaxed text-lg font-light">
              {feature.desc}
            </p>
          </div>
        ))}
      </section>

      {/* Redesigned Architecture Section */}
      <section id="architecture" className="w-full space-y-20 pb-24 pt-20">
        <div className="text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-100">How It Works</h2>
          <p className="text-amber-500 text-xl font-bold tracking-[0.2em] uppercase">Zero-Knowledge Architecture</p>
        </div>

        <div className="max-w-6xl mx-auto glass-panel rounded-[3rem] p-10 md:p-16 relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-slate-800">
          {/* Internal Glows */}
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none"></div>
          <div className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-amber-500/10 blur-[120px] rounded-full pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row items-stretch justify-between gap-12 md:gap-4 text-center relative z-10">
            
            {/* Claimant Side */}
            <div className="flex-1 flex flex-col space-y-8 bg-slate-950/90 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-700/80 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative group hover:border-amber-500/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity"></div>
              <div className="flex items-center justify-center gap-3 text-amber-400 font-extrabold text-xl tracking-wider uppercase mb-2">
                <Shield size={24} /> Claimant App
              </div>
              
              <div className="text-sm bg-slate-900 text-slate-300 py-5 px-4 rounded-2xl border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)] flex items-center justify-center gap-3 relative overflow-hidden">
                <div className="absolute inset-0 bg-red-500/5 animate-pulse"></div>
                <Lock size={18} className="text-red-400" />
                <span className="font-bold text-red-300">Private Health Data</span>
              </div>
              
              <div className="text-slate-600 animate-bounce">▼</div>
              
              <div className="text-sm bg-slate-800 py-5 px-4 rounded-2xl border border-slate-600 font-bold text-slate-200 shadow-inner">
                Local AI Classification
              </div>
              
              <div className="text-slate-600 animate-bounce">▼</div>
              
              <div className="text-sm bg-gradient-to-b from-slate-800 to-slate-900 py-5 px-4 rounded-2xl border border-amber-500/40 font-bold text-amber-100 shadow-[inset_0_2px_4px_rgba(255,255,255,0.1)] relative">
                <Sparkles size={14} className="absolute top-2 right-2 text-amber-500/50" />
                Midnight ZK Circuit<br/><span className="text-xs text-amber-400/80 font-normal mt-1 block">Generates Cryptographic Proof</span>
              </div>
            </div>

            {/* Network Layer */}
            <div className="flex flex-col items-center justify-center px-4 py-8 md:py-0 relative min-w-[240px]">
               {/* Animated beam */}
               <div className="hidden md:block h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400 to-transparent absolute top-1/2 left-0 -z-10 opacity-70">
                 <div className="absolute top-0 left-0 h-full w-24 bg-white/60 blur-sm animate-[slide_2s_ease-in-out_infinite]"></div>
               </div>
               
               <div className="bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 px-8 py-5 rounded-[2rem] font-extrabold text-base z-10 shadow-[0_0_40px_rgba(245,158,11,0.4)] whitespace-nowrap animate-float border-2 border-amber-300 flex flex-col items-center gap-2">
                  <FileCheck size={28} className="opacity-90" />
                  ZK PROOF ONLY
               </div>
               
               <div className="text-xs mt-8 text-amber-200 font-bold bg-amber-900/50 px-5 py-2.5 rounded-xl border border-amber-500/40 backdrop-blur-md shadow-lg tracking-widest uppercase">
                  100% Mathematically Verified
               </div>
            </div>

            {/* Insurer Side */}
            <div className="flex-1 flex flex-col space-y-8 bg-slate-950/90 backdrop-blur-2xl p-10 rounded-[2rem] border border-slate-700/80 shadow-[0_0_30px_rgba(0,0,0,0.6)] relative group hover:border-teal-500/30 transition-colors">
               <div className="absolute inset-0 bg-gradient-to-b from-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity"></div>
               <div className="flex items-center justify-center gap-3 text-teal-400 font-extrabold text-xl tracking-wider uppercase mb-2">
                 <Database size={24} /> Network Nodes
               </div>
               
               <div className="flex gap-4 mt-auto pt-4">
                  <div className="flex-1 text-sm bg-slate-900 py-5 px-2 rounded-2xl border border-slate-600 font-bold text-slate-300 shadow-inner">
                    Insurer Node
                  </div>
                  <div className="flex-1 text-sm bg-slate-900 py-5 px-2 rounded-2xl border border-slate-600 font-bold text-slate-300 shadow-inner">
                    Auditor Node
                  </div>
               </div>
               
               <div className="text-slate-600 animate-bounce text-center">▼</div>
               
               <div className="text-base bg-teal-500/10 text-teal-400 py-5 px-4 rounded-2xl font-extrabold border-2 border-teal-500/40 mt-2 text-center shadow-[0_0_30px_rgba(20,184,166,0.2)] tracking-wider flex items-center justify-center gap-3">
                 <CheckCircle size={22} className="text-teal-400" /> ELIGIBILITY CONFIRMED
               </div>
            </div>

          </div>
        </div>
      </section>
      
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(400%); }
        }
      `}} />
    </div>
  );
}
