const getQueryValues = (obj, type) => {

    let values = ""
    let keys = Object.keys(obj)
    keys.map((key, i) => {
        let val = ""
        if (typeof obj[key] !== "object") {
            if (type == "column") {
                val = `\`${key}\``
            } else {
                if (obj[key] === '') {
                    val = 'null';
                } else {
                    val = `'${obj[key]}'`
                }

            }
        } else {
            if (type == "column") {
                val = `\`${key}\``
            } else {
                val = `'${JSON.stringify(obj[key])}'`
            }
        }
        if (i == keys.length - 1) {
            values += val;
        } else {
            values += `${val},`
        }

    })
    return values
}
module.exports = getQueryValues;