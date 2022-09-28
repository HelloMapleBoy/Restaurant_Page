// require packages used in the project
const express = require('express')
const app = express()
const exphbs = require('express-handlebars')
const restaurantList = require('./restaurant.json')
const port = 3000

//express template engine
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

//setting static files
app.use(express.static('public'))

// routes setting
app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results })
})

//show restaurants setting
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id === Number(req.params.restaurant_id))
  res.render('show', { restaurants: restaurant[0] })
})

//search restaurants setting
app.get('/search', (req, res) => {

  //no result reutrn
  if (!req.query.keywords) {
    console.log('req', res)
    return res.redirect("/")
  }

  //name and category search
  const keyword = req.query.keyword.trim().toLowerCase()
  const restaurants = restaurantList.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.includes(keyword)
  })
  res.render('index', { restaurants: restaurants })
})

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on http://localhost:${port}`)
})