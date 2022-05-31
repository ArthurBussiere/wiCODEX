

var guessedWord =  [];
const contentArticle = (document.getElementById('content-article').textContent.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

function newWord() {

    var word = document.getElementById('word').value.toLowerCase()
    word = word.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    word = word.replace(/\s/g, '');

    if (!(word.length === 0)){

        if (guessedWord.includes(word)) {

            //do your code to hightlight already guessed Word in table

            }else{guessedWord.push(word)}

        let html=""

        for (const [i, word] of guessedWord.entries()) {
            console.log(word)
            var numHits = countOccurences(contentArticle, word);
            html +="<tr>"
            html +="<td>"+(i+1)+"</td>"
            html +="<td>"+word+"</td>"
            html +="<td>"+numHits+"</td>"
            guess_table.innerHTML = html
        }
    }
 
}

function countOccurences(string, word) {
        return string.split(word).length - 1;
    }
