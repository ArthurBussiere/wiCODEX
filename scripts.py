import json
import requests
import random
import re



url1 = "https://fr.wikipedia.org/w/api.php?action=query&format=json&prop=extracts&titles="
url2 = "&formatversion=2&explaintext=1"

#---- Add this KEY to URL to limit to 10 sentences : &exsentences=10




def get_article_from_wiki():

    special_words = [
        'je','tu','il','elles','on','nous','vous','ils','elle','me','te','se','sa','son','ses','ces','lui',
        'ur','eux','moi','toi','mien','mienne','miens','miennes','nôtre','nôtre','nôtres','tien','tienne',
        'tiens','tiennes','vôtre','vôtre','vôtres','sien','sienne','siens','siennes','leur','leur','leurs',
        'celui','celles','quel','quel','duquel','auquel','quel','desquel','auxquelceux','cel','ceci','cela',
        'celle','c','ça','ci','ceux','la','le','les','de','des','un','une','y','ce','se','ceux','celle','celles',
        'mais','ou','et','donc','or','ni','car','du','en','à','comme','entre','avec','sans','dans','pour','contre',
        'par','après','avant','a','au','tous','tout','toute','toutes','qui','que','quoi','quand','dont','où','il',
        'elle','ils','elles','duquel','desquels','desquelles','aucun','bien','importe','nul','pas','aucune','nulle',
        'assez','beaucoup','chaque','peu','plus','moins','quelque','tellement','trop','aucuns','certains',
        'différents','divers','nuls','aucunes','certaines','différentes','diverses','quelles','nulles','nombre',
        'plupart','plusieurs','quelques','ma','ta','ton','Je','Tu','Il','Elles','On','Nous','Vous','Ils','Elle',
        'Me','Te','Se','Sa','Son','Ses','Ces','Lui','Ur','Eux','Moi','Toi','Mien','Mienne','Miens','Miennes','Nôtre',
        'Nôtres','Tien','Tienne','Tiens','Tiennes','Vôtre','Vôtres','Sien','Sienne','Siens','Siennes','Leur','Leurs',
        'Celui','Celles','Quel','Duquel','Auquel','Desquel','Auxquelceux','Cel','Ceci','Cela','Celle','Ça','Ci','Ceux',
        'La','Le','Les','De','Des','Un','Une','Y','Ce','Mais','Ou','Et','Donc','Or','Ni','Car','Du','En','À','Comme','Entre',
        'Avec','Sans','Dans','Pour','Contre','Par','Après','Avant','A','Au','Tous','Tout','Toute','Toutes','Qui','Que','Quoi',
        'Quand','Dont','Où','Desquels','Desquelles','Aucun','Bien','Importe','Nul','Pas','Aucune','Nulle','Assez','Beaucoup',
        'Chaque','Peu','Plus','Moins','Quelque','Tellement','Trop','Aucuns','Certains','Différents','Divers','Nuls','Aucunes',
        'Certaines','Différentes','Diverses','Quelles','Nulles','Nombre','Plupart','Plusieurs','Quelques','ne','Ne',"D'","L'","Qu'",
        "S'","M'","N'","Jusqu'","d'","l'","qu'","s'","m'","n'","c'","jusqu'","j'","J'",
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22',
        '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
        '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64',
        '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85',
        '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',
     ]

    list_ponct = ['*',' ', '.', '(', ')', '/', ',', '"', "'", ':', ';', '»', '«', '%', '-', '=', '==', '===', '====']

    with open("Perso/wiCODEX/static/title_list.txt", "r") as title_list:
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




