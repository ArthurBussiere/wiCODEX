import json
import requests
import random
import re



url1 = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
url2 = "&formatversion=2&explaintext=1"

#---- Add this KEY to URL to limit to 10 sentences : &exsentences=10


def get_article_from_wiki():

    with open("static/title_list.txt", "r", encoding='utf-8') as title_list:
        title = random.choice(title_list.read().splitlines())
        response = requests.get(url1+str(title)+url2)
    try:
        title_article = json.loads(response.content)['query']['pages'][0]['title']
        title_article  = title_article.split()

        content_article = json.loads(response.content)['query']['pages'][0]['extract']
        list_paragraphs = content_article.split("\n")
        main_article = []
        for paragraph in list_paragraphs:
            if len(paragraph) == 0 or paragraph[0] == '':
                del paragraph
            else:
                list_words = paragraph.split()
                list_words = re.split(r"\0|(?<=')|(?=-)|(?=,)|(?=:)|(?=[%.])|(?=[%(])|(?=[%)])|(?=[%])|(?=[%[])", '\0'.join(list_words))
                list_words = re.split(r"\0|(?<=-)|(?<=[%(])|(?<=[%)])", '\0'.join(list_words))
                main_article.append(list_words)
    except KeyError:
        title_article = "Pas de contenu"
        main_article = None

    return title_article, main_article



#-----------DEBUG------------#

# new_request = get_article_from_wiki()

# print(new_request[0])




