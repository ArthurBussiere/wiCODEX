import json
import requests
import random
import re



url1 = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
url2 = "&formatversion=2&explaintext=1&exsentences=10"

#---- Add this KEY to URL to limit to 10 sentences : &exsentences=10




def get_article_from_wiki():

    special_words = [
        'la', 'le', 'La', 'Le', 'de', 'De', 'des', 'Des', 'un', 'Un', 'une', 'Une',
    'mais','Mais', 'ou', 'Ou', 'et', 'Et', 'donc', 'Donc', 'or', 'Or', 'ni', 'Ni', 'car', 'Car',
    'du', 'Du', 'en', 'En','à', "d'", "D'", "l'", "L'", "qu'", "Qu'", "s'", "S'", 'est', 'était',
    'Etait', 'comme', 'Comme', 'entre', 'Entre', 'avec', 'Avec', 'dans', 'Dans', 'pour', 'Pour', 
    'contre', 'Contre', 'par', 'Par', 'après', 'Après', 'avant', 'Avant'
     ]
    list_ponct = [' ', '.', '(', ')', '/', ',', '"', "'", ':', '»', '«', '%', '-']

    with open("Dicodex/static/title_list.txt", "r") as title_list:
        title = random.choice(title_list.read().splitlines())
        response = requests.get(url1+str(title)+url2)
    try:
        title_article = json.loads(response.content)['query']['pages'][0]['title']
        title_article  = title_article.split()

        content_article = json.loads(response.content)['query']['pages'][0]['extract']
        list_words = content_article.split()
    except KeyError:
        title_article = "Pas de contenu"
        content_article = None

    list_words = re.split(r"\0|(?<=')|(?=-)|(?=,)|(?=:)|(?=[%.])|(?=[%(])|(?=[%)])|(?=[%])|(?=[%[])", '\0'.join(list_words))
    list_words = re.split(r"\0|(?<=-)|(?<=[%(])|(?<=[%)])", '\0'.join(list_words))

    return title_article, list_words, special_words, list_ponct



#-----------DEBUG------------#

# new_request = get_article_from_wiki()
# print(new_request[1])

# # print(list_words.sort())




