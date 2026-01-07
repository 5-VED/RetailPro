import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Input } from '@/components/ui/input';
import Navbar from '../components/Navbar';
import {
    TrendingUp,
    Wallet,
    ShoppingCart,
    CreditCard,
    Plus,
    Pencil,
    Check,
    X
} from 'lucide-react';

const mockSalesData = [
    { date: 'Mon', sales: 4500 },
    { date: 'Tue', sales: 5200 },
    { date: 'Wed', sales: 4800 },
    { date: 'Thu', sales: 6100 },
    { date: 'Fri', sales: 7200 },
    { date: 'Sat', sales: 8500 },
    { date: 'Sun', sales: 6800 },
];

const mockRecentSales = [
    { id: 1, product: 'Blue Shirt', qty: 2, amount: 1200, payment: 'Cash', time: '10:30 AM' },
    { id: 2, product: 'White Shirt', qty: 1, amount: 800, payment: 'Online', time: '11:15 AM' },
    { id: 3, product: 'Black Shirt', qty: 3, amount: 1800, payment: 'Cash', time: '12:00 PM' },
    { id: 4, product: 'Red Shirt', qty: 1, amount: 600, payment: 'Online', time: '01:30 PM' },
];

const Dashboard = ({ onNavigate }) => {
    const [openingBalance, setOpeningBalance] = useState(10000);
    const [cashReceived] = useState(3600);
    const [onlineReceived] = useState(1400);

    // Edit Balance State
    const [isEditingBalance, setIsEditingBalance] = useState(false);
    const [tempBalance, setTempBalance] = useState('');

    const closingBalance = openingBalance + cashReceived + onlineReceived;

    const handleStartEdit = () => {
        setTempBalance(openingBalance.toString());
        setIsEditingBalance(true);
    };

    const handleSaveBalance = () => {
        const val = parseFloat(tempBalance);
        if (!isNaN(val)) {
            setOpeningBalance(val);
        }
        setIsEditingBalance(false);
    };

    const handleCancelEdit = () => {
        setIsEditingBalance(false);
    };

    const stats = [
        {
            id: 'opening',
            title: 'Opening Balance',
            value: `₹${openingBalance.toLocaleString()}`,
            icon: Wallet,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50',
            testId: 'opening-balance-card'
        },
        {
            id: 'cash',
            title: 'Cash Received',
            value: `₹${cashReceived.toLocaleString()}`,
            icon: CreditCard,
            color: 'text-green-600',
            bgColor: 'bg-green-50',
            testId: 'cash-received-card'
        },
        {
            id: 'online',
            title: 'Online Received',
            value: `₹${onlineReceived.toLocaleString()}`,
            icon: ShoppingCart,
            color: 'text-orange-600',
            bgColor: 'bg-orange-50',
            testId: 'online-received-card'
        },
        {
            id: 'closing',
            title: 'Closing Balance',
            value: `₹${closingBalance.toLocaleString()}`,
            icon: TrendingUp,
            color: 'text-purple-600',
            bgColor: 'bg-purple-50',
            testId: 'closing-balance-card'
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row md:items-start lg:mb-8">
                    <div className="text-center md:text-left">
                        <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">Dashboard</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Track your daily sales and financial performance
                        </p>
                    </div>
                    <Button
                        size="default"
                        onClick={() => onNavigate('add-sale')}
                        data-testid="add-sale-button"
                        className="w-full md:w-auto"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Sale
                    </Button>
                </div>

                {/* Stats Grid */}
                <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:mb-8 lg:grid-cols-4">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        const isOpening = stat.id === 'opening';

                        return (
                            <Card key={stat.id} data-testid={stat.testId} className="group">
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div className="space-y-1 w-full">
                                            <p className="text-sm font-medium text-muted-foreground">
                                                {stat.title}
                                            </p>

                                            {isOpening && isEditingBalance ? (
                                                <div className="flex items-center gap-2">
                                                    <Input
                                                        type="number"
                                                        value={tempBalance}
                                                        onChange={(e) => setTempBalance(e.target.value)}
                                                        className="h-8 w-32"
                                                        autoFocus
                                                    />
                                                    <Button size="icon" variant="ghost" onClick={handleSaveBalance} className="h-8 w-8 hover:bg-green-100">
                                                        <Check className="h-4 w-4 text-green-600" />
                                                    </Button>
                                                    <Button size="icon" variant="ghost" onClick={handleCancelEdit} className="h-8 w-8 hover:bg-red-100">
                                                        <X className="h-4 w-4 text-red-600" />
                                                    </Button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <p className={`text-2xl font-bold ${stat.color} lg:text-3xl`}>
                                                        {stat.value}
                                                    </p>
                                                    {isOpening && (
                                                        <Button
                                                            size="icon"
                                                            variant="ghost"
                                                            onClick={handleStartEdit}
                                                            className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                                        >
                                                            <Pencil className="h-3 w-3 text-muted-foreground" />
                                                        </Button>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                        <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                                            <Icon className={`h-6 w-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="mb-6 grid grid-cols-1 gap-6 lg:mb-8 lg:grid-cols-3">
                    {/* Sales Chart */}
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle>Sales Trend</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[250px] w-full md:h-[300px] lg:h-[350px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={mockSalesData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#E2E8F0" />
                                        <XAxis dataKey="date" stroke="#64748B" />
                                        <YAxis stroke="#64748B" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: '#FFFFFF',
                                                border: '1px solid #E2E8F0',
                                                borderRadius: '8px',
                                            }}
                                        />
                                        <Line
                                            type="monotone"
                                            dataKey="sales"
                                            stroke="#0288D1"
                                            strokeWidth={3}
                                            dot={{ fill: '#0288D1', r: 5 }}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Quick Actions */}
                    <Card>
                        <CardHeader>
                            <CardTitle>Quick Actions</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button
                                className="w-full justify-start"
                                onClick={() => onNavigate('add-sale')}
                                data-testid="quick-add-sale-button"
                            >
                                <Plus className="mr-2 h-4 w-4" />
                                Add Sale
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => onNavigate('products')}
                                data-testid="view-products-button"
                            >
                                View Products
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => onNavigate('customers')}
                                data-testid="view-customers-button"
                            >
                                View Customers
                            </Button>
                            <Button
                                variant="outline"
                                className="w-full justify-start"
                                onClick={() => onNavigate('reports')}
                                data-testid="view-reports-button"
                            >
                                View Reports
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Sales Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Recent Sales</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Quantity</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Payment</TableHead>
                                        <TableHead>Time</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {mockRecentSales.map((sale) => (
                                        <TableRow key={sale.id} data-testid={`sale-row-${sale.id}`}>
                                            <TableCell className="font-medium">{sale.product}</TableCell>
                                            <TableCell>{sale.qty}</TableCell>
                                            <TableCell className="font-semibold">₹{sale.amount}</TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant={sale.payment === 'Cash' ? 'default' : 'secondary'}
                                                    className={
                                                        sale.payment === 'Cash'
                                                            ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                            : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                                    }
                                                >
                                                    {sale.payment}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-muted-foreground">{sale.time}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Dashboard;
