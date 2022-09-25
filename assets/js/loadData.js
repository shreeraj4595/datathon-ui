// function load_subArea(){
    const userAction = async (sub, year) => {
        var response = ""
        var myJson = ""
        var lineChartCanvas = ""
        var lineChart = ""
        if(sub!="" && year !=""){
             response = await fetch('http://35.81.33.41:11202/getSubjectAreaData?limit=100&skip=0&sub_area=' + sub + '&year=' + year + '&query_from=es');
             myJson = await response.json(); //extract JSON from the http response
            console.log(myJson)
        }
        else{
             response = await fetch('http://35.81.33.41:11202/getSubjectAreaData?limit=100&skip=0&sub_area=Linguistics%20and%20Language&year=2016&query_from=es');
             myJson = await response.json(); //extract JSON from the http response
            console.log(myJson)
            
        }
        len = Object.keys(myJson).length;
        a = []
        for (var i= 0 ; i < len; i ++){
            if(myJson[i]['dates_publ_minus_accepted_days'] < 0){
                continue;
            }
            a.push(myJson[i]['dates_publ_minus_accepted_days']);
    
        }
        b = []
        for (var i= 0 ; i < len; i ++){
            b.push(myJson[i]['pub_year']);
    
        }
        // do something with myJson

    let data = {
        labels: b,
        datasets: [{
          label: '# of Days',
          data: a,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1,
          fill: true
        }]
      }
      var options = {
        interaction: {
            mode: 'nearest',
            axis: 'x',
            intersect: false
          },
          scales: {
            // yAxes: [{
            //   ticks: {
            //     beginAtZero: true,
            //     display: true
            //   }
            // }],
            xAxes: [{
                ticks: {
                  beginAtZero: true,
                  display: false
                }
              }],
          },
          legend: {
            display: true
          },
          elements: {
            point: {
              radius: 0
            }
          }
      
        };
      if ($("#lineChart").length) {
          var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
          var lineChart = new Chart(lineChartCanvas, {
            type: 'line',
            data: data,
            options: options
          });
        }
      

    }
    userAction("", "")
    const userAction1 = async () => {
    const res = await fetch('http://35.81.33.41:11202/getSubjectArea?limit=100&skip=0&query_from=es');
    const ret = await res.json(); //extract JSON from the http response
    console.log(ret)
    
    var values = ["dog", "cat", "parrot", "rabbit"];
 
    var select = document.createElement("select");
    select.name = "subarea";
    select.id = "subarea"
 
    for (const val of ret)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
 
    var label = document.createElement("label");
    label.innerHTML = "Choose your Subject Area: "
    label.htmlFor = "subarea";
 
    document.getElementById("container").appendChild(label).appendChild(select);
}
userAction1()

var values = ["2016", "2017", "2018", "2019", "2020", "2021", "2022"];
 
    var select = document.createElement("select");
    select.name = "year";
    select.id = "year"
 
    for (const val of values)
    {
        var option = document.createElement("option");
        option.value = val;
        option.text = val.charAt(0).toUpperCase() + val.slice(1);
        select.appendChild(option);
    }
 
    var label = document.createElement("label");
    label.innerHTML = "Choose Year: "
    label.htmlFor = "year";
 
    document.getElementById("container1").appendChild(label).appendChild(select);


function getData(){
    var e = document.getElementById("subarea");
    var y = document.getElementById("year");

    var subareaval = e.value;
    var subareatext = e.options[e.selectedIndex].text;

    var yearval = y.value;
    var yeartext = y.options[y.selectedIndex].text;
    userAction(subareatext, yeartext)
}