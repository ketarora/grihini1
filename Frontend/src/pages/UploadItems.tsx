import React, { useState, useCallback } from 'react';
import {
  Upload,
  Camera,
  ShoppingCart,
  Star,
  CheckCircle,
  Package,
  Minus,
  Plus,
  Trash2,
  X
} from 'lucide-react';
import { Card, CardHeader, CardContent, CardTitle } from '../components/ui/Card';
import  {Button,buttonVariants} from '../components/ui/Button';
import  {Badge, badgeVariants} from '../components/ui/Badge';
import  Footer  from '../components/Footer';

interface CartItem {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
  category: string;
  subcategory: string;
  rating: number;
  verified: boolean;
  stock: number;
  status: 'approved' | 'pending';
  discount: string;
  quantity: number;
}

const UploadItems: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for demonstration
  const mockDetectedItems: CartItem[] = [
    {
      id: '1',
      name: 'Basmati Rice',
      description: 'Premium quality long-grain basmati rice, perfect for biryanis and pulao',
      price: '₹120/kg',
      image: 'https://images.pexels.com/photos/4198459/pexels-photo-4198459.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      category: 'Grains',
      subcategory: 'Rice',
      rating: 4.5,
      verified: true,
      stock: 50,
      status: 'available',
      discount: '10%',
      quantity: 1
    },
    {
      id: '2',
      name: 'Fresh Tomatoes',
      description: 'Fresh red tomatoes, locally sourced and organic',
      price: '₹40/kg',
      image: 'https://images.pexels.com/photos/1327838/pexels-photo-1327838.jpeg?auto=compress&cs=tinysrgb&w=300&h=300',
      category: 'Vegetables',
      subcategory: 'Fresh Vegetables',
      rating: 4.2,
      verified: false,
      stock: 25,
      status: 'available',
      quantity: 2
    }
  ];

  const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        setSelectedImage(imageUrl);

        // Simulate AI processing
        setIsProcessing(true);
        setTimeout(() => {
          setCartItems(mockDetectedItems);
          setIsProcessing(false);
        }, 2000);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const handleCameraCapture = useCallback(() => {
    // This would typically open camera interface
    // For demo, we'll simulate with a mock image
    setSelectedImage('https://images.pexels.com/photos/1199957/pexels-photo-1199957.jpeg?auto=compress&cs=tinysrgb&w=600&h=400');
    setIsProcessing(true);
    setTimeout(() => {
      setCartItems(mockDetectedItems);
      setIsProcessing(false);
    }, 2000);
  }, []);

  const updateQuantity = useCallback((id: string, change: number) => {
    setCartItems(prev => prev.map(item =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ));
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  }, []);

  const resetUpload = useCallback(() => {
    setSelectedImage(null);
    setCartItems([]);
    setIsProcessing(false);
  }, []);

  const addToCart = useCallback(() => {
    // This would typically add items to global cart state
    alert(`Added ${cartItems.length} items to cart!`);
  }, [cartItems.length]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Smart Shopping List Upload
          </h1>
          <p className="text-gray-600">
            Upload a photo of your handwritten shopping list and let AI help you find the best deals
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Upload Section */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Your Shopping List
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {!selectedImage ? (
                  <>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                      <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">
                        Upload an image
                      </h3>
                      <p className="text-gray-500 mb-4">
                        PNG, JPG, GIF up to 10MB
                      </p>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        id="image-upload"
                      />
                      <label htmlFor="image-upload">
                        <Button className="cursor-pointer">
                          Select File
                        </Button>
                      </label>
                    </div>

                    <div className="text-center">
                      <span className="text-gray-500">or</span>
                    </div>

                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={handleCameraCapture}
                    >
                      <Camera className="h-4 w-4 mr-2" />
                      Take Photo
                    </Button>
                  </>
                ) : (
                  <div className="space-y-4">
                    <div className="relative">
                      <img
                        src={selectedImage}
                        alt="Uploaded shopping list"
                        className="w-full h-64 object-cover rounded-lg border"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white shadow-md hover:bg-gray-50"
                        onClick={resetUpload}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>

                    {isProcessing && (
                      <div className="text-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-2"></div>
                        <p className="text-sm text-gray-600">Processing your list...</p>
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h4 className="font-semibold text-blue-600 mb-2">📝 Tips for better results:</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Ensure good lighting and clear handwriting</li>
                  <li>• Keep the list flat and avoid shadows</li>
                  <li>• Write items in separate lines</li>
                  <li>• Include quantities if needed (e.g., "2 kg rice")</li>
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Detected Items */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <ShoppingCart className="h-5 w-5 text-primary" />
                    Detected Items ({cartItems.length})
                  </span>
                  {cartItems.length > 0 && (
                    <Button variant="outline" size="sm" onClick={resetUpload}>
                      Clear All
                    </Button>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {cartItems.length === 0 ? (
                  <div className="text-center py-8">
                    <ShoppingCart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500">
                      Upload an image to see detected items here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg border"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5947051/pexels-photo-5947051.jpeg?auto=compress&cs=tinysrgb&w=64&h=64';
                              }}
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-blue-600 mb-1">{item.name}</h4>

                            {/* Description */}
                            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
                              {item.description}
                            </p>

                            {/* Rating and Verification */}
                            <div className="flex items-center gap-2 mb-2">
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{item.rating.toFixed(1)}</span>
                              </div>
                              {item.verified && (
                                <div className="flex items-center gap-1">
                                  <CheckCircle className="h-3 w-3 text-green-500" />
                                  <span className="text-xs text-green-600">Verified</span>
                                </div>
                              )}
                              <div className="flex items-center gap-1">
                                <Package className="h-3 w-3 text-gray-400" />
                                <span className="text-xs text-gray-500">{item.stock} in stock</span>
                              </div>
                            </div>

                            {/* Category, Status and Price */}
                            <div className="flex items-center gap-2 mb-3">
                              <Badge variant="secondary" className="text-xs">
                                {item.category}
                              </Badge>
                              <Badge variant="outline" className="text-xs">
                                {item.subcategory}
                              </Badge>
                              <Badge
                                variant={item.status === 'available' ? 'default' : 'secondary'}
                                className="text-xs"
                              >
                                {item.status}
                              </Badge>
                            </div>

                            {/* Price and Discount */}
                            <div className="flex items-center gap-2 mb-3">
                              <span className="text-lg font-semibold text-green-600">
                                {item.price}
                              </span>
                              {item.discount && item.discount !== '0%' && (
                                <Badge variant="destructive" className="text-xs">
                                  {item.discount} OFF
                                </Badge>
                              )}
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, -1)}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center font-medium">{item.quantity}</span>
                                <Button
                                  variant="outline"
                                  size="icon"
                                  className="h-8 w-8"
                                  onClick={() => updateQuantity(item.id, 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>

                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-500 hover:text-red-600"
                                onClick={() => removeItem(item.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <Button onClick={addToCart} className="w-full" size="lg">
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Add All Items to Cart
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* How it Works */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">How It Works</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <div className="font-medium">Upload or Capture</div>
                    <div className="text-sm text-gray-600">Take a photo of your handwritten shopping list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <div className="font-medium">AI Detection</div>
                    <div className="text-sm text-gray-600">Our AI reads and identifies items from your list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <div className="font-medium">Find Sellers</div>
                    <div className="text-sm text-gray-600">We match items with the best local sellers</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <div className="font-medium">Review & Add</div>
                    <div className="text-sm text-gray-600">Review detected items and add them to your cart</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UploadItems;