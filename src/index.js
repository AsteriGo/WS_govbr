const axios = require('axios')
const cheerio = require('cheerio')

function extraidados(link){
    axios.get(link)
    .then(resp=>{
        const dhtml = resp.data
        const $ = cheerio.load(dhtml)
        const titulo = $('h1').text();
        const linkimg = $('#media>img').attr('src')
        const publicacao = $('.documentPublished>.value').text();
        const text = $('div[property="rnews:articleBody"]').text();

        const dados = {titulo,linkimg,publicacao,text}
        console.log(dados)
    })
}

const urlpai = "https://www.gov.br/receitafederal/pt-br/assuntos/noticias"
const links = axios.get(urlpai)
.then(resp=>{
    const dhtml = resp.data
    const $ = cheerio.load(dhtml)
    const dados = []


    $('.titulo>a').each((i,e)=>{
        const link = $(e).attr('href')
        //console.log(link)
        dados.push(link)
    })
    //console.log(dados)
    return dados
})

async function main (){
    const lnks = await links;
    lnks.map((i,e)=>{
        extraidados(i);
    })

}

main();