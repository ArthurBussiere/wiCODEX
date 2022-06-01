from scripts import get_article_from_wiki
from flask import Flask, render_template, url_for
import random



app = Flask(__name__)

new_article=get_article_from_wiki()

print(new_article[0], new_article[1])

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html', new_article=new_article)

app.run(debug=True)