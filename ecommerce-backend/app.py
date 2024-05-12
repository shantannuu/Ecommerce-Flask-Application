from flask import Flask, jsonify, request , current_app
# from models import db
from flask_cors import CORS
from flask_migrate import Migrate
from routes import product_routes, user_routes, order_routes

app = Flask(__name__)
app.config['SECRET_KEY'] = 'ReactJsFlaskApp'

from models import db
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:shantanu@localhost/React_flask_app'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

CORS(app)

# Initialize SQLAlchemy
db.init_app(app)

migrate = Migrate(app, db)

# Register blueprints
app.register_blueprint(product_routes)
app.register_blueprint(user_routes)
app.register_blueprint(order_routes)

@app.route('/')
def index():
    return 'Hello, world!'

if __name__ == '__main__':
    app.run(debug=True)
