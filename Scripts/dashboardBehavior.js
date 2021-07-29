// const d3 = require("d3");

narrative = function(){
    //Constants
    const MaxSlides = 5;
    const RSquared = 0.754246;
    const PValue = '<0.0001';
    const LCoefficient = 4.97882;
    const LIntercept = 18.1184;
    const AvgGDP = 9.432208054;
    const AvgLife = 64.99279866;
    const MarkerDefaultColor = "steelblue";
    const TrendLineDefaultColor = "gray"
    const Margins = ({top: 25, right: 80, bottom: 25, left: 40});
    const Height = 600;
    const Width = parseInt(d3.select('#visual').style('width'));
    const SwatchSize = "15px";
    const HappinessColor = d3.interpolateCool;
    
    // Slide Information
    const SlideInfo = {
        1 : ["Overall Healthy Life Expectancy vs Logged GDP per Capita", 
            "World Happines Report (WHR) has been collecting data on countries' happiness and the contributing factors since 2012. Of those factors, we have shown coutries' wealth through log scale GDP per capita compared to the healthy life expectancy for each country's latest data (mostly 2021) as markers in the scatterplot. The size of the countries' marker is the happiness ladder score of the country, which includes the GDP per capita and healthy life expectancy as factors in that score. The happines score of the country includes more factors in its calculation, including social support, freedom of life choice, generosity, perceptions of corruption, and dystopia."],
        2 : ["Trending Values", 
            "A trendline is added showing the correlation between healthy life expectancy and GDP per capita. As shown in the graph, there is a fairly strong correlation between these factors, and the relationship between these factors is positive. Richer countries correlate with populations that live longer."],
        3 : ["Outliers", 
            "We now show quadrants split by the average healthy life expectancy and average GDP per capita of the countries displayed. There are outliers in the general trend in both directions away from the trend line. There are a couple of countries that have high life expectancy despite a low GDP per capita and low life expectancy despite a higher GDP per capita. This shows that although a general trend exists, GDP alone cannot determine the healthy life expectancy of a country alone."],
        4 : ["Region Disparity", 
            "Now, that we explored outliers in the general trend, we will explore if outliers exist in similar areas of the world. The graph now shows countries according to their world regions by color to help explore outliers in these geographic region. Each color shows a different region in the world. Generally, the regions tend to cluster in similar wealth and healthy life expectancy. However, there are significant outliers in the regions that would have been difficult to find without this region highlighting. These outliers show that even though wealth and healthy life expectancies are similar in geographic areas, there are exceptions to be explored for additional analysis in this context. You can hover over the regions in the legend to highlight country markers in that region."],
        5 : ["Exceptions to Happiness", 
            "In addition to the outliers already explored, there are some exceptions in overall happiness as well. We have updated the color scale of the country markers to more easily identify the happiness score of the countries. Happiness scores are now shown by both color and size of the markers. Note that Bhutan's latest data is from 2015 because of the lack of survery data available between 2016 and 2021. There is a general trend of happier countries in correlation to both increasing GDP per capita and healthy life expectancy. This trend is expected since these factors are major parts of the happiness score calculation. However, you can see that there are outlier countries with lower happiness score despite high GDP per capita and healthy life expectancy."]
    };

    //Annotation Data
    const AnnotationsData = [
        { 
            id: "A2", 
            note: {
                title: "Trend Line", 
                label: "HLE = " + LCoefficient + " * GDP + " + LIntercept + " \n R-Squared: " + RSquared + " \n p-Value: " + PValue,
                wrap: 280
            },
            data: { gdpPerCapita: 8.75, healthyLifeExpectancy: 61.683 },
            dy: -120,
            dx: -50
        },
        { 
            id: "A3a", 
            note: {
                title: "Nicaragua", 
                label: "High life expectancy with low GDP per capita"
            },
            data: { gdpPerCapita: 8.62, healthyLifeExpectancy: 67.657 },
            dy: -10,
            dx: -100
        },
        { 
            id: "A3b", 
            note: {
                title: "Botswana", 
                label: "Low life expectancy with high GDP per capita"
            },
            data: { gdpPerCapita: 9.782, healthyLifeExpectancy: 59.269 },
            dy: 10,
            dx: 140
        },
        { 
            id: "A3c", 
            note: {
                title: "Swaziland", 
                label: "Very low life expectancy compared to similar GDP per capita"
            },
            data: { gdpPerCapita: 9.065, healthyLifeExpectancy: 50.833 },
            dy: -1,
            dx: 20
        },
        { 
            id: "A3d", 
            note: {
                title: "Hong Kong S.A.R. of China", 
                label: "Higher life expectancy compared to other high GDP per capita"
            },
            data: { gdpPerCapita: 11.000, healthyLifeExpectancy: 76.82 },
            dy: 10,
            dx: -220
        },
        { 
            id: "A4a", 
            note: {
                title: "Singapore", 
                label: "Very high compared to peers in region (Southeast Asia)"
            },
            data: { gdpPerCapita: 11.488, healthyLifeExpectancy: 76.953 },
            dy: 10,
            dx: -250
        },
        { 
            id: "A4b", 
            note: {
                title: "Afghanistan", 
                label: "Very low compared to peers in region (South Asia)"
            },
            data: { gdpPerCapita: 7.695, healthyLifeExpectancy: 52.493 },
            dy: 0,
            dx: 300
        },
        { 
            id: "A4c", 
            note: {
                title: "Mongolia", 
                label: "Low compared to peers in region but still middle of pack (East Asia)"
            },
            data: { gdpPerCapita: 9.4, healthyLifeExpectancy: 62.5 },
            dy: 20,
            dx: 100
        },
        { 
            id: "A5a", 
            note: {
                title: "Finland", 
                label: "Highest happiness (7.842)"
            },
            data: { gdpPerCapita: 10.775, healthyLifeExpectancy: 72 },
            dy: -1,
            dx: -200
        },
        { 
            id: "A5b", 
            note: {
                title: "Afghanistan", 
                label: "Lowest happiness (2.523)"
            },
            data: { gdpPerCapita: 7.695, healthyLifeExpectancy: 52.493 },
            dy: 0,
            dx: 300
        },
        { 
            id: "A5c", 
            note: {
                title: "Bhutan", 
                label: "Happiness Score Originator (5.082)*"
            },
            data: { gdpPerCapita: 8.955, healthyLifeExpectancy: 60.568 },
            dy: 50,
            dx: 200
        },
        { 
            id: "A5d", 
            note: {
                title: "Turkey", 
                label: "Low happiness compared to similar countries (4.948)"
            },
            data: { gdpPerCapita: 10.24, healthyLifeExpectancy: 67.199 },
            dy: 40,
            dx: 20
        }
    ];
    
    //Region to Color Map 
    const RegionColor = {
        'Western Europe' :                      d3.schemeTableau10[0],
        'North America and ANZ' :               d3.schemeTableau10[1],
        'Middle East and North Africa' :        d3.schemeTableau10[2],
        'Latin America and Caribbean' :         d3.schemeTableau10[3],
        'Central and Eastern Europe' :          d3.schemeTableau10[4],
        'East Asia' :                           d3.schemeTableau10[5],
        'Southeast Asia' :                      d3.schemeTableau10[6],
        'Commonwealth of Independent States' :  d3.schemeTableau10[7],
        'Sub-Saharan Africa' :                  d3.schemeTableau10[8],
        'South Asia' :                          d3.schemeTableau10[9]
    };
    const RegionLegendData = [
        ["Western Europe"],
        ["North America and ANZ"],
        ["Middle East and North Africa"],
        ["Latin America and Caribbean"],
        ["Central and Eastern Europe"],
        ["East Asia"],
        ["Southeast Asia"],
        ["Commonwealth of Independent States"],
        ["Sub-Saharan Africa"],
        ["South Asia"]
    ];

    //Parameters
    var _currentSlide = 1;
    var _showTrendline = false;
    var _showRegions = false;
    var _showQuadrants = false;
    var _showHappinessScale = false;

    //D3 Objects
    var _data;
    var _graph;
    var _xScale;
    var _yScale;
    var _hScale;
    var _xAxis;
    var _yAxis;
    var _delaunay;
    var _voronoi;
    var _regionLegend;
    var _happinessLegend;

    //FUNCTION: Updates navigation button access
    function __updateNavigationButtons(){
        if (_currentSlide == 1) {
            d3.select('#prev').property('disabled', true);
            d3.select('#next').property('disabled', false);
        }
        else if (_currentSlide == MaxSlides) {
            d3.select('#prev').property('disabled', false);
            d3.select('#next').property('disabled', true);
        }
        else {
            d3.select('#prev').property('disabled', false);
            d3.select('#next').property('disabled', false);
        }
    }

    //FUNCTION: Loads selected slide and sets and resolves parameters for display
    function __loadSlide(slideNum, resetSlideNum){
        if (resetSlideNum) {
            _currentSlide = slideNum;
        }
        __updateNavigationButtons();
        d3.select('#slide'+slideNum).property('checked', true);
        d3.select('#narrativeTitle').text(SlideInfo[slideNum][0]);
        d3.select('#narrativeBody').text(SlideInfo[slideNum][1]);

        switch(slideNum) {
            case 2:
                _showTrendline = true;
                _showRegions = false;
                _showQuadrants = false;
                _showHappinessScale = false;
                break;
            case 3:
                    _showTrendline = true;
                    _showRegions = false;
                    _showQuadrants = true;
                    _showHappinessScale = false;
                    break;
            case 4:
                _showTrendline = false;
                _showRegions = true;
                _showQuadrants = false;
                _showHappinessScale = false;
                break;
            case 5:
                _showTrendline = false;
                _showRegions = false;
                _showQuadrants = false;
                _showHappinessScale = true;
                break;
            case 1:
            default:
                _showTrendline = false;
                _showRegions = false;
                _showQuadrants = false;
                _showHappinessScale = false;
        };

        __loadOptions();
        __showAnnotations();
    }

    //FUNCTION: Renders the display for the selected parameters
    function __loadOptions(){
        //Trendline
        d3.select("#trendline").attr("stroke", _showTrendline ? TrendLineDefaultColor : "none");
        
        //Quadrants
        d3.selectAll("svg .quadrant").style("visibility", _showQuadrants ? "visible" : "hidden");
        
        //Regions (takes precedence over happiness scale)
        d3.selectAll("#markers circle")
            .attr("stroke", (d) => (_showRegions ? RegionColor[d.region] : MarkerDefaultColor));

        //Happiness Scale 
        if (_showRegions == false) { 
            d3.selectAll("#markers circle")
                .attr("stroke", (d) => (_showHappinessScale ? HappinessColor(_hScale(d.ladder)) : MarkerDefaultColor));
        }

        //Show/Hide Legends for Markers
        if (_showRegions) {
            d3.select("#regionLegend").style("display", "");
            d3.select("#happinessLegend").style("display", "none");
        }
        else if (_showHappinessScale) {
            d3.select("#regionLegend").style("display", "none");
            d3.select("#happinessLegend").style("display", "");
        }
        else {
            d3.select("#regionLegend").style("display", "none");
            d3.select("#happinessLegend").style("display", "none");
        }
    }

    //FUNCTION: Renders the display of the appropriate annotations for the current slide
    function __showAnnotations(){
        switch(_currentSlide) {
            case 2:
                d3.selectAll("#annotations g.annotation")
                    .style("visibility", d => d.id.includes("A2") ? "visible" : "hidden");
                break;
            case 3:
                    d3.selectAll("#annotations g.annotation")
                        .style("visibility", d => d.id.includes("A3") ? "visible" : "hidden");
                    break;
            case 4:
                d3.selectAll("#annotations g.annotation")
                    .style("visibility", d => d.id.includes("A4") ? "visible" : "hidden");
                break;
            case 5:
                d3.selectAll("#annotations g.annotation")
                    .style("visibility", d => d.id.includes("A5") ? "visible" : "hidden");
                break;
            case 1:
            default:
                d3.selectAll("#annotations g.annotation")
                    .style("visibility", "hidden");
        };
    }

    //FUNCTION: Event handler for the loading for the next slide from Next Button
    function __advanceSlide(){
        if (_currentSlide < MaxSlides) {
            _currentSlide += 1;
            __loadSlide(_currentSlide, false);
        }
    }

    //FUNCTION: Event handler for the loading for the previous slide from Prev Button
    function __previousSlide(){
        if (_currentSlide != 1){
            _currentSlide -= 1;
            __loadSlide(_currentSlide, false);
        }
    }

    //FUNCTION: Setup triggers for the event listeners on the slide and navigation buttons
    function __setupListeners(){
        //Navigation buttons
        d3.select('#prev').on('click', function(event) { __previousSlide(); });
        d3.select('#next').on('click', function(event) { __advanceSlide(); });
        //Slide buttons
        d3.select('#slide1').on('click', function(event) { __loadSlide(1, true); });
        d3.select('#slide2').on('click', function(event) { __loadSlide(2, true); });
        d3.select('#slide3').on('click', function(event) { __loadSlide(3, true); });
        d3.select('#slide4').on('click', function(event) { __loadSlide(4, true); });
        d3.select('#slide5').on('click', function(event) { __loadSlide(5, true); });
    }
    
    //FUNCTION: ASYNC - Loads the graph data from a CSV file
    async function __loadData(){
        _data = await d3.csv('https://raw.githubusercontent.com/wecho3/happinessTrends/main/Data/whrData.csv', (d) => {
            return {
                unique : d.unique,
                country : d.country,
                region : d.region,
                ladder : Number(d.ladder),
                ladderStdError : Number(d.ladderStdError),
                upperWhisker : Number(d.upperWhisker),
                lowerWhisker : Number(d.lowerWhisker),
                gdpPerCapita : Number(d.gdpPerCapita),
                socialSupport : Number(d.socialSupport),
                healthyLifeExpectancy : Number(d.healthyLifeExpectancy),
                lifeChoiceFreedom : Number(d.lifeChoiceFreedom),
                generosity : Number(d.generosity),
                corruptionPerception : Number(d.corruptionPerception),
                dystopiaScore : Number(d.dystopiaScore),
                gdpPerCapitaScore : Number(d.gdpPerCapitaScore),
                socialSupportScore : Number(d.socialSupportScore),
                healthyLifeExpectancyScore : Number(d.healthyLifeExpectancyScore),
                lifeChoiceFreedomScore : Number(d.lifeChoiceFreedomScore),
                generosityScore : Number(d.generosityScore),
                corruptionPerceptionScore : Number(d.corruptionPerceptionScore),
                dystopiaScoreWResidual : Number(d.dystopiaScoreWResidual)
            };
        });
    }

    //FUNCTION: Load D3 objects for later graph rendering 
    function __loadGraphSettings(){
        //Overall graph object
        _graph = d3.select('#graph')
            .attr("viewBox", [0, 0, Width, Height])
            .style('height', Height);

        //X (gdpPerCapita) scale function
        _xScale = d3.scaleLinear()
            .domain(d3.extent(_data, d => d.gdpPerCapita))
            .range([Margins.left * 2, Width - Margins.right]);

        //Y (healthyLifeExpectancy) scale function
        _yScale = d3.scaleLinear()
            .domain(d3.extent(_data, d => d.healthyLifeExpectancy))
            .range([Height - Margins.bottom * 2, Margins.top]);

        //Happiness scale function
        _hScale = d3.scaleLinear()
            .domain(d3.extent(_data, d => d.ladder))
            .range([0, 1]);

        //X axis function 
        _xAxis = g => g
            .attr("transform", `translate(0,${Height - Margins.bottom * 1.5})`)
            .call(d3.axisBottom(_xScale).ticks(Width / 80))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", Width - 4)
                .attr("y", Margins.bottom + 4)
                .attr("fill", "currentColor")
                .attr("text-anchor", "end")
                .text('GDP per Capita'));

        //Y axis function
        _yAxis = g => g
            .attr("transform", `translate(${Margins.left},0)`)
            .call(d3.axisLeft(_yScale))
            .call(g => g.select(".domain").remove())
            .call(g => g.append("text")
                .attr("x", -Margins.left + 4)
                .attr("y", 20)
                .attr("fill", "currentColor")
                .attr("text-anchor", "start")
                .text('Healthy Life Expectancy'));

        //Create voronoi for tooltip interaction
        var cellData = _data.map((d) => ([_xScale(d.gdpPerCapita), _yScale(d.healthyLifeExpectancy)]));
        _delaunay = d3.Delaunay.from(cellData);
        _voronoi = _delaunay.voronoi([0, 0, Width, Height]);
    }

    //FUNCTION: Render D3 objects to the graph and preload objects for parameter controlled display
    function __renderGraph(){
        // Quadrant Constants
        const quadrant = d3.area()
            .x(d => d[0])
            .y0(d => d[1])
            .y1(d => d[2]);
        const quadData = [
            [[0,               0, _yScale(AvgLife)],        [_xScale(AvgGDP), 0, _yScale(AvgLife)]],
            [[_xScale(AvgGDP), 0, _yScale(AvgLife)],        [Width,          0, _yScale(AvgLife)]],
            [[0,               _yScale(AvgLife), Height],  [_xScale(AvgGDP), _yScale(AvgLife), Height]],
            [[_xScale(AvgGDP), _yScale(AvgLife), Height],  [Width,          _yScale(AvgLife), Height]]
        ];
        const quadText = [
            ["High Life Expectancy - Low GDP per Capita", _xScale(AvgGDP)/4, 20],
            ["High Life Expectancy - High GPF per Capita", _xScale(AvgGDP)*1.1, 20],
            ["Low Life Expectancy - Low GDP per Capita", _xScale(AvgGDP)/4, Height - 60],
            ["Low Life Expectancy - High GDP per Capita", _xScale(AvgGDP)*1.1, Height - 60]
        ];
        // Quadrant Backgrounds
        _graph.append("g")
            .selectAll('path')
            .data(quadData)
            .enter()
            .append("path")
            .attr("id", (d, i) => "quad" + i)
            .classed("quadrant", true)
            .style("visibility", _showQuadrants ? "visible" : "hidden")
            .style("pointer-events", "none")
            .attr("fill", (d, i) => d3.schemePastel1[i] )
            .attr("opacity", 0.25)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", quadrant)
        // Quadrant Text
        _graph.append("g")
            .selectAll('text')
            .data(quadText)
            .enter()
            .append("text")
            .attr("id", (d, i) => "quad" + i)
            .classed("quadrant", true)
            .style("visibility", _showQuadrants ? "visible" : "hidden")
            .style("pointer-events", "none")
            .style("font-weight", "bold")
            .attr("fill", (d, i) => d3.schemePastel1[i] )
            .attr("opacity", 1.00)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("transform", (d, i) => `translate(${d[1]},${d[2]})`)
            .text(d => d[0]);
        
        // Trendline
        const trendLine = d3.line()
            .x(d => _xScale(d.gdpPerCapita))
            .y(d => _yScale(d.gdpPerCapita * LCoefficient + LIntercept));
        _graph.append("g")
            .append("path")
            .datum(_data)
            .attr("id", "trendline")
            .attr("fill", "none")
            .attr("stroke", _showTrendline ? TrendLineDefaultColor : "none")
            .attr("stroke-width", 1.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", trendLine);

        // X Axis
        _graph.append("g")
            .call(_xAxis);
  
        // Y Axis
        _graph.append("g")
            .call(_yAxis);

        // Legends
        // Region Legend
        _regionLegend = d3.select("#regionLegend");
        _regionLegend.selectAll("div")
            .data(RegionLegendData)
            .enter()
            .append("div")
            .classed("regionEntry", true)
            .classed("col-4", true)
            .style("font", "12px sans-serif")
            .style("cursor", "pointer")
            .on("mouseover", (e, ld) => {
                d3.selectAll("#markers circle")
                    .attr("stroke", d => ld[0] == d.region ? RegionColor[d.region] : MarkerDefaultColor)
                    .attr("opacity", d => ld[0] == d.region ? 1.00 : 0.1);
            })
            .on("mouseout", (e, ld) => {
                d3.selectAll("#markers circle")
                    .attr("stroke", d => RegionColor[d.region])
                    .attr("opacity", d => 1.00);
            });
        _regionLegend.selectAll("div.regionEntry")
            .append("div")
            .style("width", SwatchSize)
            .style("height", SwatchSize)
            .style("background", d => RegionColor[d[0]])
            .classed("regionLegendSection", true);
        _regionLegend.selectAll("div.regionEntry")
            .append("div")
            .text(d => d[0])
            .style("height", SwatchSize)
            .style("padding-left", "10px")
            .classed("regionLegendSection", true);
        // Happiness Legend
        var happinessStep = 0.887;
        _happinessLegend = d3.select("#happinessLegend");
        _happinessLegend.append("div")
            .classed("row", true)
            .text("Happiness Score");
        _happinessLegend.append("div")
            .classed("row", true)
            .selectAll("div")
            .data([2.523, 3.410, 4.297, 5.184, 6.071, 6.958])
            .enter()
            .append("div")
            .classed("regionLegendSection", true)
            .classed("col-2", true)
            .style("height", SwatchSize)
            .style("background", d => HappinessColor(_hScale(d)))
            .style("cursor", "pointer")
            .on("mouseover", (e, ld) => {
                d3.selectAll("#markers circle")
                    .attr("stroke", d => ld <= d.ladder && d.ladder < (ld + happinessStep) ? HappinessColor(_hScale(d.ladder)) : MarkerDefaultColor)
                    .attr("opacity", d => ld <= d.ladder && d.ladder < (ld + happinessStep) ? 1.00 : 0.1);
            })
            .on("mouseout", (e, ld) => {
                d3.selectAll("#markers circle")
                    .attr("stroke", d => HappinessColor(_hScale(d.ladder)))
                    .attr("opacity", d => 1.00);
            });
        _happinessLegend.append("div")
            .attr("id", "happinessLegendLabels")
            .classed("row", true)
            .selectAll("div")
            .data([2.523, 3.410, 4.297, 5.184, 6.071, 6.958, 7.845])
            .enter()
            .append("div")
            .classed("regionLegendSection", true)
            .classed("col-2", (d,i) => i <= 4 ? true : false)
            .classed("col-1", (d,i) => i > 4 ? true : false)
            .classed("p-0", true)
            .style("text-align", (d,i) => i == 6 ? "right" : "")
            .text(d => d);

        // Markers
        _graph.append("g")
            .attr("id", "markers")
            .attr("stroke-width", 1.5)
            .attr("fill", "none")
            .selectAll("circle")
            .data(_data)
            .enter()
            .append("circle")
            .attr("id", d => 'c' + d.unique)
            .attr("cx", d => _xScale(d.gdpPerCapita))
            .attr("cy", d => _yScale(d.healthyLifeExpectancy))
            .attr("r", d => d.ladder)
            .attr("data-region", d => d.region)
            .attr("stroke", d => (_showRegions ? RegionColor[d.region] : MarkerDefaultColor));

        // Tooltips
        _graph.append("g")
            .selectAll('path')
            .data(_data)
            .enter()
            .append('path')
            .attr("fill", "none")
            .style("pointer-events", "all")
            .attr("d", (d,i) => _voronoi.renderCell(i))
            .on("mouseover", (d, i) => {
                _graph.append('g')
                    .attr("class", "tooltipBox")
                    .attr("transform", `translate(${_xScale(i.gdpPerCapita)},
                        ${_yScale(i.healthyLifeExpectancy) + (_yScale(i.healthyLifeExpectancy) > Height/2 ? -i.ladder - 3 : i.ladder + 3)})`)
                    .call(updateTooltip, i)
            })
            .on("mouseout", (d, i) => {
                _graph.selectAll('g.tooltipBox').remove();
                _graph.selectAll("circle#c" + i.unique)
                    .style("fill", "none");
            });
        
        // Annotations Template
        const makeAnnotations = d3.annotation()
            .editMode(false)
            .notePadding(15)
            .textWrap(200)
            .type(d3.annotationCallout)
            .accessors({
                x: d => _xScale(d.gdpPerCapita),
                y: d => _yScale(d.healthyLifeExpectancy)
            })
            .accessorsInverse({
                gdpPerCapita: d => timeFormat(_xScale.invert(d.gdpPerCapita)),
                healthyLifeExpectancy: d =>_yScale.invert(d.healthyLifeExpectancy)
            })
            .annotations(AnnotationsData);
        // Annotations
        _graph.append("g")
            .attr("id", "annotations")
            .attr("class", "annotation-group")
            .call(makeAnnotations);
        // Add Annotations ID and Remove Events
        _graph.selectAll("g.annotation")
            .attr("id", d => d.id )
            .style("pointer-events", "none");
        
    }

    //FUNCTION: Control behavior for tooltip trigger interaction
    function updateTooltip(g, d){

        // tooltip group
        g.style("display", null)
            .style("pointer-events", "none")
            .style("font", "10px sans-serif")
            .style("z-index", -10);

        // tooltip container stroke
        const path = g.selectAll("path")
            .data([null])
            .join("path")
                .attr("fill", "white")
                .attr("stroke", "black");

        // tooltip content
        const tooltipLabel = ["", "", "GDP Per Capita: ", "Life Expectancy: ", "Happiness Score: ", "GDP Score: ", "Social Support: ", "Life Expectancy: ", "Choice Freedom: ", "Generosity: ", "Corruption Perception: ", "Dystopia + Residual: "];
        const text = g.selectAll("text")
            .data([null])
            .join("text")
            .call(text => text
                .selectAll("tspan")
                .data([d.country, d.region, d.gdpPerCapita, d.healthyLifeExpectancy, d.ladder, d.gdpPerCapitaScore, d.socialSupportScore, d.healthyLifeExpectancyScore, d.lifeChoiceFreedomScore, d.generosityScore, d.corruptionPerceptionScore, d.dystopiaScoreWResidual])
                .join("tspan")
                .attr("x", 0)
                .attr("y", (d, i) => `${i * 1.2}em`)
                .style("text-align", "center")
                .style("font-weight", (_, i) => i ? null : "bold")
                .attr("fill", (d, i) => i >= 5 ? d3.schemeCategory10[i - 5] : "")
                .text((d, i) => tooltipLabel[i] + d));
        
        // tooltip positioning
        const {x, y, width, height} = text.node().getBBox();
        text.attr("transform", 
            _yScale(d.healthyLifeExpectancy) > Height/2 ? 
                `translate(${-width / 2},${y - height})` : 
                `translate(${-width / 2},${15 - y})`
        );

        const happinessScoreData = [d.gdpPerCapitaScore, d.socialSupportScore, d.healthyLifeExpectancyScore, d.lifeChoiceFreedomScore, 
            d.generosityScore, d.corruptionPerceptionScore, d.dystopiaScoreWResidual];
        var happinessScoreSumData = d3.cumsum(happinessScoreData);

        //X (gdpPerCapita) scale function
        var _xTScale = d3.scaleLinear()
            // .domain([0, d.ladder])
            .domain([0, 7.845])
            .range([-width / 2, width / 2]);
        var _xWScale = d3.scaleLinear()
            // .domain([0, d.ladder])
            .domain([0, 7.845])
            .range([0, width]);

        // tooltip happiness graph
        const tgraph = g.append("g")
            .selectAll("rect")
            .data(happinessScoreSumData)
            .enter()
            .append("rect")
            .attr("x", (d, i) => i == 0 ? _xTScale(0) : _xTScale(happinessScoreSumData[i - 1]))
            .attr("y",_yScale(d.healthyLifeExpectancy) > Height/2 ? -10 : height + 20)
            .attr("width", (d, i) => _xWScale(happinessScoreData[i]))
            .attr("height", 10)
            .attr("fill", (d, i) => d3.schemeCategory10[i]);

        // tooltip container path
        path.attr("d", 
            _yScale(d.healthyLifeExpectancy) > Height/2 ? 
                `M${-width / 2 - 10},-5H-5l5,5l5,-5H${width / 2 + 10}v${-height - 20}h-${width + 20}z` :
                `M${-width / 2 - 10},5H-5l5,-5l5,5H${width / 2 + 10}v${height + 20}h-${width + 20}z`
        );

        // update circle marker
        _graph.selectAll("circle#c" + d.unique)
            .style("fill", _showRegions ? RegionColor[d.region] : 'steelblue');
    }

    //FUNCTION: MAIN - Main loading function for the graph
    async function onLoaded(){
        //Set default fill style
        d3.select("svg").style("fill","black");

        //Load graph data and await before continuing graph render
        await __loadData();

        //Render graph objects
        __loadGraphSettings();
        __renderGraph();
        __showAnnotations();

        //Load first slide for webpage
        __loadSlide(1, false);

        //Establish triggers for slide navigation
        __setupListeners();
    };

    //Public accessors for function
    return {
        onLoaded:onLoaded
    };
}();

//Start when the webpage is ready for interaction
window.onload = (async() => {
    narrative.onLoaded();
})();