import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Combobox } from '@/components/ui/combobox';
import QrScannerModal from '@/components/QrScannerModal';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Navbar from '../components/Navbar';
import { ShoppingCart, CreditCard, Wallet, Plus, Trash2, ScanLine } from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const MOCK_CUSTOMERS = [
    { value: 'walk-in', label: 'Walk-in Customer' },
    { value: 'rajesh', label: 'Rajesh Kumar' },
    { value: 'priya', label: 'Priya Sharma' },
    { value: 'amit', label: 'Amit Patel' },
    { value: 'sneha', label: 'Sneha Gupta' },
];

const MOCK_PRODUCTS = [
    { value: 'p1', label: 'Milk (1L)', price: 60, barcode: '8901234567890', image: 'https://images.unsplash.com/photo-1563636619-e9143da7973b?w=100&h=100&fit=crop' },
    { value: 'p2', label: 'Bread', price: 40, barcode: '8909876543210', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=100&h=100&fit=crop' },
    { value: 'p3', label: 'Eggs (12)', price: 80, barcode: '123456789', image: 'https://images.unsplash.com/photo-1582722872445-44dc5f7e3c8f?w=100&h=100&fit=crop' },
    { value: 'p4', label: 'Butter (500g)', price: 250, barcode: '1122334455', image: 'https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?w=100&h=100&fit=crop' },
    { value: 'p5', label: 'Cheese Slices', price: 120, barcode: '9988776655', image: 'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?w=100&h=100&fit=crop' },
];

const AddSale = ({ onNavigate }) => {
    // State for Sale Details
    const [customer, setCustomer] = useState('');
    const [paymentMode, setPaymentMode] = useState('cash');
    const [isScannerOpen, setIsScannerOpen] = useState(false);

    // State for Items (Multiple Sales support)
    const [items, setItems] = useState([]);

    // State for Current Item Entry
    const [currentItem, setCurrentItem] = useState({
        productId: '',
        quantity: '1',
        price: '',
    });

    const handleAddItem = (e) => {
        e.preventDefault(); // Prevent form submission if button inside form

        if (!currentItem.productId || !currentItem.quantity || !currentItem.price) {
            toast.error("Please fill all item details");
            return;
        }

        const product = MOCK_PRODUCTS.find(p => p.value === currentItem.productId);

        const newItem = {
            id: Date.now(), // simple unique id
            productId: currentItem.productId,
            productName: product ? product.label : 'Unknown',
            quantity: Number(currentItem.quantity),
            price: Number(currentItem.price),
        };

        setItems([...items, newItem]);

        // Reset current item fields
        setCurrentItem({
            productId: '',
            quantity: '1',
            price: '',
        });
        toast.success("Item added to sale");
    };

    const handleRemoveItem = (itemId) => {
        setItems(items.filter(item => item.id !== itemId));
    };

    const handleProductSelect = (value) => {
        const product = MOCK_PRODUCTS.find(p => p.value === value);
        if (product) {
            setCurrentItem(prev => ({
                ...prev,
                productId: value,
                price: product.price.toString()
            }));
        } else {
            setCurrentItem(prev => ({
                ...prev,
                productId: value
            }));
        }
    };

    const handleScan = (code) => {
        setIsScannerOpen(false);
        const product = MOCK_PRODUCTS.find(p => p.barcode === code);

        if (product) {
            toast.success(`Product found: ${product.label}`);
            // Auto select product and populate price
            setCurrentItem(prev => ({
                ...prev,
                productId: product.value,
                price: product.price.toString()
            }));
        } else {
            toast.error(`Product not found for barcode: ${code}`);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (items.length === 0) {
            toast.error("Please add at least one item to the sale");
            return;
        }

        const saleData = {
            customer,
            paymentMode,
            items,
            totalAmount: items.reduce((sum, item) => sum + (item.quantity * item.price), 0),
            date: new Date().toISOString(),
        };

        console.log('Sale Completed:', saleData);
        toast.success("Sale recorded successfully!");

        // Reset everything
        setItems([]);
        setCustomer('');
        setPaymentMode('cash');
    };

    const totalAmount = items.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar onNavigate={onNavigate} />
            <QrScannerModal
                isOpen={isScannerOpen}
                onClose={() => setIsScannerOpen(false)}
                onScan={handleScan}
            />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold tracking-tight">Add Sale</h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Record a new sale transaction with multiple items
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                    {/* Sale Form Area */}
                    <div className="lg:col-span-2 space-y-6">

                        {/* 1. Customer Selection */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Customer Details</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 gap-4">
                                    <div className="space-y-2">
                                        <Label>Select Customer</Label>
                                        <Combobox
                                            items={MOCK_CUSTOMERS}
                                            value={customer}
                                            onSelect={setCustomer}
                                            placeholder="Select customer..."
                                        />
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 2. Add Items */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Add Items</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 gap-4 sm:grid-cols-12 sm:items-end">
                                    <div className="sm:col-span-12 md:col-span-5 space-y-2">
                                        <Label>Product</Label>
                                        <div className="flex gap-2">
                                            <div className="flex-1">
                                                <Combobox
                                                    items={MOCK_PRODUCTS}
                                                    value={currentItem.productId}
                                                    onSelect={handleProductSelect}
                                                    placeholder="Search product..."
                                                    showImages={true}
                                                />
                                            </div>
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                type="button"
                                                onClick={() => setIsScannerOpen(true)}
                                                title="Scan QR Code"
                                            >
                                                <ScanLine className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 sm:contents">
                                        <div className="sm:col-span-6 md:col-span-3 space-y-2">
                                            <Label htmlFor="quantity">Quantity</Label>
                                            <Input
                                                id="quantity"
                                                type="number"
                                                min="1"
                                                value={currentItem.quantity}
                                                onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                                                placeholder="Qty"
                                            />
                                        </div>

                                        <div className="sm:col-span-6 md:col-span-3 space-y-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                min="0"
                                                value={currentItem.price}
                                                onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                                placeholder="Price"
                                            />
                                        </div>
                                    </div>

                                    <div className="sm:col-span-12 md:col-span-1">
                                        <Button
                                            className="w-full gap-2"
                                            type="button"
                                            onClick={handleAddItem}
                                        >
                                            <Plus className="h-4 w-4" />
                                            <span className="md:hidden">Add Item</span>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* 3. Items List */}
                        {items.length > 0 && (
                            <Card>
                                <CardHeader>
                                    <CardTitle>Items in Cart ({items.length})</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    {/* Desktop table view */}
                                    <div className="hidden sm:block rounded-md border">
                                        <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium bg-muted/50 border-b">
                                            <div className="col-span-5">Product</div>
                                            <div className="col-span-2 text-center">Qty</div>
                                            <div className="col-span-3 text-right">Price</div>
                                            <div className="col-span-2"></div>
                                        </div>
                                        {items.map((item) => (
                                            <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center text-sm border-b last:border-0 hover:bg-muted/30">
                                                <div className="col-span-5 font-medium">{item.productName}</div>
                                                <div className="col-span-2 text-center">{item.quantity}</div>
                                                <div className="col-span-3 text-right">₹{item.price * item.quantity}</div>
                                                <div className="col-span-2 text-right">
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                    {/* Mobile card view */}
                                    <div className="sm:hidden space-y-3">
                                        {items.map((item) => (
                                            <div key={item.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                                                <div className="flex-1 min-w-0">
                                                    <p className="font-medium truncate">{item.productName}</p>
                                                    <p className="text-sm text-muted-foreground">
                                                        Qty: {item.quantity} × ₹{item.price}
                                                    </p>
                                                </div>
                                                <div className="flex items-center gap-3 ml-3">
                                                    <span className="font-semibold">₹{item.price * item.quantity}</span>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Summary Sidebar */}
                    <div className="space-y-6">
                        <Card className="sticky top-20">
                            <CardHeader>
                                <CardTitle>Payment Details</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="space-y-3">
                                    <Label>Payment Mode</Label>
                                    <RadioGroup value={paymentMode} onValueChange={setPaymentMode}>
                                        <div className="grid grid-cols-1 gap-2">
                                            <label
                                                className={cn(
                                                    'flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors',
                                                    paymentMode === 'cash' ? 'border-primary bg-primary/5' : 'border-border'
                                                )}
                                            >
                                                <RadioGroupItem value="cash" id="cash" />
                                                <Wallet className="h-4 w-4 text-green-600" />
                                                <span className="text-sm font-medium">Cash</span>
                                            </label>

                                            <label
                                                className={cn(
                                                    'flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors',
                                                    paymentMode === 'online' ? 'border-primary bg-primary/5' : 'border-border'
                                                )}
                                            >
                                                <RadioGroupItem value="online" id="online" />
                                                <CreditCard className="h-4 w-4 text-blue-600" />
                                                <span className="text-sm font-medium">Online / UPI</span>
                                            </label>
                                        </div>
                                    </RadioGroup>
                                </div>

                                <div className="border-t pt-4 space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-muted-foreground">Total Items:</span>
                                        <span className="font-medium">{items.length}</span>
                                    </div>
                                    <div className="flex justify-between items-center pt-2">
                                        <span className="text-lg font-semibold">Total Pay:</span>
                                        <span className="text-2xl font-bold text-primary">
                                            ₹{totalAmount.toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    className="w-full"
                                    size="lg"
                                    onClick={handleSubmit}
                                    disabled={items.length === 0}
                                >
                                    <ShoppingCart className="mr-2 h-4 w-4" />
                                    Complete Sale
                                </Button>
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
