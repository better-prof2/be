const server = require('./api/server')

const PORT = process.env.PORT || 3500
server.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`)
})