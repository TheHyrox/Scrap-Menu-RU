const axios = require('axios');
const cheerio = require('cheerio')

axios
    .get('https://www.crous-nantes.fr/restaurant/resto-u-aubepin/')
    .then((response) => {
        const $ = cheerio.load(response.data);
        const divmeal = $('div.meal');
        const mealFoodies = divmeal.find('ul.meal_foodies');

        let date = new Date();
        let iteration = 0;

        mealFoodies.children('li').each((index, element) => {
            if (iteration % 3 === 0) {
                date.setDate(date.getDate() + 1);
                const formattedDate = `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
                console.log(formattedDate);
            }

            const text = $(element).text();
            const matches = text.match(/POLE TRADITION|POLE GRILLADES|POLE POISSON PIZZA VEGGIE/g);
            const poleNames = matches ? matches.join(' ') : '';

            const poleFoods = $(element).find('ul li');

            console.log(`${poleNames} :`);
            poleFoods.each((index, foodElement) => {
                console.log(`- ${$(foodElement).text().trim()}`);
            });
            console.log('\n');

            iteration++;
        });
    })
    
    .catch((error) => {
        console.error(error)
    });