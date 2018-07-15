import React from "react";
import axios from 'axios';

class Widget extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            randomArray: [],
            data: [],
            query : "select * from weather.forecast where woeid in (select woeid from geo.places(1) where text=",
            availableLocation : ["Lodz, Poland", "Warsaw, Poland", "Berlin, Germany", "New York, USA", "Londyn, England"], 
            load: ''     
        }
    }

    componentWillMount() {
        this.getDataAboutWeather();
    }

    componentDidMount() {
        this.intervalId = setInterval(this.getDataAboutWeather.bind(this), 1000*60);
        this.intervalId = setInterval(this.updateData.bind(this), 1000*10);
    }

    getDataAboutWeather() {
        this.setState({
            load: 'loader'
        }); 
        const shuffledCitiesArray = this.state.availableLocation.sort(() => .5 - Math.random());
        const randomCities = shuffledCitiesArray.slice(0, 3);  
        axios.get(`https://query.yahooapis.com/v1/public/yql?q= + ${this.state.query} + '${randomCities[0]}' or text= +'${randomCities[1]}' or text= +'${randomCities[2]}') and u='c' &format=json`)
            .then(res => {
                this.setState({
                    data: res.data.query.results.channel,
                    randomArray: randomCities,
                    load: ''
                });                             
            })
            .catch(function (error) {
                console.log(error);
              });
    }

    updateData() {
        this.setState({
            load: 'loader'
        }); 
        const currentCities = this.state.randomArray;      
        axios.get(`https://query.yahooapis.com/v1/public/yql?q= + ${this.state.query} + '${currentCities[0]}' or text= +'${currentCities[1]}' or text= +'${currentCities[2]}') and u='c' &format=json`)
            .then(res => { 
                this.setState({
                    data: res.data.query.results.channel,
                    load: ''
                });                   
            })
            .catch(function (error) {
                console.log(error);
              });
    
    }

    render() {
        return (
            <div className="container">
                <div className="row widget-wrapper d-flex align-items-center">
                { this.state.data.map((item, i) =>
                    <div className="col-lg-4 col-md-6 col-sm-12 p-4" key={i}>
                        <div className="card widget-card">
                            <div className={this.state.load}></div>
                            <img className="card-img-top" src={process.env.PUBLIC_URL + "/images/" + item.item.condition.text.toLowerCase() + ".svg"} alt={"image-weather-"+item.item.condition.text}></img>
                            <div className="card-body text-center">
                                <h3 className="card-title">{item.location.city} {item.item.condition.temp}&deg;C </h3>
                                <p className="card-text">{item.item.condition.text}</p>
                                <a href={item.item.link.split('*').pop() } className="btn btn-primary">Więcej</a>
                            </div>
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }
}

export default Widget;




