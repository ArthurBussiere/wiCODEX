


const special_words = [
  'la', 'le', 'les', 'de', 'des', 'un', 'une', 'y', 'ce', 'ci', 'se', 'ceux', 'celle', 'celles',
  'mais', 'ou', 'et', 'donc', 'or', 'ni', 'car', 'du', 'en', 'à', "d'", "l'", "qu'", "s'", "m'", "n'",
  "c'", "jusqu'", 'est', 'était', 'comme', 'entre', 'avec', 'sans', 'dans', 'pour', 'contre', 'par',
  'apres', 'avant', 'a', 'au', 'tous', 'tout', 'toute', 'toutes,', 'qui', 'que', 'quoi', 'quand', 'dont',
  'où', 'on','ces', 'celui', 'ça', 'sa', 'ses', 'tant', 'trop', 'si', 'non', 'oui',
  'plus', 'moins', 'aussi', 'autant', 'peu', 'beaucoup', 'encore', 'toujours', 'jamais', 'déjà', 'hier',
  'autre', 'autres', 'même', 'mêmes', 'meme', 'memes', 'outre', 'ainsi', 'alors', 'bien', 'bientôt', 'bon', 'sur', 'sous',
  'je', 'tu', 'il', 'elle', 'nous', 'vous', 'ils', 'elles', 'moi', 'toi', 'lui', 'eux', 'leur', 'leurs', 'parce'
]

const special_characters = [
  '.', ',', ';', ':', '!', '?', '(', ')', '[', ']', '{', '}', '«', '»', '“', '”', '’', '‘', '…', '–', '—', '-', '+', '==', '===', '===='
]

const singular_words = ['temps', 'univers', 'obus', 'français', 'corps']


let article = {}
let victory_hits_count = 0
let submitted_words = {
  // word: {
  //   submitted: false,
  //   hits: 0,
  // }
}

let hl_word_count = 1
let hl_word = ''

function isInteger(value) {
  if (parseInt(value, 10).toString() === value) {
    return true
  }
  return false;
}

function formalize(element) { //remove accent & uppercase
  return element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '')
}

function isSpecificWord(word) { // return the word wrapped by a span and his specific class
  if (special_words.includes(word.toLowerCase()) || isInteger(word)) {
    spanned_word = `<span class='special_word'>${word}</span> `
  }

  else if (special_characters.includes(word)) {
    if (word === ')' || word === '»' || word === '.' || word === ',' || word === ':') {
      spanned_word = `<span class='char leftMargin'>${word}</span> `
    } else if (word === '(' || word === '[' || word === '{' || word === '«') {
      spanned_word = `<span class='char rightMargin'>${word}</span> `
    } else if (word === '-') {
      spanned_word = `<span class='char doubleMargin'>${word}</span> `
    } else {
      spanned_word = `<span class='char'>${word}</span> `
    }
  } else {
    spanned_word = `<span class='hidden_word'>${word}</span> `
  }

  return spanned_word
}


$(document).ready(

  async function showArticle() {

    const response = await fetch('/get_article')
    const raw_article = await response.json()

    article.title = raw_article[0]
    for (word of article.title) {
      $('#title_article').append(isSpecificWord(word))
    }

    article.paragraphs = {}
    for (let i = 0; i < raw_article[1].length; i++) {
      article.paragraphs[i] = raw_article[1][i]
      paragraph = `<p id='p_${i}'>`
      if (article.paragraphs[i][0] === '==') {
        paragraph += `<h2>`
      } else if (article.paragraphs[i][0] === '===') {
        paragraph += `<h3>`
      }
      for (word of article.paragraphs[i]) {
        paragraph += isSpecificWord(word)
      }
      paragraph += '</p>'
      $('#content_article').append(paragraph)
    }
  })


function tooglePlural(word) {
  if (singular_words.includes(word)) {
    return word
  } else if (word.endsWith('al')) {
    return word.slice(0, -2) + 'aux'
  } else if (word.endsWith('aux')) {
    return word.slice(0, -3) + 'al'
  } else if (word.endsWith('s')) {
    return word.slice(0, -1)
  } else { return word + 's' }
}

function removePlural(word) {
  if (singular_words.includes(word)) {
    return word
  } else if (word.endsWith('aux')) {
    return word.slice(0, -3) + 'al'
  } else if (word.endsWith('s')) {
    return word.slice(0, -1)
  } else { return word }
}

function hiddenWordDiscover(word) {
  let hidden_words = $('.hidden_word')
  let word_hits_count = 0

  for (let i = 0; i < hidden_words.length; i++) {
    if ((formalize(hidden_words[i].innerHTML) === word)
      || (formalize(hidden_words[i].innerHTML) === tooglePlural(word))) {
      word_hits_count += 1
      hidden_words[i].classList.remove('hidden_word')
      hidden_words[i].classList.add('revealed_word')
      hidden_words[i].id = removePlural(word) + '_' + word_hits_count
      hidden_words[i].classList.add('hl_' + removePlural(word))
    }
  }
  //add word in submitted_words 
  submitted_words[removePlural(word)] = {
    submitted: true,
    hits: word_hits_count,
  }
}


function newWord() {
  event.preventDefault()

  const submit_word = formalize($('#submitted_word').val())
  
  console.log(submit_word)

  if (submit_word.length >= 1) {
    if (special_words.includes(submit_word)) {
      alert('Ce mot est déjà revélé')
    } else if (isInteger(submit_word)) {
      alert('Les chiffres ne sont pas acceptés')
    } else if (
      (Object.keys(submitted_words).includes(removePlural(submit_word)))
      || Object.keys(submitted_words).includes(tooglePlural(submit_word))) {
      alert('Ce mot a déjà été soumis')
    } else {
      hiddenWordDiscover(submit_word)
      victory_hits_count += 1
      showGuessTable(submitted_words)
    }
    $('#submitted_word').val('')
  }
}

function showGuessTable(submitted_words) {
  let guess_table = $('#guess_table')
  let guess_table_content = ``
  let i = 1
  for (let word in submitted_words) {
      // word is equal to his special word
    
    guess_table_content += `<tr>
    <td>${i}</td>
    <td><a class="clickable" onclick="clickOnWord('${word}')" id="table-word-${word}">${word}</a></td>
    <td>${submitted_words[word].hits}</td>
    </tr>`
    i += 1
  }
  guess_table.html(guess_table_content)
}

function clickOnWord(word) {
  $('.clicked').removeClass('clicked')
  $('.redclicked').removeClass('redclicked')
  let words = $(`.hl_${word}`)
  let table_word = $(`#table-word-${word}`)
  
  for (let i = 0; i < words.length; i++) {
    words[i].classList.add('clicked')
  }

  if (hl_word_count > words.length) {
    hl_word_count = 1
  }
  if ((word === hl_word) && !(submitted_words[word].hits === 0)) {
    $(`#${word}_${hl_word_count}`)[0].scrollIntoView(
      { behavior: 'smooth', block: 'center' }
    )
    hl_word_count += 1
  } else {
    hl_word = word
    hl_word_count = 1
  }

  if (word in submitted_words && submitted_words[word].hits > 0) {
    table_word.addClass('clicked')
  } else {
    table_word.addClass('redclicked')
  }
}


$('html').click(function (e) {
  if (!$(e.target).is('.clickable')) {
    $('.clicked').removeClass('clicked')
    $('.redclicked').removeClass('redclicked')

    if ($(e.target).is('#footer')) {
      submitted_word = document.getElementById('submitted_word')
      submitted_word.focus()
    }
  }
})


// class Word {

//   constructor(char, type,) {
//     this.char = char
//     this.type = type
//   }

  
// }

