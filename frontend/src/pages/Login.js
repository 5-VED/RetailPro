import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { LogIn } from 'lucide-react';

const Login = ({ onSwitchToSignup }) => {
    const [step, setStep] = useState(1);
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');

    const handleSendOTP = () => {
        if (mobile.length === 10) {
            setStep(2);
        }
    };

    const handleVerifyOTP = () => {
        console.log('Verify OTP:', otp);
    };

    return (
        <div className="min-h-screen flex">
            {/* Left Side - Branding */}
            <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-blue-600 to-blue-800 text-white p-12 flex-col justify-center">
                <div className="max-w-md mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">RetailPro</h1>
                    <h2 className="text-2xl mb-4 opacity-95">Simplify Your Sales Tracking</h2>
                    <p className="text-lg opacity-90">
                        Track sales, manage inventory, and monitor daily balances - all in one place.
                    </p>
                </div>
            </div>

            {/* Right Side - Login Form */}
            <div className="w-full md:w-1/2 flex items-center justify-center p-4 bg-gray-50">
                <div className="w-full max-w-md">
                    <Card>
                        <CardHeader className="space-y-1 text-center">
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-primary/10 p-3">
                                    <LogIn className="h-12 w-12 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-2xl font-bold">
                                {step === 1 ? 'Welcome Back' : 'Verify OTP'}
                            </CardTitle>
                            <CardDescription>
                                {step === 1
                                    ? 'Enter your mobile number to login'
                                    : `We've sent a code to ${mobile}`}
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {step === 1 ? (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                        <Input
                                            id="mobile"
                                            data-testid="login-mobile-input"
                                            type="tel"
                                            placeholder="10-digit mobile number"
                                            value={mobile}
                                            onChange={(e) => setMobile(e.target.value.replace(/\D/g, '').slice(0, 10))}
                                            maxLength={10}
                                        />
                                    </div>
                                    <Button
                                        data-testid="send-otp-button"
                                        className="w-full"
                                        onClick={handleSendOTP}
                                        disabled={mobile.length !== 10}
                                    >
                                        Send OTP
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <div className="space-y-2">
                                        <Label htmlFor="otp">Enter OTP</Label>
                                        <Input
                                            id="otp"
                                            data-testid="login-otp-input"
                                            type="text"
                                            placeholder="6-digit OTP"
                                            value={otp}
                                            onChange={(e) => setOtp(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                            maxLength={6}
                                        />
                                    </div>
                                    <Button
                                        data-testid="verify-otp-button"
                                        className="w-full"
                                        onClick={handleVerifyOTP}
                                        disabled={otp.length !== 6}
                                    >
                                        Verify & Login
                                    </Button>
                                    <Button
                                        data-testid="resend-otp-button"
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setStep(1)}
                                    >
                                        Change Number
                                    </Button>
                                </>
                            )}

                            <div className="text-center text-sm">
                                <span className="text-muted-foreground">Don't have an account? </span>
                                <Button
                                    data-testid="switch-to-signup-button"
                                    variant="link"
                                    className="p-0 h-auto font-normal underline"
                                    onClick={onSwitchToSignup}
                                >
                                    Sign Up
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default Login;
