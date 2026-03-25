import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  useCreateCategoryMutation,
  useDeleteCategoryMutation,
  useGetCategoriesQuery,
  useUpdateCategoryMutation,
} from "@/store/api/catagoriesApi";

const CategoryManager = () => {
  const {
    data: categoriesData,
    isLoading: isCategoriesLoading,
    isError: isCategoriesError,
    error: categoriesError,
  } = useGetCategoriesQuery();

  const categories = Array.isArray(categoriesData)
    ? categoriesData
    : categoriesData?.categories || categoriesData?.data || [];

  const [createCategoryMutation, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategoryMutation, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();
  const [deleteCategoryMutation, { isLoading: isDeleting }] =
    useDeleteCategoryMutation();

  const [categoryName, setCategoryName] = useState("");
  const [editId, setEditId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!categoryName.trim()) return;

    if (editId) {
      updateCategoryMutation({
        categoryId: editId,
        formData: { name: categoryName },
      })
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          alert(
            `Update failed: ${error?.data?.message || error?.message || error}`,
          );
        });
    } else {
      createCategoryMutation({ name: categoryName })
        .unwrap()
        .then(() => {
          resetForm();
        })
        .catch((error) => {
          alert(
            `Create failed: ${error?.data?.message || error?.message || error}`,
          );
        });
    }
  };

  const handleEdit = (category) => {
    setCategoryName(category.name);
    // Use category._id for consistency with MongoDB's primary key
    setEditId(category._id);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      deleteCategoryMutation({ categoryId: id })
        .unwrap()
        .catch((error) => {
          alert(
            `Delete failed: ${error?.data?.message || error?.message || error}`,
          );
        });
    }
  };

  const resetForm = () => {
    setCategoryName("");
    setEditId(null);
  };

  return (
    <div className="flex ">
      <div className=" flex-1 md:px-16 px-6 md:mx-[43px] md:pb-80 bg-[#F9FBFC] ">
        <h1 className="text-blue-primary font-lato text-xl py-6 md:font-semibold">
          {!editId ? "Create Category" : "Update Category"}
        </h1>
        <form onSubmit={handleSubmit} className=" flex flex-col gap-4">
          <label className="block mb-1 text-neutral-600">Category</label>
          <Input
            type="text"
            placeholder="Write category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="w-2/3 h-[48px] border rounded px-2 py-4 mb-2"
          />
          <div className=" flex gap-6 items-center">
            <Button
              type="submit"
              className="bg-blue-primary h-[48px] w-[315px] text-white px-4 py-2 rounded disabled:opacity-50"
              disabled={
                isCategoriesLoading || isCreating || isUpdating || isDeleting
              }
            >
              {editId ? "Update" : "Submit"}
            </Button>
            {editId && (
              <Button
                type="button"
                onClick={resetForm}
                className="ml-2 text-sm  bg-gray-700 text-white cursor-pointer"
              >
                Cancel
              </Button>
            )}
          </div>
        </form>

        {isCategoriesLoading && (
          <p className="text-sm text-gray-500 mt-2">Loading...</p>
        )}
        {isCategoriesError ? (
          <p className="text-sm text-red-500 mt-2">
            {categoriesError?.data?.message || "Failed to load categories."}
          </p>
        ) : null}

        <div className="flex flex-wrap gap-8 mt-4">
          {categories.map((cat) => (
            <Card key={cat._id} className="gap-0 py-2">
              <CardContent>
                <p>{cat.name}</p>
              </CardContent>
              <CardFooter>
                <Button
                  className="bg-transparent  border-0 shadow-none hover:bg-transparent cursor-pointer"
                  onClick={() => handleDelete(cat._id)}
                >
                  <Trash2 className="text-red-500" />
                </Button>
                <Button
                  className="bg-transparent border-0 shadow-none hover:bg-transparent cursor-pointer text-blue-primary"
                  onClick={() => handleEdit(cat)}
                >
                  <Pencil size={24} />
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <div className="f"></div>
    </div>
  );
};

export default CategoryManager;
