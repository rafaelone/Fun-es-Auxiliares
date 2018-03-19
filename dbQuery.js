module.exports = (query, pool, res) => {

    if (res !== undefined){
        if (query == undefined) res.sendStatus(500); 
        else{
            pool.getConnection((err, connection) => {
                if(err){
                    console.log(err);
                    res.sendStatus(500);
                }
                //Use the connection
                let options = {
                    sql: query,
                    nestTables: false
                }
                connection.query(options, (err, rows, fields) => {
                    if(err){
                        console.log(err);
                        res.sendStatus(500);
                    }
                    res.end(JSON.stringify(rows));
                    connection.release();
                });
            });
        }
    }else{
        return new Promise((resolve, reject) => {
            pool.getConnection((err, connection) => {
                if(err) {
                    console.log(err);
                }
                // Use the connection
                let options = {
                    sql: query,
                    nestTables: true
                }
                connection.query(options, (err, rows, fields) => {
                    if(err) reject(err);
                    console.log(rows)
                    resolve(rows);
                    connection.release();
                })
            })
        })
    }
    

}