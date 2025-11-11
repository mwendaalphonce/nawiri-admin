"use client";

import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Users, UserCheck, UserX, DollarSign, CreditCard, Wallet, Ticket, ArrowUpRight, Eye, Edit, Lock, LucideIcon } from 'lucide-react';

// ==================== TYPES ====================

interface ChartDataPoint {
  date: string;
  deposit: number;
  withdrawal: number;
  fdr: number;
  loan: number;
  bill: number;
  withdraw2: number;
}

interface PieDataPoint {
  name: string;
  value: number;
  [key: string]: string | number;
}

interface User {
  id: number;
  avatar: string;
  name: string;
  email: string;
  balance: string;
  kyc: string;
  status: string;
}

interface StatCardData {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  link: string;
}

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  color: string;
  onClick?: () => void;
  link?: string;
}

interface SiteStatisticsChartProps {
  data: ChartDataPoint[];
  dateRange: string;
}

interface DonutChartProps {
  title: string;
  data: PieDataPoint[];
  colors?: string[];
}

interface ActionButtonProps {
  icon: LucideIcon;
  color: string;
  onClick: () => void;
  label: string;
}

interface UserRowProps {
  user: User;
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onLock: (user: User) => void;
}

interface UsersTableProps {
  users: User[];
  onView: (user: User) => void;
  onEdit: (user: User) => void;
  onLock: (user: User) => void;
}

interface StatsGridProps {
  onStatClick: (stat: StatCardData) => void;
}

// ==================== SAMPLE DATA ====================

const siteStatsData: ChartDataPoint[] = [
  { date: '03 Nov', deposit: 0.9, withdrawal: 0.85, fdr: 0.8, loan: 0.75, bill: 0.7, withdraw2: 0.65 },
  { date: '04 Nov', deposit: 0.85, withdrawal: 0.9, fdr: 0.75, loan: 0.8, bill: 0.75, withdraw2: 0.7 },
  { date: '05 Nov', deposit: 0.95, withdrawal: 0.88, fdr: 0.85, loan: 0.82, bill: 0.78, withdraw2: 0.72 },
  { date: '06 Nov', deposit: 0.92, withdrawal: 0.91, fdr: 0.83, loan: 0.84, bill: 0.8, withdraw2: 0.75 },
  { date: '07 Nov', deposit: 0.88, withdrawal: 0.87, fdr: 0.81, loan: 0.79, bill: 0.76, withdraw2: 0.71 },
  { date: '08 Nov', deposit: 0.91, withdrawal: 0.89, fdr: 0.84, loan: 0.81, bill: 0.77, withdraw2: 0.73 },
  { date: '09 Nov', deposit: 0.94, withdrawal: 0.92, fdr: 0.86, loan: 0.83, bill: 0.79, withdraw2: 0.74 },
  { date: '10 Nov', deposit: 0.96, withdrawal: 0.94, fdr: 0.88, loan: 0.85, bill: 0.81, withdraw2: 0.76 },
];

const fundTransferData: PieDataPoint[] = [
  { name: 'Fund Transfer', value: 75 },
  { name: 'Fund Wire Transfer', value: 25 },
];

const countryData: PieDataPoint[] = [
  { name: 'Kenya', value: 45 },
  { name: 'All', value: 55 },
];

const browserData: PieDataPoint[] = [
  { name: 'Chrome', value: 85 },
  { name: 'Safari', value: 15 },
];

const osData: PieDataPoint[] = [
  { name: 'Windows', value: 60 },
  { name: 'Android', value: 15 },
  { name: 'Linux', value: 8 },
  { name: 'iOS', value: 10 },
  { name: 'MacOS', value: 7 },
];

const COLORS: string[] = ['#8B5CF6', '#10B981', '#F59E0B', '#EF4444', '#3B82F6', '#EC4899'];

const latestUsers: User[] = [
  { id: 1, avatar: 'JA', name: 'Jack', email: 'ronohJack@gmail.com', balance: 'KES10000', kyc: 'Unverified', status: 'Active' },
  { id: 2, avatar: 'VC', name: 'Vic', email: 'chugi@gmail.com', balance: 'KES10000', kyc: 'Unverified', status: 'Active' },
  { id: 3, avatar: 'EK', name: 'Evin', email: 'bueche-19-regatre...', balance: 'KES10000', kyc: 'Unverified', status: 'Active' },
  { id: 4, avatar: 'AM', name: 'alphonce m', email: 'loveslygenah@gmail.co...', balance: 'KES10000', kyc: 'Unverified', status: 'Active' },
  { id: 5, avatar: 'AM', name: 'kev', email: 'alphoncemuthurimwend...', balance: 'KES10000', kyc: 'Unverified', status: 'Active' },
];

// ==================== COMPONENTS ====================

// Stat Card Component
const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, color, onClick, link }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (link) {
      console.log(`Navigate to: ${link}`);
      // In Next.js: router.push(link)
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`${color} rounded-lg p-3 relative overflow-hidden text-left w-full transition-transform hover:scale-105 hover:shadow-lg cursor-pointer`}
    >
      <div className="flex items-start justify-between">
        <div>
          <div className="text-white text-2xl font-bold">{value}</div>
          <div className="text-white text-xs opacity-90">{title}</div>
        </div>
        <Icon className="text-white opacity-80" size={20} />
      </div>
      <ArrowUpRight className="absolute bottom-2 right-2 text-white opacity-60" size={16} />
    </button>
  );
};

// Line Chart Component
const SiteStatisticsChart: React.FC<SiteStatisticsChartProps> = ({ data, dateRange }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-sm font-semibold text-gray-800">Site Statistics</h2>
        <span className="text-xs text-gray-500">{dateRange}</span>
      </div>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis tick={{ fontSize: 10 }} />
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
          <Line type="monotone" dataKey="deposit" stroke="#EF4444" strokeWidth={2} dot={false} name="Total Deposit" />
          <Line type="monotone" dataKey="withdrawal" stroke="#1F2937" strokeWidth={2} dot={false} name="Total Withdraw" />
          <Line type="monotone" dataKey="fdr" stroke="#10B981" strokeWidth={2} dot={false} name="Total FDR" />
          <Line type="monotone" dataKey="loan" stroke="#8B5CF6" strokeWidth={2} dot={false} name="Total Loan" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

// Donut Chart Component
const DonutChart: React.FC<DonutChartProps> = ({ title, data, colors = COLORS }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-3">{title}</h2>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend wrapperStyle={{ fontSize: '10px' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

// Action Button Component
const ActionButton: React.FC<ActionButtonProps> = ({ icon: Icon, color, onClick, label }) => {
  return (
    <button
      onClick={onClick}
      className={`w-6 h-6 ${color} text-white rounded-full flex items-center justify-center hover:opacity-80 transition-opacity`}
      title={label}
    >
      <Icon size={12} />
    </button>
  );
};

// User Row Component
const UserRow: React.FC<UserRowProps> = ({ user, onView, onEdit, onLock }) => {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      <td className="p-2">
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-white text-xs font-semibold">
          {user.avatar}
        </div>
      </td>
      <td className="p-2">
        <button
          onClick={() => onView(user)}
          className="text-purple-600 font-medium hover:underline"
        >
          {user.name}
        </button>
      </td>
      <td className="p-2 text-gray-600">{user.email}</td>
      <td className="p-2 font-medium">{user.balance}</td>
      <td className="p-2">
        <span className="bg-yellow-400 text-gray-800 px-2 py-1 rounded text-xs font-medium">
          {user.kyc}
        </span>
      </td>
      <td className="p-2">
        <span className="bg-teal-500 text-white px-2 py-1 rounded text-xs font-medium">
          {user.status}
        </span>
      </td>
      <td className="p-2">
        <div className="flex gap-1">
          <ActionButton
            icon={Eye}
            color="bg-gray-800"
            onClick={() => onView(user)}
            label="View User"
          />
          <ActionButton
            icon={Edit}
            color="bg-purple-600"
            onClick={() => onEdit(user)}
            label="Edit User"
          />
          <ActionButton
            icon={Lock}
            color="bg-pink-500"
            onClick={() => onLock(user)}
            label="Lock User"
          />
        </div>
      </td>
    </tr>
  );
};

// Users Table Component
const UsersTable: React.FC<UsersTableProps> = ({ users, onView, onEdit, onLock }) => {
  return (
    <div className="bg-white rounded-lg p-4">
      <h2 className="text-sm font-semibold text-gray-800 mb-3">Latest Users</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="bg-purple-50 text-gray-700">
              <th className="p-2 text-left">Avatar</th>
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Balance</th>
              <th className="p-2 text-left">KYC</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <UserRow
                key={user.id}
                user={user}
                onView={onView}
                onEdit={onEdit}
                onLock={onLock}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// Stats Grid Component
const StatsGrid: React.FC<StatsGridProps> = ({ onStatClick }) => {
  const stats: StatCardData[] = [
    { title: 'Total Users', value: '7', icon: Users, color: 'bg-pink-500', link: '/users' },
    { title: 'Active Users', value: '7', icon: UserCheck, color: 'bg-purple-600', link: '/users/active' },
    { title: 'Disabled Users', value: '0', icon: UserX, color: 'bg-teal-500', link: '/users/disabled' },
    { title: 'Total Staff', value: '0', icon: Users, color: 'bg-blue-600', link: '/staff' },
    { title: 'Total Deposits', value: 'KES0', icon: DollarSign, color: 'bg-slate-700', link: '/deposits' },
    { title: 'Total Withdraw', value: 'KES0', icon: Wallet, color: 'bg-green-700', link: '/withdrawals' },
    { title: 'Total Referral', value: '0', icon: Users, color: 'bg-orange-500', link: '/referrals' },
    { title: 'Total Fund Transfer', value: 'KES615', icon: CreditCard, color: 'bg-purple-400', link: '/transfers' },
    { title: 'Total DPS', value: 'KES0', icon: DollarSign, color: 'bg-slate-600', link: '/dps' },
    { title: 'Total FDR', value: 'KES0', icon: DollarSign, color: 'bg-teal-600', link: '/fdr' },
    { title: 'Total Loan', value: 'KES0', icon: DollarSign, color: 'bg-purple-500', link: '/loans' },
    { title: 'Total Pay Bill', value: 'KES0', icon: DollarSign, color: 'bg-blue-500', link: '/bills' },
    { title: 'Total Reward Points', value: '0', icon: Ticket, color: 'bg-pink-500', link: '/rewards' },
    { title: 'Deposit Bonus', value: 'KES0', icon: DollarSign, color: 'bg-purple-600', link: '/bonuses' },
    { title: 'Total Automatic Gateways', value: '0', icon: CreditCard, color: 'bg-teal-500', link: '/gateways' },
    { title: 'Total Ticket', value: '0', icon: Ticket, color: 'bg-purple-600', link: '/tickets' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
      {stats.map((stat, index) => (
        <StatCard
          key={index}
          {...stat}
          onClick={() => onStatClick(stat)}
        />
      ))}
    </div>
  );
};

// ==================== MAIN DASHBOARD ====================

const Dashboard: React.FC = () => {
  const [selectedStat, setSelectedStat] = useState<StatCardData | null>(null);

  const handleStatClick = (stat: StatCardData) => {
    console.log('Stat clicked:', stat);
    setSelectedStat(stat);
    // In Next.js: router.push(stat.link)
    alert(`Navigating to: ${stat.link}\nTitle: ${stat.title}\nValue: ${stat.value}`);
  };

  const handleViewUser = (user: User) => {
    console.log('View user:', user);
    // In Next.js: router.push(`/users/${user.id}`)
    alert(`Viewing user: ${user.name}`);
  };

  const handleEditUser = (user: User) => {
    console.log('Edit user:', user);
    // In Next.js: router.push(`/users/${user.id}/edit`)
    alert(`Editing user: ${user.name}`);
  };

  const handleLockUser = (user: User) => {
    console.log('Lock user:', user);
    // API call to lock user
    alert(`Locking user: ${user.name}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-4">
        <h1 className="text-xl font-bold text-gray-800">Nawiri Digital Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <StatsGrid onStatClick={handleStatClick} />

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SiteStatisticsChart 
          data={siteStatsData} 
          dateRange="10/03/2025 - 11/10/2025" 
        />
        <DonutChart 
          title="Fund Transfer Statistics" 
          data={fundTransferData}
          colors={['#8B5CF6', '#10B981']}
        />
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <DonutChart 
          title="Top Country Statistics" 
          data={countryData}
          colors={['#10B981', '#8B5CF6']}
        />
        <DonutChart 
          title="Top Browser Statistics" 
          data={browserData}
          colors={['#10B981', '#EF4444']}
        />
        <DonutChart 
          title="Top OS Statistics" 
          data={osData}
        />
      </div>

      {/* Latest Users Table */}
      <UsersTable
        users={latestUsers}
        onView={handleViewUser}
        onEdit={handleEditUser}
        onLock={handleLockUser}
      />
    </div>
  );
};

export default Dashboard;