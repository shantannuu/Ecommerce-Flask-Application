# product_routes.py

from flask import Blueprint, jsonify, request
from models import db, Product, User, Order, OrderItem
from authMiddleware import generate_jwt_token, verify_jwt_token
from sqlalchemy.exc import IntegrityError
import hashlib
product_routes = Blueprint('product_routes', __name__)
user_routes = Blueprint('user_routes', __name__)
order_routes = Blueprint('order_routes', __name__)

# Product API
@product_routes.route('/products', methods=['GET'])
def get_products():
    products = Product.query.all()
    return jsonify([product.serialize() for product in products])

@product_routes.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.serialize())

@product_routes.route('/products', methods=['POST'])
def create_product():
    data = request.json
    new_product = Product(**data)
    db.session.add(new_product)
    db.session.commit()
    return jsonify(new_product.serialize()), 201

@product_routes.route('/products/<int:id>', methods=['PUT'])
def update_product(id):
    product = Product.query.get_or_404(id)
    data = request.json
    for key, value in data.items():
        setattr(product, key, value)
    db.session.commit()
    return jsonify(product.serialize())

@product_routes.route('/products/<int:id>', methods=['DELETE'])
def delete_product(id):
    product = Product.query.get_or_404(id)
    db.session.delete(product)
    db.session.commit()
    return jsonify({'message': 'Product deleted'})


# user API
@user_routes.route('/register', methods=['POST'])
def register_user():
    data = request.json
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    # Check if the username is already taken
    existingUser = User.query.filter_by(username=username).first()

    if existingUser:
        return jsonify({'message': 'Username is already taken'}), 400

    existingUser = User.query.filter_by(email=email).first()

    if existingUser:
        return jsonify({'message': 'email is already taken'}), 400


    try:
        # Hash the password before storing it in the database
        password_hash = hashlib.sha256(password.encode()).hexdigest()
        new_user = User(username=username, email=email, password=password_hash)
        db.session.add(new_user)
        db.session.commit()
        return jsonify({'message':'Registration successful!', 'data' : new_user.serialize()}), 201

    except IntegrityError:
        # Handle database integrity error (e.g., duplicate entry)
        db.session.rollback()
        return jsonify({'message': 'An error occurred while registering the user'}), 500

@user_routes.route('/login', methods=['POST'])
def login():
    data = request.json

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=data['email']).first()
    if user:
        if hashlib.sha256(password.encode()).hexdigest() == user.password:
            # Generate JWT token
            token = generate_jwt_token(user.id)
            return jsonify({'user_id': user.id,'token': token})
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@user_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get_or_404(user_id)
    return jsonify(user.serialize())

# Order API
@order_routes.route('/orders', methods=['POST'])
def create_order():
    data = request.json
    user_id = verify_jwt_token(request.headers.get('Authorization'))
    print(user_id)
    if user_id:
        # Create order
        # Make sure to validate data and handle errors
        
        # Extract 'order_items' from the data
        order_items_data = data.pop('order_items', [])

        new_order = Order(user_id=user_id, **data)

        # Create OrderItem instances for each order item and associate them with the new order
        for item_data in order_items_data:
            order_item = OrderItem(**item_data)
            new_order.order_items.append(order_item)

        
        
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.serialize()), 201
    else:
        return jsonify({'message': 'Unauthorized'}), 401

@order_routes.route('/orders/<int:user_id>', methods=['GET'])
def get_orders(user_id):
    orders = Order.query.filter_by(user_id=user_id).all()
    return jsonify([order.serialize() for order in orders])