fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1')
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            appendData(data);
        })
        .catch(function (err) {
            console.log('error: ' + err);
        });

    function appendData(data) {
        var tableRef = document.getElementById('markets').getElementsByTagName('tbody')[0];
        for (var i = 0; i < data.length; i++) {
            tableRef.insertRow().innerHTML = 
            '<td><img src='+data[i].image+' alt='+data[i].image+' width=18></img></td>'+
             '<td class="clickable" data-user-id='+data[i].id+' onClick="getMarkets(event)">' +data[i].name+ '</td>'+
            '<td>' +data[i].symbol+ '</td>'+
            '<td>' +data[i].current_price+ '</td>'+
            '<td>' +data[i].high_24h+ '</td>'+
            '<td>' +data[i].low_24h+ '</td>';
        }

    }
    function getMarkets(event) {
        document.getElementById("page1").style.display = "none";
        var userId = event.target.dataset.userId;
        fetch(`https://api.coingecko.com/api/v3/coins/${userId}`)
            .then(response => response.json())
            .then(json => renderPosts(json, event.target))
    }

    function renderPosts(markets, target) {
            let html = '';
			if(markets.hashing_algorithm === null){var algorithm = "NO VALUE"}else{ var algorithm = markets.hashing_algorithm; }
			if(markets.genesis_date === null){var genesis = "NO VALUE"}else{ var genesis = markets.genesis_date; }
            let htmlSegment = `<div class="user">
                            <h3><img src="${markets.image.small}" alt="${markets.name}"/> ${markets.name} <span class="text-uppercase">(${markets.symbol})</span></h3>
                            <dl class="row">
							  <dt class="col-sm-2">Name:</dt>
							  <dd class="col-sm-10">${markets.name}</dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-2">Symbol:</dt>
							  <dd class="col-sm-10 text-uppercase">${markets.symbol}</dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-2">Hashing algorithm:</dt>
							  <dd class="col-sm-10">${algorithm}</dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-12">Description:</dt>
							  <dd class="col-sm-12">${markets.description.en}</dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-2">Market cap in Euro:</dt>
							  <dd class="col-sm-10">${markets.market_data.market_cap.eur}</dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-2">HomePage:</dt>
							  <dd class="col-sm-10"><a href="${markets.links.homepage[0]}" target="_blank">${markets.links.homepage[0]}</a></dd>
							</d1>
							<dl class="row">
							  <dt class="col-sm-2">Genesis Date:</dt>
							  <dd class="col-sm-10">${genesis}</dd>
							</d1>
                        </div>`;

            html += htmlSegment;

            var page2 = document.getElementById('page2');
            page2.innerHTML = html;
    }