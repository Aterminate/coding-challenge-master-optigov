<?php

namespace App\Http\Controllers;

use App\Http\Resources\CategoryResource;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class CategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = Category::all()->map(fn(Category $category) => new CategoryResource($category));
        return response()->json([
            "success" => true,
            "message" => "Category List",
            "data" => $categories
        ]);
    }
    /**
     * Store a newly created resource in storage.
     *
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $category = Category::create($input);
        return response()->json([
            "success" => true,
            "message" => "Category created successfully.",
            "data" => $category
        ]);
    }
    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return JsonResponse
     */
    public function show($id): JsonResponse
    {
        $category = Category::find($id);
        if (is_null($category)) {
            return $this->sendError('Category not found.');
        }
        return response()->json([
            "success" => true,
            "message" => "Category retrieved successfully.",
            "data" => $category
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Category $category
     * @return JsonResponse
     */
    public function update(Request $request, Category $category): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $category->name = $input['name'];
        $category->detail = $input['detail'];
        $category->save();
        return response()->json([
            "success" => true,
            "message" => "Category updated successfully.",
            "data" => $category
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function destroy(Category $category): JsonResponse
    {
        $category->delete();
        return response()->json([
            "success" => true,
            "message" => "Category deleted successfully.",
            "data" => $category
        ]);
    }

    /**
     * @param string $message
     * @param MessageBag|null $errors
     * @return JsonResponse
     */
    private function sendError(string $message, MessageBag $errors = null): JsonResponse
    {
        return response()->json([
            "success" => false,
            "message" => $message,
            "errors" => $errors
        ], 400);
    }
}
