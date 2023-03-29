    const palabrAdivinar = ingresarPalabra();

    let arrCoincidencias = [];

    const letra = document.querySelector('input');
    let intentosRestantes = 6;
    
        letra.oninput = function(){
            if(intentosRestantes != 0){
                if(soloLetras(letra.value, palabrAdivinar) == true){
                    document.querySelector('input').value="";
                }else{
                    document.getElementById("alerta").innerHTML="Quedan "+intentosRestantes+" intentos";
                    intentosRestantes = intentosRestantes -1;
                }
            }else{
                document.getElementById("alerta").innerHTML="¡Perdiste!";
            }
            
        };

    
    

    function ingresarPalabra(){
        const ventana = prompt("¡Ingresa una palabra para adivinar!");
        const arrPalabra = ventana.split("");
        console.log(arrPalabra);

        document.getElementById("tablero").innerHTML = `
            <table border="1">
                <tr>
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
        console.log(pattern.test(cadena));
        if(!pattern.test(cadena)){
            document.querySelector('input').value = "";
            document.getElementById("status").innerHTML = "Solo puedes ingresar letras!!!..";
            return false;
        }else{
            document.getElementById("tablero").innerHTML = `
            <table border="1">
                <tr>
                    ${buscarCoincidencia(cadena,palabrAdivinar)}    
                </tr>    
            </table>
        `;
            return true;
        }
    }

    function buscarCoincidencia(letra, arrPalabra){
        let tablero = "";
        let coincidencias = 0;
        let contador =0;
        arrPalabra.forEach(caracter => {
            if(caracter == letra){
                tablero = tablero + "<td>"+ caracter +" </td>"; 
                coincidencias = coincidencias + 1;
            }else{
                tablero = tablero + "<td> ? </td>";
            }
            leyendaCoincidencia(coincidencias);
        });
        return tablero;
    }

    function leyendaCoincidencia(coincidencias){
        if(coincidencias > 0){
            document.getElementById("status").innerHTML = `Hubo ${coincidencias} coincidencias!!!`;
        }else{
            document.getElementById("status").innerHTML = `No hubo coinciencias :(`;
        }
    }
