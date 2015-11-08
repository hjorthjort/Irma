var users = [{
	customer_name: "Alexander Hultnér",
	customer_age: 23,
	customer_phone_number: "+46733094141",
	customer_email: 'test@example.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: "Christian",
	customer_age: 23,
	customer_phone_number:'+46702077140',
	customer_email: 'test@example.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Rikard',
	customer_age: 23,
	customer_phone_number: '+46730308425',
	customer_email: 'test@example.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Mats',
	customer_age: 23,
	customer_phone_number: '+46763162240',
	customer_email: 'test@example.com',
	customer_klarna_token: '1',
	customer_password: '1'
},
{
	customer_name: 'Magnus',
	customer_age: 23,
	customer_phone_number: '+46738956449',
	customer_email: 'test@example.com',
	customer_klarna_token: '1',
	customer_password: '1'
}];

users.map(function(user) {
	$.post('/customers', user, function(data, success) {console.log(data,success);});
});