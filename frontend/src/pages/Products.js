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
import { Plus, Pencil, Trash2, Search, LayoutGrid, List, Upload } from 'lucide-react';
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

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            setProducts(products.filter(p => p.id !== id));
        }
    };

    const handleEdit = (product) => {
        alert(`Edit functionality for ${product.name} coming soon!`);
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
        <div className="min-h-screen bg-gray-50">
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
                            <DialogContent className="sm:max-w-[425px]">
                                <DialogHeader>
                                    <DialogTitle>Add New Product</DialogTitle>
                                    <DialogDescription>
                                        Enter the details of the new product here.
                                    </DialogDescription>
                                </DialogHeader>
                                <form onSubmit={handleAddProduct} className="grid gap-4 py-4">
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="name" className="text-right">
                                            Name
                                        </Label>
                                        <Input
                                            id="name"
                                            value={newProduct.name}
                                            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="price" className="text-right">
                                            Price
                                        </Label>
                                        <Input
                                            id="price"
                                            type="number"
                                            value={newProduct.price}
                                            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="stock" className="text-right">
                                            Stock
                                        </Label>
                                        <Input
                                            id="stock"
                                            type="number"
                                            value={newProduct.stock}
                                            onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                                            className="col-span-3"
                                            required
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="category" className="text-right">
                                            Category
                                        </Label>
                                        <div className="col-span-3">
                                            <Select
                                                onValueChange={(value) => setNewProduct({ ...newProduct, category: value })}
                                                value={newProduct.category}
                                                required
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
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="description" className="text-right">
                                            Desc
                                        </Label>
                                        <Input
                                            id="description"
                                            value={newProduct.description}
                                            onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                                            className="col-span-3"
                                        />
                                    </div>
                                    <div className="grid grid-cols-4 items-center gap-4">
                                        <Label htmlFor="image" className="text-right">
                                            Image
                                        </Label>
                                        <div className="col-span-3 flex flex-col gap-2">
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
                                    </div>
                                    <DialogFooter>
                                        <Button type="submit">Save Product</Button>
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
                                <Table>
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
                                                                onClick={() => handleEdit(product)}
                                                                data-testid={`edit-product-${product.id}`}
                                                            >
                                                                <Pencil className="h-4 w-4" />
                                                            </Button>
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => handleDelete(product.id)}
                                                                data-testid={`delete-product-${product.id}`}
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
                                                            onClick={() => handleEdit(product)}
                                                            className="h-8 w-8"
                                                        >
                                                            <Pencil className="h-4 w-4" />
                                                        </Button>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            onClick={() => handleDelete(product.id)}
                                                            className="h-8 w-8 text-destructive"
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
        </div>
    );
};

export default Products;
