const jayson = require('jayson')

module.exports = {
  newClient: () => {
    return jayson.client.http({port: 3001})
  },
  send: (client, data) => {
    client.request('message', data, (err, response) => {
      if(err) throw err;
      console.log(response.result)
    })
  },
  getColors: (data) => {
    let colors = []
    let groups = {}
    let colorIndex = 0
    for(let i = 0; i < data.z.length; i++) {
      let z = data.z[i]
      if(z in groups) {
        colors.push(groups[z])
      } else {
        groups[z] = colorIndex
        colors.push(colorIndex)
        colorIndex++
      }
    }
    return colors
  }
}