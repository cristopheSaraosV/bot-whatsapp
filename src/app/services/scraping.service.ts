import cheerio from 'cheerio';
const request = require('request-promise')


export class ScrapingService {


	async getRatesCostaneraNorte(direction: string) {

		const $ = await request({
			uri: "https://web.costaneranorte.cl/tarifas/",
			transform: (body: any) => cheerio.load(body)
		});

		switch (direction) {
			case "orienteponiente":			

				const arrayRate: any = []
				$('tr').each((i: any, el: any) => {	
					const title = $(el).find('th').next().text()
					const namePortico = $(el).find('td').next().text()
					const green_rate = $(el).find('td.centered.green_rate').text()
					const orange_rate = $(el).find('td.centered.orange_rate').text()
					const blue_rate = $(el).find('td.centered.blue_rate').text()						
					if (namePortico.split(',')[0] !== "Eje Kennedy" && namePortico.split(',')[0] !== "Eje Costanera" ) {
						if(title.length > 0  ) {
							const titleDirection = (title.split(' en km')[0].split('-')[1] )
							if(typeof titleDirection !== "undefined"){
								
								
								arrayRate.push({
									"direcction":` ${ title.split(' en km')[0].split('-')[0]  } - ${titleDirection.replace("Longitud", "" )}`
								})
							}

						}else{
							arrayRate.push({
								"direcction": namePortico.split(',')[0],
								green_rate,
								orange_rate,
								blue_rate
							})

						}
					}
							
				})
				return arrayRate.slice(0, 16)

			default:
				break;
		}










	}
}