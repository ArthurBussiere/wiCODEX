


    var spans = document.getElementsByTagName('span')           //<---- all word in article are wrapped in span
    var guessWords = {};                                        //<---- the dico of all words tested by users (saved)

    var slideshowIndex = 1;                                     //<----
    var slideshowArray = [];                                    //<---- Used to swap between Highlighted words in article
    var slideshowWord = ""                                      //<----

    var checkWin = [];                                          //<---- Test if all title word have been found
    var stats = {};                                             //<---- stats of previous word found by user (saved)

    const titleWords = document.getElementsByClassName('titleword');
    const contentArticle = (document.getElementById('content-article').textContent.toLowerCase()).normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    const signs = document.getElementsByClassName("sign")
    const special_words = [     
'je','tu','il','elles','on','nous','vous','ils','elle','me','te','se','sa','son','ses','ces','lui',
'ur','eux','moi','toi','mien','mienne','miens','miennes','nôtre','nôtre','nôtres','tien','tienne',
'tiens','tiennes','vôtre','vôtre','vôtres','sien','sienne','siens','siennes','leur','leur','leurs',
'celui','celles','quel','quel','duquel','auquel','quel','desquel','auxquel','cel','ceci','cela',
'celle','c','ça','ci','ceux','la','le','les','de','des','un','une','y','ce','se','ceux','celle','celles',
'mais','ou','et','donc','or','ni','car','du','en','à','comme','entre','avec','sans','dans','pour','contre',
'par','après','avant','a','au','tous','tout','toute','toutes','qui','que','quoi','quand','dont','où','il',
'elle','ils','elles','duquel','desquels','desquelles','aucun','bien','importe','nul','pas','aucune','nulle',
'assez','beaucoup','chaque','peu','plus','moins','quelque','tellement','trop','aucuns','certains',
'différents','divers','nuls','aucunes','certaines','différentes','diverses','quelles','nulles','nombre',
'plupart','plusieurs','quelques','ma','ta','ton','Je','Tu','Il','Elles','On','Nous','Vous','Ils','Elle',
'Me','Te','Se','Sa','Son','Ses','Ces','Lui','Ur','Eux','Moi','Toi','Mien','Mienne','Miens','Miennes','Nôtre',
'Nôtres','Tien','Tienne','Tiens','Tiennes','Vôtre','Vôtres','Sien','Sienne','Siens','Siennes','Leur','Leurs',
'Celui','Celles','Quel','Duquel','Auquel','Desquel','Auxquel','Cel','Ceci','Cela','Celle','Ça','Ci','Ceux',
'La','Le','Les','De','Des','Un','Une','Y','Ce','Mais','Ou','Et','Donc','Or','Ni','Car','Du','En','À','Comme','Entre',
'Avec','Sans','Dans','Pour','Contre','Par','Après','Avant','A','Au','Tous','Tout','Toute','Toutes','Qui','Que','Quoi',
'Quand','Dont','Où','Desquels','Desquelles','Aucun','Bien','Importe','Nul','Pas','Aucune','Nulle','Assez','Beaucoup',
'Chaque','Peu','Plus','Moins','Quelque','Tellement','Trop','Aucuns','Certains','Différents','Divers','Nuls','Aucunes',
'Certaines','Différentes','Diverses','Quelles','Nulles','Nombre','Plupart','Plusieurs','Quelques',"D'","L'","Qu'",
"S'","M'","N'","Jusqu'","d'","l'","qu'","s'","m'","n'","c'","jusqu'","Jusqu'","j'","J'",

'0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43', '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56', '57', '58', '59', '60', '61', '62', '63', '64', '65', '66', '67', '68', '69', '70', '71', '72', '73', '74', '75', '76', '77', '78', '79', '80', '81', '82', '83', '84', '85', '86', '87', '88', '89', '90', '91', '92', '93', '94', '95', '96', '97', '98', '99', '100',

'*', ' ','.', '(', ')', '/', ',', '"', "'", ':',';', '»', '«', '%', '-', '=', '==', '===', '====']


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

    function isInteger(value) {
        if(parseInt(value,10).toString()===value) {
          return true
        }
        return false;
    }

    for (span of spans){
        if (isInteger(span.innerText)) {
            span.className.replace("highWord", "noHighWord")
        }
    }




    

    loadProgress()
    showGuessList()

    function newWord() {

        event.preventDefault();

        for (span of spans) {
            span.classList.remove("clicked")
        }

        var input = document.getElementById('word_submit123');
        var word = formalize(input.value);
        let numberOccurence = 0;
        


        if (word.length != 0){

            if (special_words.indexOf(word) == -1){

                for (var i = 0, len = spans.length; i < len; ++i) {

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
                    alert("Ce mot/chiffre est deja affiché")
                }
                else {
                    guessWords[word] = numberOccurence;
                }
            }else {
                alert("Ce mot/chiffre est deja affiché")
            }
        }
        //TODO console.log(guessWords)
        
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

                for (span of spans){
                    span.classList.remove("highWord")
                }

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

                for (var i = 0, len = spans.length; i < len; ++i) {

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


