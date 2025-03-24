from flask import Blueprint, request, jsonify
from models.user_model import mongo

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/signup", methods=["POST"])
def signup():
    data = request.json
    if mongo.db.users.find_one({"mobile": data["mobile"]}):
        return jsonify({"error": "User already exists"}), 400
    
    mongo.db.users.insert_one(data)
    return jsonify({"message": "Signup successful!"}), 201
