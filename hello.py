from flask import Flask, url_for, render_template
app = Flask(__name__)

@app.route('/')
def hello():
    return url_for('static', filename = 'test.css')
