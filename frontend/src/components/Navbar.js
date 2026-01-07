import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
    LayoutDashboard,
    Package,
    Users,
    BarChart3,
    Menu,
    LogOut,
} from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

const Navbar = ({ onNavigate }) => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinks = [
        { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard, testId: 'nav-dashboard' },
        { id: 'products', label: 'Products', icon: Package, testId: 'nav-products' },
        { id: 'customers', label: 'Customers', icon: Users, testId: 'nav-customers' },
        { id: 'reports', label: 'Reports', icon: BarChart3, testId: 'nav-reports' },
    ];

    const handleNavClick = (page) => {
        setMobileMenuOpen(false);
        onNavigate(page);
    };

    const handleLogout = () => {
        onNavigate('login');
    };

    return (
        <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <div className="container flex h-16 items-center px-4">
                {/* Logo */}
                <div
                    className="mr-4 cursor-pointer text-xl font-bold text-primary lg:mr-6"
                    onClick={() => handleNavClick('dashboard')}
                    data-testid="app-logo"
                >
                    RetailPro
                </div>

                {/* Desktop Navigation */}
                <nav className="hidden items-center gap-1 md:flex">
                    {navLinks.map((link) => {
                        const Icon = link.icon;
                        return (
                            <Button
                                key={link.id}
                                variant="ghost"
                                size="sm"
                                onClick={() => handleNavClick(link.id)}
                                data-testid={link.testId}
                                className="gap-2"
                            >
                                <Icon className="h-4 w-4" />
                                <span className="hidden lg:inline">{link.label}</span>
                            </Button>
                        );
                    })}
                </nav>

                {/* Spacer */}
                <div className="flex-1" />

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-full"
                            data-testid="user-menu-button"
                        >
                            <Avatar className="h-9 w-9">
                                <AvatarFallback className="bg-primary text-primary-foreground">
                                    U
                                </AvatarFallback>
                            </Avatar>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={handleLogout} data-testid="logout-button">
                            <LogOut className="mr-2 h-4 w-4" />
                            Logout
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Mobile Menu */}
                <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                    <SheetTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="ml-2 md:hidden"
                            data-testid="mobile-menu-button"
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <div className="mb-6 text-xl font-bold text-primary">RetailPro</div>
                        <nav className="flex flex-col gap-2">
                            {navLinks.map((link) => {
                                const Icon = link.icon;
                                return (
                                    <Button
                                        key={link.id}
                                        variant="ghost"
                                        onClick={() => handleNavClick(link.id)}
                                        data-testid={`mobile-${link.testId}`}
                                        className="justify-start gap-3"
                                    >
                                        <Icon className="h-5 w-5" />
                                        {link.label}
                                    </Button>
                                );
                            })}
                        </nav>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
};

export default Navbar;
