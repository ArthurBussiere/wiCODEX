


    let spans = document.getElementsByTagName('span')           //<---- all word in article are wrapped in span
    let guessWords = {};                                        //<---- the dico of all words tested by users (saved)

    let slideshowIndex = 1;                                     //<----
    let slideshowArray = [];                                    //<---- Used to swap between Highlighted words in article
    let slideshowWord = ""                                      //<----

    let checkWin = [];                                          //<---- Test if all title word have been found
    let stats = {};                                             //<---- stats of previous word found by user (saved)

    const titleWords = document.getElementsByClassName('titleword');
    const contentArticle = (document.getElementById('content-article').textContent.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const signs = document.getElementsByClassName("sign")
    const special_words = [     

    'la', 'le', 'La', 'Le', 'de', 'De', 'des', 'Des', 'un', 'Un', 'une', 'Une',  
    'y', 'Ce', 'ce', 'Ce', 'se', 'Se', 'Ceux', 'ceux', 'celle', 'Celle', 'celles', 'Celles',
    'mais','Mais', 'ou', 'Ou', 'et', 'Et', 'donc', 'Donc', 'or', 'Or', 'ni', 'Ni', 'car', 'Car',
    'du', 'Du', 'en', 'En','à', "d'", "D'", "l'", "L'", "qu'", "Qu'", "s'", "S'", "m'", "M'","n'",
    "N'", "c'", "C'", "jusqu'", "Jusqu'", 'est', 'était', 'Etait', 'comme', 'Comme', 'entre', 'Entre', 
    'avec', 'Avec', 'sans', 'Sans', 'dans', 'Dans', 'pour', 'Pour', 'contre', 'Contre', 'par', 'Par',
    'après', 'Après', 'avant', 'Avant','a', 'A', 'au', 'Au', 'tous', 'Tous', 'tout', 'Tout', 'toute',
    'Toute', 'toutes,', 'Toutes', 'qui', 'Qui', 'que', 'Que','quoi', 'Quoi','quand', 'Quand', 'dont', 'Dont',
     'où', 'Où', 'il', 'Il', 'Elle', 'elle', 'ils', 'Ils', 'elles', 'Elles',
    '*', ' ', '.', '(', ')', '/', ',', '"', "'", ':',';', '»', '«', '%', '-', '=', '==', '===', '====']




    //Initialize :

    for (elem of signs){
        if (elem.innerHTML == ("-")){elem.classList.add('doubleMargin')}
        if (elem.innerHTML == (".")){elem.classList.add('leftMargin')}
        if (elem.innerHTML == (",")){elem.classList.add('leftMargin')}
        if (elem.innerHTML == (":")){elem.classList.add('leftMargin')}
        if (elem.innerHTML == ("(")){elem.classList.add('rightMargin')}
        if (elem.innerHTML == (")")){elem.classList.add('leftMargin')}
        if (elem.innerHTML == ("«")){elem.classList.add('rightMargin')}
        if (elem.innerHTML == ("»")){elem.classList.add('leftMargin')}
        
    }


    loadProgress()
    showGuessList()

    function newWord() {

        event.preventDefault();

        for (span of spans) {
            span.classList.remove("clicked")
        }

        let input = document.getElementById('word_submit123');
        let word = formalize(input.value);
        let numberOccurence = 0;
        


        if (word.length != 0){

            if (special_words.indexOf(word) == -1){

                for (let i = 0, len = spans.length; i < len; ++i) {

                    if (formalize(spans[i].innerText).length == word.length){

                        if(formalize(spans[i].innerText).indexOf(word) !== -1){

                            numberOccurence += 1;
                            if (spans[i].classList.contains("titleword")){
                                checkWin.push(spans[i].innerText)
                                spans[i].className = ("noHighWord titleword"+" guessWords_"+word);
                                spans[i].children[0].id = "guessWords_"+word+numberOccurence;
                                spans[i].classList.toggle("clicked")
                            }else {                            
                                spans[i].className = ("noHighWord"+" guessWords_"+word);
                                spans[i].children[0].id = "guessWords_"+word+numberOccurence;
                                spans[i].classList.toggle("clicked")}
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
        
        saveProgress()
        showGuessList()  
        checkIfWin()
        input.value = ""
    }


    function showGuessList() {

        let html="";
        let hits = 0;
        for (let word in guessWords){
            hits += 1;
            idValue = "a_gW_"+word
            lignehtml = "<tr id="+word+">"
            lignehtml +="<td>"+hits+"</td>" 
            lignehtml +="<td id="+idValue+"><a href='#guessWords' onclick='HLOnClick("+idValue+")'>"+word+"</a></td>"
            lignehtml +="<td>"+guessWords[word]+"</td>"
            lignehtml +="</tr>"
            html = lignehtml + html
        } 
        guess_table.innerHTML = html
        
    }


    function checkIfWin(){ // <---- WORK IN PROGRESS NEEEED FIX !!!

        checklist = []

        for (elem of titleWords){
            checklist.push(elem.innerText)
        }

        if (checkWin.length === checklist.length){
            if (checkWin.sort().join(',') === checklist.sort().join(',')){

                saveProgress()

                win_result_word.innerHTML = document.getElementById("title_article").innerText;
                win_result_hits.innerHTML = "en :"+stats[document.getElementById("title_article").innerText]+" coups.";

                document.getElementById("mask").style.display="block";
                document.getElementById("win_modal").style.display="flex";

                stats[document.getElementById("title_article").innerText] = Object.keys(guessWords).length; 
            }
        } 
        saveProgress()

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


    function formalize(element){ //remove accent & uppercase
        return element.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/\s/g, '')
    } 


    function saveProgress(){
        let saveFile = JSON.stringify([document.getElementById("title_article").innerText, guessWords, stats]);
        localStorage.setItem('savefiles', saveFile);
    }


    function loadProgress(){
        let loadFile = JSON.parse(localStorage.getItem("savefiles"))

        if (loadFile != null) {
            if (loadFile[0] == document.getElementById("title_article").innerText) {
                console.log("Sauvegarde trouvée")
                guessWords = loadFile[1]

            }else{ guessWords = {} }

            for (word of Object.keys(guessWords)){

                showWords(word)
            }
            console.log("Stats : ", loadFile[2])
            stats = loadFile[2]
        }



        checkIfWin()
    }


    function showWords(word){
        let numberOccurence = 0;
        if (word.length != 0){

            if (special_words.indexOf(word) == -1){

                for (let i = 0, len = spans.length; i < len; ++i) {

                    if (formalize(spans[i].innerText).length == word.length){

                        if(formalize(spans[i].innerText).indexOf(word) !== -1){

                            numberOccurence += 1;
                            if (spans[i].classList.contains("titleword")){
                                checkWin.push(spans[i].innerText)
                                spans[i].className = ("noHighWord titleword"+" guessWords_"+word);
                                spans[i].children[0].id = "guessWords_"+word+numberOccurence;
                                spans[i].classList.toggle("clicked")
                            }else {                            
                                spans[i].className = ("noHighWord"+" guessWords_"+word);
                                spans[i].children[0].id = "guessWords_"+word+numberOccurence;
                                spans[i].classList.toggle("clicked")}

                        }    
                    }            
                }
            }
        }
    }


    function showHelp(){
        document.getElementById("mask").style.display="block"
        document.getElementById("help_modal").style.display="flex"
    }


    function showStats(){
        document.getElementById("mask").style.display="block"
        document.getElementById("stats_modal").style.display="flex"
        let html=""
        for (let word in stats){
            lignehtml = "<tr>"
            lignehtml +="<td>"+stats[word]+"</td>"
            lignehtml +="<td>"+word+"</td>"
            lignehtml +="<td></td>"
            lignehtml +="</tr>"
            html = lignehtml + html
        }
        stats_table.innerHTML = html

    }


    function hideMask(){
        document.getElementById("mask").style.display="none"
        document.getElementById("stats_modal").style.display="none"
        document.getElementById("help_modal").style.display="none"
        document.getElementById("win_modal").style.display="none"
    }


    
    //Debug :
    function clearLocal(){
        localStorage.clear();
    }


