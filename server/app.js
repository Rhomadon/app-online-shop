var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors')
const productRoutes = require('./app/products/routers')
const categoryRoutes = require('./app/categorys/routers')
const tagRoutes = require('./app/tags/routers')
const authRoutes = require('./app/auth/routers')
const { decodeToken }  = require('./app/middleware')
const deliveryAddressRoutes = require('./app/deliveryAddress/routers')
const cartRoutes = require('./app/cart/routers')
const orderRoutes = require('./app/order/routers')
const invoiceRoutes = require('./app/invoice/routers')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(decodeToken())

app.use('/auth', authRoutes)
app.use('/api', productRoutes)
app.use('/api', categoryRoutes)
app.use('/api', tagRoutes)
app.use('/api', deliveryAddressRoutes)
app.use('/api', cartRoutes)
app.use('/api', orderRoutes)
app.use('/api', invoiceRoutes)
// Hero
app.use('/', function(req, res) {
  res.render('index', {
    title: 'Heros'
  })
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
