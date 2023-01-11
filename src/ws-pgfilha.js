/**
 * Objetivo:
 * titulo:
 * linkimg:
 * datapublicacao:
 * texto: 
 */

const axios = require('axios')
const cheerio = require('cheerio')

const urlfilho = "https://www.gov.br/receitafederal/pt-br/assuntos/noticias/2023/janeiro/programa-doacao-do-bem-tem-edital-lancado"
axios.get(urlfilho).then(resp=>{
    dhtml = resp.data
    $ = cheerio.load(dhtml)
    const titulo = $('h1').text();
    const linkimg = $('#media>img').attr('src')
    const publicacao = $('.documentPublished>.value').text();
    const text = $('div[property="rnews:articleBody"]').text();

    const dados = {titulo,linkimg,publicacao,text}
    console.log(dados)
})