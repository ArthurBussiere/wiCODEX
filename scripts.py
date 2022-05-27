import json
import requests
import random
import re



url1 = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
url2 = "&formatversion=2&explaintext=1&exsentences=10"

#---- Add this KEY to URL to limit to 10 sentences : &exsentences=10


def refactor_words():
    return


def get_article_from_wiki():
    with open("Dicodex/static/title_list.txt", "r") as title_list:
        title = random.choice(title_list.read().splitlines())
    response = requests.get(url1+str(title)+url2)
    try:
        title_article = json.loads(response.content)['query']['pages'][0]['title']
        content_article = json.loads(response.content)['query']['pages'][0]['extract']
        print(content_article)
        raw_list_words = content_article.split()
    except KeyError:
        title_article = "Pas de contenu"
        content_article = None

    list_words = re.split(r" |(?<=')", ' '.join(raw_list_words))
    list_words = [s.replace('(', '') for s in list_words]
    list_words = [s.replace(')', '') for s in list_words]
    list_words = [s.replace('/', '') for s in list_words]
    return title_article, list_words



#-----------DEBUG------------#

new_request = get_article_from_wiki()
# print(new_request[1])


# print(new_request[1])
# # print(list_words.sort())




