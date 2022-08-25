<?php

namespace App\Http\Controllers;

use App\Http\Resources\ToDoResource;
use App\Models\ToDo;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\MessageBag;

class ToDoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $ToDos = ToDo::all()->map(fn(ToDo $toDo) => new ToDoResource($toDo));
        return response()->json([
            "success" => true,
            "message" => "ToDo List",
            "data" => $ToDos
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
            'title' => 'required',
            'category_id' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $ToDo = ToDo::create($input);
        return response()->json([
            "success" => true,
            "message" => "ToDo created successfully.",
            "data" => $ToDo
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
        $ToDo = ToDo::find($id);
        if (is_null($ToDo)) {
            return $this->sendError('ToDo not found.');
        }
        return response()->json([
            "success" => true,
            "message" => "ToDo retrieved successfully.",
            "data" => $ToDo
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param ToDo $todo
     * @return JsonResponse
     */
    public function update(Request $request, ToDo $todo): JsonResponse
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'name' => 'required',
            'detail' => 'required'
        ]);
        if($validator->fails()){
            return $this->sendError('Validation Error.', $validator->errors());
        }
        $todo->name = $input['name'];
        $todo->detail = $input['detail'];
        $todo->save();
        return response()->json([
            "success" => true,
            "message" => "ToDo updated successfully.",
            "data" => $todo
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param ToDo $ToDo
     * @return JsonResponse
     */
    public function destroy(ToDo $ToDo): JsonResponse
    {
        $ToDo->delete();
        return response()->json([
            "success" => true,
            "message" => "ToDo deleted successfully.",
            "data" => $ToDo
        ]);
    }

    /**
     * @param string $message
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
