// Liste des variables que l'on aura utilisé tout au long du code
const gommete=document.getElementById('gommete');
gommete.style.position='absolute';
gommete.style.top='50%';
gommete.style.left='45%';
gommete.style.width='100px';
gommete.style.height='100px';
gommete.style.backgroundColor='red';
gommete.style.borderRadius='50%';


const listImage=document.getElementsByTagName('img');
const inputCouleur=document.getElementById('couleur');
const listCheckTaille=document.getElementsByName('taille');
let inputMinutes=document.getElementById('Minutes');
let inputSecondes=document.getElementById('Secondes');
let chrono=document.getElementsByClassName('chrono')[0];
const validation=document.getElementById('validation');
const fieldset=document.querySelector('fieldset');
const containerImage=document.getElementsByClassName('listImage')[0];
const canvas=document.getElementsByClassName('canvas')[0];

// Génération du choix de l'image en fond d'écran

for(let i=0;i<listImage.length;i++){

    const canvas=document.getElementsByClassName('canvas')[0];

    listImage[i].addEventListener('click',function(){

        canvas.style.backgroundImage=`url(${listImage[i].getAttribute('src')})`;
        canvas.style.backgroundRepeat='no-repeat';
        canvas.style.backgroundSize='cover';
    });
    if(i===3){
        listImage[3].addEventListener('click',function(){

            canvas.style.backgroundPosition='bottom';
        });
    }
}

// Mis en place des paramètre sur la balle et le chrono


// --taille de la balle

const listTaille=['150px','100px','70px','40px'];

for(let i=0;i<4;i++){
    listCheckTaille[i].addEventListener('click',function(){

        gommete.style.height=listTaille[i];
        gommete.style.width=listTaille[i];
        
    })
}

//  --couleur de la balle

inputCouleur.addEventListener('change',function(){

    gommete.style.backgroundColor=this.value;

});

// --Mis en place du compteur

chrono.textContent='00:00:00';
inputMinutes.addEventListener('keyup',function(){

    if(this.value===""){
        contentSplit=chrono.textContent.split(':');
        contentSplit[0]='00';
        chrono.textContent=contentSplit.join(':');

        
        
    }else if(parseInt(this.value)>=0 && parseInt(this.value)<=3){
        contentSplit=chrono.textContent.split(':');
        contentSplit[0]='0'+this.value;
        chrono.textContent=contentSplit.join(':');

        
    } 
});

inputSecondes.addEventListener('keyup',function(){

    if(this.value===""){
        contentSplit=chrono.textContent.split(':');
        contentSplit[1]='00';
        chrono.textContent=contentSplit.join(':');
        
    }else if(parseInt(this.value)>=0 && parseInt(this.value)<=9 && this.value.length<2){
        contentSplit=chrono.textContent.split(':');
        contentSplit[1]='0'+this.value;
        chrono.textContent=contentSplit.join(':');

    }else if(parseInt(this.value)>=10 && parseInt(this.value)<=59){
        contentSplit=chrono.textContent.split(':');
        contentSplit[1]=this.value;
        chrono.textContent=contentSplit.join(':');

    } 
});

// Validation et processus du jeu

// Decompte avant commencement

validation.addEventListener('click',function(e){
    if(inputMinutes.value==="" || !(parseInt(inputMinutes.value)>=0 && parseInt(inputMinutes.value)<=3) || inputSecondes.value==="" || !(parseInt(inputSecondes.value)>=0 && parseInt(inputSecondes.value)<=59 && typeof(parseInt(inputSecondes.value))!=undefined) || (isNaN(parseInt(inputSecondes.value[1])) && inputSecondes.value.length===2) || (parseInt(inputMinutes.value)===3 && parseInt(inputSecondes.value)!=0)){

        e.preventDefault();
        document.getElementById('information').style.color='red';
    } else{
        let decompte=3;  // Si jamais l'envie me prends de changer le decompte, j'ai juste a changer la valeur, ya plus aucun souci maintenant ^^
        const baliseDecompte=document.getElementById('baliseDecompte');
        baliseDecompte.textContent=`${decompte}`;
        baliseDecompte.style.display='flex';
        const canvas=document.getElementsByClassName('canvas')[0];
        canvas.style.display='none';
        gommete.style.display='none';
        chrono.style.display='none';
        fieldset.style.display='none';
        containerImage.style.display='none';
        chrono.textContent=`0${parseInt(inputSecondes.value)===0 ? parseInt(inputMinutes.value)-1 : parseInt(inputMinutes.value)}:${(((parseInt(inputSecondes.value)-1)%60)+60)%60 < 10 ? '0'+((((parseInt(inputSecondes.value)-1)%60)+60)%60) : (((parseInt(inputSecondes.value)-1)%60)+60)%60}:99`;
        

        setInterval(function(){
            if(decompte!=0){
                baliseDecompte.textContent=`${--decompte}`;

            } else{
                clearInterval(decompte);

                baliseDecompte.style.display='none';
                canvas.style.display='block';
                chrono.style.display='';
                gommete.style.display='';
                
            }
        },1000);

        setTimeout(function(){

            gommete.style.left=`${Math.floor(Math.random() * (window.innerWidth-parseInt(gommete.style.width)+1))}px`;
            gommete.style.top=`${Math.floor(Math.random() * (window.innerHeight-parseInt(gommete.style.height) - 146)) + 147}px`;

            let compteurClickGommete=0;
            let compteurClickEcran=0;
            
            canvas.addEventListener('click',function(e){
                
                if(chrono.textContent!='00:00:00'){
                    compteurClickEcran++;
                } else{

                    e.preventDefault();
                }
            });
            gommete.addEventListener('click',function(){

                if(chrono.textContent!='00:00:00'){
                    
                    compteurClickGommete++;
                    gommete.style.left=`${Math.floor(Math.random() * (window.innerWidth-parseInt(gommete.style.width)+1))}px`;
                    gommete.style.top=`${Math.floor(Math.random() * (window.innerHeight-parseInt(gommete.style.height) - 146)) + 147}px`;
                } else{

                    e.preventDefault();
                }

            });

            let chronoMinutes=parseInt(chrono.textContent.split(':')[0]);
            let chronoSecondes=parseInt(chrono.textContent.split(':')[1]);
            let chronoCentiemes=parseInt(chrono.textContent.split(':')[2]);
            const chronoMinutesInitial=parseInt(inputMinutes.value);
            const chronoSecondesInitial=parseInt(inputSecondes.value);
            let chronoEnMarche;
            chronoEnMarche=setInterval(function(){

               chrono.textContent=`0${chronoMinutes}:${((chronoSecondes%60)+60)%60 <10 ? '0'+((chronoSecondes%60)+60)%60 : ((chronoSecondes%60)+60)%60}:${((chronoCentiemes%100)+100)%100 <11 && ((chronoCentiemes%100)+100)%100 >0 ? '0'+((--chronoCentiemes%100)+100)%100 : ((--chronoCentiemes%100)+100)%100}`;
                if(chronoCentiemes%100===0){ 
                    chronoSecondes--;
                }
                if(chronoCentiemes%100===0 && chronoSecondes%60===-1){ 
                    chronoMinutes--;
                }
                if(chronoMinutes===0 && ((chronoSecondes%60)+60)%60<=29 && ((chronoSecondes%60)+60)%60>9){
                    chrono.style.backgroundColor='yellow';
                }
                if(chronoMinutes===0 && ((chronoSecondes%60)+60)%60<=9){
                    chrono.style.backgroundColor='orange';
                }
                if(chronoCentiemes%100===0 && chronoSecondes%60===-1 && chronoMinutes===-1){
                    clearInterval(chronoEnMarche);
                    chrono.style.backgroundColor='red';
                    alert(`Nombre de click au total : ${compteurClickEcran}\nNombre de gommete cliqué : ${compteurClickGommete}\nNombre de click dans le vide : ${compteurClickEcran-compteurClickGommete}\nVitesse de click sur les gommetes : ${(Math.round((compteurClickGommete/(chronoMinutesInitial*60+chronoSecondesInitial))*100))/100} gommete(s)/seconde\nMerci d'avoir joué à mon jeu ^^.`);
                } 
            },10);

        },(decompte+1)*1000);
    }
});
