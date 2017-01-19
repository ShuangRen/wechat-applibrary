const debug_url = './'; //这里可以修改路径


const mapModToRes = (mod, res) => {

    if(res.result) {
        
        if(Object.prototype.toString.apply(res.result) != "[object Array]") {
            res.result =  forInJson(mod.result, res.result);
            return res;
        }

         res.result = forInArray(mod.result, res.result);
         return res;
    }

    res.error = forInJson(mod.error, res.error);


    return res;
}

const forInJson = (mod, res) => {
    for(let items in mod) {
        res[items] = mod[items];
    }

    return  res;
}

const forInArray = (mod, res) => {

    mod.forEach((item, index, arr)=>{

        for(let v in item) {
            res[index][v] = item[v];
        }
    });

    return  res;
}





module.exports = (req, res) => {


    for(let i=0; i<req.length; i++) {

        if(req[i]['id'] == res[i]['id']) {
            let mod;
            try {
                mod = require(`${debug_url}${req[i]['method']}`);

            }catch(e) {
                continue;
            }

            res[i] = mapModToRes(mod, res[i]);

        }

    }
    return res;
   
}