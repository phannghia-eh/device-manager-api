class ApiResponseMessage {
  constructor(message, httpCode = 200){
    this.message = message
    this.httpCode = httpCode
  }
  get innerData(){
    return {
      message: this.message,
    }
  }
}

module.exports = ApiResponseMessage
