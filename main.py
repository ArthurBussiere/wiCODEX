from api import get_article_from_wiki
from flask import Flask, render_template
import json

app = Flask(__name__)


@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')


@app.route('/get_article', methods=['GET'])
def new_article():
    # return dayarticle in json 
    return json.dumps(day_article)

if __name__ == '__main__':
    day_article = get_article_from_wiki()
    app.run(host="0.0.0.0", debug=True)



