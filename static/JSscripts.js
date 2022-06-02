

    var spans = document.getElementsByTagName('span')
    var guessWords = {};

    var slideshowIndex = 1;
    var slideshowArray = [];
    var slideshowWord = ""

    const contentArticle = (document.getElementById('content-article').textContent.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");

    const special_words = [
    'la', 'le', 'La', 'Le', 'de', 'De', 'des', 'Des', 'un', 'Un', 'une', 'Une',
    'mais','Mais', 'ou', 'Ou', 'et', 'Et', 'donc', 'Donc', 'or', 'Or', 'ni', 'Ni', 'car', 'Car',
    'du', 'Du', 'en', 'En','à', "d'", "D'", "l'", "L'", "qu'", "Qu'", "s'", "S'", "m'", "M'","n'",
    "N'", "c'", "C'", "jusqu'", "Jusqu'", 'est', 'était', 'Etait', 'comme', 'Comme', 'entre', 'Entre', 
    'avec', 'Avec', 'sans', 'Sans', 'dans', 'Dans', 'pour', 'Pour', 'contre', 'Contre', 'par', 'Par',
    'après', 'Après', 'avant', 'Avant','a', 'A', 'au', 'Au', 'tous', 'Tous', 'tout', 'Tout', 'toute',
    'Toute', 'toutes,', 'Toutes', 
    '*', ' ', '.', '(', ')', '/', ',', '"', "'", ':', '»', '«', '%', '-', '=', '==', '===', '====']


    function newWord() {

        event.preventDefault();

        for (span of spans) {
            span.classList.remove("clicked")
        }

        var input = document.getElementById('word_submit123');
        var word = normalize(input.value);
        let numberOccurence = 0;
        


        if (word.length != 0){

            if (special_words.indexOf(word) == -1){

                for (var i = 0, len = spans.length; i < len; ++i) {

                    if (normalize(spans[i].innerHTML).length == word.length){

                        if(normalize(spans[i].innerHTML).indexOf(word) !== -1){
                            numberOccurence += 1;
                            spans[i].className = "noHighWord"+" guessWords_"+word;
                            spans[i].id = "guessWords_"+word+numberOccurence;
                            spans[i].classList.toggle("clicked")
                        }    
                    }     
                }
                if (guessWords[word]) {
                    //do your code to hightlight already guessed Word in table
                }
                else {
                    guessWords[word] = numberOccurence;
                }
            }
        }
        //console.log(guessWords)

        isWon()
        showGuessList()  
        input.value = ""
    }

    function showGuessList() {

        let html="";
        let hits = 0;
        for (let word in guessWords){
            hits += 1;
            idValue = "a_gW_"+word
            lignehtml ="<tr id="+word+">"
            lignehtml +="<td>"+hits+"</td>" 
            lignehtml +="<td id="+idValue+"><a href='#guessWords' onclick='HLOnClick("+idValue+")'>"+word+"</a></td>"
            lignehtml +="<td>"+guessWords[word]+"</td>"
            lignehtml +="</tr>"
            html = lignehtml + html
        } 
        guess_table.innerHTML = html
        
    }

    function isWon(){
        isWin =[]
        for (span of document.getElementById("title_article").children){
            isWin.push(span.classList.contains("noHighWord"))
        }
        if (isWin.every(Boolean)){
            console.log("Gagné !!!")
            alert("C'est gagné !!!")
        }
    }   


    function HLOnClick(idValue){

        

        for (span of spans) {
            span.classList.remove("clicked");
        }

        for (elem of document.getElementsByTagName('td')){
            elem.classList.remove("clicked");
            elem.classList.remove("redclicked");
        }

        if (guessWords[idValue.textContent] != 0) {

            //The word is in article (green HL)

            idValue.classList.toggle("clicked");
            classValue = "guessWords_"+idValue.textContent;    

            for (elem of document.getElementsByClassName(classValue)){
                    elem.classList.toggle("clicked");
                    //console.log(elem.id)
            }

            if(slideshowWord != idValue.textContent) {slideshowIndex = 1;}

            slideshowArray = document.getElementsByClassName(classValue);

            if (slideshowIndex == slideshowArray.length+1) {slideshowIndex = 1;}

            idValue.children[0].href ='#'+String(classValue)+String(slideshowIndex);
            slideshowWord = idValue.textContent;
            slideshowIndex ++;

        }else {
            idValue.classList.toggle("redclicked");            
        }

    }

    function normalize(element){ //remove accent & uppercase
        return element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '')
    } 

