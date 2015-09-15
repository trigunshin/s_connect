from flask import Flask, render_template, jsonify, request

from flask.ext.uploads import UploadSet, configure_uploads
import os
from werkzeug import secure_filename

app = Flask(__name__)
app.config.from_pyfile("settings.py")


#app.config['UPLOADS_RESUMES_DEST'] = os.path.realpath('.')
app.config['UPLOADED_RESUMES_ALLOW'] = ('pdf', 'PDF')  # can't just use 'pdf' or ['pdf']
#app.config['MAX_CONTENT_LENGTH'] = 32 * 1024 * 1024
resumes = UploadSet('resumes')
configure_uploads(app, resumes)

def _get_job(counter):
    data = {
        'id': counter,
        'title': 'Test Job %i' % counter,
        'salary': {
            'min': 10000 * counter,
            'max': 15000 * counter
        },
        'fee': '%i' % counter,
        'description': "lorem_ipsum"
    }
    counter = counter + 1
    return data

@app.route('/submit', methods=['POST'])
def submit_candidate():
    filename = resumes.save(request.files['file'])
    return jsonify(result=True)


@app.route('/search')
def search():
    data = [_get_job(i+1) for i in range(3)]
    return jsonify(data=data)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run(host='0.0.0.0')

