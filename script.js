let sheetID = "1bWg8WxaJjz97_hbROSXoY-8dpZ0CmyS7Jy5xts52IKQ";
let tabName = "Sheet1";

let opensheet_uri = `https://opensheet.elk.sh/${sheetID}/${tabName}`;

fetch(opensheet_uri)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
        
        let dataArr = [];
        
        for (let datapoint of data){
            
            let name = datapoint.beer;
            let abv = parseFloat(datapoint.abv);
            let ibu = parseFloat(datapoint.ibu);
            let srm = parseFloat(datapoint.srm);
            let rating = parseFloat(datapoint.avg_rating);
            let type = datapoint.type;
            let season = datapoint.season;

            dataArr.push([name, abv, ibu, srm, rating, type, season]);

            let fluidBox = document.createElement("DIV");
            fluidBox.classList.add("fluid");
            document.getElementById("grid").appendChild(fluidBox);

            let lightness = map(srm,1,50,60,0);
            fluidBox.style.background = `hsla(46, 100%, ${lightness}%, 1)`;
            
            let fullness = map(rating,3,4,1,20);
            fluidBox.style.height = `${fullness}%`;
            
            let hops = map(ibu,0,60,2000,100);
            fluidBox.style.animation = `hop ${hops}ms infinite`;

            let bubbles = map(abv,4,10,1,100);
            for (let i=0; i<bubbles; i++){
                let bubble = document.createElement("DIV");
                bubble.classList.add("bubble");
                fluidBox.appendChild(bubble);
                let randomSize = Math.random() * (10 - 5) + 5;
                let randomLeft = Math.random() * (90 - 0) + 0;
                let randomTop = Math.random() * (90 - 0) + 0;
                let randomTime = Math.random() * (500 - 100) + 100;
                bubble.style.width = randomSize + "%";
                bubble.style.height = randomSize + "%";
                bubble.style.background = `hsla(46, 100%, ${lightness + 20}%, 1)`;
                bubble.style.left = randomLeft + "%";
                bubble.style.top = randomTop + "%";
                bubble.style.animation = `fizz ${randomTime}ms infinite`;
            };
        };
    })
    .catch(function (err) {
        console.log("Something went wrong!", err);
    })

function map(value, low1, high1, low2, high2) {
        return low2 + (high2 - low2) * (value - low1) / (high1 - low1);
    };