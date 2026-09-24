"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card, Button, Badge, StatusIcon } from '@/components/ui';
import { Shield, Lock, FileText, Plus } from 'lucide-react';

export default function ClaimantDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'CLAIMANT') {
      router.push('/login');
      return;
    }
    
    setUser(parsedUser);
    
    // Fetch claims
    api.getClaims('CLAIMANT', parsedUser.id)
      .then(data => {
        setClaims(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, [router]);

  if (loading || !user) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="flex justify-between items-center relative">
        <div className="absolute top-0 right-[20%] w-[200px] h-[200px] bg-teal-500/10 blur-[100px] rounded-full -z-10"></div>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">Claimant Dashboard</h1>
          <p className="text-slate-400 mt-2 text-lg font-light">Welcome back, <span className="text-amber-400 font-medium">{user.name}</span></p>
        </div>
        <Link href="/claimant/submit">
          <Button><Plus size={18} className="mr-2"/> Submit New Claim</Button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        
        {/* Left Column: Claims */}
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-100">
            <div className="p-2 bg-amber-500/10 rounded-lg border border-amber-500/20"><FileText size={22} className="text-amber-400"/></div>
            My Claims
          </h2>
          
          {claims.length === 0 ? (
            <Card className="text-center py-12">
              <p className="text-gray-500">No claims submitted yet.</p>
              <Link href="/claimant/submit">
                <Button variant="outline" className="mt-4">Start your first claim</Button>
              </Link>
            </Card>
          ) : (
            <div className="space-y-4">
              {claims.map((claim) => (
                <Card key={claim.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] transition-all border border-slate-800 hover:border-amber-500/20 group">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="font-mono text-sm text-slate-500 bg-slate-900/80 px-2 py-0.5 rounded border border-slate-700">{claim.id}</span>
                      <Badge variant="default">{claim.category}</Badge>
                    </div>
                    <h3 className="font-bold text-xl text-slate-100 group-hover:text-amber-400 transition-colors">{claim.policy?.name || 'Unknown Policy'}</h3>
                    <p className="text-sm text-slate-400 mt-1">
                      Submitted on {new Date(claim.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="flex flex-col gap-2 min-w-[140px]">
                    <div className="flex items-center text-sm font-medium">
                      <StatusIcon status="VALID" />
                      ZK Proof Valid
                    </div>
                    <div className="flex items-center text-sm font-medium">
                      <StatusIcon status={claim.status} />
                      {claim.status === 'PENDING' ? 'Pending Review' : claim.status === 'VERIFIED' ? 'Verified by Insurer' : 'Rejected'}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Privacy Center */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold flex items-center gap-2 text-slate-100">
            <div className="p-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20"><Shield size={22} className="text-emerald-400"/></div>
            Privacy Center
          </h2>
          <Card className="border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[50px] -z-10"></div>
            <div className="space-y-5">
              <p className="text-sm text-slate-400 pb-3 border-b border-slate-800">
                Data exposure settings for your claims:
              </p>
              
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium flex items-center gap-2 text-slate-300"><Lock size={16} className="text-slate-500"/> Raw Medical Data</span>
                <Badge variant="danger">PRIVATE</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium flex items-center gap-2 text-slate-300"><Lock size={16} className="text-slate-500"/> Financial Information</span>
                <Badge variant="danger">PRIVATE</Badge>
              </div>
              <div className="flex justify-between items-center text-sm pt-2 border-t border-slate-800/50">
                <span className="font-medium text-slate-300">Raw Data Shared</span>
                <Badge variant="danger">NO</Badge>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-medium text-slate-300">Verification Proof</span>
                <Badge variant="success">YES</Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
