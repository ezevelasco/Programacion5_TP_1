    const palabrAdivinar = ingresarPalabra();
    let aciertos = "";

    
    
    //Seteo la variable en ????
    let palabraOculta="";
    palabrAdivinar.forEach(caracter =>{
        palabraOculta= palabraOculta +"?";
    });
    


    let arrCoincidencias = [];

    const letra = document.querySelector('input');
    let intentosRestantes = 5;
    
        letra.oninput = function(){
            if(intentosRestantes != 0){
                if(soloLetras(letra.value, palabrAdivinar) == true){
                    document.querySelector('input').value="";
                    if(palabraOculta == palabrAdivinar.join("")){
                        document.getElementById("alerta").innerHTML="¡Ganaste!";
                        document.getElementById("alerta").className="badge bg-success";
                        
                        document.querySelector('input').disabled=true;
                        document.querySelector('input').value="";
                    }
                }else{                  
                    document.querySelector('img').src="fotos/pixil-frame-"+intentosRestantes+".png";
                    
                    
                    intentosRestantes = intentosRestantes -1;
                    if(intentosRestantes == 0){
                        document.getElementById("alerta").innerHTML="¡Último intento!";
                    }else{
                        document.getElementById("alerta").innerHTML="Quedan "+intentosRestantes+" intentos";
                    }
                    
                    
                    
                }
            }else{
                document.querySelector('img').src="fotos/pixil-frame-0.png";
                document.getElementById("alerta").innerHTML="¡Perdiste!";
                document.querySelector('input').disabled=true;
                document.querySelector('input').value="";

            }
            
        };

    
    

    function ingresarPalabra(){
        const ventana = prompt("¡Ingresa una palabra para adivinar!");
        const arrPalabra = ventana.split("");
        

        document.getElementById("tablero").innerHTML = `
            <table class="table" border="1">
                <tr class="table-secondary">
                    ${creaTablero(arrPalabra)}    
                </tr>    
            </table>
        `;
        return arrPalabra;
    };

    function creaTablero(arrPalabra){
        let tablero = "";
        arrPalabra.forEach(letra => {
            tablero = tablero + "<td> ? </td>";
        });
        return tablero;
    }
   
    function soloLetras(cadena, palabrAdivinar){
        const pattern = new RegExp('[a-zA-Z]');
        
        if(getAllIndexes(palabrAdivinar, cadena).length == 0){
            leyendaCoincidencia(0);
            document.querySelector('input').value = "";
            return false;
        }

        if(!pattern.test(cadena)){
            document.querySelector('input').value = "";
            document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
            return false;
        }else{
            document.getElementById("tablero").innerHTML = `
            <table class="table" border="1">
                <tr>
                    ${buscarCoincidencia(cadena,palabrAdivinar, palabraOculta)}    
                </tr>    
            </table>
        `;
            return true;
        }
    }
   
   function getAllIndexes(arr, val) {
    let indexes = [];
    
    for(let i = 0; i < arr.length; i++){
        if (arr[i] == val){
            
            indexes.push(i);
        }
    }
    return indexes;
    }
   
    function buscarCoincidencia(letra, arrPalabra){
        let coincidencias = getAllIndexes(arrPalabra, letra);
        leyendaCoincidencia(coincidencias.length);
        let tablero="";
        if(coincidencias.length == 0){
            tablero="";
            
            for(let i=0;i< palabraOculta.length; i++){
                if(palabraOculta[i] != "?"){
                    tablero = tablero + "<td>"+ palabraOculta[i] +" </td>";
                }else{
                    tablero = tablero + "<td >"+ palabraOculta[i] +" </td>";
                }
                
            }
            return tablero;
        }else{
            return crearArregloEnBaseA(coincidencias, letra);
        }
    }

    function crearArregloEnBaseA(arr,letra){
        let tablero ="";
        let pal = palabraOculta.split("");

        let cont=0;
        arr.forEach(caracter =>{
            let i=0;
            pal.forEach(c =>{
                if(caracter == i){
                    pal[i]=letra;
                }
                i++
            });
            cont++
        });
        
        pal.forEach(caracter => {
            tablero = tablero + "<td>"+ caracter +" </td>";
        });
        palabraOculta = pal.join("");

        

        return tablero;


       }

    function leyendaCoincidencia(coincidencias){
        if(coincidencias > 0){
            document.getElementById("status").innerHTML = `<p class= "bg-success-subtle">Hubo ${coincidencias} coincidencias!!!</p>`;   
        }else{
            document.getElementById("status").innerHTML = `<p class= "bg-danger-subtle">No hubo coinciencias</p>`;      
        }
    }
