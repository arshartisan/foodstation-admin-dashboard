import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/use-toast";
import { Plus, X, Edit2, Trash2 } from "lucide-react";

interface CategoryModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vendorType: "food" | "grocery";
  currentCategories: string[];
  onCategorySelect?: (category: string) => void;
  onCategoriesUpdate?: (categories: string[]) => void;
}

export function CategoryModal({
  open,
  onOpenChange,
  vendorType,
  currentCategories,
  onCategorySelect,
  onCategoriesUpdate,
}: CategoryModalProps) {
  const [categories, setCategories] = useState<string[]>(currentCategories);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [editingCategory, setEditingCategory] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleAddCategory = () => {
    if (!newCategoryName.trim()) {
      setErrors({ newCategory: "Category name is required" });
      return;
    }

    if (categories.includes(newCategoryName.trim())) {
      setErrors({ newCategory: "Category already exists" });
      return;
    }

    const updatedCategories = [...categories, newCategoryName.trim()];
    setCategories(updatedCategories);
    setNewCategoryName("");
    setErrors({});

    if (onCategoriesUpdate) {
      onCategoriesUpdate(updatedCategories);
    }

    toast({
      title: "Category added",
      description: `"${newCategoryName.trim()}" has been added to the categories.`,
    });
  };

  const handleEditCategory = (oldName: string) => {
    setEditingCategory(oldName);
    setEditingName(oldName);
  };

  const handleSaveEdit = () => {
    if (!editingName.trim()) {
      setErrors({ edit: "Category name is required" });
      return;
    }

    if (
      editingName.trim() !== editingCategory &&
      categories.includes(editingName.trim())
    ) {
      setErrors({ edit: "Category already exists" });
      return;
    }

    const updatedCategories = categories.map((cat) =>
      cat === editingCategory ? editingName.trim() : cat
    );
    setCategories(updatedCategories);
    setEditingCategory(null);
    setEditingName("");
    setErrors({});

    if (onCategoriesUpdate) {
      onCategoriesUpdate(updatedCategories);
    }

    toast({
      title: "Category updated",
      description: `Category has been updated to "${editingName.trim()}".`,
    });
  };

  const handleDeleteCategory = (categoryName: string) => {
    const updatedCategories = categories.filter((cat) => cat !== categoryName);
    setCategories(updatedCategories);

    if (onCategoriesUpdate) {
      onCategoriesUpdate(updatedCategories);
    }

    toast({
      title: "Category deleted",
      description: `"${categoryName}" has been removed from the categories.`,
      variant: "destructive",
    });
  };

  const handleSelectCategory = (category: string) => {
    if (onCategorySelect) {
      onCategorySelect(category);
      onOpenChange(false);
    }
  };

  const handleClose = () => {
    setEditingCategory(null);
    setEditingName("");
    setNewCategoryName("");
    setErrors({});
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px] max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            Manage {vendorType === "food" ? "Food" : "Grocery"} Categories
          </DialogTitle>
          <DialogDescription>
            View, add, edit, or select categories for{" "}
            {vendorType === "food" ? "menu items" : "products"}.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="browse" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="browse">Browse Categories</TabsTrigger>
            <TabsTrigger value="manage">Manage Categories</TabsTrigger>
          </TabsList>

          <TabsContent value="browse" className="space-y-4">
            <div className="text-sm text-muted-foreground">
              Click on a category to select it for your item.
            </div>
            <ScrollArea className="h-[300px] w-full border rounded-md p-4">
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant="outline"
                    className="justify-start h-auto p-3 text-left"
                    onClick={() => handleSelectCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
              {categories.length === 0 && (
                <div className="text-center text-muted-foreground py-8">
                  No categories available. Add some in the "Manage Categories"
                  tab.
                </div>
              )}
            </ScrollArea>
          </TabsContent>

          <TabsContent value="manage" className="space-y-4">
            {/* Add New Category */}
            <div className="space-y-2">
              <Label htmlFor="newCategory">Add New Category</Label>
              <div className="flex gap-2">
                <Input
                  id="newCategory"
                  placeholder="Enter category name"
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    if (errors.newCategory) {
                      setErrors((prev) => ({ ...prev, newCategory: "" }));
                    }
                  }}
                  className={errors.newCategory ? "border-red-500" : ""}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleAddCategory();
                    }
                  }}
                />
                <Button onClick={handleAddCategory} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
              </div>
              {errors.newCategory && (
                <p className="text-sm text-red-500">{errors.newCategory}</p>
              )}
            </div>

            {/* Existing Categories */}
            <div className="space-y-2">
              <Label>Existing Categories ({categories.length})</Label>
              <ScrollArea className="h-[250px] w-full border rounded-md p-4">
                <div className="space-y-2">
                  {categories.map((category) => (
                    <div
                      key={category}
                      className="flex items-center justify-between p-2 border rounded-md hover:bg-muted/50"
                    >
                      {editingCategory === category ? (
                        <div className="flex-1 flex items-center gap-2">
                          <Input
                            value={editingName}
                            onChange={(e) => {
                              setEditingName(e.target.value);
                              if (errors.edit) {
                                setErrors((prev) => ({ ...prev, edit: "" }));
                              }
                            }}
                            className={`flex-1 h-8 ${
                              errors.edit ? "border-red-500" : ""
                            }`}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleSaveEdit();
                              } else if (e.key === "Escape") {
                                setEditingCategory(null);
                                setEditingName("");
                                setErrors({});
                              }
                            }}
                            autoFocus
                          />
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={handleSaveEdit}
                            className="h-8 w-8 p-0"
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setEditingCategory(null);
                              setEditingName("");
                              setErrors({});
                            }}
                            className="h-8 w-8 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ) : (
                        <>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary">{category}</Badge>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleEditCategory(category)}
                              className="h-8 w-8 p-0"
                            >
                              <Edit2 className="h-3 w-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => handleDeleteCategory(category)}
                              className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                  {categories.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      No categories yet. Add your first category above.
                    </div>
                  )}
                </div>
                {errors.edit && (
                  <p className="text-sm text-red-500 mt-2">{errors.edit}</p>
                )}
              </ScrollArea>
            </div>
          </TabsContent>
        </Tabs>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
