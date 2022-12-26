from scripts import get_article_from_wiki
from flask import Flask, render_template


app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', new_article=get_article_from_wiki())



app.run(debug=True)