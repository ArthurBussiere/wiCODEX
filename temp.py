import re

list_words = [
 'La:', '(domestication', "d'un",
 'animal,', "d'", 'un', '(végétal),',
 'necessite', 'un', 'pont-levis', 'et', 'une', 'ferme.'
]
print('\0'.join(list_words))

list_words = re.split(r"\0|(?<=')|(?=-)|(?=,)|(?=:)|(?=[%.])|(?=[%(])|(?=[%)])|(?=[%])|(?=[%[])", '\0'.join(list_words))
list_words = re.split(r"\0|(?<=-)|(?<=[%(])|(?<=[%)])", '\0'.join(list_words))


print(list_words)