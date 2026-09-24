"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '@/lib/api';
import Link from 'next/link';
import { Shield, Briefcase, FileSearch, ArrowLeft, ChevronRight, Lock, Sparkles } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [hoveredRole, setHoveredRole] = useState<string | null>(null);

  const handleLogin = async (role: 'CLAIMANT' | 'INSURER' | 'AUDITOR') => {
    setLoading(true);
    setError('');
    
    try {
      const res = await api.login(role);
      
      if (res.token && res.user) {
        localStorage.setItem('user', JSON.stringify(res.user));
        localStorage.setItem('token', res.token);
        
        if (role === 'CLAIMANT') router.push('/claimant');
        if (role === 'INSURER') router.push('/insurer');
        if (role === 'AUDITOR') router.push('/auditor');
      } else {
        setError('Login failed. Check backend connection.');
      }
    } catch (err) {
      console.error(err);
      setError('Connection refused. Is the backend running on port 3001?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[88vh] px-4 relative overflow-hidden">
      {/* Immersive Background Glows */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[800px] blur-[150px] rounded-[100%] pointer-events-none transition-colors duration-700 ease-in-out ${
        hoveredRole === 'CLAIMANT' ? 'bg-amber-500/20' : 
        hoveredRole === 'INSURER' ? 'bg-teal-500/20' : 
        hoveredRole === 'AUDITOR' ? 'bg-blue-500/20' : 'bg-slate-500/10'
      }`}></div>
      
      <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/5 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="w-full max-w-6xl flex flex-col lg:flex-row gap-16 items-center lg:items-stretch relative z-10">
        
        {/* Left Side: Dramatic Context */}
        <div className="flex-1 flex flex-col justify-center space-y-8 text-center lg:text-left relative">
          <Link href="/" className="inline-flex items-center text-slate-400 hover:text-white transition-colors w-fit mx-auto lg:mx-0 font-medium group bg-slate-900/50 px-4 py-2 rounded-full border border-slate-700/50 backdrop-blur-md">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Home
          </Link>
          
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-bold tracking-widest uppercase backdrop-blur-md mx-auto lg:mx-0 shadow-[0_0_20px_rgba(245,158,11,0.15)]">
              <Lock size={14} /> Zero Knowledge Proofs
            </div>
            <h2 className="text-5xl md:text-7xl font-extrabold text-slate-100 tracking-tighter leading-[1.1] drop-shadow-2xl">
              Enter The <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 animate-pulse-glow inline-block pb-2">
                Ecosystem
              </span>
            </h2>
            <p className="text-xl text-slate-400 font-light leading-relaxed max-w-md mx-auto lg:mx-0">
              Select a workspace to experience privacy-preserving insurance verification in real-time.
            </p>
          </div>
          
          {error && (
            <div className="p-5 bg-red-950/80 text-red-300 border border-red-500/40 rounded-2xl text-sm font-bold flex items-center justify-center lg:justify-start gap-3 shadow-[0_0_30px_rgba(239,68,68,0.2)] backdrop-blur-xl animate-in slide-in-from-bottom-2">
              <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center border border-red-500/30">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              {error}
            </div>
          )}
        </div>

        {/* Right Side: Ultra-Premium Role Cards */}
        <div className="flex-1 w-full max-w-lg space-y-5 pt-8 lg:pt-0">
          
          {/* Claimant Card */}
          <button 
            className="w-full text-left group relative p-px rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handleLogin('CLAIMANT')}
            onMouseEnter={() => setHoveredRole('CLAIMANT')}
            onMouseLeave={() => setHoveredRole(null)}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400 via-amber-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl p-8 rounded-[2rem] flex items-center gap-6 border border-slate-700/50 group-hover:border-transparent transition-colors shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-amber-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-amber-600 text-slate-950 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <Shield size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-2xl text-slate-100 mb-1.5 group-hover:text-amber-400 transition-colors flex items-center gap-2">
                  Claimant <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-amber-300" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">Submit claims & generate ZK proofs locally on your device.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:bg-amber-500/20 group-hover:border-amber-500/50 transition-colors">
                <ChevronRight className="text-slate-500 group-hover:text-amber-400 transition-colors" size={20} />
              </div>
            </div>
          </button>

          {/* Insurer Card */}
          <button 
            className="w-full text-left group relative p-px rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handleLogin('INSURER')}
            onMouseEnter={() => setHoveredRole('INSURER')}
            onMouseLeave={() => setHoveredRole(null)}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-teal-400 via-teal-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl p-8 rounded-[2rem] flex items-center gap-6 border border-slate-700/50 group-hover:border-transparent transition-colors shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-teal-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-teal-600 text-slate-950 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(20,184,166,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <Briefcase size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-2xl text-slate-100 mb-1.5 group-hover:text-teal-400 transition-colors flex items-center gap-2">
                  Insurer <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-teal-300" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">Verify cryptographic proofs instantly without viewing sensitive data.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-colors">
                <ChevronRight className="text-slate-500 group-hover:text-teal-400 transition-colors" size={20} />
              </div>
            </div>
          </button>
          
          {/* Auditor Card */}
          <button 
            className="w-full text-left group relative p-px rounded-[2rem] overflow-hidden transition-all duration-500 hover:-translate-y-2 focus:outline-none disabled:opacity-50 disabled:pointer-events-none"
            onClick={() => handleLogin('AUDITOR')}
            onMouseEnter={() => setHoveredRole('AUDITOR')}
            onMouseLeave={() => setHoveredRole(null)}
            disabled={loading}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 via-blue-600 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="relative h-full bg-slate-950/90 backdrop-blur-2xl p-8 rounded-[2rem] flex items-center gap-6 border border-slate-700/50 group-hover:border-transparent transition-colors shadow-2xl">
              <div className="relative">
                <div className="absolute inset-0 bg-blue-500 blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-blue-600 text-slate-950 rounded-2xl flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.4)] group-hover:scale-110 transition-transform duration-500 relative z-10">
                  <FileSearch size={32} strokeWidth={2.5} />
                </div>
              </div>
              <div className="flex-1">
                <h3 className="font-extrabold text-2xl text-slate-100 mb-1.5 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                  Auditor <Sparkles size={16} className="opacity-0 group-hover:opacity-100 transition-opacity text-blue-300" />
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed font-medium group-hover:text-slate-300 transition-colors">Review immutable verification logs on the public ledger.</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-slate-800/50 flex items-center justify-center border border-slate-700 group-hover:bg-blue-500/20 group-hover:border-blue-500/50 transition-colors">
                <ChevronRight className="text-slate-500 group-hover:text-blue-400 transition-colors" size={20} />
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
