mysql = require('mysql2')

const pool = mysql.createPool({
    connectionLimit:'10',
    host:'10.13.14.2',
    port:'3306',
    user:'yonan',
    password:'121325@node',
    database:'node'
})
const titulo = "Mercadorias apreendidas pela Receita Federal em operações de combate a ilícitos praticados na importação são doadas a Hospital Universitário"

const consulta = (msg)=>{
    pool.getConnection(function(err, connection){
        if(err) throw err;
        connection.query('SELECT * from `noticias` where `titulo` = ?',msg, function(error,result,fields){
            let contresult = result.length
            if(contresult==0){
                console.log('TITULO NÃO CADASTRADO')
            }else{
                console.log('TITULO CADASTRADO')
            }
            if(error) throw error
        })
    })
}

consulta(titulo)