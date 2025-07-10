import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/components/ui/use-toast";
import {
  ArrowLeft,
  Upload,
  Utensils,
  ShoppingCart,
  Settings,
} from "lucide-react";
import { CategoryModal } from "@/components/pages/vendors/CategoryModal";

export default function CreateVendorItemPage() {
  const navigate = useNavigate();
  const { vendorId } = useParams<{ vendorId: string }>();
  const [isLoading, setIsLoading] = useState(false);

  // Mock vendor data - in real app, this would come from API
  const vendor = {
    id: parseInt(vendorId || "1"),
    name: vendorId === "1" ? "Gourmet Delights" : "Fresh Market Co",
    type: vendorId === "1" ? "food" : "grocery",
  };

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    stock: "",
    sku: "",
    image: null as File | null,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);

  const [foodCategories, setFoodCategories] = useState([
    "Appetizers",
    "Main Course",
    "Salads",
    "Soups",
    "Desserts",
    "Beverages",
    "Sides",
    "Breakfast",
    "Lunch",
    "Dinner",
    "Snacks",
    "Specials",
  ]);

  const [groceryCategories, setGroceryCategories] = useState([
    "Fruits",
    "Vegetables",
    "Dairy",
    "Meat & Poultry",
    "Seafood",
    "Bakery",
    "Deli",
    "Frozen",
    "Pantry",
    "Snacks",
    "Beverages",
    "Health & Beauty",
    "Household",
    "Other",
  ]);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }));
    }
  };

  const handleCategorySelect = (category: string) => {
    handleInputChange("category", category);
  };

  const handleCategoriesUpdate = (updatedCategories: string[]) => {
    if (vendor.type === "food") {
      setFoodCategories(updatedCategories);
    } else {
      setGroceryCategories(updatedCategories);
    }
  };

  const getCurrentCategories = () => {
    return vendor.type === "food" ? foodCategories : groceryCategories;
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.name.trim()) newErrors.name = "Item name is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.price) newErrors.price = "Price is required";
    else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Price must be a valid positive number";
    }
    if (!formData.stock) newErrors.stock = "Stock is required";
    else if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      newErrors.stock = "Stock must be a valid non-negative number";
    }
    if (!formData.sku.trim()) newErrors.sku = "SKU is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fix the errors in the form",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Here you would typically send the data to your backend
      const newItem = {
        id: Date.now(),
        name: formData.name,
        description: formData.description,
        category: formData.category,
        price: Number(formData.price),
        stock: Number(formData.stock),
        status: "available" as const,
        sku: formData.sku,
        vendorId: vendor.id,
        image: `https://placehold.co/300x200/${
          vendor.type === "food" ? "orange" : "green"
        }/white`,
      };

      console.log("New item data:", newItem);

      toast({
        title: "Item created successfully!",
        description: "The new item has been added to the vendor's inventory.",
      });

      // Navigate back to vendor items page
      navigate(`/vendors/${vendorId}/items`);
    } catch (error) {
      toast({
        title: "Error creating item",
        description:
          error instanceof Error ? error.message : "Something went wrong",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-start gap-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate(`/vendors/${vendorId}/items`)}
          className="flex items-center gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Items
        </Button>
        <div className="flex items-center gap-3">
          {vendor.type === "food" ? (
            <Utensils className="h-8 w-8 text-orange-500" />
          ) : (
            <ShoppingCart className="h-8 w-8 text-green-500" />
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight">
              Add New {vendor.type === "food" ? "Menu Item" : "Product"}
            </h1>
            <p className="text-muted-foreground">
              Add a new {vendor.type === "food" ? "menu item" : "product"} to{" "}
              {vendor.name}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the basic details of the{" "}
                {vendor.type === "food" ? "menu item" : "product"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    {vendor.type === "food" ? "Dish" : "Product"} Name *
                  </Label>
                  <Input
                    id="name"
                    placeholder={`Enter ${
                      vendor.type === "food" ? "dish" : "product"
                    } name`}
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={errors.name ? "border-red-500" : ""}
                    required
                  />
                  {errors.name && (
                    <p className="text-sm text-red-500">{errors.name}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="category">Category *</Label>
                  </div>
                  <div className="flex flex-row justify-between">
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        handleInputChange("category", value)
                      }
                    >
                      <SelectTrigger
                        className={errors.category ? "border-red-500" : ""}
                      >
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        {getCurrentCategories().map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Button
                      type="button"
                      variant="outline"
                      //   size="sm"
                      onClick={() => setIsCategoryModalOpen(true)}
                      className="flex items-center gap-2"
                    >
                      <Settings className="h-4 w-4" />
                      Manage Categories
                    </Button>
                  </div>
                  {errors.category && (
                    <p className="text-sm text-red-500">{errors.category}</p>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  placeholder={`Brief description of the ${
                    vendor.type === "food" ? "dish" : "product"
                  }`}
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  className={errors.description ? "border-red-500" : ""}
                  rows={3}
                  required
                />
                {errors.description && (
                  <p className="text-sm text-red-500">{errors.description}</p>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Pricing and Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing and Inventory</CardTitle>
              <CardDescription>
                Set the price and stock information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Price ($) *</Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    placeholder="0.00"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={errors.price ? "border-red-500" : ""}
                    required
                  />
                  {errors.price && (
                    <p className="text-sm text-red-500">{errors.price}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity *</Label>
                  <Input
                    id="stock"
                    type="number"
                    placeholder="0"
                    value={formData.stock}
                    onChange={(e) => handleInputChange("stock", e.target.value)}
                    className={errors.stock ? "border-red-500" : ""}
                    required
                  />
                  {errors.stock && (
                    <p className="text-sm text-red-500">{errors.stock}</p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sku">SKU *</Label>
                  <Input
                    id="sku"
                    placeholder="e.g., ABC123"
                    value={formData.sku}
                    onChange={(e) => handleInputChange("sku", e.target.value)}
                    className={errors.sku ? "border-red-500" : ""}
                    required
                  />
                  {errors.sku && (
                    <p className="text-sm text-red-500">{errors.sku}</p>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>
                {vendor.type === "food" ? "Dish" : "Product"} Image
              </CardTitle>
              <CardDescription>
                Upload an image of the{" "}
                {vendor.type === "food" ? "dish" : "product"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-center w-full">
                <Label
                  htmlFor="image"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 dark:border-gray-600"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-2 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or
                      drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG or GIF (MAX. 800x400px)
                    </p>
                  </div>
                  <Input
                    id="image"
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
              {formData.image && (
                <p className="mt-2 text-sm text-green-600">
                  Image selected: {formData.image.name}
                </p>
              )}
              <div className="flex justify-end mt-4 gap-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate(`/vendors/${vendorId}/items`)}
                  disabled={isLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isLoading}>
                  {isLoading
                    ? "Creating..."
                    : `Create ${
                        vendor.type === "food" ? "Menu Item" : "Product"
                      }`}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Submit Button */}
        </div>
      </form>

      {/* Category Management Modal */}
      <CategoryModal
        open={isCategoryModalOpen}
        onOpenChange={setIsCategoryModalOpen}
        vendorType={vendor.type as "food" | "grocery"}
        currentCategories={getCurrentCategories()}
        onCategorySelect={handleCategorySelect}
        onCategoriesUpdate={handleCategoriesUpdate}
      />
    </div>
  );
}
