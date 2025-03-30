from flask import Blueprint, jsonify
from models.user_model import mongo

items_bp = Blueprint("items", __name__)

@items_bp.route("/items", methods=["GET"])
def get_items():
    items = list(mongo.db.items.find({}, {"_id": 0})) 
    return jsonify(items), 200
