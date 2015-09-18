from flask import Flask, render_template, jsonify, request
from flask.ext.uploads import UploadSet, configure_uploads
from werkzeug import secure_filename

import os

from db import SQL_DB
# TODO add resume file path/name to submissions
app = Flask(__name__)
app.config.from_pyfile("settings.py")

resumes = UploadSet('resumes')
configure_uploads(app, resumes)

db = SQL_DB(app.config)
db.ensure_databases()

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
    subs = db.get_submissions()
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

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0')
