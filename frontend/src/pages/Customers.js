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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import Navbar from '../components/Navbar';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';

const initialCustomers = [
    { id: 1, name: 'Rajesh Kumar', mobile: '9876543210', totalSpent: 15000, lastVisit: '2024-01-04' },
    { id: 2, name: 'Priya Sharma', mobile: '9876543211', totalSpent: 12000, lastVisit: '2024-01-03' },
    { id: 3, name: 'Amit Patel', mobile: '9876543212', totalSpent: 8500, lastVisit: '2024-01-02' },
    { id: 4, name: 'Sneha Gupta', mobile: '9876543213', totalSpent: 20000, lastVisit: '2024-01-04' },
];

const Customers = ({ onNavigate }) => {
    const [customers, setCustomers] = useState(initialCustomers);
    const [searchQuery, setSearchQuery] = useState('');

    // Add State
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [newCustomer, setNewCustomer] = useState({ name: '', mobile: '' });

    // Edit State
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingCustomer, setEditingCustomer] = useState(null);
    const [editForm, setEditForm] = useState({ name: '', mobile: '' });

    // Delete State
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const filteredCustomers = customers.filter(
        (customer) =>
            customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            customer.mobile.includes(searchQuery)
    );

    // Add Handlers
    const handleAddCustomer = (e) => {
        e.preventDefault();
        const customerToAdd = {
            id: Date.now(), // unique id
            name: newCustomer.name,
            mobile: newCustomer.mobile,
            totalSpent: 0,
            lastVisit: new Date().toISOString().split('T')[0],
        };
        setCustomers([customerToAdd, ...customers]);
        setIsAddOpen(false);
        setNewCustomer({ name: '', mobile: '' });
    };

    // Edit Handlers
    const handleEditClick = (customer) => {
        setEditingCustomer(customer);
        setEditForm({ name: customer.name, mobile: customer.mobile });
        setIsEditOpen(true);
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();
        setCustomers(customers.map(c =>
            c.id === editingCustomer.id ? { ...c, name: editForm.name, mobile: editForm.mobile } : c
        ));
        setIsEditOpen(false);
        setEditingCustomer(null);
    };

    // Delete Handlers
    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        setCustomers(customers.filter(c => c.id !== deleteId));
        setIsDeleteOpen(false);
        setDeleteId(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your customer database
                        </p>
                    </div>
                    <Button data-testid="add-customer-button" onClick={() => setIsAddOpen(true)}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Customer
                    </Button>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Customer List</CardTitle>
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search by name or mobile..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="overflow-x-auto">
                            <Table className="min-w-[500px]">
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Name</TableHead>
                                        <TableHead>Mobile</TableHead>
                                        <TableHead>Total Spent</TableHead>
                                        <TableHead>Last Visit</TableHead>
                                        <TableHead className="text-right">Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredCustomers.length === 0 ? (
                                        <TableRow>
                                            <TableCell colSpan={5} className="text-center">
                                                No customers found
                                            </TableCell>
                                        </TableRow>
                                    ) : (
                                        filteredCustomers.map((customer) => (
                                            <TableRow key={customer.id} data-testid={`customer-row-${customer.id}`}>
                                                <TableCell className="font-medium">{customer.name}</TableCell>
                                                <TableCell>{customer.mobile}</TableCell>
                                                <TableCell className="font-semibold">
                                                    ₹{customer.totalSpent.toLocaleString()}
                                                </TableCell>
                                                <TableCell className="text-muted-foreground">
                                                    {new Date(customer.lastVisit).toLocaleDateString()}
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditClick(customer)}
                                                            data-testid={`edit-customer-${customer.id}`}
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(customer.id)}
                                                            data-testid={`delete-customer-${customer.id}`}
                                                        >
                                                            <Trash2 className="h-4 w-4 text-destructive" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    )}
                                </TableBody>
                            </Table>
                        </div>
                    </CardContent>
                </Card>

                {/* Add Customer Dialog */}
                <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                    <DialogContent className="w-[95vw] max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Add New Customer</DialogTitle>
                            <DialogDescription>
                                Enter the customer details below.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleAddCustomer} className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="add-name">Name</Label>
                                <Input
                                    id="add-name"
                                    value={newCustomer.name}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, name: e.target.value })}
                                    placeholder="Enter customer name"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="add-mobile">Mobile</Label>
                                <Input
                                    id="add-mobile"
                                    type="tel"
                                    value={newCustomer.mobile}
                                    onChange={(e) => setNewCustomer({ ...newCustomer, mobile: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                    placeholder="10-digit mobile number"
                                    maxLength={10}
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full sm:w-auto">Add Customer</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Edit Customer Dialog */}
                <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
                    <DialogContent className="w-[95vw] max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>Edit Customer</DialogTitle>
                            <DialogDescription>
                                Make changes to the customer's profile here. Click save when you're done.
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSaveEdit} className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Name</Label>
                                <Input
                                    id="name"
                                    value={editForm.name}
                                    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="mobile">Mobile</Label>
                                <Input
                                    id="mobile"
                                    value={editForm.mobile}
                                    onChange={(e) => setEditForm({ ...editForm, mobile: e.target.value })}
                                    required
                                />
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="w-full sm:w-auto">Save Changes</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>

                {/* Delete Confirmation Alert */}
                <AlertDialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the customer
                                from the database.
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction
                                onClick={handleConfirmDelete}
                                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            >
                                Delete
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </div>
        </div>
    );
};

export default Customers;
