import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '../components/Navbar';
import { ShoppingCart, CreditCard, Wallet } from 'lucide-react';

const AddSale = ({ onNavigate }) => {
    const [productName, setProductName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');
    const [paymentMode, setPaymentMode] = useState('cash');
    const [customer, setCustomer] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Sale added:', { productName, quantity, price, paymentMode, customer });
    };

    const totalAmount = (Number(quantity) || 0) * (Number(price) || 0);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Add Sale</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Record a new sale transaction
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Sale Form */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sale Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="product-name">Product Name *</Label>
                                            <Input
                                                id="product-name"
                                                data-testid="product-name-input"
                                                placeholder="Enter product name"
                                                value={productName}
                                                onChange={(e) => setProductName(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="customer">Customer (Optional)</Label>
                                            <Select value={customer} onValueChange={setCustomer}>
                                                <SelectTrigger id="customer" data-testid="customer-select">
                                                    <SelectValue placeholder="Select customer" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="walk-in">Walk-in Customer</SelectItem>
                                                    <SelectItem value="rajesh">Rajesh Kumar</SelectItem>
                                                    <SelectItem value="priya">Priya Sharma</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="quantity">Quantity *</Label>
                                            <Input
                                                id="quantity"
                                                data-testid="quantity-input"
                                                type="number"
                                                min="1"
                                                placeholder="Enter quantity"
                                                value={quantity}
                                                onChange={(e) => setQuantity(e.target.value)}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price per Unit *</Label>
                                            <Input
                                                id="price"
                                                data-testid="price-input"
                                                type="number"
                                                min="0"
                                                step="0.01"
                                                placeholder="Enter price"
                                                value={price}
                                                onChange={(e) => setPrice(e.target.value)}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <Label>Payment Mode *</Label>
                                        <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                                            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                                                <label
                                                    htmlFor="cash"
                                                    className={cn(
                                                        'flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors',
                                                        paymentMode === 'cash'
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                    )}
                                                >
                                                    <RadioGroupItem value="cash" id="cash" data-testid="payment-cash" />
                                                    <div className="flex items-center gap-2">
                                                        <Wallet className="h-5 w-5 text-green-600" />
                                                        <div className="flex-1">
                                                            <p className="font-medium">Cash</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Cash payment
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>

                                                <label
                                                    htmlFor="online"
                                                    className={cn(
                                                        'flex items-center space-x-3 rounded-lg border-2 p-4 cursor-pointer transition-colors',
                                                        paymentMode === 'online'
                                                            ? 'border-primary bg-primary/5'
                                                            : 'border-border hover:border-primary/50'
                                                    )}
                                                >
                                                    <RadioGroupItem value="online" id="online" data-testid="payment-online" />
                                                    <div className="flex items-center gap-2">
                                                        <CreditCard className="h-5 w-5 text-blue-600" />
                                                        <div className="flex-1">
                                                            <p className="font-medium">Online</p>
                                                            <p className="text-xs text-muted-foreground">
                                                                Digital payment
                                                            </p>
                                                        </div>
                                                    </div>
                                                </label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="flex gap-3 pt-4">
                                        <Button type="submit" className="flex-1" data-testid="save-sale-button">
                                            <ShoppingCart className="mr-2 h-4 w-4" />
                                            Save Sale
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="outline"
                                            onClick={() => onNavigate('dashboard')}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Summary Card */}
                    <div>
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Sale Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Product:</span>
                                        <span className="font-medium">{productName || '-'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Quantity:</span>
                                        <span className="font-medium">{quantity || '0'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Price per unit:</span>
                                        <span className="font-medium">₹{price || '0'}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Payment:</span>
                                        <span className="font-medium capitalize">{paymentMode}</span>
                                    </div>
                                </div>
                                <div className="border-t pt-4">
                                    <div className="flex justify-between items-center">
                                        <span className="text-lg font-semibold">Total Amount:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            ₹{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

function cn(...inputs) {
    return inputs.filter(Boolean).join(' ');
}

export default AddSale;
