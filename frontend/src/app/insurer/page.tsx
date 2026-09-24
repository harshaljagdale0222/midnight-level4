"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { Card, Button, Badge, StatusIcon } from '@/components/ui';
import { ShieldCheck, FileCheck, XCircle, Clock } from 'lucide-react';

export default function InsurerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [claims, setClaims] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClaims = () => {
    api.getClaims('INSURER')
      .then(data => {
        setClaims(data);
        setLoading(false);
      })
      .catch(console.error);
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'INSURER') {
      router.push('/login');
      return;
    }
    
    setUser(parsedUser);
    fetchClaims();
  }, [router]);

  const handleVerify = async (claimId: string, proof: any) => {
    try {
      await api.verifyClaim(claimId, { proofId: proof, verifierString: `zk-SNARK-mock-${proof}` }, user.id);
      fetchClaims();
    } catch (err) {
      console.error(err);
      alert('Verification failed due to a network error.');
    }
  };

  if (loading || !user) return <div className="p-8 text-center text-gray-500">Loading...</div>;

  const totalClaims = claims.length;
  const verifiedClaims = claims.filter(c => c.status === 'VERIFIED').length;
  const pendingClaims = claims.filter(c => c.status === 'PENDING').length;
  const rejectedClaims = claims.filter(c => c.status === 'REJECTED').length;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="relative">
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-amber-500/10 blur-[100px] rounded-full -z-10"></div>
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-100">Insurer Dashboard</h1>
        <p className="text-slate-400 mt-2 text-lg font-light">Review and cryptographically verify claims without seeing private data.</p>
      </div>

      {/* Metrics */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="flex items-center gap-5 py-6 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)] transition-all border border-slate-800 hover:border-blue-500/30">
          <div className="p-4 bg-blue-500/10 rounded-xl border border-blue-500/20"><FileCheck size={28} className="text-blue-400"/></div>
          <div><p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Total Claims</p><p className="text-3xl font-bold text-slate-100">{totalClaims}</p></div>
        </Card>
        <Card className="flex items-center gap-5 py-6 hover:shadow-[0_0_30px_rgba(16,185,129,0.1)] transition-all border border-slate-800 hover:border-emerald-500/30">
          <div className="p-4 bg-emerald-500/10 rounded-xl border border-emerald-500/20"><ShieldCheck size={28} className="text-emerald-400"/></div>
          <div><p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">ZK Verified</p><p className="text-3xl font-bold text-slate-100">{verifiedClaims}</p></div>
        </Card>
        <Card className="flex items-center gap-5 py-6 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)] transition-all border border-slate-800 hover:border-amber-500/30">
          <div className="p-4 bg-amber-500/10 rounded-xl border border-amber-500/20"><Clock size={28} className="text-amber-400"/></div>
          <div><p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Pending</p><p className="text-3xl font-bold text-slate-100">{pendingClaims}</p></div>
        </Card>
        <Card className="flex items-center gap-5 py-6 hover:shadow-[0_0_30px_rgba(239,68,68,0.1)] transition-all border border-slate-800 hover:border-red-500/30">
          <div className="p-4 bg-red-500/10 rounded-xl border border-red-500/20"><XCircle size={28} className="text-red-400"/></div>
          <div><p className="text-sm font-semibold tracking-wide text-slate-400 uppercase">Rejected</p><p className="text-3xl font-bold text-slate-100">{rejectedClaims}</p></div>
        </Card>
      </div>

      {/* Claims Table */}
      <Card className="p-0 overflow-hidden border border-slate-800">
        <div className="p-6 border-b border-slate-800 bg-slate-900/50">
          <h2 className="text-2xl font-bold text-slate-100">Recent Claims</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="p-5 font-semibold">Claim ID</th>
                <th className="p-5 font-semibold">Policy</th>
                <th className="p-5 font-semibold">AI Classification</th>
                <th className="p-5 font-semibold">Timestamp</th>
                <th className="p-5 font-semibold">Status</th>
                <th className="p-5 font-semibold text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {claims.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500 text-lg">No claims found.</td>
                </tr>
              ) : claims.map(claim => (
                <tr key={claim.id} className="hover:bg-slate-800/40 transition-colors group">
                  <td className="p-5 font-mono text-amber-400/90 font-medium">{claim.id}</td>
                  <td className="p-5 font-medium text-slate-200">{claim.policy?.name || claim.policyId}</td>
                  <td className="p-5">
                    <Badge variant="default">{claim.category}</Badge>
                    {claim.aiConfidence && <span className="ml-2 text-xs text-slate-500">{(claim.aiConfidence * 100).toFixed(0)}% conf</span>}
                  </td>
                  <td className="p-5 text-slate-400">{new Date(claim.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    <div className="flex items-center font-medium">
                      <StatusIcon status={claim.status} />
                      {claim.status === 'PENDING' ? 'Pending' : claim.status === 'VERIFIED' ? 'Verified' : 'Rejected'}
                    </div>
                  </td>
                  <td className="p-4 text-right">
                    {claim.status === 'PENDING' ? (
                      <Button variant="primary" onClick={() => handleVerify(claim.id, claim.zkProofId)}>
                        Verify Proof
                      </Button>
                    ) : (
                      <Link href={`/verification/${claim.id}`}>
                        <Button variant="outline">View Result</Button>
                      </Link>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
