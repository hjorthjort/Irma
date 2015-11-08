var request = require('request');

var users = [{
	customer_name: "Alexander Hultnér",
	customer_age: 23,
	customer_phone_number: "+46733094141",
	customer_email: 'ahultner@gmail.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: "Christian Persson",
	customer_age: 20,
	customer_phone_number:'+46702077140',
	customer_email: 'christian.eg.persson@gmail.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Rikard Hjort',
	customer_age: 24,
	customer_phone_number: '+46763162240',
	customer_email: 'benparad@hotmail.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Mats Högberg',
	customer_age: 22,
	customer_phone_number: '+46730308425',
	customer_email: 'mats@hgbrg.se',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Magnus Larsson',
	customer_age: 24,
	customer_phone_number: '+46738956449',
	customer_email: 'maglars2@gmail.com',
	customer_klarna_token: '1',
	customer_password: '1'
}];

users.forEach(function(user) {
	request.post('localhost:6002/customers', {
		form: user
	});
});