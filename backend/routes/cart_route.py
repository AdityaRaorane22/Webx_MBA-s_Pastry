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