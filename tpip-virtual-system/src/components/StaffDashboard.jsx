import { useState } from 'react';
import {
  Search, Building2, Users, CheckCircle, Clock, Eye, Download,
  XCircle, RefreshCw, Mail, AlertCircle, ChevronDown, ChevronUp,
} from 'lucide-react';
import { getAllApplications, mockStaffUsers, getProfessionalById } from '../data/mockData';

const STATUS_BADGES = {
  'Pending Signatures': { color: 'bg-yellow-100 text-yellow-800', icon: Clock },
  Complete: { color: 'bg-green-100 text-green-800', icon: CheckCircle },
  'Under Review': { color: 'bg-blue-100 text-blue-800', icon: Eye },
  Rejected: { color: 'bg-red-100 text-red-800', icon: XCircle },
  Revised: { color: 'bg-gray-100 text-gray-800', icon: RefreshCw },
};

function LoginScreen({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    const user = mockStaffUsers[username];
    if (user) {
      onLogin(user);
    } else {
      setError('Invalid username. Try: admin, vparker, or test');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-8">
        <div className="text-center mb-6">
          <Building2 className="w-10 h-10 text-teal-600 mx-auto mb-2" />
          <h2 className="text-xl font-bold text-gray-900">Staff Login</h2>
          <p className="text-sm text-gray-500">DPIE TPIP Management System</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              placeholder="Any password (demo)"
            />
          </div>
          {error && (
            <p className="text-sm text-red-600 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />{error}
            </p>
          )}
          <button
            onClick={handleLogin}
            className="w-full py-2 bg-teal-600 text-white rounded-lg font-semibold hover:bg-teal-700 transition-colors"
          >
            Sign In
          </button>
          <p className="text-xs text-gray-400 text-center">
            Demo users: admin, vparker, test
          </p>
        </div>
      </div>
    </div>
  );
}

function ApplicationDetail({ app, onBack }) {
  const [expandedSig, setExpandedSig] = useState(null);

  const signedCount = app.signatories.filter((s) => s.status === 'Signed').length;
  const totalCount = app.signatories.length;

  return (
    <div>
      <button
        onClick={onBack}
        className="mb-4 text-teal-600 hover:text-teal-700 text-sm font-medium"
      >
        &larr; Back to Applications
      </button>

      <div className="bg-white rounded-lg shadow p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{app.submissionId}</h3>
            <p className="text-gray-500">Case: {app.caseNumber}</p>
          </div>
          <StatusBadge status={app.status} />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
          <div>
            <span className="text-gray-500">Submitted</span>
            <p className="font-medium">{new Date(app.submittedAt).toLocaleDateString()}</p>
          </div>
          <div>
            <span className="text-gray-500">Applicant</span>
            <p className="font-medium">{app.applicantInfo.applicantName}</p>
          </div>
          <div>
            <span className="text-gray-500">Signatures</span>
            <p className="font-medium">{signedCount} / {totalCount}</p>
          </div>
          <div>
            <span className="text-gray-500">Revision</span>
            <p className="font-medium">#{app.revisionNumber}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h4 className="text-lg font-semibold text-gray-900 mb-4">Signature Status</h4>
        <div className="space-y-3">
          {app.signatories.map((sig, idx) => (
            <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedSig(expandedSig === idx ? null : idx)}
                className="w-full flex items-center justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex items-center gap-3">
                  {sig.status === 'Signed' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : sig.status === 'Rejected' ? (
                    <XCircle className="w-5 h-5 text-red-500" />
                  ) : (
                    <Clock className="w-5 h-5 text-yellow-500" />
                  )}
                  <div className="text-left">
                    <p className="font-medium text-gray-900">{sig.name}</p>
                    <p className="text-sm text-gray-500">{sig.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs px-2 py-1 rounded font-medium ${
                    sig.status === 'Signed' ? 'bg-green-100 text-green-700' :
                    sig.status === 'Rejected' ? 'bg-red-100 text-red-700' :
                    'bg-yellow-100 text-yellow-700'
                  }`}>
                    {sig.status}
                  </span>
                  {expandedSig === idx ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                </div>
              </button>
              {expandedSig === idx && (
                <div className="px-4 pb-4 border-t border-gray-100 bg-gray-50">
                  <div className="grid grid-cols-2 gap-3 text-sm pt-3">
                    <div><span className="text-gray-500">Email:</span> <span className="font-medium ml-1">{sig.email}</span></div>
                    <div>
                      <span className="text-gray-500">
                        {sig.status === 'Signed' ? 'Signed At:' : 'Status:'}
                      </span>
                      <span className="font-medium ml-1">
                        {sig.signedAt ? new Date(sig.signedAt).toLocaleString() : 'Awaiting response'}
                      </span>
                    </div>
                  </div>
                  {sig.status === 'Pending' && (
                    <button
                      onClick={() => alert(`Reminder email would be sent to ${sig.email}`)}
                      className="mt-3 flex items-center gap-2 px-3 py-1.5 bg-teal-600 text-white rounded text-sm hover:bg-teal-700 transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      Resend Request
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {app.previousVersions.length > 0 && (
        <div className="bg-white rounded-lg shadow p-6 mt-6">
          <h4 className="text-lg font-semibold text-gray-900 mb-4">Revision History</h4>
          <div className="space-y-2">
            {app.previousVersions.map((v, idx) => (
              <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900 text-sm">{v.submissionId}</p>
                  <p className="text-xs text-gray-500">{new Date(v.submittedAt).toLocaleDateString()}</p>
                </div>
                <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded">{v.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function StatusBadge({ status }) {
  const badge = STATUS_BADGES[status] || { color: 'bg-gray-100 text-gray-800', icon: AlertCircle };
  const Icon = badge.icon;
  return (
    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium ${badge.color}`}>
      <Icon className="w-3 h-3" />
      {status}
    </span>
  );
}

export default function StaffDashboard({ onBack }) {
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);

  if (!user) {
    return <LoginScreen onLogin={setUser} />;
  }

  const applications = getAllApplications();
  const filtered = applications.filter((app) => {
    const matchesSearch =
      !searchQuery ||
      app.submissionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.caseNumber.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === 'All' || app.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter((a) => a.status === 'Pending Signatures').length,
    complete: applications.filter((a) => a.status === 'Complete').length,
    review: applications.filter((a) => a.status === 'Under Review').length,
  };

  if (selectedApp) {
    return (
      <div className="min-h-screen bg-gray-50">
        <header className="bg-teal-700 text-white px-6 py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Building2 className="w-6 h-6" />
              <span className="font-bold text-lg">DPIE TPIP Dashboard</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm">{user.name} ({user.role})</span>
              <button onClick={() => setUser(null)} className="text-sm underline hover:no-underline">Logout</button>
            </div>
          </div>
        </header>
        <div className="max-w-7xl mx-auto p-6">
          <ApplicationDetail app={selectedApp} onBack={() => setSelectedApp(null)} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-teal-700 text-white px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Building2 className="w-6 h-6" />
            <span className="font-bold text-lg">DPIE TPIP Dashboard</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm">{user.name} ({user.role})</span>
            <button onClick={() => setUser(null)} className="text-sm underline hover:no-underline">Logout</button>
            {onBack && (
              <button onClick={onBack} className="text-sm bg-teal-600 px-3 py-1 rounded hover:bg-teal-500">
                Applicant Portal
              </button>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {[
            { label: 'Total Applications', value: stats.total, color: 'text-teal-600', bg: 'bg-teal-50', icon: Users },
            { label: 'Pending Signatures', value: stats.pending, color: 'text-yellow-600', bg: 'bg-yellow-50', icon: Clock },
            { label: 'Complete', value: stats.complete, color: 'text-green-600', bg: 'bg-green-50', icon: CheckCircle },
            { label: 'Under Review', value: stats.review, color: 'text-blue-600', bg: 'bg-blue-50', icon: Eye },
          ].map((stat) => (
            <div key={stat.label} className={`${stat.bg} rounded-lg p-4`}>
              <div className="flex items-center gap-2 mb-1">
                <stat.icon className={`w-4 h-4 ${stat.color}`} />
                <span className="text-sm text-gray-600">{stat.label}</span>
              </div>
              <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by case number or submission ID..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          >
            <option value="All">All Status</option>
            <option value="Pending Signatures">Pending Signatures</option>
            <option value="Complete">Complete</option>
            <option value="Under Review">Under Review</option>
          </select>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Submission ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Case Number</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Submitted</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Signatures</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filtered.map((app) => {
                  const signed = app.signatories.filter((s) => s.status === 'Signed').length;
                  const total = app.signatories.length;
                  return (
                    <tr key={app.submissionId} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900 text-sm">{app.submissionId}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{app.caseNumber}</td>
                      <td className="px-4 py-3 text-gray-600 text-sm">{new Date(app.submittedAt).toLocaleDateString()}</td>
                      <td className="px-4 py-3"><StatusBadge status={app.status} /></td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${(signed / total) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-gray-500">{signed}/{total}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => setSelectedApp(app)}
                            className="p-1.5 bg-teal-100 text-teal-700 rounded hover:bg-teal-200 transition-colors"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => alert('PDF download would be triggered in production.')}
                            className="p-1.5 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition-colors"
                            title="Download PDF"
                          >
                            <Download className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No applications found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
