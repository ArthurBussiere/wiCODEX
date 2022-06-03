import json
import requests
import random
import re



url1 = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
url2 = "&formatversion=2&explaintext=1"

#---- Add this KEY to URL to limit to 10 sentences : &exsentences=10




def get_article_from_wiki():

    special_words = [
        'la', 'le', 'La', 'Le', 'y', 'Ce', 'ce', 'Ce', 'se', 'Se', 'Ceux', 'ceux', 'celle', 'Celle', 'celles', 'Celles', 'de', 'De', 'des', 'Des', 'un', 'Un', 'une', 'Une',
    'mais','Mais', 'ou', 'Ou', 'et', 'Et', 'donc', 'Donc', 'or', 'Or', 'ni', 'Ni', 'car', 'Car', 'y',
    'du', 'Du', 'en', 'En','à', "d'", "D'", "l'", "L'", "qu'", "Qu'", "s'", "S'", "m'", "M'","n'",
    "N'", "c'", "C'", "jusqu'", "Jusqu'", 'est', 'était', 'Etait', 'comme', 'Comme', 'entre', 'Entre', 'avec', 'Avec', 'sans', 'Sans', 'dans', 'Dans', 'pour', 'Pour', 
    'contre', 'Contre', 'par', 'Par', 'après', 'Après', 'avant', 'Avant', 'a', 'A', 'au', 'Au' 'tous', 'Tous', 'tout', 'Tout', 'toute', 'Toute', 'toutes,', 'Toutes'
     ]
    list_ponct = ['*',' ', '.', '(', ')', '/', ',', '"', "'", ':', ';', '»', '«', '%', '-', '=', '==', '===', '====']

    with open("Dicodex/static/title_list.txt", "r") as title_list:
        title = random.choice(title_list.read().splitlines())
        response = requests.get(url1+str(title)+url2)
    try:
        title_article = json.loads(response.content)['query']['pages'][0]['title']
        title_article  = title_article.split()

        content_article = json.loads(response.content)['query']['pages'][0]['extract']
        list_paragraphs = content_article.split("\n")
        list_article = []
        for paragraph in list_paragraphs:
            if len(paragraph) == 0:
                del paragraph
            elif paragraph[0] == '':
                del paragraph
            else:
                list_words = paragraph.split()
                list_words = re.split(r"\0|(?<=')|(?=-)|(?=,)|(?=:)|(?=[%.])|(?=[%(])|(?=[%)])|(?=[%])|(?=[%[])", '\0'.join(list_words))
                list_words = re.split(r"\0|(?<=-)|(?<=[%(])|(?<=[%)])", '\0'.join(list_words))
                list_article.append(list_words)
    except KeyError:
        title_article = "Pas de contenu"
        list_article = None



    return title_article, list_article, special_words, list_ponct



#-----------DEBUG------------#

# new_request = get_article_from_wiki()

# print(new_request[1])




