from flask import Blueprint, request, jsonify
from bson import ObjectId
from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

users_bp = Blueprint('users', __name__)

client = MongoClient(os.getenv("MONGO_URI"))
db = client["cakestore"]  # Replace with your actual DB name
users_col = db["users"]


# 🔍 Get user by mobile number
@users_bp.route("/get-user-by-mobile/<mobile>", methods=["GET"])
def get_user_by_mobile(mobile):
    try:
        user = users_col.find_one({"mobile": mobile})
        if not user:
            return jsonify({"msg": "User not found"}), 404

        user["_id"] = str(user["_id"])  # Convert ObjectId to string
        user.pop("password", None)      # Hide password

        return jsonify({"user": user}), 200

    except Exception as e:
        return jsonify({"msg": "Error retrieving user", "error": str(e)}), 400

# ✏️ Update user profile
@users_bp.route("/update-profile/<user_id>", methods=["PUT"])
def update_profile(user_id):
    try:
        data = request.get_json()

        allowed_fields = [
            "firstName", "middleName", "lastName", "dob", "age", "gender",
            "mobile", "address1", "address2", "landmark", "city", "state",
            "country", "password"
        ]

        update_data = {field: data[field] for field in allowed_fields if field in data}

        if not update_data:
            return jsonify({"msg": "No valid fields provided"}), 400

        result = users_col.update_one(
            {"_id": ObjectId(user_id)},
            {"$set": update_data}
        )

        if result.matched_count == 0:
            return jsonify({"msg": "User not found"}), 404
        elif result.modified_count > 0:
            return jsonify({"msg": "Profile updated successfully"}), 200
        else:
            return jsonify({"msg": "No changes made"}), 200

    except Exception as e:
        return jsonify({"msg": "Update failed", "error": str(e)}), 400
