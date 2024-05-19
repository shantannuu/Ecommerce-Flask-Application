# product_routes.py

from flask import Blueprint, jsonify, request
from models import db,Category, Product, User, Order, OrderItem
from authMiddleware import generate_jwt_token, verify_jwt_token
from sqlalchemy.exc import IntegrityError
import hashlib
product_routes = Blueprint('product_routes', __name__)
user_routes = Blueprint('user_routes', __name__)
order_routes = Blueprint('order_routes', __name__)
category_routes = Blueprint('category_routes', __name__)


# Category API
@category_routes.route('/Categories', methods=['POST'])
def create_category():
    try:
        data = request.json
        name = data.get('name').lower()
        description = data.get('description').lower()
        existingCategory = Category.query.filter_by(name=name).first()
        
        if existingCategory:
            return jsonify({'success':False , 'message': 'Category is already added'}), 400
        
        new_category = Category(name=name,description=description)
        db.session.add(new_category)
        db.session.commit()
        return jsonify({'success': True , 'message': 'Category Added' ,'category' : new_category.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

@product_routes.route('/Categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    return jsonify({'success': True , 'message': 'Category Fetched' , 'data': [category.serialize() for category in categories]})


# Product API
@product_routes.route('/products', methods=['GET'])
def get_products():
    try:
        products = Product.query.all()
        return jsonify({'success': True , 'message': 'Product Fetched' , 'data': [product.serialize() for product in products]})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

@product_routes.route('/products/<int:id>', methods=['GET'])
def get_product(id):
    product = Product.query.get_or_404(id)
    return jsonify(product.serialize())

@product_routes.route('/products', methods=['POST'])
def create_product():
    try:
        data = request.json
        new_product = Product(
            name=data['name'],
            description=data['description'],
            price=data['price'],
            image_url=data['image'],
            quantity=data['quantity'],
            category_id=data['category']
        )
        db.session.add(new_product)
        db.session.commit()
        return jsonify({'success': True , 'message' : 'Product Added' ,'product' : new_product.serialize()}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

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
            token = generate_jwt_token(user.id,user.role)
            return jsonify({'token': token})
        else:
            return jsonify({'message': 'Invalid username or password'}), 401
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@user_routes.route('/user', methods=['GET'])
def get_user():
    try:
        user_id = verify_jwt_token(request.headers.get('Authorization'))
        print(user_id)
        if(user_id):
            user = User.query.get_or_404(user_id['user'])
            return jsonify({'success': True , 'user' : user.serialize()})
        else:
            return jsonify({'success': False , 'message' : 'No user Found'})
    except RuntimeError:
        # Handle database integrity error (e.g., duplicate entry)
        db.session.rollback()
        return jsonify({'success': False ,'message': 'An error occurred while fetching the user'}), 500
    
@user_routes.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return jsonify({'success': True , 'message': 'User Fetched' , 'data': [user.serialize() for user in users]})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

@user_routes.route('/user/<int:user_id>', methods=['GET'])
def get_user_by_id(user_id):
    try:
        user = User.query.get_or_404(user_id)
        if user:
            return jsonify({'success': True , 'message': 'User Fetched' , 'user' : user.serialize()})
        else:
            return jsonify({'success': False , 'message': 'User not found'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

# Order API
@order_routes.route('/orders', methods=['GET'])
def get_orders():
    try:
        orders = Order.query.all()
        return jsonify({'success': True , 'message': 'Orders Fetched' , 'data': [order.serialize() for order in orders]})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500

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

        new_order = Order(user_id=user_id['user'], **data)

        # Create OrderItem instances for each order item and associate them with the new order
        for item_data in order_items_data:
            order_item = OrderItem(**item_data)
            new_order.order_items.append(order_item)

        
        
        db.session.add(new_order)
        db.session.commit()
        return jsonify(new_order.serialize()), 201
    else:
        return jsonify({'message': 'Unauthorized'}), 401

@order_routes.route('/orders/<int:order_id>', methods=['GET'])
def get_order_by_id(order_id):
    try:
        order = Order.query.get_or_404(order_id)
        if order:

            return jsonify({'success': True , 'message': 'order Fetched' , 'order' : order.serialize() })
        else:
            return jsonify({'success': False , 'message': 'order not found'})
    except Exception as e:
        db.session.rollback()
        return jsonify({'success': False ,'message': str(e)}), 500