const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit:'20',
    host:'10.13.14.2',
    port:'3306',
    user:'yonan',
    password:'121325@node',
    database:'node'
})


function gravando(linhas){
    const dados = {
        titulo:linhas.titulo,
        linkimg:linhas.linkimg,
        texto:linhas.texto

    }
    pool.getConnection(function(err, connection){
        if(err) throw err;
        /*connection.query('INSERT INTO noticias set ?', dados, function(error, result, fields){
            console.log('Deu certo')
            connection.release()

            if(error) throw error;
        })*/
        connection.query('select * from `noticias` where `titulo` = ?',dados.titulo, function(error, result, fields){
            countresult = result.length
            if(countresult==0){
                connection.query('INSERT INTO noticias set ?', dados, function(error, result, fields){
                console.log('Deu certo')
                connection.release()
    
                if(error) throw error
            })
            }else{
                console.log('TITULO CADASTRADO')
            }
            if(error) throw error
        })
    })




}

function extraidados(link){
    axios.get(link)
    .then(resp=>{
        const dhtml = resp.data
        const $ = cheerio.load(dhtml)
        const titulo = $('h1').text()
        const linkimg = $('#media>img').attr('src')
        //const publicacao = $('.documentPublished>.value').text()
        const texto = $('div[property="rnews:articleBody"]').text()

        const dados = {titulo,linkimg,texto}
        //console.log(dados)
        gravando(dados)
    })
}

const url = "https://www.gov.br/receitafederal/pt-br/assuntos/noticias"
const links = axios.get(url)
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
    const lnks = await links
    lnks.map((i,e)=>{
        extraidados(i)
    })

}

main()

setTimeout(()=>{
    pool.end();
}, 10000)