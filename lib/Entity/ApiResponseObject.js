class ApiResponseObject {
  constructor(data, httpCode = 200){
    this.data = data
    this.httpCode = httpCode
  }
  get innerData(){
    return this.data
  }
}

module.exports = ApiResponseObject
