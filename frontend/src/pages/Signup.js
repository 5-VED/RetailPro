import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { UserPlus, Check } from 'lucide-react';

const CATEGORIES = [
    'Shirts',
    'Shoes',
    'Grocery',
    'Electronics',
    'Stationery',
    'Books',
    'Cosmetics',
    'Jewellery',
    'Sports',
    'Toys',
];

const Signup = ({ onSwitchToLogin }) => {
    const [activeStep, setActiveStep] = useState(0);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [shopName, setShopName] = useState('');
    const [sellerName, setSellerName] = useState('');
    const [category, setCategory] = useState('');

    const steps = ['Mobile Number', 'Verify OTP', 'Shop Details'];

    const handleSendOTP = () => {
        if (mobile.length === 10) {
            setActiveStep(1);
        }
    };

    const handleVerifyOTP = () => {
        if (otp.length === 6) {
            setActiveStep(2);
        }
    };

    const handleCompleteSignup = () => {
        console.log('Signup Complete:', { mobile, shopName, sellerName, category });
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-center">
                <div className="max-w-md mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">RetailPro</h1>
                    <h2 className="text-2xl mb-4 opacity-95">Join Thousands of Sellers</h2>
                    <p className="text-lg opacity-90">
                        Start tracking your sales and managing your business efficiently today.
                    </p>
                </div>
            </div>

            {/* Right Side - Signup Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="space-y-1 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <UserPlus className="h-12 w-12 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                            <CardDescription>Get started with your retail business</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {/* Progress Stepper */}
                            <div className="flex justify-between mb-8">
                                {steps.map((step, index) => (
                                    <div key={step} className="flex flex-col items-center flex-1">
                                        <div
                                            className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${index <= activeStep
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            {index < activeStep ? <Check className="h-4 w-4" /> : index + 1}
                                        </div>
                                        <p className="text-xs mt-2 text-center hidden sm:block">{step}</p>
                                    </div>
                                ))}
                            </div>

                            {/* Step 0: Mobile Number */}
                            {activeStep === 0 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-mobile">Mobile Number</Label>
                                        <Input
                                            id="signup-mobile"
                                            data-testid="signup-mobile-input"
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            maxLength={10}
                                        />
                                    </div>
                                    <Button
                                        data-testid="signup-send-otp-button"
                                        className="w-full"
                                        onClick={handleSendOTP}
                                        disabled={mobile.length !== 10}
                                    >
                                        Send OTP
                                    </Button>
                                </>
                            )}

                            {/* Step 1: OTP Verification */}
                            {activeStep === 1 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="signup-otp">Enter OTP</Label>
                                        <Input
                                            id="signup-otp"
                                            data-testid="signup-otp-input"
                                            type="text"
                                            placeholder="6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            maxLength={6}
                                        />
                                    </div>
                                    <Button
                                        data-testid="signup-verify-otp-button"
                                        className="w-full"
                                        onClick={handleVerifyOTP}
                                        disabled={otp.length !== 6}
                                    >
                                        Verify OTP
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={() => setActiveStep(0)}>
                                        Back
                                    </Button>
                                </>
                            )}

                            {/* Step 2: Shop Details */}
                            {activeStep === 2 && (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="shop-name">Shop Name</Label>
                                        <Input
                                            id="shop-name"
                                            data-testid="shop-name-input"
                                            placeholder="Enter your shop name"
                                            value={shopName}
                                            onChange={(e) => setShopName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="seller-name">Seller Name</Label>
                                        <Input
                                            id="seller-name"
                                            data-testid="seller-name-input"
                                            placeholder="Enter your name"
                                            value={sellerName}
                                            onChange={(e) => setSellerName(e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Primary Product Category</Label>
                                        <Select value={category} onValueChange={setCategory}>
                                            <SelectTrigger id="category" data-testid="category-select">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {CATEGORIES.map((cat) => (
                                                    <SelectItem key={cat} value={cat}>
                                                        {cat}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <Button
                                        data-testid="complete-signup-button"
                                        className="w-full"
                                        onClick={handleCompleteSignup}
                                        disabled={!shopName || !sellerName || !category}
                                    >
                                        Complete Signup
                                    </Button>
                                    <Button variant="outline" className="w-full" onClick={() => setActiveStep(1)}>
                                        Back
                                    </Button>
                                </>
                            )}

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Already have an account? </span>
                                <Button
                                    data-testid="switch-to-login-button"
                                    variant="link"
                                    className="p-0 h-auto font-normal underline"
                                    onClick={onSwitchToLogin}
                                >
                                    Login
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Signup;
