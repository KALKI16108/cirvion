import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Lock, LogIn } from 'lucide-react';
import { loginAdmin } from '../../lib/api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            await loginAdmin(email, password);
            window.location.href = '/admin'; // Force full reload to update auth state across app
        } catch (err) {
            setError(err.message || 'Invalid login credentials');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#030712] p-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#6366F1]/10 rounded-full blur-[120px] pointer-events-none"></div>

            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="w-full max-w-md glass-card p-8 rounded-3xl border border-white/5 relative z-10"
            >
                <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 rounded-2xl bg-[#6366F1]/10 border border-[#6366F1]/20 flex items-center justify-center">
                        <Lock className="w-8 h-8 text-[#6366F1]" />
                    </div>
                </div>
                
                <h1 className="text-2xl font-bold text-white text-center mb-2">Admin Access</h1>
                <p className="text-[#94A3B8] text-center mb-8 text-sm">Secure dashboard for AIFlowix management</p>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/20 text-red-500 p-4 rounded-xl text-sm mb-6">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-[#E2E8F0] mb-2">Admin Email</label>
                        <input 
                            type="email" 
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6366F1] transition-colors" 
                            placeholder="admin@aiflowix.in" 
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-[#E2E8F0] mb-2">Password</label>
                        <input 
                            type="password" 
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-[#0F172A] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#6366F1] transition-colors" 
                            placeholder="••••••••" 
                        />
                    </div>
                    <button 
                        disabled={loading}
                        type="submit" 
                        className="w-full bg-[#6366F1] hover:bg-[#4F46E5] text-white font-bold py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                        {loading ? 'Authenticating...' : 'Sign In'} <LogIn className="w-4 h-4" />
                    </button>
                </form>
            </motion.div>
        </div>
    );
};

export default AdminLogin;
