const cheerio = require('cheerio')
const axios = require('axios')

const urlpai = "https://www.gov.br/receitafederal/pt-br/assuntos/noticias"

axios.get(urlpai)
.then(resp=>{
    const dhtml = resp.data
    const $ = cheerio.load(dhtml)
    const dados = []


    $('.titulo>a').each((i,e)=>{
        const link = $(e).attr('href')
        //console.log(link)
        dados.push(link)
    })
    console.log(dados)
})