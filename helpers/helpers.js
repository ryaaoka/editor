//parse query and get the URL parameter
export const parseQuery = function parseQuery(){
	var query = window.location.search;
	var url;
	if (query){
		query = query.replace('?', '').split('&');
		for (var i = 0; i< query.length; i++){
			query[i] = query[i].split('=');
			if (query[i][0] === 'articleURL'){
				url = query[i][1];
			}
		}
		return url;
	}
}

