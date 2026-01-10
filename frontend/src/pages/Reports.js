import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Navbar from '../components/Navbar';
import { Calendar as CalendarIcon, Download, TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';

const Reports = ({ onNavigate }) => {
    const [dateFrom, setDateFrom] = useState(new Date());
    const [dateTo, setDateTo] = useState(new Date());

    const stats = [
        {
            title: 'Total Revenue',
            value: '₹45,250',
            change: '+12.5%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-green-600',
        },
        {
            title: 'Total Sales',
            value: '156',
            change: '+8.2%',
            trend: 'up',
            icon: TrendingUp,
            color: 'text-green-600',
        },
        {
            title: 'Avg. Sale Value',
            value: '₹290',
            change: '-2.4%',
            trend: 'down',
            icon: TrendingDown,
            color: 'text-red-600',
        },
    ];

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Analyze your sales performance
                        </p>
                    </div>
                    <Button data-testid="download-report-button">
                        <Download className="mr-2 h-4 w-4" />
                        Download Report
                    </Button>
                </div>

                <Card className="mb-6">
                    <CardHeader>
                        <CardTitle>Select Date Range</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label>From Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !dateFrom && 'text-muted-foreground'
                                            )}
                                            data-testid="from-date-picker"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateFrom ? format(dateFrom, 'PPP') : 'Pick a date'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateFrom} onSelect={setDateFrom} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                            <div className="space-y-2">
                                <Label>To Date</Label>
                                <Popover>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            className={cn(
                                                'w-full justify-start text-left font-normal',
                                                !dateTo && 'text-muted-foreground'
                                            )}
                                            data-testid="to-date-picker"
                                        >
                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                            {dateTo ? format(dateTo, 'PPP') : 'Pick a date'}
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0">
                                        <Calendar mode="single" selected={dateTo} onSelect={setDateTo} />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 mb-6">
                    {stats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                                            <p className="text-2xl font-bold mt-2">{stat.value}</p>
                                            <p className={`text-sm mt-1 ${stat.color}`}>
                                                {stat.change} from last period
                                            </p>
                                        </div>
                                        <Icon className={`h-8 w-8 ${stat.color}`} />
                                    </div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                <Card>
                    <CardHeader>
                        <CardTitle>Report Summary</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground">
                            Detailed report data will be displayed here based on the selected date range.
                        </p>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default Reports;
