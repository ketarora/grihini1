<h4 className="font-semibold text-ethnic-primary mb-2">📝 Tips for better results:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Ensure good lighting and clear handwriting</li>
                    <li>• Keep the list flat and avoid shadows</li>
                    <li>• Write items in separate lines</li>
                    <li>• Include quantities if needed (e.g., "2 kg rice")</li>
                  </ul>
                </div>
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
                    <ShoppingCart className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Upload an image to see detected items here
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 hover:bg-accent/50 transition-colors">
                        <div className="flex gap-4">
                          {/* Product Image */}
                          <div className="flex-shrink-0">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg border"
                              onError={(e) => {
                                // Fallback to placeholder if image fails to load
                                (e.target as HTMLImageElement).src = 'https://images.pexels.com/photos/5947051/pexels-photo-5947051.jpeg?auto=compress&cs=tinysrgb&w=64&h=64';
                              }}
                            />
                          </div>

                          {/* Item Details */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-semibold text-ethnic-primary mb-1">{item.name}</h4>

                            {/* Description */}
                            <p className="text-sm text-muted-foreground mb-2 line-clamp-2">
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
                                <Package className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{item.stock} in stock</span>
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
                              <span className="text-lg font-semibold text-trust-green">
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
                                className="h-8 w-8 text-destructive hover:text-destructive"
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
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">1</div>
                  <div>
                    <div className="font-medium">Upload or Capture</div>
                    <div className="text-sm text-muted-foreground">Take a photo of your handwritten shopping list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">2</div>
                  <div>
                    <div className="font-medium">AI Detection</div>
                    <div className="text-sm text-muted-foreground">Our AI reads and identifies items from your list</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">3</div>
                  <div>
                    <div className="font-medium">Find Sellers</div>
                    <div className="text-sm text-muted-foreground">We match items with the best local sellers</div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold text-sm">4</div>
                  <div>
                    <div className="font-medium">Review & Add</div>
                    <div className="text-sm text-muted-foreground">Review detected items and add them to your cart</div>
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