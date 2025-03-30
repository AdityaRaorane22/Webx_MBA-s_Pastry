from flask import Blueprint, request, jsonify
from models.user_model import mongo

cart_bp = Blueprint("cart", __name__)
@cart_bp.route("/cart/save-order", methods=["POST"])
def save_order():
    data = request.json
    print("Received data:", data)  # Debugging step

    required_fields = ["mobile", "name", "description", "price", "flavour", "image", "quantity"]
    for field in required_fields:
        if field not in data:
            print(f"❌ Missing field: {field}")  # Debugging print
            return jsonify({"error": f"Missing required field: {field}"}), 400

    # If all fields are present, proceed to save the order
    existing_order = mongo.db.saved_orders.find_one({"mobile": data["mobile"], "name": data["name"]})
    
    if existing_order:
        new_quantity = existing_order["quantity"] + data["quantity"]
        mongo.db.saved_orders.update_one(
            {"mobile": data["mobile"], "name": data["name"]},
            {"$set": {"quantity": new_quantity}}
        )
    else:
        mongo.db.saved_orders.insert_one(data)

    return jsonify({"message": "Order saved successfully"}), 200

@cart_bp.route("/cart/<mobile>", methods=["GET"])
def get_cart(mobile):
    orders = list(mongo.db.saved_orders.find({"mobile": mobile}, {"_id": 0}))
    return jsonify(orders), 200

@cart_bp.route("/cart/confirm-delivery", methods=["POST"])
def confirm_delivery():
    data = request.json
    mobile = data.get("mobile")

    if not mobile:
        return jsonify({"error": "Mobile number is required"}), 400

    # Fetch user's cart items
    orders = list(mongo.db.saved_orders.find({"mobile": mobile}))

    if not orders:
        return jsonify({"error": "No items in cart to confirm"}), 400

    for order in orders:
        item_name = order["name"]
        quantity_ordered = order["quantity"]

        # Find item in `items` collection
        item = mongo.db.items.find_one({"name": item_name})

        if item:
            new_quantity = max(0, int(item["quantity"]) - int(quantity_ordered))
            mongo.db.items.update_one(
                {"name": item_name},
                {"$set": {"quantity": new_quantity}}
            )
        else:
            return jsonify({"error": f"Item '{item_name}' not found in inventory"}), 400

    # Remove confirmed orders from the cart
    mongo.db.saved_orders.delete_many({"mobile": mobile})

    return jsonify({"message": "✅ Delivery confirmed! Your order has been initiated. We will contact you within 24 hours for payment details."}), 200




@cart_bp.route("/cart/remove-item", methods=["POST"])
def remove_cart_item():
    """Remove an item from the user's cart."""
    data = request.json
    print("📥 Received data from frontend:", data)  # Debugging

    if not data:
        print("❌ No data received!")
        return jsonify({"error": "No data received"}), 400

    mobile = data.get("mobile")
    item_name = data.get("name")

    print(f"📞 Mobile: {mobile}, 🏷️ Item Name: {item_name}")  # Debugging

    if not mobile or not item_name:
        print("❌ Missing Data:", {"mobile": mobile, "name": item_name})  # Debugging
        return jsonify({"error": "Mobile number and item name are required"}), 400

    result = mongo.db.saved_orders.delete_one({"mobile": mobile, "name": item_name})

    if result.deleted_count > 0:
        print(f"✅ Item '{item_name}' removed successfully for {mobile}")
        return jsonify({"message": "🗑️ Item removed successfully!"}), 200
    else:
        print(f"❌ Item '{item_name}' not found in cart for {mobile}")
        return jsonify({"error": "Item not found in cart"}), 400
