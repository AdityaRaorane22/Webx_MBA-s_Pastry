from flask import Blueprint, request, jsonify
from models.user_model import mongo

login_bp = Blueprint("login", __name__)

@login_bp.route("/login", methods=["POST"])
def login():
    data = request.json
    user = mongo.db.users.find_one({"mobile": data["mobile"], "password": data["password"]})

    if not user:
        return jsonify({"error": "Invalid mobile number or password"}), 401
    
    return jsonify({"message": "Login successful!", "mobile": data["mobile"]}), 200
