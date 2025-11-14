"use client";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";
import { getDashboardOverview } from "@/redux/slices/overviewSlice";
import { useToast } from "../../components/Toast";

const DashboardOverview = () => {
    const dispatch = useDispatch();
    const { addToast } = useToast();
    const { 
        overview, 
        stats, 
        pendingApprovals, 
        recentActivities, 
        lastUpdated, 
        loading, 
        error 
    } = useSelector((state) => state.overview);

    const [refreshLoading, setRefreshLoading] = useState(false);

    const fetchDashboardData = async (showLoading = false) => {
        try {
            if (showLoading) setRefreshLoading(true);
            await dispatch(getDashboardOverview()).unwrap();
        } catch (error) {
            console.error('Failed to fetch dashboard data:', error);
            addToast("error", "Failed to load dashboard data ❌");
        } finally {
            if (showLoading) setRefreshLoading(false);
        }
    };

    useEffect(() => {
        fetchDashboardData();
    }, [dispatch]);

    // Stats Cards Data
    const statCards = [
        {
            title: "Total Items",
            value: stats?.summary?.totalItems || 0,
            icon: (
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
            ),
            color: "blue",
            description: "All platform items"
        },
        {
            title: "Pending Approvals",
            value: stats?.summary?.totalPending || 0,
            icon: (
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            color: "yellow",
            description: "Items awaiting review"
        },
        {
            title: "Recent Additions",
            value: stats?.summary?.totalRecent || 0,
            icon: (
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
            ),
            color: "green",
            description: "New items this period"
        },
        {
            title: "Pending Actions",
            value: pendingApprovals?.total || 0,
            icon: (
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
            ),
            color: "red",
            description: "Urgent approvals needed"
        }
    ];

    // Quick Action Cards
    const quickActions = [
        {
            title: "Car Approvals",
            count: pendingApprovals?.cars || 0,
            icon: "🚗",
            href: "/admin/car-approval",
            color: "blue",
            description: "Review car listings"
        },
        {
            title: "Property Approvals",
            count: pendingApprovals?.properties || 0,
            icon: "🏠",
            href: "/admin/property-approval",
            color: "green",
            description: "Review property listings"
        },
        {
            title: "Job Approvals",
            count: pendingApprovals?.jobs || 0,
            icon: "💼",
            href: "/admin/job",
            color: "purple",
            description: "Review job postings"
        },
        {
            title: "Enquiries",
            count: stats?.counts?.enquiries?.pending || 0,
            icon: "📞",
            href: "/admin/enquiries",
            color: "orange",
            description: "Manage customer enquiries"
        }
    ];

    const getStatusBadge = (status) => {
        const statusConfig = {
            pending: { color: 'bg-yellow-100 text-yellow-800', label: 'Pending' },
            approved: { color: 'bg-green-100 text-green-800', label: 'Approved' },
            contacted: { color: 'bg-blue-100 text-blue-800', label: 'Contacted' }
        };

        const config = statusConfig[status] || statusConfig.pending;
        return (
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>
                {config.label}
            </span>
        );
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const getTimeAgo = (dateString) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
        
        if (diffInHours < 1) return 'Just now';
        if (diffInHours < 24) return `${diffInHours}h ago`;
        return `${Math.floor(diffInHours / 24)}d ago`;
    };

    // Loading state
    if (loading && !overview) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                    <p className="mt-4 text-gray-600">Loading dashboard...</p>
                </div>
            </div>
        );
    }

    // Error state
    if (error && !overview) {
        return (
            <div className="min-h-screen bg-gray-50 p-6 flex items-center justify-center">
                <div className="text-center text-red-600">
                    <p className="text-lg font-semibold">Error loading dashboard</p>
                    <p className="mt-2">{error}</p>
                    <button
                        onClick={() => fetchDashboardData(true)}
                        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Retry
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                        <p className="text-gray-600">
                            Welcome to your admin dashboard
                            {lastUpdated && (
                                <span className="text-sm text-gray-500 ml-2">
                                    • Last updated: {getTimeAgo(lastUpdated)}
                                </span>
                            )}
                        </p>
                    </div>
                    <button
                        onClick={() => fetchDashboardData(true)}
                        disabled={refreshLoading}
                        className="mt-4 lg:mt-0 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
                    >
                        {refreshLoading ? (
                            <>
                                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                                Refreshing...
                            </>
                        ) : (
                            <>
                                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                </svg>
                                Refresh Data
                            </>
                        )}
                    </button>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {statCards.map((card, index) => (
                        <div key={index} className="bg-white rounded-lg shadow p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-gray-600">{card.title}</p>
                                    <p className="text-2xl font-bold text-gray-900 mt-1">{card.value}</p>
                                    <p className="text-xs text-gray-500 mt-1">{card.description}</p>
                                </div>
                                <div className={`rounded-full p-3 bg-${card.color}-100`}>
                                    {card.icon}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Quick Actions */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {quickActions.map((action, index) => (
                        <Link key={index} href={action.href}>
                            <div className={`bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow cursor-pointer border-l-4 border-${action.color}-500`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-600">{action.title}</p>
                                        <p className="text-2xl font-bold text-gray-900 mt-1">{action.count}</p>
                                        <p className="text-xs text-gray-500 mt-1">{action.description}</p>
                                    </div>
                                    <div className="text-2xl">{action.icon}</div>
                                </div>
                                {action.count > 0 && (
                                    <div className="mt-3">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${action.color}-100 text-${action.color}-800`}>
                                            Action Required
                                        </span>
                                    </div>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Recent Cars */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Recent Cars</h3>
                                <Link href="/admin/car-approval" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentActivities?.cars?.length > 0 ? (
                                <div className="space-y-4">
                                    {recentActivities.cars.slice(0, 5).map((car) => (
                                        <div key={car._id} className="flex items-center justify-between py-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">{car.title}</p>
                                                <p className="text-sm text-gray-500">
                                                    {car.brand} • {car.model}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {formatDate(car.createdAt)}
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                {getStatusBadge(car.approvalStatus)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent cars</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Properties */}
                    <div className="bg-white rounded-lg shadow">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Recent Properties</h3>
                                <Link href="/admin/property-approval" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentActivities?.properties?.length > 0 ? (
                                <div className="space-y-4">
                                    {recentActivities.properties.slice(0, 5).map((property) => (
                                        <div key={property._id} className="flex items-center justify-between py-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900 capitalize">
                                                    {property.propertyType} Property
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {formatDate(property.createdAt)}
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                {getStatusBadge(property.approvalStatus)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent properties</p>
                            )}
                        </div>
                    </div>

                    {/* Recent Enquiries */}
                    <div className="bg-white rounded-lg shadow lg:col-span-2">
                        <div className="px-6 py-4 border-b border-gray-200">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Recent Enquiries</h3>
                                <Link href="/admin/enquiries" className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                                    View All
                                </Link>
                            </div>
                        </div>
                        <div className="p-6">
                            {recentActivities?.enquiries?.length > 0 ? (
                                <div className="space-y-4">
                                    {recentActivities.enquiries.slice(0, 5).map((enquiry) => (
                                        <div key={enquiry._id} className="flex items-center justify-between py-2">
                                            <div className="flex-1">
                                                <p className="text-sm font-medium text-gray-900">
                                                    {enquiry.name || 'Anonymous'} • {enquiry.category?.name}
                                                </p>
                                                <p className="text-sm text-gray-500">
                                                    {enquiry.email}
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    {formatDate(enquiry.createdAt)}
                                                </p>
                                            </div>
                                            <div className="ml-4">
                                                {getStatusBadge(enquiry.status)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500 text-center py-4">No recent enquiries</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Detailed Stats */}
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Cars Stats */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Cars Statistics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Cars</span>
                                <span className="font-medium">{stats?.counts?.cars?.total || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pending Approval</span>
                                <span className="font-medium text-yellow-600">{stats?.counts?.cars?.pending || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Recent Additions</span>
                                <span className="font-medium text-green-600">{stats?.counts?.cars?.recent || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Properties Stats */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Properties Statistics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Properties</span>
                                <span className="font-medium">{stats?.counts?.properties?.total || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Pending Approval</span>
                                <span className="font-medium text-yellow-600">{stats?.counts?.properties?.pending || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Recent Additions</span>
                                <span className="font-medium text-green-600">{stats?.counts?.properties?.recent || 0}</span>
                            </div>
                        </div>
                    </div>

                    {/* Content Stats */}
                    <div className="bg-white rounded-lg shadow p-6">
                        <h4 className="text-lg font-medium text-gray-900 mb-4">Content Statistics</h4>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Blog Posts</span>
                                <span className="font-medium">{stats?.counts?.blogs?.total || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Categories</span>
                                <span className="font-medium">{stats?.counts?.content?.categories || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Destinations</span>
                                <span className="font-medium">{stats?.counts?.content?.destinations || 0}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Jobs</span>
                                <span className="font-medium">{stats?.counts?.content?.jobs || 0}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardOverview;