from flask import Flask
from flask_cors import CORS
from config import Config
from models.user_model import init_db
from routes.auth_routes import auth_bp

app = Flask(__name__)
app.config.from_object(Config)
CORS(app)

init_db(app)
app.register_blueprint(auth_bp)

if __name__ == "__main__":
    app.run(debug=True)
