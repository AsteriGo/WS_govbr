const axios = require('axios')
const cheerio = require('cheerio')
const mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit:'20',
    host:'localhost',
    port:'3306',
    user:'yonan',
    password:'121325@node',
    database:'node'
})

const salvandodados = (dt)=>{
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query('INSERT INTO noticias set ?', dt, function(error, result, fields){
            console.log('Deu certo')
            connection.release()

            if(error) throw error;
        })
    })
}

function salvardados(sdt) {
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query('INSERT INTO noticias set ?', sdt, function(error, result, fields){
            console.log('Deu certo')
            connection.release()

            if(error) throw error;
        })
    })
}

function gravando(linhas){
    const dados = {
        titulo:linhas.titulo,
        linkimg:linhas.linkimg,
        texto:linhas.texto

    }
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query('select * from `noticias` where `titulo` = ?',dados.titulo, function(error, result, fields){
            countresult = result.length
            test = countresult==0
            if(countresult==0){
                salvandodados(dados)
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