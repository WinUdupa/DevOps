import { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { motion } from 'motion/react';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

interface Registration {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  country: string;
  paper_title: string;
  track_number: string;
  amount_paid: string;
  payment_status: string;
  payment_proof_path: string;
  dietary_requirements: string;
  accommodation: boolean;
  created_at: string;
}

export function AdminDashboard() {
  // Login state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Dashboard state
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [filteredRegistrations, setFilteredRegistrations] = useState<Registration[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'verified'>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Handle admin login
  const handleAdminLogin = async () => {
    setLoginError('');
    setIsLoggingIn(true);

    try {
      if (!adminEmail || !adminPassword) {
        setLoginError('Please enter email and password');
        setIsLoggingIn(false);
        return;
      }

      // Fetch admin credentials from Supabase
      const { data: adminData, error } = await supabase
        .from('admin_credentials')
        .select('email, password')
        .eq('email', adminEmail)
        .single();

      if (error || !adminData) {
        setLoginError('Invalid email or password');
        setIsLoggingIn(false);
        return;
      }

      // Validate password (simple string comparison - in production use bcrypt)
      if (adminData.password !== adminPassword) {
        setLoginError('Invalid email or password');
        setIsLoggingIn(false);
        return;
      }

      setIsLoggedIn(true);
      setAdminPassword('');
      fetchRegistrations();
    } catch (err) {
      console.error('Login error:', err);
      setLoginError('An error occurred. Please try again.');
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Fetch all registrations
  const fetchRegistrations = async () => {
    setIsLoading(true);
    try {
      const { data, error } = await supabase
        .from('conference_registrations')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;

      setRegistrations(data || []);
      filterRegistrations(data || [], filterStatus, searchTerm);
    } catch (err) {
      console.error('Error fetching registrations:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Filter registrations
  const filterRegistrations = (
    data: Registration[],
    status: typeof filterStatus,
    search: string
  ) => {
    let filtered = data;

    if (status !== 'all') {
      filtered = filtered.filter(reg => reg.payment_status === status);
    }

    if (search.trim()) {
      const term = search.toLowerCase();
      filtered = filtered.filter(
        reg =>
          reg.email.toLowerCase().includes(term) ||
          reg.name.toLowerCase().includes(term) ||
          reg.institution.toLowerCase().includes(term)
      );
    }

    setFilteredRegistrations(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterRegistrations(registrations, filterStatus, value);
  };

  const handleStatusFilter = (status: typeof filterStatus) => {
    setFilterStatus(status);
    filterRegistrations(registrations, status, searchTerm);
  };

  const updatePaymentStatus = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from('conference_registrations')
        .update({ payment_status: newStatus })
        .eq('id', id);

      if (error) throw error;

      const updatedRegistrations = registrations.map(reg => 
        reg.id === id ? { ...reg, payment_status: newStatus } : reg
      );
      setRegistrations(updatedRegistrations);
      filterRegistrations(updatedRegistrations, filterStatus, searchTerm);
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  const getFileUrl = async (filePath: string) => {
    try {
      const { data, error } = await supabase.storage
        .from('conference-registration')
        .createSignedUrl(filePath, 3600);

      if (error) {
        console.error('Error getting signed URL:', error);
        alert('Failed to retrieve file. Please try again.');
        return null;
      }

      if (!data || !data.signedUrl) {
        console.error('No signed URL returned');
        alert('Failed to retrieve file URL.');
        return null;
      }

      return data.signedUrl;
    } catch (err) {
      console.error('Error getting file URL:', err);
      alert('An error occurred while retrieving the file.');
      return null;
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setAdminEmail('');
    setAdminPassword('');
    setRegistrations([]);
    setFilteredRegistrations([]);
  };

  // Accommodation list
  const accommodationRequests = registrations.filter(reg => reg.accommodation);

  // Dietary requirements list
  const dietaryRequests = registrations.filter(reg => reg.dietary_requirements);

  // Login Page
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#0B1F3A] via-[#1E4ED8] to-[#0B1F3A] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg p-8 max-w-md w-full shadow-2xl"
        >
          <h1 className="text-3xl font-bold text-[#0B1F3A] mb-2 text-center">Admin Login</h1>
          <p className="text-gray-600 text-center mb-6">Conference Registration Dashboard</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={adminEmail}
                onChange={(e) => setAdminEmail(e.target.value)}
                placeholder="admin@example.com"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4ED8]"
                disabled={isLoggingIn}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4ED8]"
                disabled={isLoggingIn}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
              />
            </div>

            {loginError && (
              <div className="p-3 bg-red-100 text-red-700 rounded-md text-sm border border-red-300">
                {loginError}
              </div>
            )}

            <motion.button
              onClick={handleAdminLogin}
              disabled={isLoggingIn}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-2.5 rounded-md font-semibold text-white transition-all duration-200 bg-[#1E4ED8] hover:bg-[#1a3eb3] disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
            >
              {isLoggingIn ? 'Logging in...' : 'Login'}
            </motion.button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-6">
            Secure Admin Access Only
          </p>
        </motion.div>
      </div>
    );
  }

  // Dashboard Page
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-[#0B1F3A]">Admin Dashboard</h1>
            <p className="text-gray-600 text-sm mt-1">Conference Registration Management</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-md font-semibold hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Total Registrations</h3>
            <p className="text-3xl font-bold text-[#0B1F3A]">{registrations.length}</p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Pending Verification</h3>
            <p className="text-3xl font-bold text-orange-500">
              {registrations.filter(r => r.payment_status === 'pending').length}
            </p>
          </div>
          <div className="bg-white rounded-lg p-6 border border-gray-200">
            <h3 className="text-gray-600 text-sm font-semibold mb-2">Verified</h3>
            <p className="text-3xl font-bold text-green-500">
              {registrations.filter(r => r.payment_status === 'verified').length}
            </p>
          </div>
        </div>

        {/* Registrations Table */}
        <div className="bg-white rounded-lg border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Search by email, name, or institution..."
                value={searchTerm}
                onChange={(e) => handleSearch(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4ED8]"
              />
              <select
                value={filterStatus}
                onChange={(e) => handleStatusFilter(e.target.value as typeof filterStatus)}
                className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#1E4ED8]"
              >
                <option value="all">All Status</option>
                <option value="pending">Pending</option>
                <option value="verified">Verified</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Email</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Institution</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Amount</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Status</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Proof</th>
                  <th className="px-6 py-3 text-left text-sm font-semibold text-gray-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center">Loading...</td>
                  </tr>
                ) : filteredRegistrations.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-8 text-center text-gray-500">No registrations found</td>
                  </tr>
                ) : (
                  filteredRegistrations.map((reg) => (
                    <tr key={reg.id} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.email}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.institution}</td>
                      <td className="px-6 py-4 text-sm text-gray-900">{reg.amount_paid}</td>
                      <td className="px-6 py-4 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                          reg.payment_status === 'verified'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-orange-100 text-orange-800'
                        }`}>
                          {reg.payment_status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {reg.payment_proof_path ? (
                          <button
                            onClick={async () => {
                              const url = await getFileUrl(reg.payment_proof_path);
                              if (url) window.open(url, '_blank');
                            }}
                            className="text-[#1E4ED8] hover:underline font-semibold"
                          >
                            View
                          </button>
                        ) : (
                          <span className="text-gray-400">No file</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-sm">
                        <select
                          value={reg.payment_status}
                          onChange={(e) => updatePaymentStatus(reg.id, e.target.value)}
                          className="px-2 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#1E4ED8]"
                        >
                          <option value="pending">Pending</option>
                          <option value="verified">Verified</option>
                        </select>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}