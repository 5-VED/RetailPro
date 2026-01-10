import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Combobox } from '@/components/ui/combobox';
import Navbar from '../components/Navbar';
import { Trash2, Plus, Search, PlusCircle, X } from 'lucide-react';
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
    { value: 'p1', label: 'Milk (1L)', price: 60 },
    { value: 'p2', label: 'Bread', price: 40 },
    { value: 'p3', label: 'Eggs (12)', price: 80 },
    { value: 'p4', label: 'Butter (500g)', price: 250 },
    { value: 'p5', label: 'Cheese Slices', price: 120 },
];

const INITIAL_BILLS = [
    { id: 1, srno: 1, phone: '9876543210', customerName: 'Rajesh Kumar', product: 'Milk (1L)', amount: 60, quantity: 1, date: '2024-03-10' },
    { id: 2, srno: 2, phone: '9876543211', customerName: 'Walk-in Customer', product: 'Bread', amount: 40, quantity: 1, date: '2024-03-11' },
    { id: 3, srno: 3, phone: '9876543212', customerName: 'Priya Sharma', product: 'Eggs (12)', amount: 80, quantity: 1, date: '2024-03-12' },
];

const Billing = ({ onNavigate }) => {
    // Main page state
    const [bills, setBills] = useState(INITIAL_BILLS);
    const [deleteId, setDeleteId] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

    // Create Bill Form State
    const [newBillCustomer, setNewBillCustomer] = useState('');
    const [newBillItems, setNewBillItems] = useState([]);
    const [currentItem, setCurrentItem] = useState({
        productId: '',
        quantity: '1',
        price: '',
    });

    const handleDelete = () => {
        if (deleteId) {
            setBills(bills.filter(bill => bill.id !== deleteId));
            toast.success("Bill record deleted successfully");
            setDeleteId(null);
        }
    };

    // Filter bills
    const filteredBills = bills.filter(bill =>
        bill.customerName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bill.phone?.includes(searchTerm) ||
        bill.product?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Form Handlers
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

    const handleAddItem = () => {
        if (!currentItem.productId || !currentItem.quantity || !currentItem.price) {
            toast.error("Please fill all item details");
            return;
        }

        const product = MOCK_PRODUCTS.find(p => p.value === currentItem.productId);
        const newItem = {
            id: Date.now(),
            productId: currentItem.productId,
            productName: product ? product.label : 'Unknown Product',
            quantity: Number(currentItem.quantity),
            price: Number(currentItem.price),
        };

        setNewBillItems([...newBillItems, newItem]);
        setCurrentItem({ productId: '', quantity: '1', price: '' });
    };

    const handleRemoveItem = (itemId) => {
        setNewBillItems(newBillItems.filter(item => item.id !== itemId));
    };

    const handleCreateBill = () => {
        if (!newBillCustomer) {
            toast.error("Please select a customer");
            return;
        }
        if (newBillItems.length === 0) {
            toast.error("Please add at least one item");
            return;
        }

        const customer = MOCK_CUSTOMERS.find(c => c.value === newBillCustomer);

        // In a real app we might create one bill record with multiple items, 
        // but for this simple table view we'll just create entries or summarize.
        // Let's create one entry per item to match existing table structure or create a summary.
        // The existing table seems to act like a line-item view or simplified bill view.
        // Let's create line items for now to match the "Product" column.

        const newEntries = newBillItems.map((item, index) => ({
            id: Date.now() + index,
            srno: bills.length + 1 + index,
            phone: 'N/A', // MOCK_CUSTOMERS don't have phone in value, simplified
            customerName: customer ? customer.label : 'Unknown',
            product: item.productName,
            quantity: item.quantity,
            amount: item.price * item.quantity,
            date: new Date().toISOString().split('T')[0]
        }));

        setBills([...newEntries, ...bills]); // Add to top
        toast.success("Bill created successfully");

        // Reset and Close
        setIsCreateModalOpen(false);
        setNewBillCustomer('');
        setNewBillItems([]);
        setCurrentItem({ productId: '', quantity: '1', price: '' });
    };

    const totalAmount = newBillItems.reduce((sum, item) => sum + (item.quantity * item.price), 0);

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Billing Records</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            View and manage billing history
                        </p>
                    </div>
                    <Button onClick={() => setIsCreateModalOpen(true)} className="gap-2">
                        <PlusCircle className="h-4 w-4" />
                        Create New Bill
                    </Button>
                </div>

                {/* Search Bar */}
                <div className="mb-6 max-w-sm relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search by customer, phone, or product..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="rounded-md border bg-card text-card-foreground shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Sr No</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Customer</TableHead>
                                <TableHead>Product</TableHead>
                                <TableHead className="text-center">Qty</TableHead>
                                <TableHead className="text-right">Amount (₹)</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredBills.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center">
                                        No results found.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                filteredBills.map((bill, index) => (
                                    <TableRow key={bill.id}>
                                        <TableCell className="font-medium">{index + 1}</TableCell>
                                        <TableCell>{bill.date || '2024-01-01'}</TableCell>
                                        <TableCell>
                                            <div className="flex flex-col">
                                                <span className="font-medium">{bill.customerName}</span>
                                                <span className="text-xs text-muted-foreground">{bill.phone}</span>
                                            </div>
                                        </TableCell>
                                        <TableCell>{bill.product}</TableCell>
                                        <TableCell className="text-center">{bill.quantity}</TableCell>
                                        <TableCell className="text-right font-medium">₹{bill.amount}</TableCell>
                                        <TableCell className="text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="text-destructive hover:bg-destructive/10"
                                                onClick={() => setDeleteId(bill.id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the billing record.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>

            {/* Create Bill Modal */}
            <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
                <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Create New Bill</DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        {/* Customer Selection */}
                        <div className="grid gap-2">
                            <Label>Select Customer</Label>
                            <Combobox
                                items={MOCK_CUSTOMERS}
                                value={newBillCustomer}
                                onSelect={setNewBillCustomer}
                                placeholder="Search customer..."
                            />
                        </div>

                        {/* Add Items Section */}
                        <div className="grid gap-2 p-4 border rounded-lg bg-muted/20">
                            <Label className="mb-2">Add Items</Label>
                            <div className="grid grid-cols-12 gap-3 items-end">
                                <div className="col-span-5">
                                    <Combobox
                                        items={MOCK_PRODUCTS}
                                        value={currentItem.productId}
                                        onSelect={handleProductSelect}
                                        placeholder="Select product..."
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Input
                                        type="number"
                                        placeholder="Qty"
                                        min="1"
                                        value={currentItem.quantity}
                                        onChange={(e) => setCurrentItem({ ...currentItem, quantity: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-3">
                                    <Input
                                        type="number"
                                        placeholder="Price"
                                        min="0"
                                        value={currentItem.price}
                                        onChange={(e) => setCurrentItem({ ...currentItem, price: e.target.value })}
                                    />
                                </div>
                                <div className="col-span-2">
                                    <Button onClick={handleAddItem} disabled={!currentItem.productId} className="w-full">
                                        <Plus className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        </div>

                        {/* Items List */}
                        {newBillItems.length > 0 && (
                            <div className="border rounded-md">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Product</TableHead>
                                            <TableHead className="text-center">Qty</TableHead>
                                            <TableHead className="text-right">Price</TableHead>
                                            <TableHead className="text-right">Total</TableHead>
                                            <TableHead className="w-[50px]"></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {newBillItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>{item.productName}</TableCell>
                                                <TableCell className="text-center">{item.quantity}</TableCell>
                                                <TableCell className="text-right">₹{item.price}</TableCell>
                                                <TableCell className="text-right font-medium">₹{item.price * item.quantity}</TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-destructive"
                                                        onClick={() => handleRemoveItem(item.id)}
                                                    >
                                                        <X className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        )}

                        {/* Total */}
                        <div className="flex justify-end items-center gap-4 pt-2 border-t">
                            <span className="text-lg font-semibold">Total Amount:</span>
                            <span className="text-2xl font-bold md:text-3xl">₹{totalAmount}</span>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>Cancel</Button>
                        <Button onClick={handleCreateBill} disabled={newBillItems.length === 0 || !newBillCustomer}>Generate Bill</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default Billing;
