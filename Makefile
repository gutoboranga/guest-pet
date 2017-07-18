heroku:
	git add app.js
	git commit -m "+ heroku"
	git push heroku master
	heroku ps:scale web=1
	heroku open
	
install:
	npm install express
	npm install body-parser
	npm install mongodb
	npm install nodemon
	
run:
	./node_modules/.bin/nodemon app.js