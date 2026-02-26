import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Login.css';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPass, setShowPass] = useState(false);
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    function handleSubmit(e) {
        e.preventDefault();
        setError('');
        const result = login(email, password);
        if (result.success) {
            navigate(result.user.role === 'admin' ? '/admin' : '/user');
        } else {
            setError(result.error);
        }
    }

    function quickLogin(em, pw) {
        setEmail(em);
        setPassword(pw);
        const result = login(em, pw);
        if (result.success) {
            navigate(result.user.role === 'admin' ? '/admin' : '/user');
        }
    }

    return (
        <div className="login-page">
            {/* Left Panel */}
            <div className="login-left">
                <div className="login-brand">
                    <div className="brand-icon-lg">🏆</div>
                    <span className="login-brand-name">Certification Tracker</span>
                </div>

                <div className="login-hero">
                    <h1>Track Every Certification.<br /><span className="login-hero-accent">Never Miss a Deadline.</span></h1>
                    <p className="login-hero-sub">
                        The all-in-one platform for managing professional certifications, tracking renewals, and verifying credentials — for teams and individuals.
                    </p>
                </div>

                <div className="login-features">
                    <div className="login-feature-card">
                        <span className="feature-icon">📋</span>
                        <div>
                            <div className="feature-title">Centralized Records</div>
                            <div className="feature-desc">Store all certification details in one secure place</div>
                        </div>
                    </div>
                    <div className="login-feature-card">
                        <span className="feature-icon">⏰</span>
                        <div>
                            <div className="feature-title">Smart Expiry Tracking</div>
                            <div className="feature-desc">Automated alerts before certifications expire</div>
                        </div>
                    </div>
                    <div className="login-feature-card">
                        <span className="feature-icon">✅</span>
                        <div>
                            <div className="feature-title">Easy Verification</div>
                            <div className="feature-desc">Instant credential verification for compliance</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel */}
            <div className="login-right">
                <div className="login-form-container">
                    <div className="login-form-header">
                        <h2>Welcome back 👋</h2>
                        <p>Sign in to your Certification Tracker account</p>
                    </div>

                    <form onSubmit={handleSubmit} className="login-form">
                        <div className="form-group">
                            <label>Email Address</label>
                            <div className="input-wrapper">
                                <span className="input-icon">✉️</span>
                                <input
                                    type="email"
                                    className="form-control"
                                    placeholder="you@example.com"
                                    value={email}
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <div className="input-wrapper">
                                <span className="input-icon">🔒</span>
                                <input
                                    type={showPass ? 'text' : 'password'}
                                    className="form-control"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={e => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="pass-toggle"
                                    onClick={() => setShowPass(v => !v)}
                                >
                                    {showPass ? '🙈' : '👁'}
                                </button>
                            </div>
                        </div>

                        {error && <div className="login-error">{error}</div>}

                        <button type="submit" className="btn btn-primary login-submit">
                            Sign In
                        </button>
                    </form>

                    <div className="demo-section">
                        <p className="demo-label">Quick Access — Demo Accounts</p>

                        <div className="demo-account" onClick={() => quickLogin('admin@certify.pro', 'admin123')}>
                            <div className="demo-tag-row">
                                <span className="demo-type">ADMIN ACCOUNT</span>
                            </div>
                            <div className="demo-row">
                                <div>
                                    <div className="demo-email">admin@certify.pro</div>
                                    <div className="demo-pass">🔑 admin123</div>
                                </div>
                                <span className="role-tag admin">ADMIN</span>
                            </div>
                        </div>

                        <div className="demo-account" onClick={() => quickLogin('john@example.com', 'user123')}>
                            <div className="demo-tag-row">
                                <span className="demo-type">USER ACCOUNT (JOHN)</span>
                            </div>
                            <div className="demo-row">
                                <div>
                                    <div className="demo-email">john@example.com</div>
                                    <div className="demo-pass">🔑 user123</div>
                                </div>
                                <span className="role-tag user">USER</span>
                            </div>
                        </div>

                        <div className="demo-account" onClick={() => quickLogin('sarah@example.com', 'user123')}>
                            <div className="demo-tag-row">
                                <span className="demo-type">USER ACCOUNT (SARAH)</span>
                            </div>
                            <div className="demo-row">
                                <div>
                                    <div className="demo-email">sarah@example.com</div>
                                    <div className="demo-pass">🔑 user123</div>
                                </div>
                                <span className="role-tag user">USER</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
