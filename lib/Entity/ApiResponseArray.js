class ApiResponseArray{
  constructor(data, paginate, httpCode = 200){
    this.data = data
    this.paging = paginate
    this.httpCode = httpCode
  }
  get innerData(){
    return {
      data: this.data,
      paging: this.paging,
    }
  }
}

module.exports = ApiResponseArray
