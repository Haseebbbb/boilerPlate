import axios from 'axios';

export class HondaService {

  constructor() {
  }

  async getModelsByYear(year: number) {
    const response = await axios({
        method: 'get',
        url: `https://vpic.nhtsa.dot.gov/api/vehicles/getmodelsformakeyear/make/honda/modelyear/${year}?format=json`,
    })
        .then(function (response) {
            return response.data['Results']
        });
    
    return response.map(({Model_ID,Model_Name})=>({Model_ID,Model_Name}))

}

async getDiscontinuedModels() {
    let discontinued = await Promise.all(
        [2010,2011,2012,2013,2014,2015,2016,2017,2018].map((year) =>{
            return this.getModelsByYear(year)
        }

        )
    )

    let check = await Promise.all(
        [2019,2020].map((year) =>{
            return this.getModelsByYear(year)
        }

        )
    )

    const checkMap = new Map()

    discontinued.flat().map(({Model_ID,Model_Name}) => {
        if(checkMap.has(Model_ID)){
            return
        }
        checkMap.set(Model_ID,Model_Name)
    })

    check.flat().map(({Model_ID,Model_Name}) => {
        if(checkMap.has(Model_ID)){
            checkMap.delete(Model_ID)
        }
    })

    const keys = [...checkMap.keys()]

    return keys.map((key)=>({modelId: key, modelName: checkMap.get(key)}))

}
}

//rahat.shiraz@gomotive.com