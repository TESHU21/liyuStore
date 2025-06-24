import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/lib/axiosInstance";
import { data } from "react-router-dom";
// fetch all products
export const fetchProducts=createAsyncThunk(
    'products/fetchProducts',async(_,thunkAPI)=>{
        try{
            const response=await axiosInstance.get("/api/products")
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products")
        }

    }
)
// fetch  products by Id
export const fetchProductsById=createAsyncThunk(
    'products/fetchProductsById',async(_,thunkAPI)=>{
        try{
            const response=await axiosInstance.get(`/api/products/${id}`)
            return response.data
        }catch(error){
            return thunkAPI.rejectWithValue(error.response?.data || "Failed to fetch products")
        }

    }
)
// Create Products
export const createProducts=createAsyncThunk(
    "products/createProducts",async(formData,thunkAPI)=>{
        try{
            const response=await axiosInstance.post("/api/products",formData)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||"Creating Products Failed"
            );
        }
    }
)
// update products
export const updateProducts=createAsyncThunk(
    "products/updateProducts",async(formData,thunkAPI)=>{
        try{
            const response=await axiosInstance.put(`/api/products/${id}`,formData)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||"Updating Products Failed"
            );
        }
    }
)
// delete products
export const deleteProducts=createAsyncThunk(
    "products/deleteProducts",async(formData,thunkAPI)=>{
        try{
            const response=await axiosInstance.delete(`/api/products/${id}`,formData)
            return response.data
        }
        catch(error){
            return thunkAPI.rejectWithValue(
                error.response?.data?.message ||"Delete Products Failed"
            );
        }
    }
)
