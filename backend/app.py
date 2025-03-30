from flask import Flask
from flask_cors import CORS
from config import Config
from models.user_model import init_db
from routes.auth_routes import auth_bp
from routes.login_routes import login_bp
from routes.items_route import items_bp
from routes.cart_route import cart_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app, resources={r"/*": {"origins": "*"}})

init_db(app)
app.register_blueprint(auth_bp)
app.register_blueprint(login_bp)
app.register_blueprint(items_bp)
app.register_blueprint(cart_bp)

if __name__ == "__main__":
    app.run(debug=True)
