from app import app

with app.test_request_context():
    print(app.url_map)
