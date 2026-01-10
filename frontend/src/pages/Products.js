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
import { Badge } from '@/components/ui/badge';
import Navbar from '../components/Navbar';
import { Plus, Pencil, Trash2, Search, LayoutGrid, List } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
} from '@/components/ui/alert-dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const uniformImage = 'https://images.unsplash.com/photo-1605518216938-7c31b7b14ad0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3';

const initialProducts = [
    {
        id: 1,
        name: 'Blue Shirt',
        price: 600,
        stock: 50,
        category: 'Shirts',
        image: uniformImage,
        description: 'Classic blue cotton shirt for casual wear.'
    },
    {
        id: 2,
        name: 'Black Shoes',
        price: 1200,
        stock: 30,
        category: 'Shoes',
        image: uniformImage,
        description: 'Formal black leather shoes aimed at professionals.'
    },
    {
        id: 3,
        name: 'White Shirt',
        price: 800,
        stock: 45,
        category: 'Shirts',
        image: uniformImage,
        description: 'Crisp white shirt, perfect for formal occasions.'
    },
    {
        id: 4,
        name: 'Red Shirt',
        price: 600,
        stock: 60,
        category: 'Shirts',
        image: uniformImage,
        description: 'Vibrant red shirt to stand out from the crowd.'
    },
];

const Products = ({ onNavigate }) => {
    const [products, setProducts] = useState(initialProducts);
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('list'); // 'list' or 'grid'
    const [isAddOpen, setIsAddOpen] = useState(false);

    // Edit State (similar to Customers page)
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);
    const [editForm, setEditForm] = useState({
        name: '',
        price: '',
        stock: '',
        category: '',
        description: '',
    });
    const [editImagePreview, setEditImagePreview] = useState(null);
    const [editImageObjectUrl, setEditImageObjectUrl] = useState(null);

    // Delete State (similar to Customers page)
    const [deleteId, setDeleteId] = useState(null);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);
    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        stock: '',
        description: '',
        image: null // Changed to store the file object or URL
    });
    const [imagePreview, setImagePreview] = useState(null);

    const filteredProducts = products.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleDeleteClick = (id) => {
        setDeleteId(id);
        setIsDeleteOpen(true);
    };

    const handleConfirmDelete = () => {
        setProducts(products.filter(p => p.id !== deleteId));
        setIsDeleteOpen(false);
        setDeleteId(null);
    };

    const handleEditClick = (product) => {
        setEditingProduct(product);
        setEditForm({
            name: product.name ?? '',
            price: product.price?.toString?.() ?? '',
            stock: product.stock?.toString?.() ?? '',
            category: product.category ?? '',
            description: product.description ?? '',
        });

        // Reset edit image state
        if (editImageObjectUrl) {
            URL.revokeObjectURL(editImageObjectUrl);
            setEditImageObjectUrl(null);
        }
        setEditImagePreview(product.image ?? null);
        setIsEditOpen(true);
    };

    const handleEditImageChange = (e) => {
        const file = e.target.files?.[0];
        if (!file) return;

        if (editImageObjectUrl) {
            URL.revokeObjectURL(editImageObjectUrl);
        }

        const previewUrl = URL.createObjectURL(file);
        setEditImageObjectUrl(previewUrl);
        setEditImagePreview(previewUrl);
    };

    const handleEditDialogOpenChange = (open) => {
        setIsEditOpen(open);
        if (!open) {
            setEditingProduct(null);
            if (editImageObjectUrl) {
                URL.revokeObjectURL(editImageObjectUrl);
                setEditImageObjectUrl(null);
            }
            setEditImagePreview(null);
        }
    };

    const handleSaveEdit = (e) => {
        e.preventDefault();

        if (!editingProduct) return;

        setProducts(products.map((p) => {
            if (p.id !== editingProduct.id) return p;
            return {
                ...p,
                name: editForm.name,
                price: Number(editForm.price),
                stock: Number(editForm.stock),
                category: editForm.category,
                description: editForm.description,
                image: editImagePreview || p.image,
            };
        }));

        setIsEditOpen(false);
        setEditingProduct(null);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const previewUrl = URL.createObjectURL(file);
            setNewProduct({ ...newProduct, image: previewUrl });
            setImagePreview(previewUrl);
        }
    };

    const handleAddProduct = (e) => {
        e.preventDefault();
        const productToAdd = {
            id: products.length + 1,
            name: newProduct.name,
            price: Number(newProduct.price),
            stock: Number(newProduct.stock),
            category: newProduct.category,
            description: newProduct.description,
            image: newProduct.image || uniformImage,
        };
        setProducts([...products, productToAdd]);
        setIsAddOpen(false);
        setNewProduct({ name: '', price: '', category: '', stock: '', description: '', image: null });
        setImagePreview(null);
    };

    return (
        <div className="min-h-screen bg-gray-50 text-foreground">
            <Navbar onNavigate={onNavigate} />

            <div className="container mx-auto px-4 py-6 lg:px-8 lg:py-8">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight">Products</h1>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Manage your product inventory
                        </p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="bg-white rounded-md border p-1 flex">
                            <Button
                                variant={viewMode === 'list' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('list')}
                                className="px-2"
                            >
                                <List className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
                                size="sm"
                                onClick={() => setViewMode('grid')}
                                className="px-2"
                            >
                                <LayoutGrid className="h-4 w-4" />
                            </Button>
                        </div>

                        <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
                            <DialogTrigger asChild>
                                <Button data-testid="add-product-button">
                                    <Plus className="mr-2 h-4 w-4" />
                                    Add Product
                                </Button>
                            </DialogTrigger>
                            <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
                                <DialogHeader>
                                    <DialogTitle>Add New Product</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of the new product here.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddProduct} className="grid gap-4 py-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="price">Price</Label>
                                            <Input
                                                id="price"
                                                type="number"
                                                value={newProduct.price}
                                                onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="stock">Stock</Label>
                                            <Input
                                                id="stock"
                                                type="number"
                                                value={newProduct.stock}
                                                onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                                required
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Category</Label>
                                        <Select
                                            onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                            value={newProduct.category}
                                        >
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select Category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Shirts">Shirts</SelectItem>
                                                <SelectItem value="Shoes">Shoes</SelectItem>
                                                <SelectItem value="Pants">Pants</SelectItem>
                                                <SelectItem value="Accessories">Accessories</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Input
                                            id="description"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="image">Image</Label>
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                            className="cursor-pointer"
                                        />
                                        {imagePreview && (
                                            <div className="relative h-20 w-20 rounded-md border overflow-hidden">
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="h-full w-full object-cover"
                                                />
                                            </div>
                                        )}
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit" className="w-full sm:w-auto">Save Product</Button>
                                    </DialogFooter>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>

                <Card>
                    <CardHeader>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <CardTitle>Product List</CardTitle>
                            <div className="relative w-full sm:w-72">
                                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    placeholder="Search products..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-9"
                                />
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        {viewMode === 'list' ? (
                            <div className="overflow-x-auto">
                                <Table className="min-w-[700px]">
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[100px]">Image</TableHead>
                                            <TableHead>Product Name</TableHead>
                                            <TableHead>Description</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead>Stock</TableHead>
                                            <TableHead>Category</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredProducts.length === 0 ? (
                                            <TableRow>
                                                <TableCell colSpan={7} className="text-center">
                                                    No products found
                                                </TableCell>
                                            </TableRow>
                                        ) : (
                                            filteredProducts.map((product) => (
                                                <TableRow key={product.id} data-testid={`product-row-${product.id}`}>
                                                    <TableCell>
                                                        <img
                                                            src={product.image}
                                                            alt={product.name}
                                                            className="h-12 w-12 rounded-md object-cover border"
                                                        />
                                                    </TableCell>
                                                    <TableCell className="font-medium">{product.name}</TableCell>
                                                    <TableCell className="max-w-[200px] truncate text-muted-foreground">
                                                        {product.description}
                                                    </TableCell>
                                                    <TableCell>₹{product.price}</TableCell>
                                                    <TableCell>
                                                        <Badge
                                                            variant={product.stock > 20 ? 'default' : 'destructive'}
                                                            className={
                                                                product.stock > 20
                                                                    ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                    : ''
                                                            }
                                                        >
                                                            {product.stock} units
                                                        </Badge>
                                                    </TableCell>
                                                    <TableCell>{product.category}</TableCell>
                                                    <TableCell className="text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleEditClick(product)}
                                                                data-testid={`edit-product-${product.id}`}
                                                                title="Edit product"
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDeleteClick(product.id)}
                                                                data-testid={`delete-product-${product.id}`}
                                                                title="Delete product"
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
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                {filteredProducts.length === 0 ? (
                                    <div className="col-span-full text-center py-8 text-muted-foreground">
                                        No products found
                                    </div>
                                ) : (
                                    filteredProducts.map((product) => (
                                        <Card key={product.id} className="overflow-hidden flex flex-col h-full">
                                            <div className="relative aspect-square">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <CardHeader className="p-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <CardTitle className="text-lg">{product.name}</CardTitle>
                                                        <p className="text-sm text-muted-foreground mt-1">{product.category}</p>
                                                    </div>
                                                    <Badge
                                                        variant={product.stock > 20 ? 'default' : 'destructive'}
                                                        className={
                                                            product.stock > 20
                                                                ? 'bg-green-100 text-green-800 hover:bg-green-200'
                                                                : ''
                                                        }
                                                    >
                                                        {product.stock}
                                                    </Badge>
                                                </div>
                                            </CardHeader>
                                            <CardContent className="p-4 pt-0 flex-1 flex flex-col justify-end">
                                                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                                                    {product.description}
                                                </p>
                                                <div className="flex items-center justify-between mt-auto">
                                                    <span className="font-bold text-lg">₹{product.price}</span>
                                                    <div className="flex gap-1">
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleEditClick(product)}
                                                            className="h-8 w-8"
                                                            title="Edit product"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDeleteClick(product.id)}
                                                            className="h-8 w-8 text-destructive"
                                                            title="Delete product"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))
                                )}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

            {/* Edit Product Dialog */}
            <Dialog open={isEditOpen} onOpenChange={handleEditDialogOpenChange}>
                <DialogContent className="w-[95vw] max-w-[425px] max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Edit Product</DialogTitle>
                        <DialogDescription>
                            Update product details and click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleSaveEdit} className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="edit-name">Name</Label>
                            <Input
                                id="edit-name"
                                value={editForm.name}
                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="edit-price">Price</Label>
                                <Input
                                    id="edit-price"
                                    type="number"
                                    value={editForm.price}
                                    onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="edit-stock">Stock</Label>
                                <Input
                                    id="edit-stock"
                                    type="number"
                                    value={editForm.stock}
                                    onChange={(e) => setEditForm({ ...editForm, stock: e.target.value })}
                                    required
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-category">Category</Label>
                            <Select
                                onValueChange={(value) => setEditForm({ ...editForm, category: value })}
                                value={editForm.category}
                            >
                                <SelectTrigger id="edit-category">
                                    <SelectValue placeholder="Select Category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Shirts">Shirts</SelectItem>
                                    <SelectItem value="Shoes">Shoes</SelectItem>
                                    <SelectItem value="Pants">Pants</SelectItem>
                                    <SelectItem value="Accessories">Accessories</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-description">Description</Label>
                            <Input
                                id="edit-description"
                                value={editForm.description}
                                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="edit-image">Image</Label>
                            <Input
                                id="edit-image"
                                type="file"
                                accept="image/*"
                                onChange={handleEditImageChange}
                                className="cursor-pointer"
                            />
                            {editImagePreview && (
                                <div className="relative h-20 w-20 rounded-md border overflow-hidden">
                                    <img
                                        src={editImagePreview}
                                        alt="Preview"
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                            )}
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
                            This action cannot be undone. This will permanently delete the product
                            from the inventory.
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
    );
};

export default Products;
