//IMC
function imc(peso, altura){
    return peso/(altura*altura);
}

//Realizar o IMC com os valores da página
function executarCalculoDoImc(){
    const formulario = document.querySelector(".formulario");
    const resultado = document.querySelector(".resultado");

    //Quando o botão calcular é apertado
    function recebeEventoForm(evento){
        evento.preventDefault();
        //separa peso e altura
        let peso = formulario.querySelector('.peso');
        let altura = formulario.querySelector('.altura');
        peso = Number(peso.value);
        altura = Number(altura.value);
        let imc_n = imc(peso, altura);

        //texto para ser exibido
        let texto = " ";

        //verifica a resposta dependendo do resultado do IMC
        if(peso && altura){
            if(imc_n<5){
                resultado.classList.remove("sucesso");
                resultado.classList.add("erro");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Valor inválido)`;
            } else if(imc_n < 18.5){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Abaixo do peso)`;
            } else if(imc_n >= 18.5 && imc_n <= 24.9){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Peso normal)`;
            } else if(imc_n >= 25 && imc_n <= 29.9){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Sobrepeso)`;
            } else if(imc_n >= 30 && imc_n <= 34.9){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Obesidade grau 1)`;
            } else if(imc_n >= 35 && imc_n <= 39.9){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Obesidade grau 2)`;
            } else if(imc_n >= 40 && imc_n <=267){
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Obesidade grau 3)`;
            } else{
                resultado.classList.remove("sucesso");
                resultado.classList.add("erro");
                texto = `Seu IMC é ${imc_n.toFixed(2)} (Valor inválido)`;
            }
        
        //invalida campos em branco
        } else if(!peso){
            resultado.classList.remove("sucesso");
            resultado.classList.add("erro");
            texto = `Peso inválido`;
        } else if(!altura){
            resultado.classList.remove("sucesso");
            resultado.classList.add("erro");
            texto = `Altura inválida`;
        }

        resultado.innerHTML = texto;

        return;
    }

    formulario.addEventListener('submit', recebeEventoForm);
}

//Para o conversor de medidas
function executarConversao(){
    const formulario = document.querySelector(".conversor");
    const resultado = document.querySelector(".medidaNova");

    //Quando o botão converter é apertado
    function recebeEventoForm(evento){
        evento.preventDefault();

        //capturar as duas opções selecionadas
        const marcador1 = formulario.querySelector("#unidade1");
        const marcador2 = formulario.querySelector("#unidade2");
        let selecao1 = marcador1.children[marcador1.selectedIndex];
        let selecao2 = marcador2.children[marcador2.selectedIndex];

        //capturar texto e valor da proporção
        let unidade1 = selecao1.textContent;
        let unidade2 = selecao2.textContent;
        let valor1 = selecao1.value;
        let valor2 = selecao2.value;

        //capturar número dado pela pessoa
        let numMedida = formulario.querySelector('.medida-ini');
        numMedida = Number(numMedida.value);

        //validar o que foi digitado
        if(numMedida){
            resultado.classList.remove("erro");
            resultado.classList.add("sucesso");

            //resultado
            let valorFinal = numMedida;

            //checar para fazer separação entre os valores que tem proporção e os que não tem
            if(Number(valor1)){
                //como tem proporção ela é usada para o cálculo
                [valor1, valor2] = [Number(valor1), Number(valor2)];
                if(valor1<0) valor1 = 1 / (valor1 * -1);
                if(valor2<0) valor2 = 1 / (valor2 * -1);
                valorFinal *= (valor1 / valor2);

            } else {
                //como não tem proporção é verificado caso a caso
                if(valor1==="C"){
                    if(valor2==="F"){
                        valorFinal = numMedida * 1.8 + 32;
                    } else if(valor2==="K"){
                        valorFinal = numMedida + 273;
                    }
                } else if(valor1==="F"){
                    if(valor2==="C"){
                        valorFinal = (numMedida - 32) / 1.8;
                    } else if(valor2==="K"){
                        valorFinal = ((numMedida - 32) / 1.8) + 273;
                    }
                } else if(valor1==="K"){
                    if(valor2==="C"){
                        valorFinal = numMedida - 273;
                    } else if(valor2==="F"){
                        valorFinal = (numMedida - 273)*1.8 + 32;
                    }
                }
            }

            resultado.innerHTML = `${numMedida} em ${unidade1} equiavale a ${valorFinal} em ${unidade2}.`;

            return;
        } else{
            resultado.classList.remove("sucesso");
            resultado.classList.add("erro");

            resultado.innerHTML = `Digite um valor válido (Deve ser um número e diferente de zero)`;

            return;
        }
    }
    formulario.addEventListener('submit', recebeEventoForm);
}

function capturaTipoUnidade() {
    const formulario = document.querySelector(".seletorUnidade");
    const formularioUnidadesValores = document.querySelector(".conversor");

    //Quando o botão selecionar é apertado
    function recebeEventoForm(evento){
        evento.preventDefault();

        //coletar o texto selecionado
        const marcadorUnidade = formulario.querySelector("#tipoUnidade");
        let unidadeSelecionada = marcadorUnidade.children[marcadorUnidade.selectedIndex].textContent;

        //com seletor se controla todo o local da caixa seletora
        let seletor1 = formularioUnidadesValores.querySelector(".seletor1");
        let seletor2 = formularioUnidadesValores.querySelector(".seletor2");

        //condicional para cada tipo de medida escolhido
        //altera as opções das caixas referentes `as medidas
        if(unidadeSelecionada === "Comprimento"){
            //vetor com os nomes
            const comprimentos = ["Quilômetro", "Hectômetro", "Decâmetro", "Metro", "Decímetros", "Centímetros", "Milímetros"];
            //valores com a proporção bem definida para o calculo
            const prop = ["1000", "100", "10", "1", "-10", "-100", "-1000"];

            //esvaziar as opções antigas e criar as novas
            seletor1.innerHTML = "";
            seletor2.innerHTML = "";
            let caixa = document.createElement("select");
            let opt0 = document.createElement("option");
            let opt1 = document.createElement("option");
            let opt2 = document.createElement("option");
            let opt3 = document.createElement("option");
            let opt4 = document.createElement("option");
            let opt5 = document.createElement("option");
            let opt6 = document.createElement("option");
            const ListaOopt = [opt0, opt1, opt2, opt3, opt4, opt5, opt6];
            caixa.id = "unidade1";
            let val = 10000;
            for(let i=0;i<7;i++){
                ListaOopt[i].text = comprimentos[i];
                ListaOopt[i].value = prop[i];
                caixa.appendChild(ListaOopt[i]);
            }
            seletor1.appendChild(caixa);
            let caixa2 = document.createElement("select");
            caixa2.id = "unidade2";
            let opt20 = document.createElement("option");
            let opt21 = document.createElement("option");
            let opt22 = document.createElement("option");
            let opt23 = document.createElement("option");
            let opt24 = document.createElement("option");
            let opt25 = document.createElement("option");
            let opt26 = document.createElement("option");
            const ListaOopt2 = [opt20, opt21, opt22, opt23, opt24, opt25, opt26];
            val = 10000;
            for(let i=0;i<7;i++){
                ListaOopt2[i].text = comprimentos[i];
                ListaOopt2[i].value = prop[i];
                caixa2.appendChild(ListaOopt2[i]);
            }
            seletor2.appendChild(caixa2);
            return;
        }
        //repetição do processo anterior
        if(unidadeSelecionada === "Peso"){
            const pesos = ["Tonelada", "Arroba", "Quilograma", "Grama", "Miligrama"];
            const prop = ["1000000", "14688", "1000", "1", "-1000"];
            seletor1.innerHTML = "";
            seletor2.innerHTML = "";
            let caixa = document.createElement("select");
            let opt0 = document.createElement("option");
            let opt1 = document.createElement("option");
            let opt2 = document.createElement("option");
            let opt3 = document.createElement("option");
            let opt4 = document.createElement("option");
            const ListaOopt = [opt0, opt1, opt2, opt3, opt4];
            caixa.id = "unidade1";
            for(let i=0;i<5;i++){
                ListaOopt[i].text = pesos[i];
                ListaOopt[i].value = prop[i]; 
                caixa.appendChild(ListaOopt[i]);
            }
            seletor1.appendChild(caixa);
            let caixa2 = document.createElement("select");
            caixa2.id = "unidade2";
            let opt20 = document.createElement("option");
            let opt21 = document.createElement("option");
            let opt22 = document.createElement("option");
            let opt23 = document.createElement("option");
            let opt24 = document.createElement("option");
            const ListaOopt2 = [opt20, opt21, opt22, opt23, opt24];
            for(let i=0;i<5;i++){
                ListaOopt2[i].text = pesos[i];
                ListaOopt2[i].value = prop[i];
                caixa2.appendChild(ListaOopt2[i]);
            }
            seletor2.appendChild(caixa2);
            return;
        }
        //repetição do processo anterior
        if(unidadeSelecionada === "Volume"){
            const volumes = ["Metros cúbicos", "Litros", "Centímetros cúbicos", "Milímetros cúbicos"];
            const prop = ["1", "-1000", "-1000000", "-1000000000"];
            seletor1.innerHTML = "";
            seletor2.innerHTML = "";
            let caixa = document.createElement("select");
            let opt0 = document.createElement("option");
            let opt1 = document.createElement("option");
            let opt2 = document.createElement("option");
            let opt3 = document.createElement("option");
            const ListaOopt = [opt0, opt1, opt2, opt3];
            caixa.id = "unidade1";
            for(let i=0;i<4;i++){
                ListaOopt[i].text = volumes[i];
                ListaOopt[i].value = prop[i]; 
                caixa.appendChild(ListaOopt[i]);
            }
            seletor1.appendChild(caixa);
            let caixa2 = document.createElement("select");
            caixa2.id = "unidade2";
            let opt20 = document.createElement("option");
            let opt21 = document.createElement("option");
            let opt22 = document.createElement("option");
            let opt23 = document.createElement("option");
            const ListaOopt2 = [opt20, opt21, opt22, opt23];
            for(let i=0;i<4;i++){
                ListaOopt2[i].text = volumes[i];
                ListaOopt2[i].value = prop[i];
                caixa2.appendChild(ListaOopt2[i]);
            }
            seletor2.appendChild(caixa2);
            return;
        }
        //repetição do processo anterior
        if(unidadeSelecionada === "Tempo"){
            const tempo = ["Dias", "Horas", "Minutos", "Segundos", "Milisegundos"];
            const prop = ["86400", "3600", "60", "1", "-1000"];
            seletor1.innerHTML = "";
            seletor2.innerHTML = "";
            let caixa = document.createElement("select");
            let opt0 = document.createElement("option");
            let opt1 = document.createElement("option");
            let opt2 = document.createElement("option");
            let opt3 = document.createElement("option");
            let opt4 = document.createElement("option");
            const ListaOopt = [opt0, opt1, opt2, opt3, opt4];
            caixa.id = "unidade1";
            for(let i=0;i<5;i++){
                ListaOopt[i].text = tempo[i];
                ListaOopt[i].value = prop[i]; 
                caixa.appendChild(ListaOopt[i]);
            }
            seletor1.appendChild(caixa);
            let caixa2 = document.createElement("select");
            caixa2.id = "unidade2";
            let opt20 = document.createElement("option");
            let opt21 = document.createElement("option");
            let opt22 = document.createElement("option");
            let opt23 = document.createElement("option");
            let opt24 = document.createElement("option");
            const ListaOopt2 = [opt20, opt21, opt22, opt23, opt24];
            for(let i=0;i<5;i++){
                ListaOopt2[i].text = tempo[i];
                ListaOopt2[i].value = prop[i];
                caixa2.appendChild(ListaOopt2[i]);
            }
            seletor2.appendChild(caixa2);
            return;
        }
        //repetição do processo anterior
        if(unidadeSelecionada === "Temperatura"){
            const temperatura = ["Kelvin", "Celsius", "Fahrenheit"];
            const prop = ["K", "C", "F"];
            seletor1.innerHTML = "";
            seletor2.innerHTML = "";
            let caixa = document.createElement("select");
            let opt0 = document.createElement("option");
            let opt1 = document.createElement("option");
            let opt2 = document.createElement("option");
            const ListaOopt = [opt0, opt1, opt2];
            caixa.id = "unidade1";
            for(let i=0;i<3;i++){
                ListaOopt[i].text = temperatura[i];
                ListaOopt[i].value = prop[i]; 
                caixa.appendChild(ListaOopt[i]);
            }
            seletor1.appendChild(caixa);
            let caixa2 = document.createElement("select");
            caixa2.id = "unidade2";
            let opt20 = document.createElement("option");
            let opt21 = document.createElement("option");
            let opt22 = document.createElement("option");
            const ListaOopt2 = [opt20, opt21, opt22];
            for(let i=0;i<3;i++){
                ListaOopt2[i].text = temperatura[i];
                ListaOopt2[i].value = prop[i];
                caixa2.appendChild(ListaOopt2[i]);
            }
            seletor2.appendChild(caixa2);
            return;
        }
        return;
    }
    formulario.addEventListener('submit', recebeEventoForm);
}

//Para o solucionador de equação
function resolveEquacao(){
    const formulario = document.querySelector(".solucionador");
    const resultado = document.querySelector(".resultado-raizes");

    function recebeEventoForm(evento){
        evento.preventDefault();

        //capturar equação digitada e criar variavel para o resultado
        const equacao = document.querySelector(".equacao").value;
        let resposta;
        //volares de a, b e c na equação
        let a = 0;
        let b = 0;
        let c = 0;
        let passouDoIgual = false;
        //loop para validar e registrar "a"
        for(let i in equacao){
            if(equacao[i-1]==="="){
                passouDoIgual = true;
            }
            if(equacao[i]==="x" || equacao[i]==="X"){
                if(equacao[i+1]==="³" || equacao[i+2]==="³" || (equacao[i+1]==="^" && equacao[i+2]>="3") || (equacao[i+2]==="^" && equacao[i+3]>="3")){
                    resposta = "Equações válidas de no máximo grau 2";
                    break;
                } else if(equacao[i+1]==="²" || equacao[i+2]==="²" || (equacao[i+1]==="^" && equacao[i+2]==="2") || (equacao[i+2]==="^" && equacao[i+3]==="2")){
                    if(!passouDoIgual){
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            a += Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    } else{
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            a -= Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    }
                } else if(equacao[i+1]===" " || equacao[i+1]==="-" || equacao[i+1]==="+"){
                    if(!passouDoIgual){
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            b += Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    } else{
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            b -= Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    }
                }
            }
            if(equacao[i]==="+" || equacao[i]==="-" || equacao[i]==="="){
                if((Number(equacao[i-1]) && (equacao[i-2]!="^")) || (Number(equacao[i-2]) && (equacao[i-3]!="^"))){
                    if(!passouDoIgual){
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            c += Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    } else{
                        let j = 1;
                        let multp = 1;
                        while(equacao[i-j] != " " && equacao[i-j] != "-" && equacao[i-j] != "+" && equacao[i-j] != "=" && equacao[i-j] != undefined){
                            c -= Number(equacao[i-j]) * multp;
                            multp *= 10;
                            j++;
                        }
                    }
                }
            }
        }
        if(resposta === "Equações válidas de no máximo grau 2"){
            resultado.classList.remove("sucesso");
            resultado.classList.add("erro");
            resultado.innerHTML = resposta;
            return;
        } else{
            let delta = (b*b) - 4 * a * c;
            if(delta<0){
                resultado.classList.remove("sucesso");
                resultado.classList.add("erro");
                resposta = "Delta negativo, não existe raiz real";
                resultado.innerHTML = resposta;
                return;
            } else {
                let raiz1 = (-b - delta)/(2*a);
                let raiz2 = (-b + delta)/(2*a);
                resposta = `As raizes são ${raiz1} e ${raiz2}`;
                resultado.classList.remove("erro");
                resultado.classList.add("sucesso");
                resultado.innerHTML = resposta;
                return;
            }
        }
    }

    formulario.addEventListener('submit', recebeEventoForm);
}

//Executar
executarCalculoDoImc();
capturaTipoUnidade();
executarConversao();
resolveEquacao();