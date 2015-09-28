from flask import Flask, render_template, jsonify, request
from flask.ext.uploads import UploadSet, configure_uploads
from flask.ext.sqlalchemy import SQLAlchemy
from flask.ext.security import Security, SQLAlchemyUserDatastore, \
    UserMixin, RoleMixin, login_required, current_user

from werkzeug import secure_filename

import os

from db import SQL_DB
# TODO add resume file path/name to submissions
app = Flask(__name__)
app.config.from_pyfile("settings.py")

resumes = UploadSet('resumes')
configure_uploads(app, resumes)

sql_db = SQL_DB(app.config)
sql_db.ensure_databases()


#### flask security
# Create app
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'super-secret'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://vagrant:vagrant@localhost/connect'

# Create database connection object
db = SQLAlchemy(app)

# Define models
roles_users = db.Table('roles_users',
        db.Column('user_id', db.Integer(), db.ForeignKey('user.id')),
        db.Column('role_id', db.Integer(), db.ForeignKey('role.id')))

class Role(db.Model, RoleMixin):
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(80), unique=True)
    description = db.Column(db.String(255))

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    active = db.Column(db.Boolean())
    confirmed_at = db.Column(db.DateTime())
    roles = db.relationship('Role', secondary=roles_users,
                            backref=db.backref('users', lazy='dynamic'))

# Setup Flask-Security
user_datastore = SQLAlchemyUserDatastore(db, User, Role)
security = Security(app, user_datastore)

# Create a user to test with
#@app.before_first_request
#def create_user():
#    db.create_all()
#    user_datastore.create_user(email='matt@nobien.net', password='password')
#    db.session.commit()
#### end security

def _get_job(counter):
    data = {
        'id': counter,
        'title': 'Test Job %i' % counter,
        'salary_min': 10000 * counter,
        'salary_max': 15000 * counter,
        'fee': '%i' % counter,
        'description': "lorem_ipsum"
    }
    counter = counter + 1
    return data

@app.route('/api/submissions/list', methods=['GET'])
def get_submissions():
    subs = sql_db.get_submissions()
    return jsonify(submissions=subs)

@app.route('/submit', methods=['POST'])
def submit_candidate():
    print request.files
    print request.args
    print 'data', request.data
    print 'form', request.form
    print 'json', request.json
    if 'file' in request.files:
        filename = resumes.save(request.files['file'])
        print 'saved to', filename

        db.save_submission(
            request.form['candidate_name'],
            request.form['candidate_email'],
            request.form['job_id'],
            1,
            filename)

    return jsonify(result=True)

@app.route('/search')
def search():
    data = [_get_job(i+1) for i in range(30)]
    return jsonify(data=data)

@app.route('/hi')
@login_required
def hello_world_secure():
    print current_user
    print current_user.is_authenticated
    return 'Hello Worrrrld!'

@app.route('/')
def hello_world():
    print current_user
    print current_user.is_authenticated
    return 'Hello World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0')
