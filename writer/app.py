# Standard libs imports
import io
import os
import csv

# Third party libs imports
from flask import Flask, request, jsonify
from pymongo import InsertOne
from flask_pymongo import PyMongo
from werkzeug.utils import secure_filename

app = Flask(__name__)

# File Upload
UPLOAD_FOLDER = './tmp'
ALLOWED_EXTENSIONS = set(['csv'])
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# MongoDB
default_uri = 'mongodb://localhost:27017/vizzuality-code-challenge'
mongodb_uri = os.environ.get('MONGODB_URI', default_uri)
app.config["MONGO_URI"] = mongodb_uri
mongo = PyMongo(app)


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        raise Exception('No file part')
    file = request.files['file']
    if file.filename == '':
        raise Exception('No selected file')
    allowed_file(file.filename)
    filename = secure_filename(file.filename)

    stream = io.StringIO(file.stream.read().decode("UTF8"), newline=None)
    csv_input = csv.DictReader(stream)

    operations = []

    for row in csv_input:
        operations.append(InsertOne(dict(row)))

    result = mongo.db.entries.bulk_write(operations)
    print(result.inserted_count)

    return jsonify({
        'inserted_count': result.inserted_count
    })
