<?php
namespace App\Http\Controllers\vendor;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function createOrder(Request $request)
    {

        try {
            // Validate the request
            $validated = $request->validate([
                'store_id' => 'required|exists:stores,id',
                'table_id' => 'nullable|exists:tables,id',
                'table'    => 'nullable|string',
                'order'    => 'required|json',
                'total'    => 'required|numeric|min:0',
                'name'     => 'nullable|string|max:255',
                'phone'    => 'nullable|string|max:50',
                'address'  => 'nullable|string',
                'location' => 'nullable|string',
                'note'     => 'nullable|string',
            ]);

            // Determine if this is a table order or delivery order
            $isTableOrder    = ! empty($validated['table_id']) || ! empty($validated['table']);
            $isDeliveryOrder = ! empty($validated['name']) && ! empty($validated['phone']) && ! empty($validated['address']);

            // Validate that we have either table info or delivery info
            if (! $isTableOrder && ! $isDeliveryOrder) {
                return back()->withErrors(['error' => 'Order must have either table information or delivery information']);
            }

            // Decode the order JSON string to array
            $orderArray = json_decode($validated['order'], true);

            // Create the order
            $orderData = [
                'store_id' => $validated['store_id'],
                'user_id'  => Auth::check() ? Auth::id() : null,
                'order'    => $orderArray,
                'total'    => $validated['total'],
                'status'   => 'pending',
            ];

            // Add table info if it's a table order
            if ($isTableOrder) {
                $orderData['table_id'] = $validated['table_id'] ?? null;
                $orderData['table']    = $validated['table'] ?? null;
                $orderData['name']     = null;
                $orderData['phone']    = null;
                $orderData['address']  = null;
                $orderData['location'] = null;
                $orderData['note']     = $validated['note'] ?? null;
            }

            // Add delivery info if it's a delivery order
            if ($isDeliveryOrder) {
                $orderData['table_id'] = null;
                $orderData['table']    = null;
                $orderData['name']     = $validated['name'];
                $orderData['phone']    = $validated['phone'];
                $orderData['address']  = $validated['address'];
                $orderData['location'] = $validated['location'] ?? null;
                $orderData['note']     = $validated['note'] ?? null;
            }

            // Create the order in database
            $order = Order::create($orderData);
            return redirect()->back();
        } catch (ValidationException $e) {
            return Inertia::render("400/index", [
                "error" => $e->getMessage(),
            ]);
        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }

    /**
     * Update order status
     *
     * @param Request $request
     * @param int $id
     * @return \Illuminate\Http\RedirectResponse
     */
    public function updateOrderStatus(Request $request, $id)
    {

        try {
            $user  = Auth::user();
            $store = Store::where('user_id', $user->id)->first();
            if (! $store) {
                return back()->withErrors(['error' => 'Store not found']);
            }
            $order = $store->orders()->findOrFail($id);
            $validated = $request->validate([
                'status' => 'required|in:pending,completed,cancelled',
            ]);
            $order->update([
                'status' => $validated['status'],
            ]);
            return redirect()->back();

        } catch (\Throwable $th) {
            return Inertia::render("500/index", [
                "error" => $th->getMessage(),
            ]);
        }
    }
}
